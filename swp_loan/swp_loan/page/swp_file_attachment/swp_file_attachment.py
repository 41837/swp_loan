

import frappe
from frappe import _
import json
from frappe.core.api.file import create_new_folder
from frappe.query_builder import DocType,functions as fn

@frappe.whitelist()
def get_file_by_url(file_url):
    return frappe.get_list(doctype='File', fields=['*'], filters={'file_url': file_url}, ignore_permissions=True)


@frappe.whitelist()
def delete_doc(doctype, docname):
    if not frappe.db.exists(doctype, docname):
        frappe.throw(_('Document {0} {1} does not exist').format(doctype, docname))
    try:
        attachment = frappe.get_doc(doctype, docname)
        linked_folder_list = frappe.get_list(doctype, fields=['name'],filters=[['old_parent','=',docname]],ignore_permissions=True)
        frappe.db.set_value(doctype, [item['name'] for item in linked_folder_list], 'old_parent', None)
        attachment.delete(ignore_permissions=True)
        if attachment.is_group:
            folder_doc = frappe.get_doc('File', {'is_folder': 1,'file_name':attachment.description})
            folder_doc.delete(ignore_permissions=True)
    except Exception as error:
        frappe.throw(_('Cannot delete this folder. The folder is not empty.'))


    return {'status': 'success', 'message': _('Document deleted successfully')}

@frappe.whitelist()
def verify_doc(doctype, docname):
    doc = frappe.get_doc(doctype, docname)
    doc.set('is_verified', 1)
    doc.save(ignore_permissions=True)
    return {'status': 'success', 'message': _('Verified document successfully')}

@frappe.whitelist()
def move_file(docname,new_parent):
    doc = frappe.get_doc('Attachment', docname)
    doc.set('old_parent', doc.parent_attachment)
    doc.set('parent_attachment', new_parent)
    doc.save(ignore_permissions=True)
    return {'status': 'success', 'message': _('Moved document successfully')}

@frappe.whitelist()
def create_root(docname):
    root_attachment = frappe.new_doc('Attachment')
    root_attachment.reference_document = docname
    root_attachment.description = docname
    root_attachment.is_custom = 0
    root_attachment.is_group = 1
    root_attachment.save(ignore_permissions=True)
    return root_attachment

@frappe.whitelist()
def create_attachment(docname,description,is_custom,is_group,parent_attachment,file,is_required = 0):
    new_attachment = frappe.new_doc('Attachment')
    new_attachment.reference_document = docname
    new_attachment.description = description
    new_attachment.is_required = is_required
    new_attachment.is_custom = is_custom
    new_attachment.is_group = is_group
    new_attachment.parent_attachment = parent_attachment
    new_attachment.save(ignore_permissions=True)
    if file:
        if isinstance(file,str):
            # case create file from ui
            file = json.loads(file)
            update_file = frappe.get_doc('File', {'file_url': file['file_url']})
        elif isinstance(file,dict):
            # case copy file attachment
            file = frappe.get_doc('File', {'file_url': file['file_url']})
            update_file = frappe.copy_doc(file)
            from frappe.model.naming import make_autoname
            update_file.name = make_autoname('hash')
            update_file.flags.disable_watermark = True
            path_folder = update_file.folder.split('/')
            path_folder[2] = docname # path folder main parent attachment
            update_file.folder = '/'.join(path_folder)
        else:
            # case create file from generate folder structure
            update_file = file
        update_file.attached_to_doctype = 'Attachment'
        update_file.attached_to_field = 'attach_file'
        update_file.attached_to_name = new_attachment.name
        update_file.save(ignore_permissions=True)
        new_attachment.attach_file = update_file.file_url
        new_attachment.save(ignore_permissions=True)
    return new_attachment

def intial_location_structure(**kwargs):
    #region parameters
    parameters = {
        'reference_document' : None,
        'document_group' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    reference_document = parameters.get('reference_document')
    locations = []
    new_attachments = []
    main_parent_attachment = frappe.db.get_value('Attachment',{'reference_document':reference_document,'parent_attachment':['is',None]},'name')
    document_detail = frappe.db.sql('''
        select 
            document.location,
            document_group_detail.is_required
        from `tabDocument Group Detail` as document_group_detail
        inner join `tabDocument` as document on document.name = document_group_detail.document
        where parenttype = 'Document Group' and parentfield = 'document_group_detail' and document_group_detail.parent = %s
    '''
    ,(parameters.get('document_group'))
    ,as_dict=True)
    for document in document_detail:
        folder_name_list = document.location.split('/')
        for index,folder_name in enumerate(folder_name_list[1:]):
            locations.append({
                'location': document.location,
                'reference_document' : reference_document,
                'description' : folder_name,
                'is_required' : document.is_required if len(folder_name_list) == index + 2 else 0,
                'is_custom' : 0,
                'is_group' : 1,
                'parent_attachment' : folder_name_list[index] if index > 0 else None
            })
    locations = _delete_duplicates_attachment(locations,['location','is_required'])
    for location in locations:
        if location.get('parent_attachment'):
            for attachment in new_attachments:
                if attachment.description == location.get('parent_attachment'):
                    parent_attachment = attachment.name
                    break
        else:
            parent_attachment = main_parent_attachment
        new_attachment = create_attachment(
            docname = location.get('reference_document'),
            description = location.get('description'),
            is_required = location.get('is_required'),
            is_custom = location.get('is_custom'),
            is_group = location.get('is_group'),
            parent_attachment = parent_attachment,
            file = None)
        new_attachments.append(new_attachment)
        location_list = location.get('location').split('/')[1:]
        root_path = ''
        if location.get('parent_attachment'):
            for l in location_list:
                root_path += '/' + l
                if l == location.get('parent_attachment'):
                    break
        folder = 'Home/Attachments/'+location.get('reference_document') + root_path
        create_new_folder(file_name = location.get('description'), folder = folder)
    #endregion coding

    #region result
    result = {
        'locations' : new_attachments,
    }
    return result
    #endregion result

def _delete_duplicates_attachment(records, field_to_ignore):
    seen_keys = set()
    unique_records = []
    records = list({tuple(d.items()): d for d in records}.values())
    for record in records:
        key = tuple((key, record[key]) for key in record if key not in field_to_ignore)
        if key not in seen_keys:
            seen_keys.add(key)
            unique_records.append(record)
        else:
            for unique_record in unique_records:
                if record.get('description') == unique_record.get('description'):
                    unique_record['is_required'] = unique_record.get('is_required') if unique_record.get('is_required') == 1 else record.get('is_required')
    return unique_records

@frappe.whitelist()
def get_children(doctype, parent='', **filters):
	return _get_children(doctype, parent)


def _get_children(doctype, parent='', ignore_permissions=False):
	parent_field = 'parent_' + frappe.scrub(doctype)
	filters = [[f"ifnull(`{parent_field}`,'')", '=', parent], ['docstatus', '<', 2]]

	return frappe.get_list(
		doctype,
		fields=[
			'name as value',
			'description as title',
			'is_group as expandable',
            'is_required',
            'is_verified',
            'is_custom'
		],
		filters=filters,
		order_by='is_group desc,description',
		ignore_permissions=ignore_permissions,
	)

def get_all_node(**kwargs):
    #region parameters
    parameters = {
        'reference_document' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    reference_document = parameters['reference_document']
    node_list = []
    attachment_folder = DocType('Attachment')
    attachment_file = DocType('Attachment')
    query_attachment_list = (
        frappe.qb.from_(attachment_folder)
        .join(attachment_file).on((attachment_folder.name == attachment_file.parent_attachment) & (attachment_file.is_group == 0))
        .select(
            attachment_folder.description.as_('folder'),
            fn.GroupConcat(attachment_file.attach_file).as_('url'),
        )
        .where((attachment_folder.is_group == 1) & (attachment_folder.reference_document == reference_document))
        .groupby(attachment_folder.description).orderby(attachment_folder.description))
    result_attachment_list = query_attachment_list.run(as_dict=True)
    from frappe.utils import is_image
    for result_attachment in result_attachment_list:
        url_list = result_attachment['url'].split(',')
        url_img_list = [url for url in url_list if is_image(url)]
        if url_img_list:
            node_list.append({
                'folder': result_attachment['folder'],
                'url': url_img_list
            })
    #endregion coding

    #region result
    result = {
        'node_list' : node_list,
    }
    return result
    #endregion result

def copy_attachments_to_target(**kwargs):
    #region parameters
    parameters = {
        'attachment_list' : None,
        'from_reference_document' : None,
        'to_reference_document' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    attachment_list = parameters['attachment_list']
    from_reference_document = parameters['from_reference_document']
    to_reference_document = parameters['to_reference_document']
    old_attachment_list = frappe.db.get_list(doctype = 'Attachment',filters = [['reference_document','=',from_reference_document],['parent_attachment','is','set']],fields = ['name','description','is_required','is_verified','is_custom','is_group','parent_attachment','attach_file'],order_by='is_group desc,modified asc',limit_page_length=0)
    old_parent_attachment = None
    new_parent_attachment = None
    main_parent_attachment = frappe.db.get_value('Attachment',{'reference_document':to_reference_document,'parent_attachment':['is',None]},'name')
    file_attachment_list, folder_attachment_is_parent_list, folder_attachment_is_not_parent_list = mapping_attachment(old_attachment_list,attachment_list,main_parent_attachment)
    new_folder_attachment_list = []
    for folder_attachment in folder_attachment_is_parent_list:
        new_folder_attachment = copy_folder_attachment(folder_attachment,to_reference_document,main_parent_attachment,attachment_list)
        new_folder_attachment_list.append(new_folder_attachment)
        attachment_list.append(new_folder_attachment)
    for folder_attachment in folder_attachment_is_not_parent_list:
        new_folder_attachment = copy_folder_attachment(folder_attachment,to_reference_document,main_parent_attachment,attachment_list,new_folder_attachment_list)
        new_folder_attachment_list.append(new_folder_attachment)
        attachment_list.append(new_folder_attachment)
    for file_attachment in file_attachment_list:
        new_attachment = copy_file_attachment(file_attachment,old_parent_attachment,new_parent_attachment,old_attachment_list,attachment_list,to_reference_document)
        attachment_list.append(new_attachment)
    #endregion coding

    #region result
    result = {
        'attachment_list' : attachment_list,
    }
    return result
    #endregion result

def mapping_attachment(old_attachment_list,new_attachment_list,main_parent_attachment):
    file_attachment_list = []
    folder_attachment_is_parent_list = []
    folder_attachment_is_not_parent_list = []
    for old_attachment in old_attachment_list:
        if old_attachment.is_group == 1:
            is_match_folder = False
            for new_attachment in new_attachment_list:
                if new_attachment.description == old_attachment.description:
                    is_match_folder = True
                    break
            if not is_match_folder:
                is_match_parent = False
                parent_attachment_description = None
                for parent_attachment in old_attachment_list:
                    if parent_attachment.name == old_attachment.parent_attachment:
                        parent_attachment_description = parent_attachment.description
                        for new_parent_attachment in new_attachment_list:
                            if new_parent_attachment.description == parent_attachment.description:
                                is_match_parent = True
                                old_attachment.parent_attachment = new_parent_attachment.name
                                break
                        break
                if not is_match_parent:
                    if parent_attachment_description:
                        old_attachment.parent_attachment = parent_attachment_description
                        folder_attachment_is_not_parent_list.append(old_attachment)
                    else:
                        old_attachment.parent_attachment = main_parent_attachment
                        folder_attachment_is_parent_list.append(old_attachment)
                else:
                    folder_attachment_is_parent_list.append(old_attachment)
        elif old_attachment.is_group == 0:
            file_attachment_list.append(old_attachment)
    return file_attachment_list, folder_attachment_is_parent_list, folder_attachment_is_not_parent_list

def copy_folder_attachment(attachment,to_reference_document,main_parent_attachment,attachment_list,new_attachment_list = []):
    new_attachment = None
    for parent_attachment in new_attachment_list:
        if parent_attachment.description == attachment.parent_attachment:
            attachment.parent_attachment = parent_attachment.name
            break
    new_attachment = create_attachment(
        docname = to_reference_document,
        description = attachment.description,
        is_required = 0,
        is_custom = attachment.is_custom,
        is_group = attachment.is_group,
        parent_attachment = attachment.parent_attachment,
        file = None)
    root_path = ''
    root_path = search_location(new_attachment,attachment_list,main_parent_attachment,root_path,is_last_folder=True)
    folder = 'Home/Attachments/'+ new_attachment.reference_document + root_path
    create_new_folder(file_name = new_attachment.description, folder = folder)
    return new_attachment

def search_location(attachment,attachment_list,main_parent_attachment,root_path = '',is_last_folder = False):
    if not is_last_folder:
        root_path = '/' + attachment.description + root_path
    if attachment.parent_attachment == main_parent_attachment:
        return root_path
    else:
        for parent_attachment in attachment_list:
            if parent_attachment.name == attachment.parent_attachment:
                return search_location(parent_attachment,attachment_list,main_parent_attachment,root_path)

def copy_file_attachment(file_attachment,old_parent_attachment,new_parent_attachment,old_attachment_list,attachment_list,to_reference_document):
    if old_parent_attachment != file_attachment.parent_attachment:
        old_parent_attachment = file_attachment.parent_attachment
        is_parent_attachment = False
        for old_attachment in old_attachment_list:
            if old_attachment.name == file_attachment.parent_attachment:
                old_attachment_doc = old_attachment
                break
        for parent_attachment in attachment_list:
            if parent_attachment.description == old_attachment_doc.get('description'):
                new_parent_attachment = parent_attachment.name
                is_parent_attachment = True
                break
        if not is_parent_attachment:
            new_parent_attachment = attachment_list[0].name 
    file = {'file_url':file_attachment.attach_file}
    new_attachment = create_attachment(to_reference_document,file_attachment.description,file_attachment.is_custom,file_attachment.is_group,new_parent_attachment,file,file_attachment.is_required)
    return new_attachment







import frappe
import json

@frappe.whitelist()
def custom_save_without_validation(doc):
    doc = frappe.get_doc(json.loads(doc))

    doc.flags.ignore_mandatory = True
    doc.flags.ignore_validate = True
    doc.flags.ignore_permissions = True

    if not doc.name:
        doc.insert()
    else:
        doc.save()

    return {"name": doc.name}

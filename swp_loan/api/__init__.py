import frappe
import json
from frappe.model.document import Document
from frappe import _
from frappe.utils import getdate, today, cint, cstr, flt
from z_loan.loan.methods import convert_criteria_fields, get_match_criteria_list, get_user_by_authorization_level_and_branch, validate_data_from_pattern, create_object_from_doctype
from frappe.utils.user import get_users_with_role
from frappe.query_builder import DocType,functions as fn
from frappe.utils.data import cint, sbool

@frappe.whitelist(methods=['PUT'])
def swp_pea(**kwargs):
    from z_loan.loan.methods import submit_verify_pea_result
    submit_verify_pea_result(**kwargs)

@frappe.whitelist()
def verify_ncb_credit_scoring(**kwargs):
    #region parameters
    parameters = {
        'loan_app_doc' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    from z_loan.api_gateway import swp_check_ncrs
    loan_application = json.loads(parameters['loan_app_doc'])
    loan_condition = frappe.get_doc('Loan Condition',{'internal_loan_application_id': loan_application.get('name')})
    employee = frappe.get_doc('Employee', {'email':frappe.session.user})
    data = swp_check_ncrs(
        idtype = loan_application.get('cus_identification_type'),
        idnumber = loan_application.get('cus_identification_number'),
        firstname = loan_application.get('cus_first_name'),
        familyname = loan_application.get('cus_last_name'),
        dateofbirth = frappe.utils.format_datetime(loan_application.get('cus_date_of_birth'), 'dd/MM/yyyy'),
        enqamount = loan_condition.requested_amount,
        consent = 'Y' if loan_application.get('cus_sensitive_data_consent') == 'Consent' else 'N',
        income_amount = loan_application.get('cus_monthly_salary'),
        working_year = loan_application.get('cus_work_experience_year'),
        working_month = cint(loan_application.get('cus_work_experience_month')),
        ltv_percent = loan_condition.ltv,
        age = loan_application.get('cus_age'),
        user = employee.name,
    )
    #endregion coding

    #region result
    return data
    #endregion result

@frappe.whitelist()
def find_campaign(**kwargs):
    #region parameters
    parameters = {
        'trans_date' : None,
        'sales_kit_doc' : '[]',
        'loan_condition_doc' : '[]',
        'campaign_interest_rate' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    from z_loan.campaign.methods import get_campaign_from_sales_kit
    sales_kit_doc = json.loads(parameters['sales_kit_doc'])
    loan_condition_doc = json.loads(parameters['loan_condition_doc'])
    if sales_kit_doc:
        meta = frappe.get_meta('Sales Kit')
        sales_kit_obj = create_object_from_doctype(meta.fields)
        sales_kit_obj.update(sales_kit_doc[0])
        sales_kit_doc = [sales_kit_obj]
    if loan_condition_doc:
        meta = frappe.get_meta('Loan Condition')
        loan_condition_obj = create_object_from_doctype(meta.fields)
        loan_condition_obj.update(loan_condition_doc[0])
        loan_condition_doc = [loan_condition_obj]
    campaign_result = get_campaign_from_sales_kit(
        trans_date = parameters['trans_date'],
        sales_kit_doc = sales_kit_doc,
        loan_condition_doc = loan_condition_doc,
        campaign_interest_rate = parameters['campaign_interest_rate'],
    )['campaign_result']
    #endregion coding

    #region result
    result = {
        'campaign_result' : campaign_result,
    }
    return result
    #endregion result
    
@frappe.whitelist(methods=['GET','PUT'])
def swp_dlt(**kwargs):
    if frappe.request.method == 'GET':
        from z_loan.loan.methods import get_vehicle_info
        get_vehicle_info(**kwargs)
    elif frappe.request.method == 'PUT':
        from z_loan.loan.methods import submit_verify_collateral_dlt_result
        submit_verify_collateral_dlt_result(**kwargs)


@frappe.whitelist()
def verify_dopa(**kwargs):
    #region parameters
    parameters = {
        'loan_app_doc' : None,
        'laser_no' : None,
        'laser_no_label' : ''
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    loan_application = json.loads(parameters['loan_app_doc'])
    laser_no = parameters['laser_no']
    laser_no_label = parameters['laser_no_label']
    validate_data_from_pattern(pattern='Laser No',data=laser_no,field_label=laser_no_label)
    
    from z_loan.api_gateway import swp_check_dopa
    data = swp_check_dopa(
        citizenId = loan_application.get('cus_identification_number'),
        firstname = loan_application.get('cus_first_name'),
        lastname = loan_application.get('cus_last_name'),
        laser = laser_no,
        dob = str((getdate(loan_application.get('cus_date_of_birth')).year + 543) % 10000) + frappe.utils.format_datetime(loan_application.get('cus_date_of_birth'), 'MMdd') if loan_application.get('cus_date_of_birth') else ''
    )
    #endregion coding

    #region result
    return data
    #endregion result

@frappe.whitelist()
def verify_dopa_guarantor(**kwargs):
    #region parameters
    parameters = {
        'guarantor_doc' : None,
        'laser_no' : None,
        'laser_no_label' : ''
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    guarantor = json.loads(parameters['guarantor_doc'])
    laser_no = parameters['laser_no']
    laser_no_label = parameters['laser_no_label']

    try:
        validate_data_from_pattern(pattern='Laser No',data=laser_no,field_label=laser_no_label)['result']
        
        from z_loan.api_gateway import swp_check_dopa
        data = swp_check_dopa(
            citizenId = guarantor.get('identification_number'),
            firstname = guarantor.get('first_name'),
            lastname = guarantor.get('last_name'),
            laser = laser_no,
            dob = str((getdate(guarantor.get('date_of_birth')).year + 543) % 10000) + frappe.utils.format_datetime(guarantor.get('date_of_birth'), 'MMdd') if guarantor.get('date_of_birth') else ''
        )
    except Exception as e:
        frappe.clear_last_message()
        return {
            'statusCode': '500',
            'message': str(e), 
            'data': {}
        }
    #endregion coding

    #region result
    return data
    #endregion result

@frappe.whitelist(methods=['POST'])
def k2_get_users_destination(**kwargs):
    #region parameters
    parameters = {
        'doctype' : '',
        'name' : '',
        'activity' : '',
    }
    parameters.update(kwargs)
    #endregion parameters
    #region coding
    doctype = parameters.get('doctype')
    doctype_name = parameters.get('name')
    activity = parameters.get('activity')
    result_data = []
    if doctype is None or doctype == '':
        return {'data' : []}
    if doctype_name is None or doctype_name == '':
        return {'data' : []}
    if activity is None or activity == '':
        return {'data' : []}
    
    doc_minimum_credit_authorization = None
    doc_branch = None
    
    doc_list = frappe.get_list(doctype,fields=['*'],filters=[['name','=',doctype_name]])
    if len(doc_list) == 0:
        return {'data' : []}
    doc = doc_list[0]
    
    # set variables by doctype
    match doctype:
        case 'Sales Kit':
            doc_minimum_credit_authorization = None
            doc_branch = doc.branch
        case 'Loan Application':
            doc_minimum_credit_authorization = doc.credit_authorization_level
            doc_branch = doc.branch

    #region activity field checking
    if doctype == 'Loan Application' and activity == 'Field Checking':
        field_checking_list = frappe.get_list('Loan Field Checking',fields=['name','assigned_branch'],
                                            filters=[['ref_loan_application','=',doc.name],
                                                     ['status','!=','30200']])
        if len(field_checking_list) > 0:
            for item in field_checking_list:
                result_field_checking_users = get_user_by_authorization_level_and_branch(authorization_level=doc.field_checking_authorization_level,branch=item['assigned_branch'])
                authorization = []
                for item_2 in result_field_checking_users['data']:
                    authorization.append({
                            'level': item_2['authorization_level'],
                            'role': '',
                            'is_round_robin': False,
                            'users': item_2['users']
                        })
                result_data.append(
                    {
                        'name': item['name'],
                        'authorization' : authorization
                    }
                )
                sorted(
                        result_data,
                        key=lambda x: int(x['authorization'][0]['level'])
                )
        else :
            return {'data' : []}
    #endregion activity field checking

    #region activity branch
    elif (doctype == 'Loan Application' and (activity == 'Branch Document Preparation' or activity == 'Requester Rework')) or (doctype == 'Sales Kit' and activity == 'Branch Resubmit'):
        employee_branch_list = frappe.get_list('Employee',fields=['email'],filters={'branch':doc_branch})
        employee_branch_list = [row['email'] for row in employee_branch_list]
        all_user = frappe.get_list('User',fields=['username','email'],filters=[['email','in',employee_branch_list]])
        all_user = [row['username'] for row in all_user]
        user_names = ';'.join(all_user) 
        result_data.append(
            {
                'name': doc.name,
                'authorization' : [
                    {
                        'level': '',
                        'role': '',
                        'is_round_robin': False,
                        'users': [user_names]
                    }
                ]
            }
        )
    #endregion activity branch

    #region other activity
    else:
        other_authorization = []
        from frappe.query_builder import DocType, functions as fn
        parent = DocType('Activity Role Setup')
        child_branch = DocType('Branch Criteria Mapping')
        child_collateral = DocType('Collateral Criteria Mapping')
        child_loan_application = DocType('Loan Application Criteria Mapping')
        query_result = (
        frappe.qb
            .from_(parent)
            .left_join(child_branch)
            .on(parent.name == child_branch.parent)
            .left_join(child_collateral)
            .on(parent.name == child_collateral.parent)
            .left_join(child_loan_application)
            .on(parent.name == child_loan_application.parent)
            .where(parent.activity_name == activity)
            .select(
                parent.star,
                fn.GroupConcat(child_branch.branch_criteria).distinct().as_('branch_criteria'),
                fn.GroupConcat(child_collateral.collateral_criteria).distinct().as_('collateral_criteria'),
                fn.GroupConcat(child_loan_application.loan_application_criteria).distinct().as_('loan_application_criteria'),
            )
            .groupby(parent.name)
            .run(as_dict=True))
        activity_role_setup = convert_criteria_fields(query_result)
        match_list = get_match_criteria_list(doc_list=activity_role_setup,loan_app_doc=doc_list)['match_list']
        if len(match_list) == 0:
            frappe.throw(_('Activity Role Setup is not found.'))
        if any([row['credit_authorization_level'] is None or row['credit_authorization_level'] == '' for row in activity_role_setup]):
            for item in match_list:
                activity_role_doc = frappe.get_doc('Activity Role Setup',item['name'])
                acitvity_users = activity_role_doc.users()
                other_authorization.append(
                    {
                        'level': '',
                        'role': item['role'],
                        'is_round_robin': bool(item['is_round_robin']),
                        'users': [acitvity_users]
                    }
                )
        else:
            if int(doc_minimum_credit_authorization) < 40:
                result_user_by_authorization_level_and_branch = get_user_by_authorization_level_and_branch(authorization_level=doc_minimum_credit_authorization,branch=doc_branch)
                for item in result_user_by_authorization_level_and_branch['data']:
                    other_authorization.append(
                        {
                            'level': item['authorization_level'],
                            'role': '',
                            'is_round_robin': False,
                            'users': item['users']
                        }
                    )
                    
            filter_match_list = []
            for item in match_list:
                if int(item['credit_authorization_level']) >= int(doc_minimum_credit_authorization):
                    filter_match_list.append(item)

            for item in filter_match_list:
                activity_role_doc = frappe.get_doc('Activity Role Setup',item['name'])
                acitvity_users = activity_role_doc.users()
                other_authorization.append(
                    {
                        'level': item['credit_authorization_level'],
                        'role': item['role'],
                        'is_round_robin': bool(item['is_round_robin']),
                        'users': [acitvity_users]
                    }
                )

        sorted(
            result_data,
            key=lambda x: int(x['authorization'][0]['level'])
        )
        result_data.append(
            {
                'name': doc.name,
                'authorization' : other_authorization
            }
        )

    #endregion other activity
    #endregion coding

    #region result
    result = {
        'data' : result_data,
    }
    return result
    #endregion result

@frappe.whitelist(methods=['POST'])
def k2_get_round_robin_users(**kwargs):
    #region parameters
    parameters = {
        'roles' : '',
    }
    parameters.update(kwargs)
    #endregion parameters
    roles = parameters.get('roles')
    result = []
    input_roles = None
    if roles:
        input_roles = roles.split(';')
    role_filter = [['is_round_robin','=',True]]
    if input_roles:
        role_filter.append(['role','in',input_roles])
    filtered_role = frappe.get_all('Activity Role Setup',fields=['role'],filters=role_filter)
    if len(filtered_role) == 0:
        frappe.response.data = result
        return
    role_list = [role['role'] for role in filtered_role]
    if len(role_list) > 0:
        for role in role_list:
            users = get_users_with_role(role)
            if len(users) > 0:
                fitlered_users = frappe.get_all('User', filters={'name': ['in', users]}, fields=['username'])
                username_list = [user['username'] for user in fitlered_users]
                result.append({
                    'role':role,
                    'users':';'.join(username_list)
                })

    if result == []:
        frappe.throw(_('Cannot find users in specific roles.'))
        
    #region coding
    #endregion coding

    #region result
    frappe.response.data = result
    #endregion result

@frappe.whitelist()
def calculate_fees_and_insurance(**kwargs):
    from z_loan.campaign.methods import calculate_fees_and_insurance_condition

    #region parameters
    parameters = {
        'requested_amount': 0,
        'campaign_code': None,
        'interest_rate': None,
        'pay_fee': None,
        'term': None,
        'campaign_fees': [],
        'campaign_insurance': []
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    requested_amount = float(parameters['requested_amount'])
    pay_fee = parameters['pay_fee']
    number_of_period = frappe.get_value('Term', parameters['term'],'number_of_period')
    fees_condition = json.loads(parameters['campaign_fees'])
    insurance_condition = json.loads(parameters['campaign_insurance'])

    fees_condition = [condition for condition in fees_condition if condition["selected"] == 1]
    insurance_condition = [condition for condition in insurance_condition if condition["selected"] == 1]

    result = calculate_fees_and_insurance_condition(requested_amount=requested_amount, number_of_period=number_of_period, pay_fee=pay_fee, fees_condition=fees_condition, insurance_condition=insurance_condition)
    campaign_fees = []
    campaign_insurance = []
    for fee in result['fees_condition']:
        fee_info = {
            'code': fee['code'],
            'description': fee['description'],
            'options': fee['result'].get('options'),
            'charged': fee['result']['amount'],
            'discount': fee['result'].get('discount'),
            'net': fee['result'].get('net'),
            'selected_condition_detail': fee['result'].get('selected_condition_detail')
        }
        campaign_fees.append(fee_info)

    for ins in result['insurance_condition']:
        ins_info = {
            'code': ins['code'],
            'description': ins['description'],
            'options': ins['result'].get('options'),
            'charged': ins['result']['amount'],
            'discount': ins['result'].get('discount'),
            'net': ins['result'].get('net'),
            'selected_condition_detail': ins['result'].get('selected_condition_detail')
        }
        campaign_insurance.append(ins_info)    
    #endregion coding

    #region result
    result = {
        'campaign_fees': campaign_fees,
        'campaign_insurance': campaign_insurance,
        'financing_amount': result['financing_amount']
    }
    return result
    #endregion result

def update_transfer_information(**kwargs):
    #region parameters
    parameters = {
        'update_transfer_list' : [],
    }
    parameters.update(kwargs)
    #endregion parameters
    update_transfer_list = parameters.get('update_transfer_list')
    for item in update_transfer_list:
        transfer_doc = frappe.get_doc('Loan Transfer Detail',item['name'])
        transfer_doc.transfer_status = item['transfer_status']
        transfer_doc.transfer_date = item['transfer_date']
        transfer_doc.bank_account_from = item['bank_account_from']
        transfer_doc.reference_transfer_number = item['reference_transfer_number']
        transfer_doc.bank_account_name_from = item['bank_account_name_from']
        transfer_doc.bank_account_number_from = item['bank_account_number_from']
        transfer_doc.save(ignore_permissions=True)
        
    #region coding
    #endregion coding

    #region result
    #endregion result


@frappe.whitelist()
def calculate_estimated_paym_schedule(**kwargs):
    #region parameters
    parameters = {
        'principal_amount' : 0,
        'flat_percent' : None,
        'term' : [],
        'installment_type' : None,
        'is_installment_period': 0,
        'small_installment_percent': 0,
        'number_of_large_installments': 0
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    principal_amount = float(parameters['principal_amount'])
    flat_percent = parameters['flat_percent']
    term = json.loads(parameters['term'])
    installment_type = parameters['installment_type']
    is_installment_period = sbool(parameters['is_installment_period'])
    small_installment_percent = float(parameters['small_installment_percent'])
    number_of_large_installments = int(parameters['number_of_large_installments'])

    payment_information = []
    pay_date = frappe.db.get_single_value('Loan Application Settings', 'pay_date')
    number_of_period_list = frappe.db.get_list('Term',filters=[['name','in',term],['disabled','=',0]],fields='number_of_period',order_by='number_of_period asc')
    from z_loan.loan.methods import calculate_paymschedule
    for term in number_of_period_list:
        result_calculate_paymschedule = calculate_paymschedule(
            principal_amount = principal_amount,
            contract_date = today(),
            pay_date = pay_date,
            interest_type  = 'Flat Rate',
            flat_percent = flat_percent,
            term = term.number_of_period,
            payment_frequency = 1,
            eir_percent = 0,
            installment_type = installment_type,
            tax_value = 0,
            is_installment_period = is_installment_period,
            maximum_eir = 24,
            installment_percent = small_installment_percent,
            number_of_large_installments = number_of_large_installments
        )
        payment_information.append(result_calculate_paymschedule)
    #endregion coding

    #region result
    result = {
        'payment_information' : payment_information,
    }
    return result
    #endregion result

@frappe.whitelist()
def generate_folder_structure(**kwargs):
    #region parameters
    parameters = {
        'reference_document' : None,
        'loan_app_doc' : '{}',
        'sales_kit_doc' : '{}',
        'loan_field_checking_doc' : '{}',
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    reference_document = parameters['reference_document']
    loan_app_doc = json.loads(parameters['loan_app_doc'])
    sales_kit_doc = json.loads(parameters['sales_kit_doc'])
    loan_field_checking_doc = json.loads(parameters['loan_field_checking_doc'])
    parameters_doc = {
        'loan_app_doc' : loan_app_doc,
        'sales_kit_doc' : sales_kit_doc,
        'loan_field_checking_doc' : loan_field_checking_doc,
    }
    from z_loan.loan.methods import get_document_group_criteria
    document_group_name = get_document_group_criteria(**parameters_doc)['document_group_name']
    
    from z_loan.loan.page.file_attachment.file_attachment import intial_location_structure
    attachment_list = intial_location_structure(reference_document = reference_document,document_group = document_group_name)['locations']

    if loan_app_doc and loan_app_doc.get('sales_kit_number'):
        from z_loan.loan.page.file_attachment.file_attachment import copy_attachments_to_target
        attachment_list = copy_attachments_to_target(attachment_list = attachment_list, from_reference_document = loan_app_doc.get('sales_kit_number'),to_reference_document = reference_document)['attachment_list']
    #endregion coding

    #region result
    result = {
        'attachment_list' : attachment_list,
    }
    return result
    #endregion result

@frappe.whitelist()
def test_criteria(**kwargs):
    from  z_loan.campaign.doctype.criteria_detail.criteria_detail import test_criteria
    return test_criteria(**kwargs)

@frappe.whitelist()
def get_criteria_condition(**kwargs):
    #region parameters
    parameters = {
        'doc_type' : None,
        'criteria_name' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    doc_type = parameters.get('doc_type')
    criteria_name = parameters.get('criteria_name')
    criteria_doc = frappe.get_doc(doc_type,criteria_name)
    criteria_condition = criteria_doc.criteria_condition()
    #endregion coding

    #region result
    result = {
        'criteria_condition' : criteria_condition,
    }
    return result
    #endregion result

@frappe.whitelist()
def calculate_loan_condition(**kwargs):
    #region parameters
    parameters = {
        'principal_amount' : 0,
        'flat_percent' : None,
        'installment_type' : None,
        'term':None,
        'payment_frequency':0,
        'internal_loan_application_id':None,
        'lease_type':None,
        'pay_date':None,
        'is_installment_period': 0,
        'number_of_large_installments': 0,
        'small_installment_percent': 0,
        'eir_percent': 0,
        'interest_type': 0,
        'application_type': None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    principal_amount = float(parameters['principal_amount'])
    contract_date = parameters['contract_date']
    flat_percent = parameters['flat_percent']
    installment_type = parameters['installment_type']
    term = parameters['term']
    payment_frequency = parameters['payment_frequency']
    internal_loan_application_id = parameters['internal_loan_application_id']
    lease_type = parameters['lease_type']
    pay_date = parameters['pay_date']
    is_installment_period = sbool(parameters['is_installment_period'])
    small_installment_percent = float(parameters['small_installment_percent'])
    number_of_large_installments = int(parameters['number_of_large_installments'])
    eir_percent = float(parameters['eir_percent'])
    interest_type = parameters['interest_type']
    application_type = parameters['application_type']
    result_other_deduction = None

    loan_apps_settings_doc = frappe.get_single('Loan Application Settings')
    maximum_eir_list = loan_apps_settings_doc.maximum_eir
    eir = 24
    loan_app_doc = frappe.get_doc('Loan Application',internal_loan_application_id)
    for item in maximum_eir_list:
        if item.company == loan_app_doc.company and item.lease_type == lease_type and item.product == loan_app_doc.col_product and item.subproduct == loan_app_doc.col_subproduct:
            eir = item.maximum_eir

    from z_loan.loan.methods import calculate_paymschedule
    result_calculate_paymschedule = calculate_paymschedule(
        principal_amount = principal_amount,
        contract_date = contract_date,
        pay_date = pay_date,
        interest_type  = interest_type,
        flat_percent = flat_percent,
        term = term,
        payment_frequency = payment_frequency,
        eir_percent = eir_percent,
        installment_type = installment_type,
        tax_value = 0,
        is_installment_period = is_installment_period,
        maximum_eir = eir,
        installment_percent = small_installment_percent,
        number_of_large_installments = number_of_large_installments
    )
    if application_type != 'New' and application_type != 'Refinance' and loan_app_doc.col_is_collateral_new == False:
        result_other_deduction = create_other_deduction(loan_app_doc.name)
    #endregion coding

    #region result
    result = {
        'payment_information' : result_calculate_paymschedule,
        'result_other_deduction' : result_other_deduction,
    }
    return result
    #endregion result

@frappe.whitelist()
def filter_ownership_loan_condition(**kwargs):
    #region parameters
    parameters = {
        'internal_loan_application_id' : None,
        'select_company': None
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    internal_loan_application_id = parameters.get('internal_loan_application_id')
    select_company = parameters.get('select_company')
    loan_app_doc = frappe.get_doc('Loan Application',internal_loan_application_id)

    parent = DocType('Ownership')
    child_company = DocType('Company Mapping')
    child_loan_app = DocType('Loan Application Criteria Mapping')
    child_collateral = DocType('Collateral Criteria Mapping')

    query_result = (
    frappe.qb
        .from_(parent)
        .left_join(child_company)
        .on(parent.name == child_company.parent)
        .left_join(child_loan_app)
        .on(parent.name == child_loan_app.parent)
        .left_join(child_collateral)
        .on(parent.name == child_collateral.parent)
        .select(
            parent.star,
            fn.GroupConcat(child_company.company).distinct().as_('company'),
            fn.GroupConcat(child_loan_app.loan_application_criteria).distinct().as_('loan_application_criteria'),
            fn.GroupConcat(child_collateral.collateral_criteria).distinct().as_('collateral_criteria'),
        )
        .groupby(parent.name)
        .run(as_dict=True))
    owner_list = convert_criteria_fields(query_result)
    if select_company:
        owner_list = [
            item for item in owner_list 
            if 'company' in item and item['company'] and select_company in item['company'].split(',')
        ]
    match_list = get_match_criteria_list(doc_list=owner_list,loan_app_doc=[loan_app_doc.as_dict()])['match_list']
    #endregion coding

    #region result
    result = {
        'data' : match_list
    }
    return result
    #endregion result

@frappe.whitelist()
def round_number(**kwargs):
    #region parameters
    parameters = {
        'input_number' : 0,
        'rounding_type' : 'None',
        'rounding_position' : None,
    }
    parameters.update(kwargs)
    #endregion parameter

    #region coding
    input_number = parameters.get('input_number')
    rounding_type = parameters.get('rounding_type')
    rounding_position = parameters.get('rounding_position')
    #endregion coding

    #region result
    from z_loan.loan.methods import round_number as shared_round_number
    return shared_round_number(input_number=float(input_number),rounding_type=rounding_type,rounding_position=float(rounding_position))
    #endregion result

@frappe.whitelist(methods=['GET'])
def k2_is_remaining_transfer():
    doc_id = frappe.form_dict.get('loan_application_id')
    loan_app_doc = frappe.get_doc('Loan Application',doc_id)
    loan_condition_doc = frappe.get_doc('Loan Condition',{'internal_loan_application_id': loan_app_doc.name})
    transfer_list = frappe.get_list('Loan Transfer Detail',fields=['name','transfer_amount','transfer_status'],
                                        filters=[['ref_loan_application','=',loan_app_doc.name],
                                                 ['advanced_installment','=',False],
                                                 ['transfer_type','!=','Top-up']
                                                 ])
    sum_transfer_amount = 0.00
    
    if len(transfer_list) > 0:
        sum_transfer_amount = sum(item['transfer_amount'] for item in transfer_list)

    if loan_condition_doc.remaining_transfer_amount == sum_transfer_amount:
        frappe.response.is_remaining_transfer = False
    else:
        frappe.response.is_remaining_transfer = True

@frappe.whitelist(methods=['GET'])
def k2_get_transfer_condition():
    doc_id = frappe.form_dict.get('loan_application_id')
    loan_app_doc = frappe.get_doc('Loan Application',doc_id)
    transfer_list = frappe.get_list('Loan Transfer Detail',fields=['name','transfer_amount','transfer_status','auto_transfer','advanced_installment','transfer_type'],
                                        filters=[['ref_loan_application','=',loan_app_doc.name],['transfer_status','=','draft']])
    result = ''
    if len(transfer_list) > 0:
        transfer_no_top_up_list = []
        for item in transfer_list:
            if item['transfer_type'] != 'Top-up' and item['transfer_type'] != 'No Transfer':
                transfer_no_top_up_list.append(item)

        if len(transfer_no_top_up_list) > 0:
            if any(item.auto_transfer == True for item in transfer_no_top_up_list):
                result = 'Auto'
            else:
                result = 'Manual'
        else:
            if any(item['transfer_type'] == 'Top-up' or (item['transfer_type'] == 'No Transfer' and sbool(item['advanced_installment']) == False) for item in transfer_list):
                result = 'Auto'
            else:
              result = 'No Transfer'  
    else:
        result = 'No Transfer'
        
    frappe.response.transfer_condition = result


@frappe.whitelist(methods=['POST'])
def k2_swp_transfer(**kwargs):
    #region parameters
    parameters = {
        'loan_application_id' : '',
    }
    parameters.update(kwargs)
    #endregion parameters
    loan_application_id = parameters.get('loan_application_id')
    loan_app_doc = frappe.get_doc('Loan Application',loan_application_id)
    response = swp_interface_transfer(loan_application_id=loan_app_doc.name)
    statusCode = response['statusCode']
    response_message = response['message']

    if 'statusCode' not in response or 'message' not in response or response['statusCode'] != 200: 
        if 'message' not in response:
            statusCode = 500
            response_message = _('Internal Server Error')
    else:
        if response['data']:
            update_transfer_information(update_transfer_list=response['data'])

    frappe.response.statusCode = statusCode
    frappe.response.message = response_message
      
@frappe.whitelist()  
def test_condition_criteria(**kwargs):
    from  z_loan.campaign.methods import test_condition_criteria
    return test_condition_criteria(**kwargs)


@frappe.whitelist()
def get_condition_all(**kwargs):
    from  z_loan.campaign.methods import get_condition_all
    return get_condition_all(**kwargs)

@frappe.whitelist()
def get_all_node(**kwargs):
    from  z_loan.loan.page.file_attachment.file_attachment import get_all_node
    return get_all_node(**kwargs)

@frappe.whitelist(methods=['GET'])
def get_loan_application(**kwargs):
    if frappe.request.method == 'GET':
        from z_loan.loan.methods import get_loan_application
        get_loan_application(**kwargs)

@frappe.whitelist()
def extend_end_date(**kwargs):
    from z_loan.campaign.doctype.campaign_condition.campaign_condition import extend_end_date
    return extend_end_date(**kwargs)

@frappe.whitelist()
def hl_search(**kwargs):
    from z_loan.api_gateway import swp_check_rate_ltv
    return swp_check_rate_ltv(**kwargs)

@frappe.whitelist()
def search_customer(**kwargs):
    parameters = {
        'search_id' : '',
        'first_name' : '',
        'last_name' : '',
        'is_guarantor' : 1,
    }
    parameters.update(kwargs)
    search_id = parameters.get('search_id')
    first_name = parameters.get('first_name')
    last_name = parameters.get('last_name')
    is_guarantor = parameters.get('is_guarantor')

    from z_loan.api_gateway import swp_get_customer
    data = swp_get_customer(
        search_id = search_id,
        first_name = first_name,
        last_name = last_name,
        is_guarantor = is_guarantor,
    )
    return data

@frappe.whitelist()
def search_collateral(**kwargs):
    parameters = {
        'search_collateral_id' : ''
    }
    parameters.update(kwargs)
    search_collateral_id = parameters.get('search_collateral_id')

    from z_loan.api_gateway import swp_get_collateral
    data = swp_get_collateral(
        search_collateral_id = search_collateral_id
    )
    return data

@frappe.whitelist()
def search_customer(**kwargs):
    parameters = {
        'search_id' : '',
        'first_name' : '',
        'last_name' : '',
        'is_guarantor' : 1,
    }
    parameters.update(kwargs)
    search_id = parameters.get('search_id')
    first_name = parameters.get('first_name')
    last_name = parameters.get('last_name')
    is_guarantor = parameters.get('is_guarantor')

    from z_loan.api_gateway import swp_get_customer
    data = swp_get_customer(
        search_id = search_id,
        first_name = first_name,
        last_name = last_name,
        is_guarantor = is_guarantor,
    )
    return data

@frappe.whitelist()
def buy_insurance(**kwargs):
    #region parameters
    parameters = {
        'answer1' : None,
        'answer2' : None,
        'answer3' : None,
        'answer4' : None,
        'answer5' : None,
        'answer6' : None,
        'answer7' : None,
        'user' : None,
        'ref_loan_application' : None,
        'insurance' : None,
        'weight': '0',
        'height': '0'
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    answer1 = parameters.get('answer1')
    answer2 = parameters.get('answer2')
    answer3 = parameters.get('answer3')
    answer4 = parameters.get('answer4')
    answer5 = parameters.get('answer5')
    answer6 = parameters.get('answer6')
    answer7 = parameters.get('answer7')
    weight = parameters.get('weight')
    height = parameters.get('height')
    user = parameters.get('user')
    ref_loan_application = parameters.get('ref_loan_application')
    insurance = parameters.get('insurance')
    loan_application_doc = frappe.get_doc('Loan Application',ref_loan_application)
    loan_condition_doc = frappe.get_doc('Loan Condition',{'internal_loan_application_id': ref_loan_application})
    addresses_detail_type_current = None
    for addresses_detail in loan_application_doc.cus_addresses_detail:
        if addresses_detail.address_type == 'Current':
            addresses_detail_type_current = addresses_detail
            break
    if loan_application_doc.cus_customer_type == 'Personal':
        cus_salutation = loan_application_doc.cus_salutation
        cus_first_name = loan_application_doc.cus_first_name
        cus_last_name = loan_application_doc.cus_last_name
        cus_identification_number = loan_application_doc.cus_identification_number
        cus_age = loan_application_doc.cus_age
        cus_date_of_birth = loan_application_doc.cus_date_of_birth
        cus_gender = loan_application_doc.cus_gender
        cus_identification_type = loan_application_doc.cus_identification_type
    elif loan_application_doc.cus_customer_type == 'Organization':
        authorized_person = loan_application_doc.authorized_person[0]
        cus_salutation = authorized_person.salutation
        cus_first_name = authorized_person.first_name
        cus_last_name = authorized_person.last_name
        cus_identification_number = authorized_person.identification_number
        cus_age = authorized_person.age
        cus_date_of_birth = authorized_person.date_of_birth
        cus_gender = authorized_person.gender
        cus_identification_type = authorized_person.identification_type
    cus_date_of_birth = frappe.utils.format_datetime(cus_date_of_birth, 'dd/MM/') + str(((getdate(cus_date_of_birth)).year + 543) % 10000)
    insurance_doc = None
    for insurance_line in loan_condition_doc.loan_insurance_lines:
        if insurance == insurance_line.code:
            insurance_doc = insurance_line
            break
    amount = insurance_doc.amount
    # find insurance setup
    insurance_setup = frappe.db.get_value("Insurance Condition", insurance_doc.insurance_condition, "insurance_setup")
    health_questionnaire_form = frappe.db.get_value("Insurance Setup", insurance_setup, "health_questionnaire_form")
    insurance_document = None
    if health_questionnaire_form:
        insurance_document_list = frappe.get_all(health_questionnaire_form,filters=[['ref_loan_application','=',loan_application_doc.name],['insurance','=',insurance_doc.code]],fields=['*'])
        if len(insurance_document_list) > 0:
            insurance_document = insurance_document_list[0]
            answer1 = insurance_document.answer1
            answer2 = insurance_document.answer2
            answer3 = insurance_document.answer3
            answer4 = insurance_document.answer4
            answer5 = insurance_document.answer5
            answer6 = insurance_document.answer6
            answer7 = insurance_document.answer7
            weight = str(insurance_document.weight)
            height = str(insurance_document.height)
    from z_loan.api_gateway import swp_insurance_registration_form
    result = swp_insurance_registration_form(
        answer1 = answer1,
        answer2 = answer2,
        answer3 = answer3,
        answer4 = answer4,
        answer5 = answer5,
        answer6 = answer6,
        answer7 = answer7,
        branch = loan_application_doc.branch,
        user = user,
        ref_loan_application = ref_loan_application,
        insurance = insurance,
        cus_salutation = cus_salutation,
        cus_first_name = cus_first_name,
        cus_last_name = cus_last_name,
        cus_identification_number = cus_identification_number,
        mobile_number = addresses_detail_type_current.mobile_number,
        address = addresses_detail_type_current.address,
        province = addresses_detail_type_current.province,
        district = addresses_detail_type_current.district,
        subdistrict = addresses_detail_type_current.subdistrict,
        post_code = addresses_detail_type_current.post_code,
        amount = amount,
        requested_amount = loan_condition_doc.requested_amount,
        cus_age = cus_age,
        cus_date_of_birth = cus_date_of_birth,
        cus_gender = cus_gender,
        cus_identification_type = cus_identification_type,
        weight = weight,
        height = height
    )
    data = result.get('data')
    if data.get('pdf_url') == 'non-link':
        insurance_doc.insurance_application_form_link = ''
        insurance_doc.insurance_non_link = True
    else:
        insurance_doc.insurance_application_form_link = data.get('pdf_url')
        insurance_doc.insurance_non_link = False

    loan_condition_doc.ignore_update_transfer = True
    loan_condition_doc.save(ignore_permissions=True)
    return result
    #endregion coding

@frappe.whitelist()
def get_branch_type(**kwargs):
    parameters = {
        'user_email' : None,
    }
    parameters.update(kwargs)
    user_email = parameters.get('user_email')
    employee_list = frappe.get_all('Employee', filters={'email': user_email,'disabled':0}, fields=['branch'],ignore_permissions=True)
    if len(employee_list) > 0:
        from z_loan.loan.methods import get_branch_type
        branch_type = get_branch_type(branch=employee_list[0].branch)['branch_type']
        return {
            'branch_type':branch_type,
            'branch':employee_list[0].branch
        }
    else:
        if frappe.session.user != 'Guest' and frappe.session.user != 'Administrator':
            error_message = _('Cannot find your employee in the system. Please contact system administrator.')
            frappe.throw(error_message, frappe.ValidationError)
        else:
            return {
                'branch_type':None,
                'branch':None
            }

@frappe.whitelist()
def calculate_first_due_date(**kwargs):
    from z_loan.loan.methods import calculate_first_due_date
    from datetime import datetime
     #region parameters
    parameters = {
        'contract_date' : None,
        'pay_date' : None,
        'payment_frequency' : 1,
        'non_installment_month' : 0,
        'number_of_period': 1
    }
    parameters.update(kwargs)
    #endregion parameters
    parameters['contract_date'] = datetime.strptime(parameters["contract_date"], "%Y-%m-%d")
    result = calculate_first_due_date(**parameters)
    return result

@frappe.whitelist()
def validate_print_document(**kwargs):
    from z_loan.loan.methods import validate_print_document
    return validate_print_document(**kwargs)

@frappe.whitelist()
def print_document():
    doc_name = frappe.form_dict.get('doc_name')
    agreement_document_format_name = frappe.form_dict.get('agreement_document_format_name')
    file_name = frappe.form_dict.get('file_name')
    is_download = sbool(frappe.form_dict.get('is_download'))
    
    agreement_document_format = frappe.get_doc('PDF Form',agreement_document_format_name)
    data = agreement_document_format.execute_query(filters={'name':doc_name})[0]
    if agreement_document_format.transform_data:
        data = frappe.call(agreement_document_format.transform_data, data=data)
    file = agreement_document_format.fill_pdf(data)
    if file_name:
        output_fname = file_name + '.pdf'
    else:
        output_fname = agreement_document_format.name + '.pdf'

    frappe.local.response.filename = output_fname
    frappe.local.response.filecontent = file.read()
    if is_download:
        frappe.local.response.type = 'download'
    else:
        frappe.local.response.type = 'pdf'

@frappe.whitelist()
def filter_assigned_branch(**kwargs):
    #region parameters
    parameters = {
        'loan_application_id' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    loan_application_id = parameters.get('loan_application_id')
    loan_app_doc = frappe.get_doc('Loan Application',loan_application_id)
    branch_doc = frappe.get_doc('Branch', loan_app_doc.branch)
    
    result = [loan_app_doc.branch]
    if(len(branch_doc.field_checking_branch) > 0):
        for item in branch_doc.field_checking_branch:
            result.append(item.branch)
    #endregion coding

    #region result
    return list(set(result))
    #endregion result

@frappe.whitelist()
def download_zip_files(**kwargs):
    #region parameters
    parameters = {
        'reference_document' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    import zipfile
    import io
    from frappe.core.doctype.file.file import has_permission
    frappe.permissions.can_export('Attachment', raise_exception=True)
    reference_document = parameters['reference_document']
    loan_application_number = frappe.db.get_value('Loan Application',reference_document,'application_number')
    if loan_application_number:
        filename = loan_application_number
    else:
        filename = reference_document
    folder_reference_document = 'Home/Attachments/' + reference_document + '%'
    file_list = frappe.db.get_list('File',{'folder': ['like',folder_reference_document], 'is_folder': 0},'name')
    zip_file = io.BytesIO()
    zf = zipfile.ZipFile(zip_file, "w", zipfile.ZIP_DEFLATED)
    for file in file_list:
        file_doc = frappe.get_doc("File", file.name)
        if not has_permission(file_doc, "read"):
            continue
        path_folder = file_doc.folder[len('Home/Attachments/'):]
        if loan_application_number:
            path_folder = path_folder.replace(reference_document,loan_application_number)
        zf.writestr(path_folder + '/' + file_doc.file_name, file_doc.get_content())
    zf.close()
    #endregion coding
    

    #region result
    frappe.response["filename"] = filename + ".zip"
    frappe.response["filecontent"] = zip_file.getvalue()
    frappe.response["type"] = "download"
    #endregion result

@frappe.whitelist()
def k2_custom_redirect_value(parameters):
    employee_id = parameters
    employee_doc = frappe.get_doc('Employee',employee_id)
    users = frappe.get_all('User',fields=['username'],filters=[['email','=',employee_doc.email]])
    if len(users) > 0:
        return users[0]['username']
    else:
        frappe.throw(_('Employee {0} missing email that match with users in the system.').format(employee_id))

@frappe.whitelist()
def k2_custom_redirect_filter(parameters):
    # exmaple parameters [['K2 Redirect Worklist','customer_filter','in','value']]
    if isinstance(parameters, str):
        parameters = frappe.parse_json(parameters)
    # Query `Has Role` to get users with the specified roles
    user_roles = frappe.get_all(
        'Has Role',
        filters={
            'role': ['in', parameters[0][3]]
        },
        fields=['parent as user'],
        distinct=True
    )
    
    user_ids = [user['user'] for user in user_roles]
    if not user_ids:
        return []
    
    users = frappe.get_all(
        'User',
        filters={
            'name': ['in', user_ids]
        },
        fields=['email'],
        distinct=True
    )
    
    email_list = [user['email'] for user in users]
    return {'email':['in',email_list]}

@frappe.whitelist()
def k2_custom_redirect_after_success(parameters):
    if isinstance(parameters, str):
        parameters = frappe.parse_json(parameters)
        if isinstance(parameters.task, str):
            parameters.task = frappe.parse_json(parameters.task)
    
    task = parameters.task
    impersonate_username = parameters.impersonate_username
    redirect_username = parameters.redirect_username

    import re
    # Extracting the doctype and doctype name using regular expressions
    match = re.match(r'http://(?:\S+)/app/([^/]+)/([^/]+)', task['form_url'])

    if match:
        doctype = match.group(1)
        doctype_name = match.group(2)
        form_user = frappe.get_all('User',fields=['email'],filters=[['username','=',impersonate_username]])
        to_user = frappe.get_all('User',fields=['email'],filters=[['username','=',redirect_username]])
        form_username =  impersonate_username
        to_username = redirect_username
        if len(form_user) > 0:
            form_username = frappe.db.get_value('Employee', {'email':form_user[0]['email']},'employee_name')
        if len(to_user) > 0:
            to_username = frappe.db.get_value('Employee', {'email':to_user[0]['email']},'employee_name')

        doctype_mapping = {
            'loan-application': 'Loan Application',
            'sales-kit': 'Sales Kit',
        }
        doctype = doctype_mapping.get(doctype)

        from smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings import get_k2_workflow_reason
        from smart_connect.k2.doctype.action_history.action_history import create_action_history
        reason = get_k2_workflow_reason(doctype=doctype,name=doctype_name,action='Redirect')['reason']
        if reason:
            bootinfo = frappe.sessions.get()
            create_action_history(**{
                'doctype': doctype,
                'action': 'Redirect',
                'doctype_name': doctype_name,
                'reason': reason['name'],
                'remark': _('Redirect task by {0} : form {1} to {2}').format(bootinfo.employee_name,form_username,to_username),
                'is_active': 1,
                'is_update_status': 0,
                'user_name': bootinfo.employee_name
            })
        
    else:
        return

@frappe.whitelist()
def get_sales_kit_information(**kwargs):
    #region parameters
    parameters = {
        'sales_kit_number' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    sales_kit_number = parameters['sales_kit_number']
    sales_kit = frappe.get_doc('Sales Kit',sales_kit_number)
    sales_kit_information = {
        'sales_kit': sales_kit
    }
    #endregion coding

    #region result
    frappe.response.data = sales_kit_information
    #endregion result

def get_loan_application_information(**kwargs):
    #region parameters
    parameters = {
        'loan_application_id' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    loan_application_id = parameters['loan_application_id']
    loan_application = frappe.get_doc('Loan Application',loan_application_id)
    loan_condition = frappe.get_doc('Loan Condition',{'internal_loan_application_id':loan_application.name})
    loan_transfer_detail = frappe.db.get_list('Loan Transfer Detail',filters={'ref_loan_application':loan_application.name},fields='*')
    
    # convert date to string
    import datetime
    for item in loan_transfer_detail:
        for key, value in item.items():
            if isinstance(value, datetime.datetime | datetime.date | datetime.time | datetime.timedelta):
                item[key] = str(value)

    campaign_condition_name = frappe.db.get_value('Campaign Interest Rate',loan_condition.campaign_interest_rate,'parent')
    campaign_condition = frappe.get_doc('Campaign Condition',campaign_condition_name)
    campaign = {}
    for interest_rate in campaign_condition.interest_rate:
        if interest_rate.name == loan_condition.campaign_interest_rate:
            campaign_interest_type = frappe.db.get_value('Campaign',campaign_condition.campaign_code,'interest_type')
            campaign = {
                'company': interest_rate.company,
                'lms_group_workflow':campaign_condition.lms_group_workflow,
                'campaign_code':campaign_condition.campaign_code,
                'description':campaign_condition.description,
                'interest_type':interest_rate.interest_type,
                'interest_sub_type':campaign_interest_type,
                'interest_rate':loan_condition.interest_rate,
                'lms_interest_method':campaign_condition.lms_interest_method,
                'lms_campaign_interest_rate_condition':campaign_condition.lms_campaign_interest_rate_condition,
                'lms_repayment_condition':campaign_condition.lms_repayment_condition,
                'lms_count_current_period':campaign_condition.lms_count_current_period,
                'lms_interest_adjust':campaign_condition.lms_interest_adjust,
                'lms_min_interest_rate':campaign_condition.lms_min_interest_rate,
                'lms_max_interest_rate':campaign_condition.lms_max_interest_rate,
                'lms_step_back_to_initial':campaign_condition.lms_step_back_to_initial,
                'lms_step_back':campaign_condition.lms_step_back,
                'lms_grace_period':campaign_condition.lms_grace_period,
                'lms_recalculate':campaign_condition.lms_recalculate,
                'lms_interest_calculation_after_last_date':campaign_condition.lms_interest_calculation_after_last_date,
                'lms_fixfloat':campaign_condition.lms_fixfloat,
                'account_closure_comparision_flag':campaign_condition.account_closure_comparision_flag,
                'lms_initial_payment_hierarchy_profile':campaign_condition.lms_initial_payment_hierarchy_profile,
                'revolving_flag':campaign_condition.revolving_flag,
                'limit_expiry_extension':campaign_condition.limit_expiry_extension,
            }
            break
    loan_application_information = {
        'loan_application': loan_application.as_dict(convert_dates_to_str=True),
        'loan_condition': loan_condition.as_dict(convert_dates_to_str=True),
        'loan_transfer_detail': loan_transfer_detail,
        'campaign': campaign,
    }
    #endregion coding

    #region result
    return loan_application_information
    #endregion result

@frappe.whitelist(methods=['POST'])
def get_transfer_information(**kwargs):
    #region parameters
    parameters = {
        'loan_application_id' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    loan_application_id = parameters['loan_application_id']
    loan_transfer_detail = frappe.get_all('Loan Transfer Detail',filters={'ref_loan_application':loan_application_id,'transfer_status':'Draft'}
                                          ,fields=[
                                              'name',
                                              'ref_loan_application',
                                              'transfer_type',
                                              'advanced_installment',
                                              'transfer_status',
                                              'transfer_amount',
                                              'auto_transfer',
                                              'outside_system_transfer',
                                              'bank_account',
                                              'bank_account_type',
                                              'bank_account_name',
                                              'bank_account_number',
                                              'cheque_number',
                                              'cheque_date',
                                              'cheque_bank',
                                              'transfer_round',
                                              'transfer_date',
                                              'reference_transfer_number',
                                              'transfer_approver'])
    
    # convert datetime
    import datetime
    for item in loan_transfer_detail:
        for key, value in item.items():
            if isinstance(value, datetime.datetime | datetime.date | datetime.time | datetime.timedelta):
                item[key] = str(value)

    # include cheque
    for item in loan_transfer_detail:
        if item['transfer_type'] == 'Cheque':
            new_cheque_list = []
            cheque_list = frappe.get_all('Loan Cashier Cheque',fields=['idx','cheque_number','cheque_date','cheque_bank','amount'],filters={'parent':item['name']})
            for cheque in cheque_list:
                new_cheque_list.append({
                    'idx':cheque['idx'],
                    'cheque_number': cheque['cheque_number'],
                    'cheque_date': str(cheque['cheque_date']),
                    'cheque_bank': cheque['cheque_bank'],
                    'amount': cheque['amount'],
                })
            item['loan_cashier_cheque_lines'] = new_cheque_list

    #endregion coding

    #region result
    return loan_transfer_detail
    #endregion result

@frappe.whitelist()
def k2_loan_application_before_submit(**kwargs):
    parameters = {
        'doctype': None,
        'doc_name': None,
        'action': None
    }
    parameters.update(kwargs)
    doctype = parameters.get('doctype')
    doc_name = parameters.get('doc_name')
    action = parameters.get('action')

    loan_app_doc = frappe.get_doc(doctype,doc_name)
    if loan_app_doc.status == '20100' and action == 'Resubmit':
        if not loan_app_doc.is_confirm:
            loan_app_doc.confirm_loan_application()

    # call SWP API create contract before submit workflow case Direct-Keyin
    if loan_app_doc.status == '20100' and action == 'Start Workflow' and loan_app_doc.application_source == 'Direct Key-in' and loan_app_doc.rekey_from_cancelled_old_agreement:
        response = swp_interface_contract(loan_application_id=loan_app_doc.name)
        from smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings import get_k2_workflow_reason
        from smart_connect.k2.doctype.action_history.action_history import create_action_history
        bootinfo = frappe.sessions.get()
        if 'statusCode' not in response or 'message' not in response or response['statusCode'] != 200: 
            reason = get_k2_workflow_reason(doctype=loan_app_doc.doctype,name=loan_app_doc.name,action='Failed')['reason']
            create_action_history(**{
                'doctype': loan_app_doc.doctype,
                'action': 'Failed',
                'doctype_name': loan_app_doc.name,
                'reason': reason['name'],
                'remark': response['message'],
                'is_active': 1,
                'is_update_status': 0,
                'user_name': bootinfo.employee_name
            })
            if 'message' in response:
                frappe.throw(response['message'])
            else:
                frappe.throw(_('Request Timed Out'))
        else:
            reason = get_k2_workflow_reason(doctype=loan_app_doc.doctype,name=loan_app_doc.name,action='Direct Keyin Rekey')['reason']
            create_action_history(**{
                'doctype': loan_app_doc.doctype,
                'action': 'Direct Keyin Rekey',
                'doctype_name': loan_app_doc.name,
                'reason': reason['name'],
                'remark': response['message'],
                'is_active': 1,
                'is_update_status': 1,
                'user_name': bootinfo.employee_name
            })
                    
            _update_transfer_approver(loan_app_doc.name)

    # call SWP API create contract before doc ver approve action workflow
    if loan_app_doc.status == '50100' and action == 'Approve':
        attachment_list = frappe.get_all('Attachment',fields=['is_verified'],filters=[['reference_document','=',doc_name],['is_group','=',0]])
        if len(attachment_list) > 0:
            if any(not item.is_verified for item in attachment_list):
                frappe.throw(_('Every attached files must be verified.'))
        else:
            frappe.throw(_('No attachments were found for this application. Please check the document by clicking the Attachment button.'))

        response = swp_interface_contract(loan_application_id=loan_app_doc.name)

        if 'statusCode' not in response or 'message' not in response or response['statusCode'] != 200: 
            from smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings import get_k2_workflow_reason
            from smart_connect.k2.doctype.action_history.action_history import create_action_history
            reason = get_k2_workflow_reason(doctype=loan_app_doc.doctype,name=loan_app_doc.name,action='Failed')['reason']
            bootinfo = frappe.sessions.get()
            create_action_history(**{
                'doctype': loan_app_doc.doctype,
                'action': 'Failed',
                'doctype_name': loan_app_doc.name,
                'reason': reason['name'],
                'remark': response['message'],
                'is_active': 1,
                'is_update_status': 1,
                'user_name': bootinfo.employee_name
            })
            if 'message' in response:
                frappe.throw(response['message'])
            else:
                frappe.throw(_('Request Timed Out'))
        else:
            _update_transfer_approver(loan_app_doc.name)

    # call SWP API transfer before transfer approve action workflow
    if loan_app_doc.status == '60100' and action == 'Approve':
        response = swp_interface_transfer(loan_application_id=loan_app_doc.name)

        if 'statusCode' not in response or 'message' not in response or response['statusCode'] != 200: 
            from smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings import get_k2_workflow_reason
            from smart_connect.k2.doctype.action_history.action_history import create_action_history
            reason = get_k2_workflow_reason(doctype=loan_app_doc.doctype,name=loan_app_doc.name,action='Failed')['reason']
            bootinfo = frappe.sessions.get()
            create_action_history(**{
                'doctype': loan_app_doc.doctype,
                'action': 'Failed',
                'doctype_name': loan_app_doc.name,
                'reason': reason['name'],
                'remark': response['message'],
                'is_active': 1,
                'is_update_status': 1,
                'user_name': bootinfo.employee_name
            })
            if 'message' in response:
                frappe.throw(response['message'])
            else:
                frappe.throw(_('Request Timed Out'))
        else:
            _update_transfer_approver(loan_app_doc.name,True)

            if response['data']:
                update_transfer_information(update_transfer_list=response['data'])

def _update_transfer_approver(loan_application_id,is_transfer_approved = False):
    transfer_list = frappe.get_all('Loan Transfer Detail',fields=['name','creation','auto_transfer','transfer_round','transfer_type'],filters=[['ref_loan_application','=',loan_application_id]])
    max_transfer_round = 1
    is_update = False

    if len(transfer_list) > 0:
        max_transfer_round = max(
            (item.get('transfer_round') for item in transfer_list),
            default=1
        )
    
    transfer_max_round_list = []
    for item in transfer_list:
        if item['transfer_round'] == max_transfer_round:
            transfer_max_round_list.append(item)

    if is_transfer_approved:
        is_update = True
    else:
        transfer_no_top_up_list = []
        for item in transfer_max_round_list:
            if item['transfer_type'] != 'Top-up' and item['transfer_type'] != 'No Transfer':
                transfer_no_top_up_list.append(item)

        if len(transfer_no_top_up_list) > 0:
            if any(item.auto_transfer == True for item in transfer_no_top_up_list):
                is_update = True
        else:
            if any(item['transfer_type'] == 'Top-up' or item['transfer_type'] == 'No Transfer' for item in transfer_max_round_list):
                is_update = True
    
    if is_update:
        for transfer_item in transfer_max_round_list:
            transfer_doc = frappe.get_doc('Loan Transfer Detail',transfer_item['name'])
            bootinfo = frappe.sessions.get()
            transfer_doc.transfer_approver = frappe.db.get_value('Employee',{'employee_name':bootinfo.employee_name},"name")
            transfer_doc.save(ignore_permissions=True)

@frappe.whitelist()
def swp_interface_contract(**kwargs):
    parameters = {
        'loan_application_id': None,
    }
    parameters.update(kwargs)
    loan_application_id = parameters.get('loan_application_id')
    loan_app_information = get_loan_application_information(loan_application_id=loan_application_id)

    from z_loan.api_gateway import swp_interface_contract
    try:
        response = swp_interface_contract(
            data = loan_app_information
        )
    except Exception as e:
        frappe.clear_last_message()
        response = {
            'statusCode': 500, 
            'message': _(str(e))
        }

    return response

@frappe.whitelist()
def swp_interface_transfer(**kwargs):
    parameters = {
        'loan_application_id': None,
    }
    parameters.update(kwargs)
    loan_application_id = parameters.get('loan_application_id')
    loan_app_doc = frappe.get_doc('Loan Application',loan_application_id)
    loan_transfer_detail = get_transfer_information(loan_application_id=loan_app_doc.name)

    from z_loan.api_gateway import swp_interface_transfer
    try:
        response = swp_interface_transfer(
            application_id = loan_app_doc.application_number,
            loan_transfer_detail = loan_transfer_detail
        )
    except Exception as e:
        frappe.clear_last_message()
        response = {
            'statusCode': 500, 
            'message': _(str(e))
        }
    return response

@frappe.whitelist(methods=['POST'])
def swp_register_loan(**kwargs):
    from z_loan.loan.methods import swp_register_loan
    frappe.response.data = swp_register_loan(**kwargs)

@frappe.whitelist()
def validate_sales_kit_document_checklist(**kwargs):
    #region parameters
    parameters = {
        'doctype': None,
        'doc_name': None,
        'action': None
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    from z_loan.loan.methods import validate_document_checklist
    doctype = parameters.get('doctype')
    doc_name = parameters.get('doc_name')
    action = parameters.get('action')
    if action == 'Start Workflow':
        validate_document_checklist(document_id = doc_name)
    #endregion coding

@frappe.whitelist()
def get_result_pea(**kwargs):
    #region parameters
    parameters = {
        'reference_no' : None,
        'customer_idcard' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    from z_loan.api_gateway import swp_get_result_pea
    employee_id = frappe.get_value('Employee', {'email':frappe.session.user},'name')
    data = swp_get_result_pea(
        reference_no = parameters['reference_no'],
        customer_idcard = parameters['customer_idcard'],
        user = employee_id,
    )
    #endregion coding

    #region result
    return data
    #endregion result

def create_other_deduction(loan_application_id):
    from z_loan.api_gateway import swp_get_collateral
    loan_app_doc = frappe.get_doc('Loan Application',loan_application_id)
    loan_reference_agreement_number = ''
    try:
        result = swp_get_collateral(search_collateral_id=loan_app_doc.col_collatteral_id, loan_reference_agreement_number=loan_app_doc.loan_reference_agreement_number)
        result = result['data']
        for item in result['agreement']:
            if flt(item.get('outstanding_amount',0.00)) != 0:
                loan_app_doc.loan_reference_agreement_number = item.get('agreement_id','')
                loan_app_doc.loan_reference_agreement_company = item.get('company',None)
                loan_app_doc.loan_reference_agreement_requested_amount = item.get('requested_amount',0.00)
                loan_app_doc.save(ignore_permissions=True)
                loan_reference_agreement_number = loan_app_doc.loan_reference_agreement_number
        
        if loan_reference_agreement_number == '':
            loan_app_doc.loan_reference_agreement_number = ''
            loan_app_doc.loan_reference_agreement_company = ''
            loan_app_doc.loan_reference_agreement_requested_amount = 0.00
            loan_app_doc.save(ignore_permissions=True)

        result['loan_reference_agreement_number'] = loan_reference_agreement_number
    except Exception as e:
        result = {'table_others_deduction':[],'table_outstanding_balance':[],'loan_reference_agreement_number':''}
    return result

@frappe.whitelist()
def swp_notify_loan_application(**kwargs):
    parameters = {
        'loan_application_id': None,
    }
    parameters.update(kwargs)
    loan_application_id = parameters.get('loan_application_id')
    loan_app_information = get_loan_application_information(loan_application_id=loan_application_id)

    from z_loan.api_gateway import swp_notify_loan_application
    try:
        response = swp_notify_loan_application(
            data = loan_app_information
        )
    except Exception as e:
        frappe.clear_last_message()
        response = {
            'statusCode': 500, 
            'message': _(str(e))
        }

    return response

@frappe.whitelist()
def get_transfer_type_and_payment(**kwargs):
    from z_loan.loan.methods import get_transfer_type_and_payment_method
    return get_transfer_type_and_payment_method(**kwargs)

@frappe.whitelist()
def get_bank_information(**kwargs):
    from z_loan.loan.methods import get_bank_information_by_transfer_type
    return get_bank_information_by_transfer_type(**kwargs)
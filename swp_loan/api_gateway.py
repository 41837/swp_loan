import frappe
from frappe import _
from z_loan.loan.methods import integration_service
from z_loan.loan.methods import validate_loan_field_customer,validate_loan_field_collateral,validate_fields_type

def swp_check_ncrs(**kwargs):
    #region parameters
    parameters = {
        'idtype': None,
        'idnumber': None,
        'firstname': None,
        'familyname': None,
        'dateofbirth': None,
        'enqpurpose': '01',
        'enqamount': None,
        'consent': None,
        'businesstype_code': "06",
        'income_amount': None,
        'working_year': None,
        'working_month': None,
        'request_no': '001',
        'ltv_percent': None,
        'age': None,
        'user': None,
        'system': 'los',
        'additional': {}
    }
    parameters.update(kwargs)
    #endregion parameters
    
    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.ncb_endpoint_url,'body':parameters}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result

def swp_check_dopa(**kwargs):
    #region parameters
    parameters = {
        'citizenId' : None,
        'firstname' : None,
        'lastname' : None,
        'laser' : None,
        'dob' : None,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.dopa_endpoint_url,'body':parameters}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    return result
    #endregion result

def swp_check_rate_ltv(**kwargs):
    #region parameters
    parameters = {
        'col_land_title_deed_number' : '',
        'col_land_province' : '',
        'col_land_district' : '',
        'col_land_rai' : '',
        'col_land_ngan' : '',
        'col_land_square_wah' : '',
        'col_land_sheet' : '',
        'col_land_parcel_number' : '',
        'col_dealing_file_number' : '',
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    col_land_title_deed_number = parameters['col_land_title_deed_number']
    col_province = parameters['col_province']
    col_district = parameters['col_district']
    col_land_rai = parameters['col_land_rai']
    col_land_ngan = parameters['col_land_ngan']
    col_land_square_wah = parameters['col_land_square_wah']
    col_land_sheet = parameters['col_land_sheet']
    col_land_parcel_number = parameters['col_land_parcel_number']
    col_dealing_file_number = parameters['col_dealing_file_number']

    setup_integration = frappe.get_single('Integration Settings')
    body = {
        'CHANOD_NO': col_land_title_deed_number,
        'CHANGWAT_NAME': col_province,
        'AMPHUR_NAME': col_district,
        'LAND_AREA_RAI': col_land_rai,
        'LAND_AREA_NGAN': col_land_ngan,
        'LAND_AREA_WA': '1',
        'UTMMAP': col_land_sheet,
        'LAND_NO': col_land_parcel_number,
        'SURVEY_NO': col_dealing_file_number
    }
   
    input_parameters = {'method':'POST','end_point_url':setup_integration.lap_endpoint_url,'body':body}
    data = integration_service(**input_parameters)['result']

    if isinstance(data.get('data'),list):
        frappe.throw(_('Didn\'t find rate LTV, Please contact admin.'))
    #endregion coding

    #region result
    return data
    #endregion result

def swp_get_customer(**kwargs):
    #region parameters
    parameters = {
        'search_id' : '',
        'first_name' : '',
        'last_name' : '',
        'is_guarantor' : 1,
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    is_guarantor = parameters.get('is_guarantor')
    from z_loan.loan.methods import create_integration_error_log
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.his_endpoint_url,'body':parameters}

    result = integration_service(**input_parameters)['result']

    data = {}
    if 'data' in result: 
        data = result['data']
    if data:
        from frappe.utils.data import sbool
        if 'cus_is_customer_blocked' in data and sbool(data.get('cus_is_customer_blocked')) == True:
            result['statusCode'] = '200'
        else:
            required_fields_loan = ['cus_customer_type','cus_identification_type','cus_identification_number','cus_is_customer_blocked','cus_addresses_detail']
            ignore_validate_field = ['cus_race','cus_marital_status','cus_gender','cus_organization_type','cus_organization_name']
            missing_field_list = validate_loan_field_customer(data,required_fields_loan,ignore_validate_field)
            error_type_field_list = validate_fields_type('Loan Application',data)
            if len(missing_field_list) > 0:
                result['statusCode'] = '002'
                result['message'] = create_integration_error_log(
                    doctype='Loan Application',
                    input_parameters=input_parameters,
                    error_code='002',
                    data=missing_field_list
                )
            elif len(error_type_field_list) > 0:
                result['statusCode'] = '003'
                result['message'] = create_integration_error_log(
                    doctype='Loan Application',
                    input_parameters=input_parameters,
                    error_code='003',
                    data=error_type_field_list
                )
            else:
                result['statusCode'] = '200'
    else:
        result['statusCode'] = '001'
        if is_guarantor == "0":
            custom_message = _('Guarantor information not found')
        else:
            custom_message = _('Customer information not found')
        result['message'] = create_integration_error_log(
            doctype='Loan Application',
            input_parameters=input_parameters,
            error_code='001',
            custom_message=custom_message
        )
    #endregion coding

    #region result
    return result
    #endregion result

def swp_get_collateral(**kwargs):
    #region parameters
    parameters = {
        'search_collateral_id' : '',
        'loan_reference_agreement_number': ''
    }
    parameters.update(kwargs)
    #endregion parameters
    #region coding
    from z_loan.loan.methods import create_integration_error_log
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.col_endpoint_url,'body':parameters}
    result = integration_service(**input_parameters)['result']
    data = {}
    if 'data' in result: 
        data = result['data']
    if data:
        missing_field_list = []
        required_fields_collateral = ['col_is_collateral_blocked']
        ignore_validate_field = ['col_mortgage_limit','col_date_of_license_expiry','col_date_of_tax_expiry','col_car_mileage']
        missing_field_list = validate_loan_field_collateral(data,required_fields_collateral,ignore_validate_field)
        error_type_field_list = validate_fields_type('Loan Application',data)

        if len(missing_field_list) > 0:
            result['statusCode'] = '002'
            result['message'] = create_integration_error_log(
                doctype='Loan Application',
                input_parameters=input_parameters,
                error_code='002',
                data=missing_field_list
            )
        elif len(error_type_field_list) > 0:
            result['statusCode'] = '003'
            result['message'] = create_integration_error_log(
                doctype='Loan Application',
                input_parameters=input_parameters,
                error_code='003',
                data=error_type_field_list
            )
        else:
            result['statusCode'] = '200'
    else:
        result['statusCode'] = '001'
        result['message'] = create_integration_error_log(
            doctype='Loan Application',
            input_parameters=input_parameters,
            error_code='001',
            custom_message=_('Collateral information not found')
        )

    #endregion coding

    #region result
    return result
    #endregion result

def swp_interface_contract(**kwargs):
    #region parameters
    parameters = {
        'data': None,
    }
    parameters.update(kwargs)
    #endregion parameters
    
    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.interface_contract_endpoint_url,'body':parameters}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result

def swp_interface_transfer(**kwargs):
    #region parameters
    parameters = {
        'application_id': None,
        'loan_transfer_detail':[]
    }
    parameters.update(kwargs)
    #endregion parameters
    
    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.interface_transfer_endpoint_url,'body':parameters}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result

def swp_insurance_registration_form(**kwargs):
    #region parameters
    parameters = {
        'answer1' : "",
        'answer2' : "",
        'answer3' : "",
        'answer4' : "",
        'answer5' : "",
        'answer6' : "",
        'answer7' : "",
        'branch' : None,
        'user' : None,
        'ref_loan_application' : None,
        'insurance' : None,
        'cus_salutation' : None,
        'cus_first_name' : None,
        'cus_last_name' : None,
        'cus_identification_number' : None,
        'mobile_number' : None,
        'address' : None,
        'province' : None,
        'district' : None,
        'subdistrict' : None,
        'post_code' : None,
        'amount' : None,
        'requested_amount' : None,
        'cus_age' : None,
        'cus_date_of_birth' : None,
        'cus_gender' : None,
        'cus_identification_type' : None,
        'weight': "0",
        'height': "0"
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    import random,string
    random_characters = ''.join(random.choices(string.ascii_letters, k=10))
    salutation_desc = frappe.db.get_value('Salutation', parameters.get('cus_salutation'), 'salutation')
    insurance_questionnaire = {
        'answer1': parameters.get('answer1') or "",
        'answer2': parameters.get('answer2') or "",
        'answer3': parameters.get('answer3') or "",
        'answer4': parameters.get('answer4') or "",
        'answer5': parameters.get('answer5') or "",
        'answer6_1': parameters.get('answer6') or "",
        'answer7': parameters.get('answer7') or "",
        'weight':  parameters.get('weight') or "0",
        'height':  parameters.get('height') or "0",
        'plan_code': "200",
        'insid': '8',
        'UserLocate': parameters.get('branch'),
        'UserID': parameters.get('user'),
        'loan_ref_no': random_characters,
        'type': parameters.get('insurance'),
        'CusPrefix':  salutation_desc, 
        'CusFname': parameters.get('cus_first_name'),
        'CusLname': parameters.get('cus_last_name'),
        'CusId': parameters.get('cus_identification_number'),
        'CusTelNumber': parameters.get('mobile_number'),
        'Addrs1': parameters.get('address'),
        'ProvinceCode': parameters.get('province'),
        'DistrictCode': parameters.get('district'),
        'SubDistrictCode': parameters.get('subdistrict'),
        'CusPostCode': parameters.get('post_code'),
        'conInsureAmt': str(parameters.get('amount')),
        'conPrinciple': str(parameters.get('requested_amount')),
        'age': str(parameters.get('cus_age')),
        'dob': parameters.get('cus_date_of_birth'),
        'gender': parameters.get('cus_gender'),
        'CardType': parameters.get('cus_identification_type'),
        'contno': ""
    }
    setup_integration = frappe.get_single('Integration Settings')
    end_point_url = setup_integration.ins_endpoint_url
    input_parameters = {'method':'POST', 'end_point_url':end_point_url, 'body':insurance_questionnaire}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result

def swp_get_result_pea(**kwargs):
    #region parameters
    parameters = {
        'reference_no' : None,
        'customer_idcard' : None,
        'user' : None,
        'system' : 'los',
    }
    parameters.update(kwargs)
    #endregion parameters

    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    end_point_url = setup_integration.pea_get_result_endpoint_url
    params = []
    if end_point_url:
        for key in parameters:
            params.append(key + '=' + parameters[key])
        if params:
            end_point_url += '?' + '&'.join(params)
    input_parameters = {'method':'GET','end_point_url':end_point_url}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result

def swp_notify_loan_application(**kwargs):
    #region parameters
    parameters = {
        'data': None,
    }
    parameters.update(kwargs)
    #endregion parameters
    
    #region coding
    setup_integration = frappe.get_single('Integration Settings')
    input_parameters = {'method':'POST','end_point_url':setup_integration.notify_loan_application_endpoint_url,'body':parameters}
    data = integration_service(**input_parameters)['result']
    #endregion coding

    #region result
    return data
    #endregion result
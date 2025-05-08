function initialize_loan_condition_header(frm) {

    frm.fields_dict.lease_type.$wrapper.find('.control-label').html('ประเภทการให้สินเชื่อ <span class="text-danger">*</span>'); 
    frm.fields_dict.application_type.$wrapper.find('.control-label').html('ประเภทใบคำขอ <span class="text-danger">*</span>');
    frm.fields_dict.source_of_customer.$wrapper.find('.control-label').html('ที่มาของลูกค้า <span class="text-danger">*</span>');
    frm.fields_dict.registration_year.$wrapper.find('.control-label').html('ปีที่จดทะเบียน <span class="text-danger">*</span>');
    frm.fields_dict.requested_amount.$wrapper.find('.control-label').html('ยอดจัดตั้งต้น <span class="text-danger">*</span>');
    frm.fields_dict.ownership.$wrapper.find('.control-label').html('กรรมสิทธิ์ <span class="text-danger">*</span>');
    frm.fields_dict.installment_type.$wrapper.find('.control-label').html('ประเภทค่างวด <span class="text-danger">*</span>');
    frm.fields_dict.campaign_code.$wrapper.find('.control-label').html('แคมเปญ <span class="text-danger">*</span>');
    frm.fields_dict.payment_frequency.$wrapper.find('.control-label').html('ระยะห่างผ่อนเดือนต่องวด <span class="text-danger">*</span>');
    frm.fields_dict.due_day.$wrapper.find('.control-label').html('ชำระทุกวันที่ <span class="text-danger">*</span>');
    frm.fields_dict.term.$wrapper.find('.control-label').html('จำนวนงวดทั้งสัญญา <span class="text-danger">*</span>');
    frm.fields_dict.agreement_date.$wrapper.find('.control-label').html('วันที่ทำสัญญา <span class="text-danger">*</span>');
    frm.fields_dict.first_due_date.$wrapper.find('.control-label').html('วันเริ่มสัญญา (งวดแรก) <span class="text-danger">*</span>');
    frm.fields_dict.last_due_date.$wrapper.find('.control-label').html('วันสิ้นสุดสัญญา (งวดสุดท้าย) <span class="text-danger">*</span>');
    frm.fields_dict.bank_account.$wrapper.find('.control-label').html('บัญชีธนาคารผู้กู้ <span class="text-danger">*</span>');
    frm.fields_dict.bank_account_type.$wrapper.find('.control-label').html('ประเภทบัญชี <span class="text-danger">*</span>');
    frm.fields_dict.bank_account_number.$wrapper.find('.control-label').html('เลขที่บัญชี <span class="text-danger">*</span>');
    frm.fields_dict.bank_account_name.$wrapper.find('.control-label').html('ชื่อบัญชีธนาคารผู้กู้ <span class="text-danger">*</span>');      

    let html_header_loan_condition = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">รายละเอียดสินเชื่อ</div>
        <button id="toggle-loan_condition-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;

    frm.fields_dict.header_loan_condition.$wrapper.html(html_header_loan_condition);

    let isCollapsed_header_loan_condition = false;

    $("#toggle-loan_condition-btn").on("click", function () {
        isCollapsed_header_loan_condition = !isCollapsed_header_loan_condition;

        if (isCollapsed_header_loan_condition) {
            frm.fields_dict.section_loan_condition.wrapper.hide();
            frm.fields_dict.section_loan_condition2.wrapper.hide();
            frm.fields_dict.section_loan_condition3.wrapper.hide();
            frm.fields_dict.section_loan_condition4.wrapper.hide();
            frm.fields_dict.section_loan_condition5.wrapper.hide();
            frm.fields_dict.section_loan_condition6.wrapper.hide();
            frm.fields_dict.section_loan_condition7.wrapper.hide();
            frm.fields_dict.section_loan_condition8.wrapper.hide();
            frm.fields_dict.section_loan_condition9.wrapper.hide();
            frm.fields_dict.section_loan_condition10.wrapper.hide();
            frm.fields_dict.section_loan_condition11.wrapper.hide();
            frm.fields_dict.section_loan_condition12.wrapper.hide();
            frm.fields_dict.section_loan_condition13.wrapper.hide();
            frm.fields_dict.section_loan_condition14.wrapper.hide();
            frm.fields_dict.section_loan_condition15.wrapper.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
            frm.fields_dict.section_loan_condition.wrapper.show();
            frm.fields_dict.section_loan_condition2.wrapper.show();
            frm.fields_dict.section_loan_condition3.wrapper.show();
            frm.fields_dict.section_loan_condition4.wrapper.show();
            frm.fields_dict.section_loan_condition5.wrapper.show();
            frm.fields_dict.section_loan_condition6.wrapper.show();
            frm.fields_dict.section_loan_condition7.wrapper.show();
            frm.fields_dict.section_loan_condition8.wrapper.show();
            frm.fields_dict.section_loan_condition9.wrapper.show();
            frm.fields_dict.section_loan_condition10.wrapper.show();
            frm.fields_dict.section_loan_condition11.wrapper.show();
            frm.fields_dict.section_loan_condition12.wrapper.show();
            frm.fields_dict.section_loan_condition13.wrapper.show();
            frm.fields_dict.section_loan_condition14.wrapper.show();
            frm.fields_dict.section_loan_condition15.wrapper.show();
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }
    });
}

function fn_btn_save_loan_condition(frm){
    frm.fields_dict.btn_save_loan_condition.$wrapper
        .css({
            "text-align": "right",
        })
        .find("button")
        .removeClass("btn-xs btn-default")
        .addClass("btn-md btn-primary")
        .css({
            "font-size": "16px",
            "padding": "8px 16px",
            'background-color': '#4a7ef6',
            'color': 'white',
            'border': 'none',
        })
        .on('click', function() {
        const resValidate = ValidateFromCondition(frm);
        if (resValidate) {
                frm.save()
            }
        });
}

function ValidateFromCondition(frm) {

    let errors = [];
    let lease_type = frm.fields_dict.lease_type.$input.val();
    let application_type = frm.fields_dict.application_type.$input.val();
    let source_of_customer = frm.fields_dict.source_of_customer.$input.val();
    let registration_year = frm.fields_dict.registration_year.$input.val();
    let requested_amount = frm.fields_dict.requested_amount.$input.val();
    let ownership = frm.fields_dict.ownership.$input.val();
    let installment_type = frm.fields_dict.installment_type.$input.val();
    let campaign_code = frm.fields_dict.campaign_code.$input.val();
    let payment_frequency = frm.fields_dict.payment_frequency.$input.val();
    let due_day = frm.fields_dict.due_day.$input.val();
    let term = frm.fields_dict.term.$input.val();
    let agreement_date = frm.fields_dict.agreement_date.$input.val();
    let first_due_date = frm.fields_dict.first_due_date.$input.val();
    let last_due_date = frm.fields_dict.last_due_date.$input.val();
    let bank_account = frm.fields_dict.bank_account.$input.val();
    let bank_account_type = frm.fields_dict.bank_account_type.$input.val();
    let bank_account_number = frm.fields_dict.bank_account_number.$input.val();
    let bank_account_name = frm.fields_dict.bank_account_name.$input.val();

    if (!lease_type) errors.push('- ประเภทการให้สินเชื่อ');
    if (!application_type) errors.push('- ประเภทใบคำขอ');
    if (!source_of_customer) errors.push('- ที่มาของลูกค้า');
    if (!registration_year) errors.push('- ปีที่จดทะเบียน');
    if (!requested_amount) errors.push('- ยอดจัดตั้งต้น');
    if (!ownership) errors.push('- กรรมสิทธิ์');
    if (!installment_type) errors.push('- ประเภทค่างวด');
    if (!campaign_code) errors.push('- แคมเปญ');
    if (!payment_frequency) errors.push('- ระยะห่างผ่อนเดือนต่องวด');
    if (!due_day) errors.push('- ชำระทุกวันที่');
    if (!term) errors.push('- จำนวนงวดทั้งสัญญา');
    if (!agreement_date) errors.push('- วันที่ทำสัญญา');
    if (!first_due_date) errors.push('- วันเริ่มสัญญา (งวดแรก)');
    if (!last_due_date) errors.push('- วันสิ้นสุดสัญญา (งวดสุดท้าย)');
    if (!bank_account) errors.push('- บัญชีธนาคารผู้กู้');
    if (!bank_account_type) errors.push('- ประเภทบัญชี');
    if (!bank_account_number) errors.push('- เลขที่บัญชี');
    if (!bank_account_name) errors.push('- ชื่อบัญชีธนาคารผู้กู้');

    if (errors.length > 0) {
        errors.unshift('กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง <br/>');
        frappe.throw(errors.join('<br/>'));
    }

    return true;
}


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



//ดึงมาครับ


function sum_total_by_loan_fees_lines(frm) {
    let sum_net_selected = 0.00;
    let sum_discount_selected = 0.00;
    let sum_charged_selected = 0.00;
    frm.doc.loan_fees_lines.forEach(function (item) {
        if (item.selected) {
            sum_net_selected += parseFloat(item.net);
            sum_discount_selected += parseFloat(item.discount);
            sum_charged_selected += parseFloat(item.charged);
        }
    });
    frm.set_value({
        "total_fees_net": sum_net_selected,
        "virtual_total_fees_net": sum_net_selected,
        "total_fees_discount": sum_discount_selected,
        "total_fees_charged": sum_charged_selected,
    });
    calc_total_debtor(frm);
}
function sum_total_by_loan_insurance_lines(frm) {
    let sum_amount_selected = 0.00;
    frm.doc.loan_insurance_lines.forEach(function (item) {
        if (item.selected) {
            sum_amount_selected += parseFloat(item.amount);
        }
    });
    frm.set_value({
        "total_insurance_net": sum_amount_selected,
        "virtual_total_insurance_net": sum_amount_selected,
    });
    calc_total_debtor(frm);
}
function sum_total_deduction(frm) {
    let sum_net = 0.00;
    if (frm.doc.table_others_deduction) {
        frm.doc.table_others_deduction.forEach(function (item) {
            sum_net += item.net;
        });
    }
    frm.set_value("total_deduction", sum_net).then(()=> {
        calc_remaining_transfer_amount(frm);
    });
}
function calc_total_periods_month(frm) {
    if (frm.doc.term) {
        frappe.db.get_doc("Term", frm.doc.term).then((doc) => {
            frm.set_value("total_periods_month", parseInt(frm.doc.payment_frequency) * doc.number_of_period);
        });
    }
    else {
        frm.set_value("total_periods_month", 0);
    }
}
function calc_total_debtor(frm) {
    frm.set_value("total_debtor",
        parseFloat(frm.doc.requested_amount) +
        parseFloat(frm.doc.total_fees_net) +
        parseFloat(frm.doc.total_insurance_net) +
        parseFloat(frm.doc.yield_amount) +
        parseFloat(frm.doc.tax_amount));
}
function set_registration_year_options(frm) {
    currentYear = new Date().getFullYear();
    const model_year_list = [];
    for (let year = currentYear; currentYear - 20 < year; year--) {
        model_year_list.push(year + 543);
    }
    frm.set_df_property("registration_year", "options", model_year_list);
}
async function set_due_day_options(frm) {
    let filtered = [];
    if (!frm.loan_application_settings) {
        await frappe.db.get_doc("Loan Application Settings").then((doc) => {
            frm.loan_application_settings = doc;
        });
    }
    let due_day_list = frm.loan_application_settings.due_day.split(",").map(item => item.trim());
    if (frm.doc.agreement_date && frm.doc.due_day && frm.doc.payment_frequency && frm.doc.term) {
        let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
        if (campaign_interest_rate.is_installment_period == 1) {
            let due_day = new Date(frm.doc.agreement_date).getDate()
            frm.set_df_property("due_day", "options", [due_day]);
            if (frm.doc.due_day != due_day) {
                frm.doc.due_day = due_day;
                frm.refresh_field("due_day");
            }
        }
        else if (frm.doc.payment_frequency == "1") {
            let termDoc = await frappe.db.get_doc("Term", frm.doc.term);
            let promises = due_day_list.map(day => {
                return new Promise(resolve => {
                    frappe.call({
                        args: {
                            contract_date: frm.doc.agreement_date,
                            pay_date: day,
                            payment_frequency: frm.doc.payment_frequency,
                            number_of_period: termDoc.number_of_period
                        },
                        method: "z_loan.api.calculate_first_due_date",
                        callback: function (response) {
                            let result = response.message;
                            let days_diff = frappe.datetime.get_day_diff(result.first_due_date, frm.doc.agreement_date);
                            if (days_diff <= frm.loan_application_settings.maximum_agreement_start_date && days_diff >= 0) {
                                filtered.push(day);
                            }
                            resolve();
                        }
                    });
                });
            });
            await Promise.all(promises);
            frm.set_df_property("due_day", "options", filtered);
        } else {
            frm.set_df_property("due_day", "options", due_day_list);
        }
    } else {
        frm.set_df_property("due_day", "options", due_day_list);
    }
}

function set_payment_frequency_options(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    if (campaign_interest_rate) {
        if (campaign_interest_rate.payment_frequency) {
            let payment_frequency_list = campaign_interest_rate.payment_frequency.split(",").map(Number);
            frm.set_df_property("payment_frequency", "options", payment_frequency_list);
            if (payment_frequency_list.length > 0 && !payment_frequency_list.includes(parseInt(frm.doc.payment_frequency))) {
                frm.doc.payment_frequency = null;
                frm.payment_frequency_prev_value = null;
                frm.refresh_field("payment_frequency");
            }
        }
        else {
            frm.set_df_property("payment_frequency", "options", [1]);
            frm.doc.payment_frequency = 1;
            frm.payment_frequency_prev_value = 1;
        }
    }
}

function display_fields_by_campaign(frm) {
    let target_sections = [
        "payment_schedule_section",
        "fees_section",
        "insurance_section"
    ];
    if (frm.doc.campaign_interest_rate == "") {
        display_fields_in_section(frm, target_sections, false);
    }
    else {
        display_fields_in_section(frm, target_sections, true);
    }
    disable_button_and_hide_row_check_in_table(frm, [
        "loan_fees_lines",
        "loan_insurance_lines",
        "table_others_deduction",
        "table_payment_schedule",
        "table_outstanding_balance",
    ]);
}

function display_fields_in_section(frm, target_sections, show, ignore_fields = []) {
    target_sections.forEach(section_name => {
        if (frm.fields_dict[section_name]) {
            frm.fields_dict[section_name]["fields_list"].forEach(function (item) {
                if (!ignore_fields.includes(item.df.fieldname)) {
                    frm.toggle_display(item.df.fieldname, show);
                }
            });
        }
    });
}

function disable_button_and_hide_row_check_in_table(frm, table_fields = []) {
    table_fields.forEach(fieldname => {
        frm.set_df_property(fieldname, "cannot_add_rows", true);
        frm.set_df_property(fieldname, "cannot_delete_rows", true);
        frm.fields_dict[fieldname].$wrapper.find(".row-check").remove();
        frm.fields_dict[fieldname].$wrapper.find(".row-index").remove();
        if (fieldname == "table_others_deduction") {
            frm.fields_dict[fieldname].$wrapper.find("[data-fieldname='remark_code']").remove();
        }
        else {
            frm.fields_dict[fieldname].$wrapper.find("[data-fieldname='payfor_code']").remove();
        }
    });

    setup_column_with("loan_fees_lines", "discount");
    setup_column_with("loan_fees_lines", "net");
    setup_column_with("loan_insurance_lines", "health_questionnaire");
    setup_column_with("table_payment_schedule", "yield");
    setup_column_with("table_others_deduction", "payfor_code");
    setup_column_with("table_outstanding_balance", "remark_code");
}

function setup_column_with(child_table, field_name) {
    let loan_fees_lines_jq = $(`[data-fieldname=${child_table}]`);
    loan_fees_lines_jq.find(`[data-fieldname=${field_name}]`).removeClass(function (index, className) {
        return (className.match(/(^|\s)col-xs-\S+/g) || []).join(" ");
    });
}

async function find_campaign(frm, campaign_interest_rate = null) {
    await frappe.call({
        args: {
            trans_date: frappe.datetime.now_date(),
            "loan_condition_doc": [frm.doc],
            "campaign_interest_rate": campaign_interest_rate,
        },
        method: "z_loan.api.find_campaign",
        freeze: true,
        freeze_message: __("Finding campaign..."),
        callback: function (response) {
            frm.campaign_result = response.message.campaign_result[0];
            let campaign_interest_rate_option = [];
            frm.campaign_result.campaign_interest_rate.forEach(campaign_interest_rate => {
                description = campaign_interest_rate.description;
                campaign_interest_rate_option.push({
                    "value": campaign_interest_rate.name,
                    "label": campaign_interest_rate.campaign_code + " (" + campaign_interest_rate.rate + "% " + description + ")"
                })
            });
            frm.set_df_property("campaign_interest_rate", "options", campaign_interest_rate_option);
        },
        error: function (response) {
            frm.set_value("ownership", null);
            frm.set_value("campaign_interest_rate", null);
            frm.set_value("installment_type", null);
            frm.toggle_enable("campaign_interest_rate", false);
            clear_value_calculate(frm);
        }
    })
}

function set_campaign_code_and_interest_rate(frm) {
    if (frm.doc.campaign_interest_rate != null) {
        let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
        frm.set_value("campaign_code", campaign_interest_rate.campaign_code);
        frm.set_value("interest_rate", campaign_interest_rate.rate);
    }
    else {
        frm.set_value("campaign_code", "");
        frm.set_value("interest_rate", "");
    }
}

function clear_value_calculate(frm) {
    frm.toggle_enable("campaign_interest_rate", false);
    frm.clear_table("loan_fees_lines");
    frm.clear_table("loan_insurance_lines");
    frm.clear_table("table_others_deduction");
    frm.clear_table("table_outstanding_balance");
    frm.clear_table("table_payment_schedule");
    frm.set_value({
        "fees_waive_amount": 0.00,
        "financing_amount_net": 0.00,
        "yield_percent": 0.00,
        "yield_amount": 0.00,
        "eir_percent": 0.00,
        "tax_amount": 0.00,
        "agreement_start_date": "",
        "agreement_end_date": "",
        "installment_amount": 0.00,
        "last_installment_amount": 0.00,
        "total_day": 0,
        "total_fees_charged": 0.00,
        "total_fees_discount": 0.00,
        "total_fees_net": 0.00,
        "total_fees_charged": 0.00,
        "total_fees_discount": 0.00,
        "total_insurance_net": 0.00,
        "total_debtor": 0.00,
        "total_deduction": 0.00,
        "virtual_total_insurance_net": 0.00,
        "virtual_total_fees_net": 0.00,
        "virtual_financing_amount_net": 0.00,
        "advanced_installment_amount": 0.00,
        "remaining_transfer_amount": 0.00,
        "ownership": null,
        "term": null,
    }).then(() => {
        frm.doc.installment_type = null;
        frm.refresh_field("installment_type");
        frm.refresh_field("loan_fees_lines");
        frm.refresh_field("loan_insurance_lines");
        frm.refresh_field("table_others_deduction");
        frm.refresh_field("table_outstanding_balance");
        frm.refresh_field("table_payment_schedule");
        disable_button_and_hide_row_check_in_table(frm, [
            "loan_fees_lines",
            "loan_insurance_lines",
            "table_others_deduction",
            "table_outstanding_balance",
            "table_payment_schedule",
        ]);
    });
}

async function set_ltv(frm) {
    let ltv_value = 0;
    let application_doc = null;
    if (frm.loan_application) {
        application_doc = frm.loan_application
    }
    else {
        await frappe.db.get_doc("Loan Application", frm.doc.internal_loan_application_id).then((doc) => {
            application_doc = doc;
        });
    }

    if (application_doc) {
        if (frm.doc.requested_amount != 0) {
            let value = 0;
            if (application_doc.col_appraisal_value > 0) {
                value = application_doc.col_appraisal_value
            }
            else if (application_doc.col_appraisal_value_by_crd > 0) {
                value = application_doc.col_appraisal_value_by_crd
            }
            else if (application_doc.col_appraisal_value_by_branch > 0) {
                value = application_doc.col_appraisal_value_by_branch
            }
            if (value > 0) {
                ltv_value = (parseFloat(frm.doc.requested_amount) / value) * 100;
            }
        }
    }
    frm.set_value("ltv", ltv_value);
    frm.refresh_field("ltv");
}
function validate_fetch_fees_insurance_payment(frm) {
    if (!frm.doc.installment_type) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("installment_type")._label]));
    }
    else if (!frm.doc.campaign_interest_rate) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("campaign_interest_rate")._label]));
    }
    else if (!frm.doc.term) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("term")._label]));
    }
}
async function fetch_fees_insurance_payment(frm) {
    validate_fetch_fees_insurance_payment(frm);
    await find_campaign(frm, frm.doc.campaign_interest_rate);
    filter_term(frm);
    filter_installment_type(frm);
    filter_ownership(frm);
    set_payment_frequency_options(frm);
    set_due_day_options(frm);
    let input_campaign_fees = [];
    let input_campaign_insurance = [];
    let is_fees_and_insurance_empty = frm.doc.loan_fees_lines.length == 0 && frm.doc.loan_insurance_lines.length == 0;
    let exception_list = frm.campaign_result.campaign_exception_rule.filter(t => t.campaign_code == frm.doc.campaign_code);
    let selected_fees_condition_detail = null
    let selected_insurance_condition_detail = null
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    let filter_campaign_fees = frm.campaign_result.campaign_fees.filter(t => t.company.includes(campaign_interest_rate.company) || t.company.length === 0);
    let filter_campaign_insurance = frm.campaign_result.campaign_insurance.filter(t => t.company.includes(campaign_interest_rate.company) || t.company.length === 0);

    filter_campaign_fees.forEach(campaign_fees => {
        if (campaign_fees.campaign_code == frm.doc.campaign_code) {
            let is_exceptional = exception_list.find(t => t.fees_setup == campaign_fees.fees_setup && t.insurance_setup != null);
            if (is_fees_and_insurance_empty && is_exceptional == undefined) {
                let fees = frm.add_child("loan_fees_lines");
                fees.selected = 1;
                fees.code = campaign_fees.fees_code;
                fees.fees_condition = campaign_fees.fees_condition;
                fees.fees_setup = campaign_fees.fees_setup;
                fees.description = campaign_fees.description;
                fees.charged = 0;
                fees.discount = 0;
                fees.net = 0;
            }
            let current_fees = frm.doc.loan_fees_lines?.find(t => t.code == campaign_fees.fees_code);
            input_campaign_fees.push({
                "selected": current_fees ? current_fees.selected : 0,
                "code": campaign_fees.fees_code,
                "fees_condition": campaign_fees.fees_condition,
                "description": campaign_fees.description,
                "charged": current_fees ? current_fees.charged : 0,
                "discount": current_fees ? current_fees.discount : 0,
                "net": current_fees ? current_fees.net : 0,
                "selected_condition_detail": current_fees ? current_fees.fees_condition_detail : selected_fees_condition_detail
            });
        }
    });
    filter_campaign_insurance.forEach(campaign_insurance => {
        if (campaign_insurance.campaign_code == frm.doc.campaign_code) {
            if (is_fees_and_insurance_empty) {
                let insurance = frm.add_child("loan_insurance_lines");
                insurance.selected = 1;
                insurance.code = campaign_insurance.insurance_code;
                insurance.insurance_condition = campaign_insurance.insurance_condition;
                insurance.insurance_setup = campaign_insurance.insurance_setup;
                insurance.description = campaign_insurance.description;
                insurance.amount = 0;
            }
            let current_insurance = frm.doc.loan_insurance_lines?.find(t => t.code == campaign_insurance.insurance_code);
            input_campaign_insurance.push({
                "selected": current_insurance ? current_insurance.selected : 0,
                "code": campaign_insurance.insurance_code,
                "insurance_condition": campaign_insurance.insurance_condition,
                "description": campaign_insurance.description,
                "amount": current_insurance ? current_insurance.amount : 0,
                "insurance_option": current_insurance ? current_insurance.insurance_option : null,
                "selected_condition_detail": current_insurance ? current_insurance.insurance_condition_detail : selected_insurance_condition_detail,
            });
        }
    });
    frm.refresh_field("loan_fees_lines");
    frm.refresh_field("loan_insurance_lines");
    await frappe.call({
        args: {
            requested_amount: frm.doc.requested_amount,
            campaign_code: frm.doc.campaign_code,
            interest_rate: frm.doc.interest_rate,
            pay_fee: frm.doc.calculation_type,
            term: frm.doc.term,
            campaign_fees: input_campaign_fees,
            campaign_insurance: input_campaign_insurance,
        },
        method: "z_loan.api.calculate_fees_and_insurance",
        freeze: true,
        freeze_message: __("Calculating fees and insurance..."),
        callback: function (response) {
            let campaign_fees_result = response["message"]["campaign_fees"];
            let campaign_insurance_result = response["message"]["campaign_insurance"];
            let financing_amount = response["message"]["financing_amount"];
            frm.campaign_fees_result = campaign_fees_result;
            frm.campaign_insurance_result = campaign_insurance_result;
            campaign_fees_result.forEach(result => {
                if (result.options.length > 0) {
                    let loan_fees_line = frm.doc.loan_fees_lines.filter(campaign_fees => campaign_fees.code == result.code)[0];
                    if (loan_fees_line) {
                        let row = frm.get_field("loan_fees_lines").grid.get_row(loan_fees_line.name);
                        let options = result.options.map(t => ({
                            value: t.amount,
                            condition: t.condition,
                        }));
                        set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "fees_option", "options", options);
                        row.doc.charged = result.charged;
                        if (result.options.length > 0 && loan_fees_line.fees_option != result.charged) {
                            row.doc.fees_option = result.charged;
                        }
                        let net = result.charged - row.doc.discount;
                        row.doc.net = net < 0.00 ? 0.00 : net;
                        row.doc.fees_condition_detail = result.selected_condition_detail;
                        if (exception_list.find(t => t.fees_setup == loan_fees_line.fees_setup && t.insurance_setup == null)) {
                            set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "selected", "read_only", 0);
                        }
                        else {
                            set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "selected", "read_only", 1);
                        }
                    }
                }
                else {
                    frm.doc.loan_fees_lines = frm.doc.loan_fees_lines.filter(campaign_fees => campaign_fees.code != result.code);
                }
            })
            campaign_insurance_result.forEach(async result => {
                if (result.options.length > 0) {
                    let loan_insurance_line = frm.doc.loan_insurance_lines.filter(campaign_insurance => campaign_insurance.code == result.code)[0];
                    if (loan_insurance_line) {
                        let row = frm.get_field("loan_insurance_lines").grid.get_row(loan_insurance_line.name);
                        let options = result.options.map(t => ({
                            value: flt(t.percent) == 0 ? t.amount : t.amount + ": " + t.percent + "%",
                            condition: t.condition,
                            name: t.condition_detail
                        }));
                        set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "insurance_option", "options", options);
                        row.doc.amount = result.charged;
                        if (result.options.length > 0 && loan_insurance_line.insurance_option != result.charged) {
                            let item = result.options.find(t => t.amount == result.charged);
                            row.doc.insurance_option = flt(item.percent) == 0 ? result.charged : result.charged + ": " + item.percent + "%";
                        }
                        let health_questionnaire_campaign_insurance = frm.campaign_result.campaign_insurance.find(t => t.insurance_code == result.code)
                        if (health_questionnaire_campaign_insurance) {
                            if (health_questionnaire_campaign_insurance.health_questionnaire_form) {
                                if (loan_insurance_line.health_questionnaire != true) {
                                    row.doc.health_questionnaire = true;
                                }
                            }
                            else {
                                if (loan_insurance_line.health_questionnaire == true) {
                                    row.doc.health_questionnaire = false;
                                }
                            }
                        }
                        row.doc.insurance_condition_detail = result.selected_condition_detail;
                        await frappe.db.get_value("Insurance Condition", loan_insurance_line.insurance_condition, "insurance_setup",
                            (result_ic) => {
                                insurance_setup = result_ic.insurance_setup;
                                if (exception_list.find(t => t.insurance_setup == insurance_setup)) {
                                    set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "selected", "read_only", 0);
                                }
                                else {
                                    set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "selected", "read_only", 1);
                                }
                            }
                        );
                    }
                }
                else {
                    frm.doc.loan_insurance_lines = frm.doc.loan_insurance_lines.filter(campaign_insurance => campaign_insurance.code != result.code);
                }
            })
            // clear un-select option
            frm.doc.loan_insurance_lines.forEach(insurance_line => {
                let row = frm.get_field("loan_insurance_lines").grid.get_row(insurance_line.name);
                if(row.doc.selected == false) {
                    row.doc.insurance_option = null;
                    row.doc.amount = 0.00;
                    set_child_df_property(frm, "loan_insurance_lines", insurance_line, "insurance_option", "options", []);
                }
            });
            frm.doc.loan_fees_lines.forEach(loan_fees_line => {
                let row = frm.get_field("loan_fees_lines").grid.get_row(loan_fees_line.name);
                if(row.doc.selected == false) {
                    row.doc.fees_option = null;
                    row.doc.charged = 0.00;
                    set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "fees_option", "options", options);

                }
            });
            
            frm.set_value("financing_amount_net", financing_amount);
            frm.set_value("virtual_financing_amount_net", financing_amount);
            frm.refresh_field("virtual_financing_amount_net");
            refresh_loan_fees_line(frm);
            refresh_loan_insurance_line(frm);
        },
    });
}
function calculate_paym_schedule(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    return frappe.call({
        args: {
            principal_amount: frm.doc.financing_amount_net ? frm.doc.financing_amount_net : 0.00,
            contract_date: frm.doc.agreement_date,
            flat_percent: frm.doc.interest_rate,
            installment_type: frm.doc.installment_type,
            term: frm.doc.term,
            payment_frequency: parseInt(frm.doc.payment_frequency),
            internal_loan_application_id: frm.doc.internal_loan_application_id,
            lease_type: frm.doc.lease_type,
            pay_date: frm.doc.due_day,
            is_installment_period: campaign_interest_rate.is_installment_period,
            number_of_large_installments: campaign_interest_rate.number_of_large_installments,
            small_installment_percent: campaign_interest_rate.small_installment_percent,
            eir_percent: frm.doc.eir_percent,
            interest_type: campaign_interest_rate.interest_type,
            application_type: frm.doc.application_type,
        },
        method: "z_loan.api.calculate_loan_condition",
        freeze: true,
        freeze_message: __("Calculating Payment Schedule..."),
        callback: function (response) {
            let table_payment_schedule = response["message"]["payment_information"]
            let result_other_deduction = response["message"]["result_other_deduction"]
            response_head = table_payment_schedule["payment_header"];
            response_paym = table_payment_schedule["payment_schedule"];

            frm.set_value("agreement_start_date", response_head.first_due_date);
            frm.set_value("agreement_end_date", response_head.last_due_date);
            frm.set_value("total_day", response_head.total_day);
            frm.set_value("yield_amount", response_head.interest_amount);
            frm.set_value("tax_amount", response_head.tax_amount);
            frm.set_value("yield_percent", response_head.convert_to_flat_rate);
            frm.set_value("eir_percent", response_head.eir_rate);

            frm.set_value("installment_amount", response_paym[0].installment_amount);
            frm.set_value("last_installment_amount", response_paym[response_paym.length - 1].installment_amount);
            refresh_loan_insurance_line(frm);
            refresh_loan_fees_line(frm);
            calc_total_debtor(frm);

            frm.fields_dict.table_payment_schedule.grid.grid_pagination.page_length = response_paym.length
            frm.refresh_fields("table_payment_schedule")
            frm.set_value("table_payment_schedule", response_paym);

            frm.fields_dict["fees_section"].collapse(false);
            frm.fields_dict["insurance_section"].collapse(false);
            frm.fields_dict["payment_schedule_section"].collapse(false);
            frm.refresh_field("table_payment_schedule");
            disable_button_and_hide_row_check_in_table(frm, [
                "loan_fees_lines",
                "loan_insurance_lines",
                "table_others_deduction",
                "table_payment_schedule",
                "table_outstanding_balance",
            ]);
            let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
            if (campaign_interest_rate) {
                if (campaign_interest_rate.advance_interest_payment) {
                    frm.doc.advanced_installment_amount = response_paym[0].interest_amount;
                    frm.refresh_field("advanced_installment_amount");
                    frm.toggle_enable("advanced_installment_amount", false);
                }
            }
            if (result_other_deduction) {
                create_other_deduction(frm,result_other_deduction);
            }
            else {
                calc_remaining_transfer_amount(frm);
            }
        },
    })
}

function clear_payment_schedule(frm) {
    frm.set_value({
        "financing_amount_net": 0.00,
        "virtual_financing_amount_net": 0.00,
        "yield_percent": 0.00,
        "yield_amount": 0.00,
        "eir_percent": 0.00,
        "tax_amount": 0.00,
        "agreement_start_date": "",
        "agreement_end_date": "",
        "installment_amount": 0.00,
        "last_installment_amount": 0.00,
        "total_day": 0,
        "total_debtor": 0.00,
        "remaining_transfer_amount": 0.00,
        "advanced_installment_amount": 0.00,
    });
    frm.clear_table("table_payment_schedule");
    frm.refresh_field("table_payment_schedule");
    disable_button_and_hide_row_check_in_table(frm, [
        "table_payment_schedule",
    ]);
}

function render_confirm_recalculate(confirm_action, cancel_action) {
    let confirm_message = __("Do you want to recalculate?");
    return frappe.confirm(
        confirm_message, confirm_action, cancel_action
    );
}

function select_campaign(frm) {
    clear_value_calculate(frm);
    set_campaign_code_and_interest_rate(frm);
    filter_term(frm);
    filter_installment_type(frm);
    filter_ownership(frm);
    set_payment_frequency_options(frm);
    frm.toggle_enable("campaign_interest_rate", true);
}

function refresh_loan_fees_line(frm) {
    frm.refresh_field("loan_fees_lines");
    disable_button_and_hide_row_check_in_table(frm, ["loan_fees_lines"]);
    sum_total_by_loan_fees_lines(frm);
}
function refresh_loan_insurance_line(frm) {
    frm.refresh_field("loan_insurance_lines");
    disable_button_and_hide_row_check_in_table(frm, ["loan_insurance_lines"]);
    sum_total_by_loan_insurance_lines(frm);
}

function filter_term(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frm.set_query("term", function () {
        return {
            filters: {
                name: ["in", campaign_interest_rate.term]
            },
        };
    });
}

function filter_installment_type(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frm.set_query("installment_type", function () {
        return {
            filters: {
                name: ["in", campaign_interest_rate.installment_type]
            },
        };
    });
}

function validate_ownership(frm) {
    if (frm.doc.ownership && frm.doc.campaign_interest_rate) {
        return
    }
    else {
        return Promise.resolve();
    }
}

function create_other_deduction(frm,result_other_deduction) {
    let result = result_other_deduction;
    if(result.loan_reference_agreement_number) {
        frm.set_value('reference_agreement_number',result.loan_reference_agreement_number);
        if (result.table_others_deduction) {
            frm.set_value("table_others_deduction", result.table_others_deduction);
        }
        else {
            frm.set_value("table_others_deduction", []);
            frm.refresh_field("table_others_deduction");
        }
        if (result.table_outstanding_balance) {
            frm.set_value("table_outstanding_balance", result.table_outstanding_balance);
        }
        else {
            frm.set_value("table_outstanding_balance", []);
            frm.refresh_field("table_outstanding_balance");
        }
        disable_button_and_hide_row_check_in_table(frm, ["table_outstanding_balance", "table_others_deduction"]);
        sum_total_deduction(frm);
    }
    else {
        frm.doc.application_type = "";
        frm.refresh_field("application_type");
        frm.application_type_prev_value = frm.doc.application_type;

        frm.doc.reference_agreement_number = "";
        frm.refresh_field("reference_agreement_number");
        set_application_type_option(frm);

        frm.set_value("campaign_interest_rate", null);
        frm.toggle_enable("campaign_interest_rate", false);
        clear_value_calculate(frm);
       
        if (frm.doc.application_type != "Refinance") {
            frm.set_value("finance_company", "");
        }
    }
}

function validate_requested_amount(frm) {
    if (frm.doc.requested_amount == 0 || frm.doc.requested_amount == null || frm.doc.requested_amount == "") {
        frappe.throw(__("Please enter requested amount."));
    }
}

function filter_ownership(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frappe.call({
        args: {
            internal_loan_application_id: frm.doc.internal_loan_application_id,
            select_company: campaign_interest_rate.company
        },
        method: "z_loan.api.filter_ownership_loan_condition",
        callback: function (response) {
            let result = response.message.data;
            if (result) {
                frm.set_query("ownership", function () {
                    return {
                        filters: {
                            name: ["in", result.map(t => t.name)]
                        },
                    };
                });
                frm.refresh_field("ownership");
            }
        },
    });
}
function calculate_first_due_date(frm) {
    if (frm.doc.agreement_date && frm.doc.due_day && frm.doc.payment_frequency && frm.doc.term) {
        frappe.db.get_doc("Term", frm.doc.term).then((doc) => {
            frappe.call({
                args: {
                    contract_date: frm.doc.agreement_date,
                    pay_date: frm.doc.due_day,
                    payment_frequency: frm.doc.payment_frequency,
                    number_of_period: doc.number_of_period
                },
                method: "z_loan.api.calculate_first_due_date",
                callback: function (response) {
                    let result = response.message;
                    frm.set_value("first_due_date", result.first_due_date, null, skip_dirty_trigger = true);
                    frm.set_value("last_due_date", result.last_due_date, null, skip_dirty_trigger = true);
                }
            });
        });
    }
}

async function calc_remaining_transfer_amount(frm) {
    await frappe.call({
        doc: frm.doc,
        method: "round_remaining_amount",
        freeze: true,
        freeze_message: __("Loading..."),
        callback: function (response) {
            if(response) {
                let result = response.message;
                if(result.remaining_transfer_amount < 0) {
                    frappe.msgprint({ title: __("Error"), message: __("Remaining Transfer Amount is less than zero, Please edit the information and recalculate."), indicator: "red" });
                }
                else {
                    frm.doc.remaining_transfer_amount = result.remaining_transfer_amount;
                    frm.doc.advanced_installment_amount = result.advanced_installment_amount;
                }
                frm.refresh_field("advanced_installment_amount");
                frm.refresh_field("remaining_transfer_amount");
            }
        }
    });
}

function set_application_type_option(frm) {
    if (frm.doc.reference_agreement_number) {
        frm.set_df_property("application_type", "options", ["Top-up", "Restructure"]);
    }
    else {
        frm.set_df_property("application_type", "options", ["New", "Refinance"]);
    }
}

function validate_edit_form_by_k2(frm) {
    let key = "loan-application/" + encodeURIComponent(frm.doc.internal_loan_application_id);
    let sn = localStorage.getItem(key);
    if (sn) {
        frappe.call({
            method: "smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings.get_task",
            args: {
                serial_number: sn,
            },
            callback: function (response) {
                if (response.message.status_code != 200) {
                    localStorage.removeItem(key);
                    frm.display_task_error(response.message.error_message);
                }
                else {
                    frm.enable_save();
                }
            },
            error: function (response) {
                localStorage.removeItem(key);
                frm.display_task_error(response.message.error_message);
            }
        })
    }
    else {
        frm.disable_form();
        frm.toggle_display("calculate", false);
        frm.toggle_display("find_campaign", false);
    }
}

function display_error_message_for_child(error_message) {
    msg = { message: error_message, title: __("Error"), indicator: "red" };
    let d = frappe.msgprint(msg);
    override_hide_dialogs_for_child(d);
}

function override_hide_dialogs_for_child(d) {
    d.$wrapper.off("hide.bs.modal");
    d.$wrapper.on("hide.bs.modal", function () {
        d.display = false;
        d.is_minimized = false;
        d.hide_scrollbar(false);

        if (frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1] === d) {
            frappe.ui.open_dialogs.pop();
            if (frappe.ui.open_dialogs.length) {
                window.cur_dialog =
                    frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1];
            } else {
                window.cur_dialog = null;
            }
        }
        d.onhide && d.onhide();
        d.on_hide && d.on_hide();
    })
}

function set_child_df_property(frm, child_table, child_item, child_field, property, value) {
    let row = frm.get_field(child_table).grid.get_row(child_item.name);
    if (child_item.__islocal) {
        row.docfields.find(obj => obj["fieldname"] === child_field)[property] = value;
    }
    else {
        frm.set_df_property(child_table, property, value, frm.docname, child_field, child_item.name);
        if(value && row.docfields.find(obj => obj["fieldname"] === child_field)[property] == null) {
            row.docfields.find(obj => obj["fieldname"] === child_field)[property] = value;
        }
    }
}


// ดึงมาจาก frappe


function sum_total_by_loan_fees_lines(frm) {
    let sum_net_selected = 0.00;
    let sum_discount_selected = 0.00;
    let sum_charged_selected = 0.00;
    frm.doc.loan_fees_lines.forEach(function (item) {
        if (item.selected) {
            sum_net_selected += parseFloat(item.net);
            sum_discount_selected += parseFloat(item.discount);
            sum_charged_selected += parseFloat(item.charged);
        }
    });
    frm.set_value({
        "total_fees_net": sum_net_selected,
        "virtual_total_fees_net": sum_net_selected,
        "total_fees_discount": sum_discount_selected,
        "total_fees_charged": sum_charged_selected,
    });
    calc_total_debtor(frm);
}
function sum_total_by_loan_insurance_lines(frm) {
    let sum_amount_selected = 0.00;
    frm.doc.loan_insurance_lines.forEach(function (item) {
        if (item.selected) {
            sum_amount_selected += parseFloat(item.amount);
        }
    });
    frm.set_value({
        "total_insurance_net": sum_amount_selected,
        "virtual_total_insurance_net": sum_amount_selected,
    });
    calc_total_debtor(frm);
}
function sum_total_deduction(frm) {
    let sum_net = 0.00;
    if (frm.doc.table_others_deduction) {
        frm.doc.table_others_deduction.forEach(function (item) {
            sum_net += item.net;
        });
    }
    frm.set_value("total_deduction", sum_net).then(()=> {
        calc_remaining_transfer_amount(frm);
    });
}
function calc_total_periods_month(frm) {
    if (frm.doc.term) {
        frappe.db.get_doc("Term", frm.doc.term).then((doc) => {
            frm.set_value("total_periods_month", parseInt(frm.doc.payment_frequency) * doc.number_of_period);
        });
    }
    else {
        frm.set_value("total_periods_month", 0);
    }
}
function calc_total_debtor(frm) {
    frm.set_value("total_debtor",
        parseFloat(frm.doc.requested_amount) +
        parseFloat(frm.doc.total_fees_net) +
        parseFloat(frm.doc.total_insurance_net) +
        parseFloat(frm.doc.yield_amount) +
        parseFloat(frm.doc.tax_amount));
}
function set_registration_year_options(frm) {
    currentYear = new Date().getFullYear();
    const model_year_list = [];
    for (let year = currentYear; currentYear - 20 < year; year--) {
        model_year_list.push(year + 543);
    }
    frm.set_df_property("registration_year", "options", model_year_list);
}
async function set_due_day_options(frm) {
    let filtered = [];
    if (!frm.loan_application_settings) {
        await frappe.db.get_doc("Loan Application Settings").then((doc) => {
            frm.loan_application_settings = doc;
        });
    }
    let due_day_list = frm.loan_application_settings.due_day.split(",").map(item => item.trim());
    if (frm.doc.agreement_date && frm.doc.due_day && frm.doc.payment_frequency && frm.doc.term) {
        let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
        if (campaign_interest_rate.is_installment_period == 1) {
            let due_day = new Date(frm.doc.agreement_date).getDate()
            frm.set_df_property("due_day", "options", [due_day]);
            if (frm.doc.due_day != due_day) {
                frm.doc.due_day = due_day;
                frm.refresh_field("due_day");
            }
        }
        else if (frm.doc.payment_frequency == "1") {
            let termDoc = await frappe.db.get_doc("Term", frm.doc.term);
            let promises = due_day_list.map(day => {
                return new Promise(resolve => {
                    frappe.call({
                        args: {
                            contract_date: frm.doc.agreement_date,
                            pay_date: day,
                            payment_frequency: frm.doc.payment_frequency,
                            number_of_period: termDoc.number_of_period
                        },
                        method: "z_loan.api.calculate_first_due_date",
                        callback: function (response) {
                            let result = response.message;
                            let days_diff = frappe.datetime.get_day_diff(result.first_due_date, frm.doc.agreement_date);
                            if (days_diff <= frm.loan_application_settings.maximum_agreement_start_date && days_diff >= 0) {
                                filtered.push(day);
                            }
                            resolve();
                        }
                    });
                });
            });
            await Promise.all(promises);
            frm.set_df_property("due_day", "options", filtered);
        } else {
            frm.set_df_property("due_day", "options", due_day_list);
        }
    } else {
        frm.set_df_property("due_day", "options", due_day_list);
    }
}

function set_payment_frequency_options(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    if (campaign_interest_rate) {
        if (campaign_interest_rate.payment_frequency) {
            let payment_frequency_list = campaign_interest_rate.payment_frequency.split(",").map(Number);
            frm.set_df_property("payment_frequency", "options", payment_frequency_list);
            if (payment_frequency_list.length > 0 && !payment_frequency_list.includes(parseInt(frm.doc.payment_frequency))) {
                frm.doc.payment_frequency = null;
                frm.payment_frequency_prev_value = null;
                frm.refresh_field("payment_frequency");
            }
        }
        else {
            frm.set_df_property("payment_frequency", "options", [1]);
            frm.doc.payment_frequency = 1;
            frm.payment_frequency_prev_value = 1;
        }
    }
}

function display_fields_by_campaign(frm) {
    let target_sections = [
        "payment_schedule_section",
        "fees_section",
        "insurance_section"
    ];
    if (frm.doc.campaign_interest_rate == "") {
        display_fields_in_section(frm, target_sections, false);
    }
    else {
        display_fields_in_section(frm, target_sections, true);
    }
    disable_button_and_hide_row_check_in_table(frm, [
        "loan_fees_lines",
        "loan_insurance_lines",
        "table_others_deduction",
        "table_payment_schedule",
        "table_outstanding_balance",
    ]);
}

function display_fields_in_section(frm, target_sections, show, ignore_fields = []) {
    target_sections.forEach(section_name => {
        if (frm.fields_dict[section_name]) {
            frm.fields_dict[section_name]["fields_list"].forEach(function (item) {
                if (!ignore_fields.includes(item.df.fieldname)) {
                    frm.toggle_display(item.df.fieldname, show);
                }
            });
        }
    });
}

function disable_button_and_hide_row_check_in_table(frm, table_fields = []) {
    table_fields.forEach(fieldname => {
        frm.set_df_property(fieldname, "cannot_add_rows", true);
        frm.set_df_property(fieldname, "cannot_delete_rows", true);
        frm.fields_dict[fieldname].$wrapper.find(".row-check").remove();
        frm.fields_dict[fieldname].$wrapper.find(".row-index").remove();
        if (fieldname == "table_others_deduction") {
            frm.fields_dict[fieldname].$wrapper.find("[data-fieldname='remark_code']").remove();
        }
        else {
            frm.fields_dict[fieldname].$wrapper.find("[data-fieldname='payfor_code']").remove();
        }
    });

    setup_column_with("loan_fees_lines", "discount");
    setup_column_with("loan_fees_lines", "net");
    setup_column_with("loan_insurance_lines", "health_questionnaire");
    setup_column_with("table_payment_schedule", "yield");
    setup_column_with("table_others_deduction", "payfor_code");
    setup_column_with("table_outstanding_balance", "remark_code");
}

function setup_column_with(child_table, field_name) {
    let loan_fees_lines_jq = $(`[data-fieldname=${child_table}]`);
    loan_fees_lines_jq.find(`[data-fieldname=${field_name}]`).removeClass(function (index, className) {
        return (className.match(/(^|\s)col-xs-\S+/g) || []).join(" ");
    });
}

async function find_campaign(frm, campaign_interest_rate = null) {
    await frappe.call({
        args: {
            trans_date: frappe.datetime.now_date(),
            "loan_condition_doc": [frm.doc],
            "campaign_interest_rate": campaign_interest_rate,
        },
        method: "z_loan.api.find_campaign",
        freeze: true,
        freeze_message: __("Finding campaign..."),
        callback: function (response) {
            frm.campaign_result = response.message.campaign_result[0];
            let campaign_interest_rate_option = [];
            frm.campaign_result.campaign_interest_rate.forEach(campaign_interest_rate => {
                description = campaign_interest_rate.description;
                campaign_interest_rate_option.push({
                    "value": campaign_interest_rate.name,
                    "label": campaign_interest_rate.campaign_code + " (" + campaign_interest_rate.rate + "% " + description + ")"
                })
            });
            frm.set_df_property("campaign_interest_rate", "options", campaign_interest_rate_option);
        },
        error: function (response) {
            frm.set_value("ownership", null);
            frm.set_value("campaign_interest_rate", null);
            frm.set_value("installment_type", null);
            frm.toggle_enable("campaign_interest_rate", false);
            clear_value_calculate(frm);
        }
    })
}

function set_campaign_code_and_interest_rate(frm) {
    if (frm.doc.campaign_interest_rate != null) {
        let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
        frm.set_value("campaign_code", campaign_interest_rate.campaign_code);
        frm.set_value("interest_rate", campaign_interest_rate.rate);
    }
    else {
        frm.set_value("campaign_code", "");
        frm.set_value("interest_rate", "");
    }
}

function clear_value_calculate(frm) {
    frm.toggle_enable("campaign_interest_rate", false);
    frm.clear_table("loan_fees_lines");
    frm.clear_table("loan_insurance_lines");
    frm.clear_table("table_others_deduction");
    frm.clear_table("table_outstanding_balance");
    frm.clear_table("table_payment_schedule");
    frm.set_value({
        "fees_waive_amount": 0.00,
        "financing_amount_net": 0.00,
        "yield_percent": 0.00,
        "yield_amount": 0.00,
        "eir_percent": 0.00,
        "tax_amount": 0.00,
        "agreement_start_date": "",
        "agreement_end_date": "",
        "installment_amount": 0.00,
        "last_installment_amount": 0.00,
        "total_day": 0,
        "total_fees_charged": 0.00,
        "total_fees_discount": 0.00,
        "total_fees_net": 0.00,
        "total_fees_charged": 0.00,
        "total_fees_discount": 0.00,
        "total_insurance_net": 0.00,
        "total_debtor": 0.00,
        "total_deduction": 0.00,
        "virtual_total_insurance_net": 0.00,
        "virtual_total_fees_net": 0.00,
        "virtual_financing_amount_net": 0.00,
        "advanced_installment_amount": 0.00,
        "remaining_transfer_amount": 0.00,
        "ownership": null,
        "term": null,
    }).then(() => {
        frm.doc.installment_type = null;
        frm.refresh_field("installment_type");
        frm.refresh_field("loan_fees_lines");
        frm.refresh_field("loan_insurance_lines");
        frm.refresh_field("table_others_deduction");
        frm.refresh_field("table_outstanding_balance");
        frm.refresh_field("table_payment_schedule");
        disable_button_and_hide_row_check_in_table(frm, [
            "loan_fees_lines",
            "loan_insurance_lines",
            "table_others_deduction",
            "table_outstanding_balance",
            "table_payment_schedule",
        ]);
    });
}

async function set_ltv(frm) {
    let ltv_value = 0;
    let application_doc = null;
    if (frm.loan_application) {
        application_doc = frm.loan_application
    }
    else {
        await frappe.db.get_doc("Loan Application", frm.doc.internal_loan_application_id).then((doc) => {
            application_doc = doc;
        });
    }

    if (application_doc) {
        if (frm.doc.requested_amount != 0) {
            let value = 0;
            if (application_doc.col_appraisal_value > 0) {
                value = application_doc.col_appraisal_value
            }
            else if (application_doc.col_appraisal_value_by_crd > 0) {
                value = application_doc.col_appraisal_value_by_crd
            }
            else if (application_doc.col_appraisal_value_by_branch > 0) {
                value = application_doc.col_appraisal_value_by_branch
            }
            if (value > 0) {
                ltv_value = (parseFloat(frm.doc.requested_amount) / value) * 100;
            }
        }
    }
    frm.set_value("ltv", ltv_value);
    frm.refresh_field("ltv");
}
function validate_fetch_fees_insurance_payment(frm) {
    if (!frm.doc.installment_type) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("installment_type")._label]));
    }
    else if (!frm.doc.campaign_interest_rate) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("campaign_interest_rate")._label]));
    }
    else if (!frm.doc.term) {
        frappe.throw(__("Please specify {0}.", [frm.get_field("term")._label]));
    }
}
async function fetch_fees_insurance_payment(frm) {
    validate_fetch_fees_insurance_payment(frm);
    await find_campaign(frm, frm.doc.campaign_interest_rate);
    filter_term(frm);
    filter_installment_type(frm);
    filter_ownership(frm);
    set_payment_frequency_options(frm);
    set_due_day_options(frm);
    let input_campaign_fees = [];
    let input_campaign_insurance = [];
    let is_fees_and_insurance_empty = frm.doc.loan_fees_lines.length == 0 && frm.doc.loan_insurance_lines.length == 0;
    let exception_list = frm.campaign_result.campaign_exception_rule.filter(t => t.campaign_code == frm.doc.campaign_code);
    let selected_fees_condition_detail = null
    let selected_insurance_condition_detail = null
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    let filter_campaign_fees = frm.campaign_result.campaign_fees.filter(t => t.company.includes(campaign_interest_rate.company) || t.company.length === 0);
    let filter_campaign_insurance = frm.campaign_result.campaign_insurance.filter(t => t.company.includes(campaign_interest_rate.company) || t.company.length === 0);

    filter_campaign_fees.forEach(campaign_fees => {
        if (campaign_fees.campaign_code == frm.doc.campaign_code) {
            let is_exceptional = exception_list.find(t => t.fees_setup == campaign_fees.fees_setup && t.insurance_setup != null);
            if (is_fees_and_insurance_empty && is_exceptional == undefined) {
                let fees = frm.add_child("loan_fees_lines");
                fees.selected = 1;
                fees.code = campaign_fees.fees_code;
                fees.fees_condition = campaign_fees.fees_condition;
                fees.fees_setup = campaign_fees.fees_setup;
                fees.description = campaign_fees.description;
                fees.charged = 0;
                fees.discount = 0;
                fees.net = 0;
            }
            let current_fees = frm.doc.loan_fees_lines?.find(t => t.code == campaign_fees.fees_code);
            input_campaign_fees.push({
                "selected": current_fees ? current_fees.selected : 0,
                "code": campaign_fees.fees_code,
                "fees_condition": campaign_fees.fees_condition,
                "description": campaign_fees.description,
                "charged": current_fees ? current_fees.charged : 0,
                "discount": current_fees ? current_fees.discount : 0,
                "net": current_fees ? current_fees.net : 0,
                "selected_condition_detail": current_fees ? current_fees.fees_condition_detail : selected_fees_condition_detail
            });
        }
    });
    filter_campaign_insurance.forEach(campaign_insurance => {
        if (campaign_insurance.campaign_code == frm.doc.campaign_code) {
            if (is_fees_and_insurance_empty) {
                let insurance = frm.add_child("loan_insurance_lines");
                insurance.selected = 1;
                insurance.code = campaign_insurance.insurance_code;
                insurance.insurance_condition = campaign_insurance.insurance_condition;
                insurance.insurance_setup = campaign_insurance.insurance_setup;
                insurance.description = campaign_insurance.description;
                insurance.amount = 0;
            }
            let current_insurance = frm.doc.loan_insurance_lines?.find(t => t.code == campaign_insurance.insurance_code);
            input_campaign_insurance.push({
                "selected": current_insurance ? current_insurance.selected : 0,
                "code": campaign_insurance.insurance_code,
                "insurance_condition": campaign_insurance.insurance_condition,
                "description": campaign_insurance.description,
                "amount": current_insurance ? current_insurance.amount : 0,
                "insurance_option": current_insurance ? current_insurance.insurance_option : null,
                "selected_condition_detail": current_insurance ? current_insurance.insurance_condition_detail : selected_insurance_condition_detail,
            });
        }
    });
    frm.refresh_field("loan_fees_lines");
    frm.refresh_field("loan_insurance_lines");
    await frappe.call({
        args: {
            requested_amount: frm.doc.requested_amount,
            campaign_code: frm.doc.campaign_code,
            interest_rate: frm.doc.interest_rate,
            pay_fee: frm.doc.calculation_type,
            term: frm.doc.term,
            campaign_fees: input_campaign_fees,
            campaign_insurance: input_campaign_insurance,
        },
        method: "z_loan.api.calculate_fees_and_insurance",
        freeze: true,
        freeze_message: __("Calculating fees and insurance..."),
        callback: function (response) {
            let campaign_fees_result = response["message"]["campaign_fees"];
            let campaign_insurance_result = response["message"]["campaign_insurance"];
            let financing_amount = response["message"]["financing_amount"];
            frm.campaign_fees_result = campaign_fees_result;
            frm.campaign_insurance_result = campaign_insurance_result;
            campaign_fees_result.forEach(result => {
                if (result.options.length > 0) {
                    let loan_fees_line = frm.doc.loan_fees_lines.filter(campaign_fees => campaign_fees.code == result.code)[0];
                    if (loan_fees_line) {
                        let row = frm.get_field("loan_fees_lines").grid.get_row(loan_fees_line.name);
                        let options = result.options.map(t => ({
                            value: t.amount,
                            condition: t.condition,
                        }));
                        set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "fees_option", "options", options);
                        row.doc.charged = result.charged;
                        if (result.options.length > 0 && loan_fees_line.fees_option != result.charged) {
                            row.doc.fees_option = result.charged;
                        }
                        let net = result.charged - row.doc.discount;
                        row.doc.net = net < 0.00 ? 0.00 : net;
                        row.doc.fees_condition_detail = result.selected_condition_detail;
                        if (exception_list.find(t => t.fees_setup == loan_fees_line.fees_setup && t.insurance_setup == null)) {
                            set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "selected", "read_only", 0);
                        }
                        else {
                            set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "selected", "read_only", 1);
                        }
                    }
                }
                else {
                    frm.doc.loan_fees_lines = frm.doc.loan_fees_lines.filter(campaign_fees => campaign_fees.code != result.code);
                }
            })
            campaign_insurance_result.forEach(async result => {
                if (result.options.length > 0) {
                    let loan_insurance_line = frm.doc.loan_insurance_lines.filter(campaign_insurance => campaign_insurance.code == result.code)[0];
                    if (loan_insurance_line) {
                        let row = frm.get_field("loan_insurance_lines").grid.get_row(loan_insurance_line.name);
                        let options = result.options.map(t => ({
                            value: flt(t.percent) == 0 ? t.amount : t.amount + ": " + t.percent + "%",
                            condition: t.condition,
                            name: t.condition_detail
                        }));
                        set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "insurance_option", "options", options);
                        row.doc.amount = result.charged;
                        if (result.options.length > 0 && loan_insurance_line.insurance_option != result.charged) {
                            let item = result.options.find(t => t.amount == result.charged);
                            row.doc.insurance_option = flt(item.percent) == 0 ? result.charged : result.charged + ": " + item.percent + "%";
                        }
                        let health_questionnaire_campaign_insurance = frm.campaign_result.campaign_insurance.find(t => t.insurance_code == result.code)
                        if (health_questionnaire_campaign_insurance) {
                            if (health_questionnaire_campaign_insurance.health_questionnaire_form) {
                                if (loan_insurance_line.health_questionnaire != true) {
                                    row.doc.health_questionnaire = true;
                                }
                            }
                            else {
                                if (loan_insurance_line.health_questionnaire == true) {
                                    row.doc.health_questionnaire = false;
                                }
                            }
                        }
                        row.doc.insurance_condition_detail = result.selected_condition_detail;
                        await frappe.db.get_value("Insurance Condition", loan_insurance_line.insurance_condition, "insurance_setup",
                            (result_ic) => {
                                insurance_setup = result_ic.insurance_setup;
                                if (exception_list.find(t => t.insurance_setup == insurance_setup)) {
                                    set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "selected", "read_only", 0);
                                }
                                else {
                                    set_child_df_property(frm, "loan_insurance_lines", loan_insurance_line, "selected", "read_only", 1);
                                }
                            }
                        );
                    }
                }
                else {
                    frm.doc.loan_insurance_lines = frm.doc.loan_insurance_lines.filter(campaign_insurance => campaign_insurance.code != result.code);
                }
            })
            // clear un-select option
            frm.doc.loan_insurance_lines.forEach(insurance_line => {
                let row = frm.get_field("loan_insurance_lines").grid.get_row(insurance_line.name);
                if(row.doc.selected == false) {
                    row.doc.insurance_option = null;
                    row.doc.amount = 0.00;
                    set_child_df_property(frm, "loan_insurance_lines", insurance_line, "insurance_option", "options", []);
                }
            });
            frm.doc.loan_fees_lines.forEach(loan_fees_line => {
                let row = frm.get_field("loan_fees_lines").grid.get_row(loan_fees_line.name);
                if(row.doc.selected == false) {
                    row.doc.fees_option = null;
                    row.doc.charged = 0.00;
                    set_child_df_property(frm, "loan_fees_lines", loan_fees_line, "fees_option", "options", options);

                }
            });
            
            frm.set_value("financing_amount_net", financing_amount);
            frm.set_value("virtual_financing_amount_net", financing_amount);
            frm.refresh_field("virtual_financing_amount_net");
            refresh_loan_fees_line(frm);
            refresh_loan_insurance_line(frm);
        },
    });
}
function calculate_paym_schedule(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    return frappe.call({
        args: {
            principal_amount: frm.doc.financing_amount_net ? frm.doc.financing_amount_net : 0.00,
            contract_date: frm.doc.agreement_date,
            flat_percent: frm.doc.interest_rate,
            installment_type: frm.doc.installment_type,
            term: frm.doc.term,
            payment_frequency: parseInt(frm.doc.payment_frequency),
            internal_loan_application_id: frm.doc.internal_loan_application_id,
            lease_type: frm.doc.lease_type,
            pay_date: frm.doc.due_day,
            is_installment_period: campaign_interest_rate.is_installment_period,
            number_of_large_installments: campaign_interest_rate.number_of_large_installments,
            small_installment_percent: campaign_interest_rate.small_installment_percent,
            eir_percent: frm.doc.eir_percent,
            interest_type: campaign_interest_rate.interest_type,
            application_type: frm.doc.application_type,
        },
        method: "z_loan.api.calculate_loan_condition",
        freeze: true,
        freeze_message: __("Calculating Payment Schedule..."),
        callback: function (response) {
            let table_payment_schedule = response["message"]["payment_information"]
            let result_other_deduction = response["message"]["result_other_deduction"]
            response_head = table_payment_schedule["payment_header"];
            response_paym = table_payment_schedule["payment_schedule"];

            frm.set_value("agreement_start_date", response_head.first_due_date);
            frm.set_value("agreement_end_date", response_head.last_due_date);
            frm.set_value("total_day", response_head.total_day);
            frm.set_value("yield_amount", response_head.interest_amount);
            frm.set_value("tax_amount", response_head.tax_amount);
            frm.set_value("yield_percent", response_head.convert_to_flat_rate);
            frm.set_value("eir_percent", response_head.eir_rate);

            frm.set_value("installment_amount", response_paym[0].installment_amount);
            frm.set_value("last_installment_amount", response_paym[response_paym.length - 1].installment_amount);
            refresh_loan_insurance_line(frm);
            refresh_loan_fees_line(frm);
            calc_total_debtor(frm);

            frm.fields_dict.table_payment_schedule.grid.grid_pagination.page_length = response_paym.length
            frm.refresh_fields("table_payment_schedule")
            frm.set_value("table_payment_schedule", response_paym);

            frm.fields_dict["fees_section"].collapse(false);
            frm.fields_dict["insurance_section"].collapse(false);
            frm.fields_dict["payment_schedule_section"].collapse(false);
            frm.refresh_field("table_payment_schedule");
            disable_button_and_hide_row_check_in_table(frm, [
                "loan_fees_lines",
                "loan_insurance_lines",
                "table_others_deduction",
                "table_payment_schedule",
                "table_outstanding_balance",
            ]);
            let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
            if (campaign_interest_rate) {
                if (campaign_interest_rate.advance_interest_payment) {
                    frm.doc.advanced_installment_amount = response_paym[0].interest_amount;
                    frm.refresh_field("advanced_installment_amount");
                    frm.toggle_enable("advanced_installment_amount", false);
                }
            }
            if (result_other_deduction) {
                create_other_deduction(frm,result_other_deduction);
            }
            else {
                calc_remaining_transfer_amount(frm);
            }
        },
    })
}

function clear_payment_schedule(frm) {
    frm.set_value({
        "financing_amount_net": 0.00,
        "virtual_financing_amount_net": 0.00,
        "yield_percent": 0.00,
        "yield_amount": 0.00,
        "eir_percent": 0.00,
        "tax_amount": 0.00,
        "agreement_start_date": "",
        "agreement_end_date": "",
        "installment_amount": 0.00,
        "last_installment_amount": 0.00,
        "total_day": 0,
        "total_debtor": 0.00,
        "remaining_transfer_amount": 0.00,
        "advanced_installment_amount": 0.00,
    });
    frm.clear_table("table_payment_schedule");
    frm.refresh_field("table_payment_schedule");
    disable_button_and_hide_row_check_in_table(frm, [
        "table_payment_schedule",
    ]);
}

function render_confirm_recalculate(confirm_action, cancel_action) {
    let confirm_message = __("Do you want to recalculate?");
    return frappe.confirm(
        confirm_message, confirm_action, cancel_action
    );
}

function select_campaign(frm) {
    clear_value_calculate(frm);
    set_campaign_code_and_interest_rate(frm);
    filter_term(frm);
    filter_installment_type(frm);
    filter_ownership(frm);
    set_payment_frequency_options(frm);
    frm.toggle_enable("campaign_interest_rate", true);
}

function refresh_loan_fees_line(frm) {
    frm.refresh_field("loan_fees_lines");
    disable_button_and_hide_row_check_in_table(frm, ["loan_fees_lines"]);
    sum_total_by_loan_fees_lines(frm);
}
function refresh_loan_insurance_line(frm) {
    frm.refresh_field("loan_insurance_lines");
    disable_button_and_hide_row_check_in_table(frm, ["loan_insurance_lines"]);
    sum_total_by_loan_insurance_lines(frm);
}

function filter_term(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frm.set_query("term", function () {
        return {
            filters: {
                name: ["in", campaign_interest_rate.term]
            },
        };
    });
}

function filter_installment_type(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frm.set_query("installment_type", function () {
        return {
            filters: {
                name: ["in", campaign_interest_rate.installment_type]
            },
        };
    });
}

function validate_ownership(frm) {
    if (frm.doc.ownership && frm.doc.campaign_interest_rate) {
        return
    }
    else {
        return Promise.resolve();
    }
}

function create_other_deduction(frm,result_other_deduction) {
    let result = result_other_deduction;
    if(result.loan_reference_agreement_number) {
        frm.set_value('reference_agreement_number',result.loan_reference_agreement_number);
        if (result.table_others_deduction) {
            frm.set_value("table_others_deduction", result.table_others_deduction);
        }
        else {
            frm.set_value("table_others_deduction", []);
            frm.refresh_field("table_others_deduction");
        }
        if (result.table_outstanding_balance) {
            frm.set_value("table_outstanding_balance", result.table_outstanding_balance);
        }
        else {
            frm.set_value("table_outstanding_balance", []);
            frm.refresh_field("table_outstanding_balance");
        }
        disable_button_and_hide_row_check_in_table(frm, ["table_outstanding_balance", "table_others_deduction"]);
        sum_total_deduction(frm);
    }
    else {
        frm.doc.application_type = "";
        frm.refresh_field("application_type");
        frm.application_type_prev_value = frm.doc.application_type;

        frm.doc.reference_agreement_number = "";
        frm.refresh_field("reference_agreement_number");
        set_application_type_option(frm);

        frm.set_value("campaign_interest_rate", null);
        frm.toggle_enable("campaign_interest_rate", false);
        clear_value_calculate(frm);
       
        if (frm.doc.application_type != "Refinance") {
            frm.set_value("finance_company", "");
        }
    }
}

function validate_requested_amount(frm) {
    if (frm.doc.requested_amount == 0 || frm.doc.requested_amount == null || frm.doc.requested_amount == "") {
        frappe.throw(__("Please enter requested amount."));
    }
}

function filter_ownership(frm) {
    let campaign_interest_rate = frm.campaign_result.campaign_interest_rate.filter(campaign_interest_rate => campaign_interest_rate.name == frm.doc.campaign_interest_rate)[0];
    frappe.call({
        args: {
            internal_loan_application_id: frm.doc.internal_loan_application_id,
            select_company: campaign_interest_rate.company
        },
        method: "z_loan.api.filter_ownership_loan_condition",
        callback: function (response) {
            let result = response.message.data;
            if (result) {
                frm.set_query("ownership", function () {
                    return {
                        filters: {
                            name: ["in", result.map(t => t.name)]
                        },
                    };
                });
                frm.refresh_field("ownership");
            }
        },
    });
}
function calculate_first_due_date(frm) {
    if (frm.doc.agreement_date && frm.doc.due_day && frm.doc.payment_frequency && frm.doc.term) {
        frappe.db.get_doc("Term", frm.doc.term).then((doc) => {
            frappe.call({
                args: {
                    contract_date: frm.doc.agreement_date,
                    pay_date: frm.doc.due_day,
                    payment_frequency: frm.doc.payment_frequency,
                    number_of_period: doc.number_of_period
                },
                method: "z_loan.api.calculate_first_due_date",
                callback: function (response) {
                    let result = response.message;
                    frm.set_value("first_due_date", result.first_due_date, null, skip_dirty_trigger = true);
                    frm.set_value("last_due_date", result.last_due_date, null, skip_dirty_trigger = true);
                }
            });
        });
    }
}

async function calc_remaining_transfer_amount(frm) {
    await frappe.call({
        doc: frm.doc,
        method: "round_remaining_amount",
        freeze: true,
        freeze_message: __("Loading..."),
        callback: function (response) {
            if(response) {
                let result = response.message;
                if(result.remaining_transfer_amount < 0) {
                    frappe.msgprint({ title: __("Error"), message: __("Remaining Transfer Amount is less than zero, Please edit the information and recalculate."), indicator: "red" });
                }
                else {
                    frm.doc.remaining_transfer_amount = result.remaining_transfer_amount;
                    frm.doc.advanced_installment_amount = result.advanced_installment_amount;
                }
                frm.refresh_field("advanced_installment_amount");
                frm.refresh_field("remaining_transfer_amount");
            }
        }
    });
}

function set_application_type_option(frm) {
    if (frm.doc.reference_agreement_number) {
        frm.set_df_property("application_type", "options", ["Top-up", "Restructure"]);
    }
    else {
        frm.set_df_property("application_type", "options", ["New", "Refinance"]);
    }
}

function validate_edit_form_by_k2(frm) {
    let key = "loan-application/" + encodeURIComponent(frm.doc.internal_loan_application_id);
    let sn = localStorage.getItem(key);
    if (sn) {
        frappe.call({
            method: "smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings.get_task",
            args: {
                serial_number: sn,
            },
            callback: function (response) {
                if (response.message.status_code != 200) {
                    localStorage.removeItem(key);
                    frm.display_task_error(response.message.error_message);
                }
                else {
                    frm.enable_save();
                }
            },
            error: function (response) {
                localStorage.removeItem(key);
                frm.display_task_error(response.message.error_message);
            }
        })
    }
    else {
        frm.disable_form();
        frm.toggle_display("calculate", false);
        frm.toggle_display("find_campaign", false);
    }
}

function display_error_message_for_child(error_message) {
    msg = { message: error_message, title: __("Error"), indicator: "red" };
    let d = frappe.msgprint(msg);
    override_hide_dialogs_for_child(d);
}

function override_hide_dialogs_for_child(d) {
    d.$wrapper.off("hide.bs.modal");
    d.$wrapper.on("hide.bs.modal", function () {
        d.display = false;
        d.is_minimized = false;
        d.hide_scrollbar(false);

        if (frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1] === d) {
            frappe.ui.open_dialogs.pop();
            if (frappe.ui.open_dialogs.length) {
                window.cur_dialog =
                    frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1];
            } else {
                window.cur_dialog = null;
            }
        }
        d.onhide && d.onhide();
        d.on_hide && d.on_hide();
    })
}

function set_child_df_property(frm, child_table, child_item, child_field, property, value) {
    let row = frm.get_field(child_table).grid.get_row(child_item.name);
    if (child_item.__islocal) {
        row.docfields.find(obj => obj["fieldname"] === child_field)[property] = value;
    }
    else {
        frm.set_df_property(child_table, property, value, frm.docname, child_field, child_item.name);
        if(value && row.docfields.find(obj => obj["fieldname"] === child_field)[property] == null) {
            row.docfields.find(obj => obj["fieldname"] === child_field)[property] = value;
        }
    }
}









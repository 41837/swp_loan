function initialize_loan_condition_header(frm) {

    frm.fields_dict.lease_type.$wrapper.find('.control-label').html('ประเภทการให้สินเชื่อ <span class="text-danger">*</span>');       

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
                // Save data
                if (!frm.doc.lease_type) {
                    frappe.throw(__('กรุณากรอกประเภทการให้สินเชื่อ'));
                }
                frm.save()
            });
}


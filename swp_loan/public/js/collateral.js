function fn_btn_save_collateral(frm){
    frm.fields_dict.btn_save_collateral.$wrapper
    .css({
        "text-align": "right",
    })
    .find("button")
    .removeClass("btn-xs btn-default")
    .addClass("btn-md btn-primary")
    .css({
        'font-size': '16px',
        'padding': '8px 16px',
        'background-color': '#4a7ef6',
        'color': 'white',
        'border': 'none',
    })
    .on('click', function() {
        // กำหนด mandatory field ใน section หลักประกัน
        let required_fields = [
            // "col_collatteral_id",
            "col_product",
            // "col_subproduct",
            // "col_vehicle_identification_number",
            // "col_model_year",
            // "col_color",
            // "col_engine_number",
            // "col_brand",
            // "col_model",
            // "col_submodel",
            // "col_gear",
            // "col_engine_size",
            // "col_car_mileage",
            // "col_date_of_license_expiry",
            // "col_license_plate_number",
            // "col_province_registration",
            // "col_date_of_tax_expiry",
        ];

        let missing_fields = [];

        required_fields.forEach(fieldname => {
            let value = frm.doc[fieldname];
            if (!value) {
                missing_fields.push(frm.fields_dict[fieldname].df.label);
            }
        });

        // Validate missing field
        if (missing_fields.length > 0) {
            frappe.msgprint({
                title: "กรุณากรอกข้อมูลให้ครบ",
                message: "ข้อมูลที่จำเป็นต้องกรอก: <br><b> - " + missing_fields.join("<br> - ") + "</bt>",
                indicator: "red"
            });
            return;
        }

        // Save data
        frappe.call({
            method: "swp_loan.api.save_util.custom_save_without_validation", // Save without validation
            args: {
                doc: JSON.stringify(frm.doc)
            },
            callback: function(r) {
                if (!r.exc && r.message.name) {
                    // Alert message
                    frappe.show_alert({
                        message: 'ข้อมูลหลักประกันถูกบันทึกแล้ว',
                        indicator: 'green'
                    }, 5);

                    // Collapse section
                    $("#toggle-collateral_search-btn").trigger("click");
                    $("#toggle-collateral-btn").trigger("click");

                    // Show loan condition sections
                    frm.fields_dict.section_header_loan_condition.wrapper.show();
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

                    // Initialize header_loan_condition HTML content
                    let html_header_loan_condition = `
                    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">รายละเอียดสินเชื่อ</div>
                        <button id="toggle-loan_condition-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                            <i class="fa fa-chevron-up"></i>
                        </button>
                    </div>
                    `;

                    frm.fields_dict.header_loan_condition.$wrapper.html(html_header_loan_condition);

                    // Initialize loan condition toggle button event handler
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
            }
        });
    });
}
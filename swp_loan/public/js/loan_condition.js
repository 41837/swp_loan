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
                // กำหนด mandatory field ใน section
                let required_fields = [
                    "lease_type",
                    "application_type",
                    // "registration_year",
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
                                message: 'ข้อมูลรายละเอียดสินเชื่อถูกบันทึกแล้ว',
                                indicator: 'green'
                            }, 5);

                            // Collapse section
                            // $("#toggle-loan_condition-btn").trigger("click");

                            // Show form action section
                            frm.fields_dict.section_form_action.wrapper.show();
                        }
                    }
                });
            });
}
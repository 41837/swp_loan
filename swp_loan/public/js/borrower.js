function fn_btn_save_borrower(frm){
frm.fields_dict.btn_save_borrower.$wrapper
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
            let required_fields = [
                "cus_customer_id",
                "cus_salutation",
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
                method: "swp_loan.api.save_util.custom_save_without_validation",
                args: {
                    doc: JSON.stringify(frm.doc)
                },
                callback: function(r) {
                    if (!r.exc && r.message.name) {
                        // Alert message
                        frappe.show_alert({
                            message: 'ข้อมูลผู้กู้ถูกบันทึกแล้ว',
                            indicator: 'green'
                        }, 5);

                        // Collapse section ผู้กู้
                        $("#toggle-borrower-btn").trigger("click");

                        // แสดง section ของผู้ค้ำ
                        frm.fields_dict.section_header_guarantor.wrapper.show();
                        frm.fields_dict.section_guarantor.wrapper.show();
                        frm.fields_dict.section_guarantor2.wrapper.show();

                        // ตั้งค่า HTML ของ header_guarantor
                        let html_header_guarantor = `
                        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ผู้ค้ำ</div>
                            <button id="toggle-guarantor-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                                <i class="fa fa-chevron-up"></i>
                            </button>
                        </div>
                        `;

                        frm.fields_dict.header_guarantor.$wrapper.html(html_header_guarantor);

                        // ตั้งค่า HTML ของ has_guarantor เป็น checkbox
                        frm.fields_dict.has_guarantor.$wrapper.html(`
                            <div style="margin: 10px 0;">
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" id="has_guarantor_checkbox" style="margin-right: 8px;">
                                    <span>ต้องการผู้ค้ำ</span>
                                </label>
                            </div>
                        `);

                        // เพิ่ม event handler สำหรับ checkbox
                        $("#has_guarantor_checkbox").on("change", function() {
                            if ($(this).is(":checked")) {
                                frm.fields_dict.section_guarantor.wrapper.show();
                                $("#toggle-guarantor-btn i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                            } else {
                                frm.fields_dict.section_guarantor.wrapper.hide();
                                $("#toggle-guarantor-btn i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                            }
                        });

                        // เพิ่ม event handler สำหรับปุ่ม toggle
                        let isCollapsed_header_guarantor = false;
                        $("#toggle-guarantor-btn").on("click", function () {
                            isCollapsed_header_guarantor = !isCollapsed_header_guarantor;

                            if (isCollapsed_header_guarantor) {
                                frm.fields_dict.section_guarantor.wrapper.hide();
                                frm.fields_dict.section_guarantor2.wrapper.hide();
                                $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                                $("#has_guarantor_checkbox").prop("checked", false);
                            } else {
                                frm.fields_dict.section_guarantor.wrapper.show();
                                frm.fields_dict.section_guarantor2.wrapper.show();
                                $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                                $("#has_guarantor_checkbox").prop("checked", true);
                            }
                        });
                    }
                }
            });
        });

}
    
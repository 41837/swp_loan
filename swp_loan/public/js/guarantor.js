function fn_btn_save_guarantor(frm){
    frm.fields_dict.btn_save_guarantor.$wrapper
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
        // กำหนด mandatory field ใน section ข้อมูลผู้ค้ำ
        let required_fields = [
            // "gua_search_id",
            // "gua_first_name",
            // "gua_last_name",
            // "gua_birth_date",
            // "gua_mobile",
            // "gua_email",
            // "gua_line_id",
            // "gua_facebook",
            // "gua_instagram",
            // "gua_tiktok",
            // "gua_address",
            // "gua_subdistrict",
            // "gua_district",
            // "gua_province",
            // "gua_postal_code",
            // "gua_country",
            // "gua_address_type",
            // "gua_platform",
            // "gua_remark",
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
                        message: 'ข้อมูลผู้ค้ำถูกบันทึกแล้ว',
                        indicator: 'green'
                    }, 5);

                    // Collapse section
                    // $("#toggle-guarantor-btn").trigger("click");

                    // Show collateral search sections
                    frm.fields_dict.section_header_collateral_search.wrapper.show();
                    frm.fields_dict.section_collateral_search.wrapper.show();
                    frm.fields_dict.section_header_collateral.wrapper.show();

                    // Initialize header_collateral_search HTML content
                    let html_header_collateral_search = `
                    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาหลักประกัน</div>
                        <button id="toggle-collateral_search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                            <i class="fa fa-chevron-up"></i>
                        </button>
                    </div>
                    `;

                    frm.fields_dict.header_collateral_search.$wrapper.html(html_header_collateral_search);

                    // Initialize event handler for collateral search toggle
                    let isCollapsed_header_collateral_search = false;
                    $("#toggle-collateral_search-btn").on("click", function () {
                        isCollapsed_header_collateral_search = !isCollapsed_header_collateral_search;

                        if (isCollapsed_header_collateral_search) {
                            frm.fields_dict.section_collateral_search.wrapper.hide();
                            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                        } else {
                            frm.fields_dict.section_collateral_search.wrapper.show();
                            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                        }
                    });

                    // Navigate to saved document and scroll to collateral search section
                    frappe.set_route("Form", "SWP_Loan_Request", r.message.name);
                    
                    // Scroll to collateral search section after a short delay
                    setTimeout(function() {
                        $('html, body').animate({
                            scrollTop: frm.fields_dict.section_header_collateral_search.wrapper.offset().top - 50
                        }, 500);
                    }, 1000);
                }
            }
        });
    });
}
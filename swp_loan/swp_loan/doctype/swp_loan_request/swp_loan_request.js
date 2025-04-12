// Copyright (c) 2025, SWP and contributors
// For license information, please see license.txt

// frappe.ui.form.on("SWP_Loan_Request", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on("SWP_Loan_Request", {
    onload: function(frm) {
        
        // ----------------------------------------------- Start --- Disable add row button on child table
        frm.fields_dict.table_fees.grid.cannot_add_rows = true;
        frm.fields_dict.table_insurance.grid.cannot_add_rows = true;
        frm.fields_dict.table_deduction.grid.cannot_add_rows = true;
        frm.fields_dict.table_outstanding_balance.grid.cannot_add_rows = true;
        // End   --- Disable add row button on child table



        // ----------------------------------------------- Start --- Radio button consent marketing field
        frm.fields_dict.consent_marketing.$wrapper.html(`
            <label>ความยินยอมด้านการตลาด</label><br>
            <input type="radio" name="marketing_consent" value="ยินยอม"> ยินยอม<br>
            <input type="radio" name="marketing_consent" value="ไม่ยินยอม"> ไม่ยินยอม
        `);
        frm.fields_dict.consent_marketing.$wrapper.on("change", "input[name=marketing_consent]", function() {
            let selected_value = $(this).val();
            frm.set_value("consent_marketing_value", selected_value);
        });
        // End   --- Radio button consent marketing field



        // ----------------------------------------------- Start --- Radio button consent sensitive data field
        frm.fields_dict.consent_sensitive_data.$wrapper.html(`
            <label>ความยินยอมด้านข้อมูลอ่อนไหว</label><br>
            <input type="radio" name="sensitive_data_consent" value="ยินยอม"> ยินยอม<br>
            <input type="radio" name="sensitive_data_consent" value="ไม่ยินยอม"> ไม่ยินยอม
        `);
        frm.fields_dict.consent_sensitive_data.$wrapper.on("change", "input[name=sensitive_data_consent]", function() {
            let selected_value = $(this).val();
            frm.set_value("consent_sensitive_data_value", selected_value);
        });
        // End   --- Radio button consent sensitive data field



        // ----------------------------------------------- Start --- Header collateral section
        let html_header_collateral = `
            <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                <div><strong>รายละเอียดหลักประกัน</strong></div>
                <button id="toggle-collateral-btn" class="btn btn-sm btn-default">ย่อ</button>
            </div>
        `;

        // ใส่ HTML ที่เราสร้างลงไปใน field header_collateral
        frm.fields_dict.header_collateral.$wrapper.html(html_header_collateral);

        let isCollapsed_header_collateral = false;

        // ปุ่ม toggle
        $("#toggle-collateral-btn").on("click", function () {
            isCollapsed_header_collateral = !isCollapsed_header_collateral;

            if (isCollapsed_header_collateral) {
                frm.fields_dict.section_collateral_search.wrapper.hide();
                frm.fields_dict.section_collateral_details.wrapper.hide();
                frm.fields_dict.section_collateral_details2.wrapper.hide();
                frm.fields_dict.section_collateral_vehicle.wrapper.hide();
                frm.fields_dict.section_collateral_vehicle2.wrapper.hide();
                frm.fields_dict.section_collateral_vehicle3.wrapper.hide();
                frm.fields_dict.section_collateral_vehicle4.wrapper.hide();
                frm.fields_dict.section_collateral_vehicle5.wrapper.hide();
                frm.fields_dict.section_collateral_land.wrapper.hide();
                frm.fields_dict.section_collateral_land2.wrapper.hide();
                frm.fields_dict.section_collateral_land3.wrapper.hide();
                frm.fields_dict.section_collateral_land4.wrapper.hide();
                frm.fields_dict.section_collateral_land5.wrapper.hide();
                frm.fields_dict.section_collateral_land6.wrapper.hide();
                frm.fields_dict.section_collateral_details3.wrapper.hide();
                frm.fields_dict.section_collateral_details4.wrapper.hide();
                $(this).text("ขยาย");
            } else {
                frm.fields_dict.section_collateral_search.wrapper.show();
                frm.fields_dict.section_collateral_details.wrapper.show();
                frm.fields_dict.section_collateral_details2.wrapper.show();
                frm.fields_dict.section_collateral_vehicle.wrapper.show();
                frm.fields_dict.section_collateral_vehicle2.wrapper.show();
                frm.fields_dict.section_collateral_vehicle3.wrapper.show();
                frm.fields_dict.section_collateral_vehicle4.wrapper.show();
                frm.fields_dict.section_collateral_vehicle5.wrapper.show();
                frm.fields_dict.section_collateral_land.wrapper.show();
                frm.fields_dict.section_collateral_land2.wrapper.show();
                frm.fields_dict.section_collateral_land3.wrapper.show();
                frm.fields_dict.section_collateral_land4.wrapper.show();
                frm.fields_dict.section_collateral_land5.wrapper.show();
                frm.fields_dict.section_collateral_land6.wrapper.show();
                frm.fields_dict.section_collateral_details3.wrapper.show();
                frm.fields_dict.section_collateral_details4.wrapper.show();
                $(this).text("ย่อ");
            }
        });
        // End --- Header collateral section



        // ----------------------------------------------- Start --- Header collateral section
        let html_header_loan_condition= `
            <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                <div><strong>รายละเอียดสินเชื่อ</strong></div>
                <button id="toggle-loan-condition-btn" class="btn btn-sm btn-default">ย่อ</button>
            </div>
        `;

        frm.fields_dict.header_loan_condition.$wrapper.html(html_header_loan_condition);

        let isCollapsed_header_loan_condition = false;

        $("#toggle-loan-condition-btn").on("click", function () {
            isCollapsed_header_loan_condition = !isCollapsed_header_loan_condition;

            if (isCollapsed_header_loan_condition) {
                frm.fields_dict.section_loan_condition.wrapper.hide();
                $(this).text("ขยาย");
            } else {
                frm.fields_dict.section_loan_condition.wrapper.show();
                $(this).text("ย่อ");
            }
        });
    },

    
    refresh(frm) {

        


        


        // Start --- Attachment custom button
        frm.add_custom_button(__('เอกสารแนบ'), function() {
            const url = 'http://10.1.112.126:8000/app/file-attachment/IA000%E0%B8%AEQ250400001';
            const width = 1000;
            const height = 700;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);

            window.open(
                url,
                'เอกสารแนบ',
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
            );
        });
        // End   --- Attachment custom button


        
        // Start --- Scroll button
        // Check existing button (because this function use in refresh event)
        if (!frm.page.scroll_buttons_added) {

            // HTML Scroll to top
            let $btnTop = $(`<button class="btn btn-secondary" style="position:fixed; bottom:80px; right:30px; z-index:1000; display:none;">
                                <i class="fa fa-arrow-up"></i> Top
                            </button>`);

            // HTML Scroll to bottom
            let $btnBottom = $(`<button class="btn btn-secondary" style="position:fixed; bottom:30px; right:30px; z-index:1000; display:none;">
                                    <i class="fa fa-arrow-down"></i> Bottom
                                </button>`);

            // Add button to body
            $('body').append($btnTop).append($btnBottom);

            // scroll event: show/hide
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $btnTop.fadeIn();
                    $btnBottom.fadeIn();
                } else {
                    $btnTop.fadeOut();
                    $btnBottom.fadeOut();
                }
            });

            // JS Scroll to top
            $btnTop.on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });

            // JS Scroll to bottom
            $btnBottom.on('click', function() {
                $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            });

            frm.page.scroll_buttons_added = true; // protect duplicate button
        }
        // End   --- Scroll button


        // Start --- Collateral search button
        frm.fields_dict.btn_search_collateral.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            });
        // End   --- Collateral search button

            
        
        // Start --- Land search button
        frm.fields_dict.btn_search_land.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            });
        // End   --- Land search button


        
        // Start --- Collateral save button
        frm.fields_dict.btn_save_collateral.$wrapper
            .css({
                "text-align": "right",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-primary")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            });
        // End   --- Collateral save button


        
        // Start --- Campaign search button
        frm.fields_dict.btn_search_campaign.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            });
        // End   --- Campaign search button

        

        // Start --- Loan condition calculate button
        frm.fields_dict.btn_calculate_loan_condition.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            });
        // End   --- Loan condition calculate button

        

        // Start --- Loan condition save button
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
            });
        // End   --- Loan condition save button

        

        // Start --- Borrower search button
        frm.fields_dict.btn_search_borrower.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
            })
            .on('click', function() {

                // Validate empty field before search
                if (!frm.doc.cus_search_id) {
                    frappe.msgprint('กรุณากรอกหมายเลขประจำตัวผู้กู้ก่อน');
                
                // Set validate display field
                frm.fields_dict.cus_search_id.$wrapper
                    .closest('.frappe-control')
                    .find('.control-label')
                    .css('color', 'red');
            
                return;
                }

                // Get data from database
                frappe.call({
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: 'SWP_Loan_Request',
                        filters: {
                            f05: frm.doc.cus_search_id
                        },
                        fields: ['name', 'cus_first_name', 'cus_last_name'],
                        limit_page_length: 5
                    },
                    callback: function(response) {
                        const data = response.message;
            
                        if (data && data.length) {
                            // Set first record to form control
                            const first = data[0];
                            
                            frm.set_value('cus_is_new', 0);
                            frm.set_value('cus_first_name', first.cus_first_name);
                            frm.set_value('cus_last_name', first.cus_last_name);
                    
                            // Message from filters
                            let message = '<b>ประวัติการทำสัญญา:</b><br><ul>';
                            data.forEach(row => {
                                message += `<li>สัญญาเลขที่: ${row.name}<br> ชื่อ-นามสกุล: ${row.cus_first_name} ${row.cus_last_name}</li>`;
                            });
                            message += '</ul>';
                            frappe.msgprint(message);
                    
                        } else {
                            frappe.msgprint('ไม่พบประวัติการทำสัญญาของผู้กู้');
                            frm.set_value('cus_is_new', 1);
                        }
                    }
                });
            });
        // End   --- Borrower search button


        // Start --- Borrower save button
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
            });
        // End   --- Borrower save button

        

        // Start --- Hyperlink for open Treasury department website
        let html_hyperlink_treasury_page = `
            <a href="ttps://landsmaps.dol.go.th/" target="_blank" style="color: black; text-decoration: underline; font-size: 13px;">
                ค้นหาราคากรมธนารักษ์
            </a>
        `;
        frm.fields_dict['hyperlink_treasury_page'].wrapper.innerHTML = html_hyperlink_treasury_page;
        // End   --- Hyperlink for open Treasury department website



        // Start --- Hyperlink for open DOL website
        let html_hyperlink_dol_page = `
            <a href="ttps://landsmaps.dol.go.th/" target="_blank" style="color: black; text-decoration: underline; font-size: 13px;">
                ค้นหาข้อมูลกรมที่ดิน
            </a>
        `;
        frm.fields_dict['hyperlink_dol_page'].wrapper.innerHTML = html_hyperlink_dol_page;
        // End   --- Hyperlink for open DOL website



        // Start --- Default expand section
        frm.fields_dict.section_collateral_search.collapse(false);
        frm.fields_dict.section_collateral_details.collapse(false);
        frm.fields_dict.section_collateral_vehicle.collapse(false);
        frm.fields_dict.section_collateral_land.collapse(false);
        frm.fields_dict.section_loan_condition.collapse(false);
        frm.fields_dict.section_borrower_search.collapse(false);
        frm.fields_dict.section_borrower_details.collapse(false);
        frm.fields_dict.section_guarantor.collapse(false);
        frm.fields_dict.section_attachment.collapse(false);
        // End   --- Default expand section


   },


   // Start --- On change field cus_search_id
   cus_search_id: function(frm) {
    // If has value
    if (frm.doc.cus_search_id) {
        frm.fields_dict.cus_search_id.$wrapper
            .closest('.frappe-control')
            .find('.control-label')
            .css('color', '');
        }
    },





});
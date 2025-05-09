let loan_history = cur_frm.get_field("loan_history_html")

function initialize_borrower_search_header(frm) {
    let html_header_borrower_search = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #80AFE0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาประวัติผู้กู้</div>
        <button id="toggle-borrower_search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;
    
    frm.fields_dict.header_borrower_search.$wrapper.html(html_header_borrower_search);
    
    let isCollapsed_header_borrower_search = false;
    
    $("#toggle-borrower_search-btn").on("click", function () {
        isCollapsed_header_borrower_search = !isCollapsed_header_borrower_search;
    
        if (isCollapsed_header_borrower_search) {
            frm.fields_dict.section_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_result.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
            frm.fields_dict.section_borrower_search.wrapper.show();
            frm.fields_dict.section_borrower_result.show();
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }
    });
}

function fn_search_borrower(frm){
    // Get loan_history field inside the function
    let loan_history = frm.get_field("loan_history_html");
    if (!loan_history) {
        console.error("loan_history_html field not found");
        return;
    }

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
        'background-color': '#4a7ef6',
        'color': 'white',
        'border': 'none',
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
        
        fn_search_borrower2(frm);
        
        // Show no result message
        frm.fields_dict.html_borrower_result.$wrapper.html(`
            <div style="font-size: 16px; font-weight: bold; margin: 10px 0;">
                ผลการค้นหาประวัติผู้กู้
            </div><br>
            <div style="font-size: 14px; margin-top: 5px; text-align: center;">
                ไม่พบประวัติผู้กู้ !!
            </div><br>
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                    <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
                </button>
                <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                    <i class="fa fa-times"></i> ยกเลิก
                </button>
            </div><br>
        `);

        // Add event handlers for buttons
        $("#btn_accept_borrower").on("click", function() {
            frm.fields_dict.section_header_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_result.hide();
            frm.fields_dict.section_header_borrower.wrapper.show();
            frm.fields_dict.section_preview.wrapper.show();
            frm.fields_dict.section_borrower_details.wrapper.show();
            frm.fields_dict.section_borrower_details2.wrapper.show();
            frm.fields_dict.section_borrower_details3.wrapper.show();
            frm.fields_dict.section_borrower_details4.wrapper.show();
            frm.fields_dict.section_borrower_details5.wrapper.show();
            frm.fields_dict.section_borrower_details6.wrapper.show();
            frm.fields_dict.section_borrower_details7.wrapper.show();
            frm.fields_dict.section_borrower_details8.wrapper.show();
            frm.fields_dict.section_borrower_details9.wrapper.show();
            frm.fields_dict.section_borrower_details10.wrapper.show();
            frm.fields_dict.section_borrower_details11.wrapper.show();
            frm.fields_dict.section_borrower_details12.wrapper.show();
            frm.fields_dict.section_borrower_details13.wrapper.show();
            frm.fields_dict.section_borrower_details14.wrapper.show();
            
            frappe.show_alert({
                message: 'ยอมรับประวัติผู้กู้เรียบร้อยแล้ว',
                indicator: 'green'
            }, 5);
        });

        $("#btn_cancel_borrower").on("click", function() {
            frm.set_value('cus_search_id', '');
            frm.set_value('cus_is_new', 0);
            frm.fields_dict.section_borrower_result.wrapper.hide();
            
            frappe.show_alert({
                message: 'ยกเลิกการค้นหาเรียบร้อยแล้ว',
                indicator: 'orange'
            }, 5);
        });

    });
}

function fn_search_borrower2(frm){
     // Get data from database
     frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'SWP_Loan_Request',
            filters: {
                cus_customer_id: frm.doc.cus_search_id
            },
            fields: ['name', 'cus_first_name', 'cus_last_name'],
            limit_page_length: 5
        },
        callback: function(response) {
            const data = response.message;

            // Special case for ID 9999
            if (frm.doc.cus_search_id === '9999') {
                frm.set_value('cus_is_new', 1);
                
                // Show special message for ID 9999
                frm.fields_dict.html_borrower_result.$wrapper.html(`
                    <div style="font-size: 16px; font-weight: bold; margin: 10px 0;">
                        ผลการค้นหาประวัติผู้กู้
                    </div><br>
                    <div style="font-size: 14px; margin-top: 5px; text-align: center;">
                        พบข้อมูล: 9999
                    </div><br>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                            <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
                        </button>
                        <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                            <i class="fa fa-times"></i> ยกเลิก
                        </button>
                    </div><br>
                `);

                // Add event handlers for buttons
                $("#btn_accept_borrower").on("click", function() {
                    frm.fields_dict.section_header_borrower_search.wrapper.hide();
                    frm.fields_dict.section_borrower_search.wrapper.hide();
                    frm.fields_dict.section_borrower_result.hide();
                    frm.fields_dict.section_header_borrower.wrapper.show();
                    frm.fields_dict.section_preview.wrapper.show();
                    frm.fields_dict.section_borrower_details.wrapper.show();
                    frm.fields_dict.section_borrower_details2.wrapper.show();
                    frm.fields_dict.section_borrower_details3.wrapper.show();
                    frm.fields_dict.section_borrower_details4.wrapper.show();
                    frm.fields_dict.section_borrower_details5.wrapper.show();
                    frm.fields_dict.section_borrower_details6.wrapper.show();
                    frm.fields_dict.section_borrower_details7.wrapper.show();
                    frm.fields_dict.section_borrower_details8.wrapper.show();
                    frm.fields_dict.section_borrower_details9.wrapper.show();
                    frm.fields_dict.section_borrower_details10.wrapper.show();
                    frm.fields_dict.section_borrower_details11.wrapper.show();
                    frm.fields_dict.section_borrower_details12.wrapper.show();
                    frm.fields_dict.section_borrower_details13.wrapper.show();
                    frm.fields_dict.section_borrower_details14.wrapper.show();
                    
                    frappe.show_alert({
                        message: 'ยอมรับประวัติผู้กู้เรียบร้อยแล้ว',
                        indicator: 'green'
                    }, 5);
                });

                $("#btn_cancel_borrower").on("click", function() {
                    frm.set_value('cus_search_id', '');
                    frm.set_value('cus_is_new', 0);
                    frm.fields_dict.section_borrower_result.wrapper.hide();
                    
                    frappe.show_alert({
                        message: 'ยกเลิกการค้นหาเรียบร้อยแล้ว',
                        indicator: 'orange'
                    }, 5);
                });

                // Show result section
                frm.fields_dict.section_borrower_result.wrapper.show();
                return;
            }

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
                // frappe.msgprint('ไม่พบประวัติการทำสัญญาของผู้กู้');
                frm.set_value('cus_is_new', 1);

                // แสดงข้อความไม่พบประวัติในฟิลด์ html_borrower_result
                frm.fields_dict.html_borrower_result.$wrapper.html(`
                    <div style="font-size: 16px; font-weight: bold; margin: 10px 0;">
                        ผลการค้นหาประวัติผู้กู้
                    </div><br>
                    <div style="font-size: 14px; margin-top: 5px; text-align: center;">
                        ไม่พบประวัติผู้กู้ !!
                    </div><br>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                            <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
                        </button>
                        <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                            <i class="fa fa-times"></i> ยกเลิก
                        </button>
                    </div><br>
                `);

                // เพิ่ม event handler สำหรับปุ่มยอมรับ
                $("#btn_accept_borrower").on("click", function() {
                    frm.fields_dict.section_header_borrower_search.wrapper.hide();
                    frm.fields_dict.section_borrower_search.wrapper.hide();
                    frm.fields_dict.section_borrower_result.hide();
                    frm.fields_dict.section_header_borrower.wrapper.show();
                    frm.fields_dict.section_preview.wrapper.show();
                    frm.fields_dict.section_borrower_details.wrapper.show();
                    frm.fields_dict.section_borrower_details2.wrapper.show();
                    frm.fields_dict.section_borrower_details3.wrapper.show();
                    frm.fields_dict.section_borrower_details4.wrapper.show();
                    frm.fields_dict.section_borrower_details5.wrapper.show();
                    frm.fields_dict.section_borrower_details6.wrapper.show();
                    frm.fields_dict.section_borrower_details7.wrapper.show();
                    frm.fields_dict.section_borrower_details8.wrapper.show();
                    frm.fields_dict.section_borrower_details9.wrapper.show();
                    frm.fields_dict.section_borrower_details10.wrapper.show();
                    frm.fields_dict.section_borrower_details11.wrapper.show();
                    frm.fields_dict.section_borrower_details12.wrapper.show();
                    frm.fields_dict.section_borrower_details13.wrapper.show();
                    frm.fields_dict.section_borrower_details14.wrapper.show();
                    
                    frappe.show_alert({
                        message: 'ยอมรับประวัติผู้กู้เรียบร้อยแล้ว',
                        indicator: 'green'
                    }, 5);
                });

                // เพิ่ม event handler สำหรับปุ่มยกเลิก
                $("#btn_cancel_borrower").on("click", function() {
                    frm.set_value('cus_search_id', '');
                    frm.set_value('cus_is_new', 0);
                    frm.fields_dict.section_borrower_result.wrapper.hide();
                    
                    frappe.show_alert({
                        message: 'ยกเลิกการค้นหาเรียบร้อยแล้ว',
                        indicator: 'orange'
                    }, 5);
                });
            }

            // แสดง section ผลการค้นหา
            frm.fields_dict.section_borrower_result.wrapper.show();
        }
    });
}
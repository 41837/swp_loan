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
            <div style="margin-bottom: 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                    <div style="flex: 1 1 45%; min-width: 400px;">
                        <div style="background: #80AFE0; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล VLoan</div>
                        <div style="display: flex;">
                            <div style="flex: 1; border: 2px solid #80AFE0; margin: 4px; border-radius: 4px;">
                                <div style="background: #b3cbe6; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                            <div style="flex: 1; border: 2px solid #80AFE0; margin: 4px; border-radius: 4px;">
                                <div style="background: #b3cbe6; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1 1 45%; min-width: 400px;">
                        <div style="background: #9fd19f; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล MLoan</div>
                        <div style="display: flex;">
                            <div style="flex: 1; border: 2px solid #9fd19f; margin: 4px; border-radius: 4px;">
                                <div style="background: #cbe6cb; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                            <div style="flex: 1; border: 2px solid #9fd19f; margin: 4px; border-radius: 4px;">
                                <div style="background: #cbe6cb; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex: 1 1 45%; min-width: 400px;">
                        <div style="background: #e6cbe6; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล PLoan</div>
                        <div style="display: flex;">
                            <div style="flex: 1; border: 2px solid #e6cbe6; margin: 4px; border-radius: 4px;">
                                <div style="background: #f3e6f3; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                            <div style="flex: 1; border: 2px solid #e6cbe6; margin: 4px; border-radius: 4px;">
                                <div style="background: #f3e6f3; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1 1 45%; min-width: 400px;">
                        <div style="background: #b3a57a; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล S22</div>
                        <div style="display: flex;">
                            <div style="flex: 1; border: 2px solid #b3a57a; margin: 4px; border-radius: 4px;">
                                <div style="background: #e6e0cb; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                            <div style="flex: 1; border: 2px solid #b3a57a; margin: 4px; border-radius: 4px;">
                                <div style="background: #e6e0cb; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex: 1 1 45%; min-width: 400px;">
                        <div style="background: #b3a5d1; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล DLoan</div>
                        <div style="display: flex;">
                            <div style="flex: 1; border: 2px solid #b3a5d1; margin: 4px; border-radius: 4px;">
                                <div style="background: #e6e0f3; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                            <div style="flex: 1; border: 2px solid #b3a5d1; margin: 4px; border-radius: 4px;">
                                <div style="background: #e6e0f3; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                        <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
                    </button>
                    <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                        <i class="fa fa-times"></i> ยกเลิก
                    </button>
                </div>
            </div>
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
    check_id_input_type(frm);
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
            if (frm.doc.cus_search_id === '1451300001440' ||  frm.doc.cus_search_id === '1451300001441') {
                frm.set_value('cus_is_new', 1);
                
                // frm.set_value('cus_identification_number', frm.doc.cus_search_id);
                 
                if (frm.doc.cus_search_id) {
                    search_customer(frm, frm.doc.cus_search_id, is_refresh = true); 
                }
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
                frm.set_value('cus_is_new', 1);
                mockup_not_found_borrower(frm);
            }
            // แสดง section ผลการค้นหา
            frm.fields_dict.section_borrower_result.wrapper.show();
        }
    });
}
function mockup_found_borrower_not_blacklist(frm) {
    let html_content = "";

    if(frm.doc.cus_issuer=='01'){
        html_content += `
            <form>
                <div class="frappe-control" data-fieldtype="HTML" data-fieldname="loan_history_html">
                    <div class="flex flex-wrap w-full justify-between">
                        <div class="flex grow min-w-[22%] justify-between mr-2 my-2">
                            <div class="flex-col w-full bg-swp-table-row-2-blue shadow-xl">
                                <div class="flex-col border-white m-2">
                                    <div class="text-xl text-center bg-swp-gradient-blue font-bold p-1 border border-white rounded-lg">
                                        <span class="text-white">S14</span>
                                    </div>
                                    <div class="flex-col w-full bg-swp-table-row-2-blue justify-around">
                                        <div class="w-full flex-col bg-swp-table-row-1-blue border-2 border-white mt-2 pb-1">
                                            <div class="text-md text-center bg-swp-gradient-blue font-bold p-1">
                                                <span class="text-white">Contract History</span>
                                            </div>
                                            <div class="bg-swp-table-row-1-blue font-bold">
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-blue">
                                                    <div>JNI630301005IS63I[ง]</div>
                                                    <div>Agreement Start Date: 31-03-2020</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 8</div>
                                                    <div>ยกเลิกสัญญา_เนื่องจากยกเลิกกรมธรรม์</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-blue">
                                                    <div>JNC661001007NS53X[ก]</div>
                                                    <div>Agreement Start Date: 09-10-2023</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-blue">
                                                    <div>JNC661001008NS53X[ก]</div>
                                                    <div>Agreement Start Date: 09-10-2023</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-blue">
                                                    <div>JNC661001009NS53X[ก]</div>
                                                    <div>Agreement Start Date: 09-10-2023</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex grow min-w-[22%] justify-between mr-2 my-2">
                            <div class="flex-col w-full bg-swp-table-row-2-pink shadow-xl">
                                <div class="flex-col border-white m-2">
                                    <div class="text-xl text-center bg-swp-gradient-pink font-bold p-1 border border-white rounded-lg"><span class="text-white">FM</span></div>
                                    <div class="flex-col w-full bg-swp-table-row-2-pink justify-around">
                                        <div class="w-full flex-col bg-swp-table-row-1-pink border-2 border-white mt-2 pb-1">
                                            <div class="text-md text-center bg-swp-gradient-pink font-bold p-1"><span class="text-white">Contract History</span></div>
                                            <div class="bg-swp-table-row-1-pink font-bold">
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-pink">
                                                    <div>JNM670201001NF63X[M]</div>
                                                    <div>Agreement Start Date: 02-02-2024</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-pink">
                                                    <div>JNM670202002NF63X[M]</div>
                                                    <div>Agreement Start Date: 02-02-2024</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-pink">
                                                    <div>JNM670202003NF63X[M]</div>
                                                    <div>Agreement Start Date: 02-02-2024</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-pink">
                                                    <div>JNC670201004NF61X[ก]</div>
                                                    <div>Agreement Start Date: 03-02-2024</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                                <div class="flex-col text-sm p-2 my-2 mx-2 bg-swp-table-row-2-pink">
                                                    <div>JNM670201005NF62X[M]</div>
                                                    <div>Agreement Start Date: 03-02-2024</div>
                                                    <div>Outstanding Period: 0</div>
                                                    <div>Current Outstanding Period: 12</div>
                                                    <div>ปิดบัญชี (ยกเลิกสัญญา เนื่องจากข้อมูลผิดพลาด)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    // HTML ปุ่ม ที่ใช้ร่วมกันทั้ง if และ else
    html_content += `
        <br>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
            </button>
            <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                <i class="fa fa-times"></i> ยกเลิก
            </button>
        </div><br>
    `;

    frm.fields_dict.html_borrower_result.$wrapper.html(html_content);

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

function mockup_not_found_borrower(frm) {

    frm.fields_dict.html_borrower_result.$wrapper.html(`
        <div style="margin-bottom: 20px;">
                        <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                            <div style="flex: 1 1 45%; min-width: 400px;">
                                <div style="background: #80AFE0; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล VLoan</div>
                                <div style="display: flex;">
                                    <div style="flex: 1; border: 2px solid #80AFE0; margin: 4px; border-radius: 4px;">
                                        <div style="background: #b3cbe6; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                    <div style="flex: 1; border: 2px solid #80AFE0; margin: 4px; border-radius: 4px;">
                                        <div style="background: #b3cbe6; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 1 1 45%; min-width: 400px;">
                                <div style="background: #9fd19f; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล MLoan</div>
                                <div style="display: flex;">
                                    <div style="flex: 1; border: 2px solid #9fd19f; margin: 4px; border-radius: 4px;">
                                        <div style="background: #cbe6cb; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                    <div style="flex: 1; border: 2px solid #9fd19f; margin: 4px; border-radius: 4px;">
                                        <div style="background: #cbe6cb; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                            <div style="flex: 1 1 45%; min-width: 400px;">
                                <div style="background: #e6cbe6; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล PLoan</div>
                                <div style="display: flex;">
                                    <div style="flex: 1; border: 2px solid #e6cbe6; margin: 4px; border-radius: 4px;">
                                        <div style="background: #f3e6f3; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                    <div style="flex: 1; border: 2px solid #e6cbe6; margin: 4px; border-radius: 4px;">
                                        <div style="background: #f3e6f3; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 1 1 45%; min-width: 400px;">
                                <div style="background: #b3a57a; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล S22</div>
                                <div style="display: flex;">
                                    <div style="flex: 1; border: 2px solid #b3a57a; margin: 4px; border-radius: 4px;">
                                        <div style="background: #e6e0cb; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                    <div style="flex: 1; border: 2px solid #b3a57a; margin: 4px; border-radius: 4px;">
                                        <div style="background: #e6e0cb; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                            <div style="flex: 1 1 45%; min-width: 400px;">
                                <div style="background: #b3a5d1; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">ฐานข้อมูล DLoan</div>
                                <div style="display: flex;">
                                    <div style="flex: 1; border: 2px solid #b3a5d1; margin: 4px; border-radius: 4px;">
                                        <div style="background: #e6e0f3; padding: 6px; font-weight: bold;">ประวัติการทำสินเชื่อ</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                    <div style="flex: 1; border: 2px solid #b3a5d1; margin: 4px; border-radius: 4px;">
                                        <div style="background: #e6e0f3; padding: 6px; font-weight: bold;">ประวัติการค้ำประกัน</div>
                                        <div style="padding: 16px; text-align: center;">กรุณาตรวจสอบข้อมูลก่อนค่ะ!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button class="btn btn-primary" id="btn_accept_borrower" style="margin-right: 10px; padding: 8px 20px;">
                                <i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
                            </button>
                            <button class="btn btn-default" id="btn_cancel_borrower" style="padding: 8px 20px;">
                                <i class="fa fa-times"></i> ยกเลิก
                            </button>
                        </div>
                    </div>
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

function check_id_input_type(frm) {
    if (frm.doc.cus_search_id) {
        const id = frm.doc.cus_search_id;

        if (id.length === 13) {
            let sum = 0;
            for (let i = 0; i < 12; i++) {
                sum += parseInt(id.charAt(i)) * (13 - i);
            }
            let check_digit = (11 - (sum % 11)) % 10;

            if (check_digit !== parseInt(id.charAt(12))) {
                // เลขผิดเช็คว่าขึ้นต้นด้วย 6,7,8,9 → บัตรชมพู่
                if (['6', '7', '8', '9'].includes(id.charAt(0))) {
                    frm.set_value('cus_identification_type', '03');
                } else {
                    frm.set_value('cus_identification_type', '04');
                }
            } else {
                console.log("บัตรประชาชน (เลขถูกต้อง)");
                frm.set_value('cus_identification_type', '01');
            }
        } else if (id.length >= 9 && id.length !== 13) {
            frm.set_value('cus_identification_type', '02');
        }
    }
}

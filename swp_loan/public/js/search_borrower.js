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

        // Call search_customer function from loan_application.js
        frappe.call({
            method: "z_loan.api.search_customer",
            args: { search_id: frm.doc.cus_search_id, is_guarantor: 1 },
            freeze: true,
            freeze_message: __("Searching for information..."),
            callback: async function (response) {
                let data = response.message?.data ?? {};
                if (data && Object.keys(data).length > 0 && response.message.statusCode == 200) {
                    try {
                        // Check if template exists
                        if (!frappe.templates["tmpl_loan_history"]) {
                            console.error("tmpl_loan_history template not found");
                            frappe.msgprint({ 
                                title: __("Error"), 
                                message: __("Template for loan history not found"), 
                                indicator: "red" 
                            });
                            return;
                        }

                        // Render loan history
                        let label = {
                            agreement_title: (__("Contract History")),
                            guarantor_title: (__("Gurantor History")),
                            agreement_start_date: __("Agreement Start Date"),
                            outstanding_period: __("Outstanding Period"),
                            current_outstanding_period: __("Current Outstanding Period"),
                        }
                        let history_data = [];
                        let company_names = [];
                        company_names = company_names.concat(data.agreement?.map(item => item.company), data.guarantor?.map(item => item.company));
                        if (company_names.length > 0) {
                            company_names = [...new Set(company_names)];
                        }
                        company_names.forEach(company => {
                            let agreements = data.agreement?.filter(t => t.company == company);
                            let guarantors = data.guarantor?.filter(t => t.company == company);
                            let agreement_data = []
                            let guarantor_data = []
                            if (agreements) {
                                agreements.forEach(agreement => {
                                    agreement_data.push({
                                        "agreement_id": `${agreement.agreement_id}[${agreement.target}]`,
                                        "agreement_start_date": frappe.datetime.str_to_user(agreement.agreement_start_date),
                                        "outstanding_period": agreement.outstanding_period,
                                        "current_outstanding_period": agreement.current_outstanding_period,
                                        "remark": agreement.remark
                                    },)
                                });
                            }
                            if (guarantors) {
                                guarantors.forEach(guarantor => {
                                    guarantor_data.push({
                                        "agreement_id": `${guarantor.agreement_id}[${guarantor.target}]`,
                                        "agreement_start_date": frappe.datetime.str_to_user(guarantor.agreement_start_date),
                                        "outstanding_period": guarantor.outstanding_period,
                                        "current_outstanding_period": guarantor.current_outstanding_period,
                                        "remark": guarantor.remark
                                    },)
                                });
                            }
                            history_data.push({
                                "name": company,
                                "color": get_company_colors(company, null),
                                "contracts": agreement_data,
                                "guarantors": guarantor_data,
                                "is_show_agreement": agreement_data.length > 0 ? true : false,
                                "is_show_guarantor": guarantor_data.length > 0 ? true : false,
                            })
                        });

                        // Render and set HTML
                        let html = frappe.render_template("tmpl_loan_history", { 
                            label: label, 
                            contract_history: history_data 
                        });
                        loan_history.$wrapper.html(html);

                        // Set form values
                        frm.set_value('cus_is_new', 0);
                        frm.set_value('cus_first_name', data.cus_first_name);
                        frm.set_value('cus_last_name', data.cus_last_name);

                        // Show success message
                        frappe.show_alert({
                            message: __("Found customer information"),
                            indicator: "green"
                        }, 5);

                        // Show result section
                        frm.fields_dict.section_borrower_result.wrapper.show();
                    } catch (error) {
                        console.error("Error rendering loan history:", error);
                        frappe.msgprint({ 
                            title: __("Error"), 
                            message: __("Failed to render loan history"), 
                            indicator: "red" 
                        });
                    }
                } else {
                    // Clear loan history
                    loan_history.$wrapper.html("");
                    
                    // Set as new customer
                    frm.set_value('cus_is_new', 1);

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

                    // Show error message
                    let error_message = response.message?.message;
                    frappe.msgprint({ title: __("Error"), message: error_message, indicator: "red" });
                }

                // Show result section
                frm.fields_dict.section_borrower_result.wrapper.show();
            },
            error: function (response) {
                loan_history.$wrapper.html("");
                frm.set_value('cus_is_new', 1);
                frappe.msgprint({ title: __("Error"), message: __("Failed to search customer information"), indicator: "red" });
            }
        });
    });
}
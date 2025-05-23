let borrowerJsLoaded = false;
let searchBorrowerJsLoaded = false;
let guarantorJsLoaded = false;
let searchCollateralJsLoaded = false;
let collateralJsLoaded = false;
let loanConditionJsLoaded = false;
let customBannerJsLoaded = false;
let loanApplication = false;
let idCardReader = false;
let loan_history = cur_frm.get_field("loan_history_html")
let guarantorSWPJSloan = false;
let submitJSloaded = false;

 
function load_borrower_js(callback, frm) {
    if (!borrowerJsLoaded) {
        frappe.require("/assets/swp_loan/js/borrower.js", function () {
            borrowerJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_search_borrower_js(callback, frm) {
    if (!searchBorrowerJsLoaded) {
        frappe.require("/assets/swp_loan/js/search_borrower.js", function () {
            searchBorrowerJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_guarantor_js(callback, frm) {
    if (!guarantorJsLoaded) {
        frappe.require("/assets/swp_loan/js/guarantor.js", function () {
            guarantorJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_search_collateral_js(callback, frm) {
    if (!searchCollateralJsLoaded) {
        frappe.require("/assets/swp_loan/js/search_collateral.js", function () {
            searchCollateralJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_collateral_js(callback, frm) {
    if (!collateralJsLoaded) {
        frappe.require("/assets/swp_loan/js/collateral.js", function () {
            collateralJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_loan_condition_js(callback, frm) {
    if (!loanConditionJsLoaded) {
        frappe.require("/assets/swp_loan/js/loan_condition.js", function () {
            loanConditionJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_custom_banner_js(callback, frm) {
    if (!customBannerJsLoaded) {
        frappe.require("/assets/swp_loan/js/custom_banner.js", function () {
            customBannerJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_application_js(callback, frm) {
    if (!loanApplication) {
        frappe.require("/assets/swp_loan/js/loan_application.js", function () {
            loanApplication = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}
function load_idcardreader_js(callback, frm) {
    if (!idCardReader) {
        frappe.require("/assets/swp_loan/js/idcardreader.js", function () {
            idCardReader = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}

function load_GuarantorSWP_js(callback, frm) {
    if (!guarantorSWPJSloan) {
        frappe.require("/assets/swp_loan/js/validate_guarantor.js", function () {
            guarantorSWPJSloan = true;
            if (typeof callback === "function") callback(frm);  // ← ส่ง frm เข้า callback
        });
    } else {
        if (typeof callback === "function") callback(frm);      // ← ส่ง frm เข้า callback
    }
}

function load_submit_js(callback, frm) {
    if (!submitJSloaded) {
        frappe.require("/assets/swp_loan/js/submit.js", function () {
            submitJSloaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}

frappe.ui.form.on('SWP_Borrower_Address', {
    // เมื่อมีการเปลี่ยนแปลงค่าในฟิลด์ latitude
    latitude: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn];

        // เมื่อ latitude เปลี่ยนแปลงให้ปรับค่า address_location
        updateAddressLocation(child);

        frm.refresh_field('table_borrower_address');
    },

    // เมื่อมีการเปลี่ยนแปลงค่าในฟิลด์ longitude
    longitude: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn];

        // เมื่อ longitude เปลี่ยนแปลงให้ปรับค่า address_location
        updateAddressLocation(child);

        frm.refresh_field('table_borrower_address');
    },

    table_borrower_address_add: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn];
        // กำหนดค่า Latitude และ Longitude
        child.latitude = '13.888197837191681';  
        child.longitude = '100.57529891101915'; 

        // สร้าง address_location จากค่าของ latitude และ longitude
        updateAddressLocation(child);

        frm.refresh_field('table_borrower_address');
    }
});

// ฟังก์ชันในการอัพเดท address_location ตามค่า latitude และ longitude
function updateAddressLocation(child) {
    child.address_location = JSON.stringify({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(child.longitude), parseFloat(child.latitude)]
        },
        "properties": {}  // สามารถใส่ properties อื่นๆ ที่ต้องการได้
    });
}



frappe.ui.form.on("SWP_Loan_Request", {
    onload: function(frm) {
        
        load_borrower_js(function(frm) {
            initialize_date_of_birth_validation(frm);
            initialize_customer_id_validation(frm);
            initialize_cus_issue_date_validation(frm);
            initialize_cus_expiry_date_validation(frm);
            fn_btn_save_borrower(frm);
        }, frm);

        load_custom_banner_js(function(frm) {
            initialize_custom_banner(frm);
        }, frm);

        // แสดงข้อความในฟิลด์ html_borrower_search_remark
        frm.fields_dict.html_borrower_search_remark.$wrapper.html(`
            <div style="color: red; font-size: 14px;">
                กรอกหมายเลขบัตรประชาชนของลูกค้า 13 หลัก หรือ เลข Passport เพื่อตรวจสอบข้อมูลในระบบก่อน! หรือ สามารถใส่บัตรประชาชนในเครื่องอ่านบัตร และกด ปุ่มอ่านบัตร/ค้นหา
            </div><br>
        `);

        load_search_borrower_js(function(frm) {
            initialize_borrower_search_header(frm);
            fn_search_borrower(frm);
        }, frm);
        
        load_guarantor_js(function(frm){
            initialize_guarantor_header(frm);
            initialize_no_guarantor_checkbox(frm);
            fn_btn_save_guarantor(frm);
        }, frm)

        load_borrower_js(function(frm) {
            initialize_borrower_header(frm);
            initialize_marketing_consent_radio_button(frm);
            initialize_sensitive_data_consent_radio_button(frm);
        }, frm);

        load_search_collateral_js(function(frm) {
            initialize_collateral_search_header(frm);
        }, frm);
        
        load_collateral_js(function(frm) {
            initialize_collateral_header(frm);
            fn_btn_save_collateral(frm);
        }, frm);
        
        load_loan_condition_js(function(frm) {
            initialize_loan_condition_header(frm);
            fn_btn_save_loan_condition(frm);
        }, frm);
        
        load_submit_js(function(frm) {
            fn_btn_submit(frm);
        }, frm);
        
        // ----------------------------------------------- Start --- ขั้นตอนสร้างเอกสารใหม่
        if (frm.is_new()) {
            const address_defaults = [
                { def_address_type: "บัตรประชาชน" },
                { def_address_type: "ทะเบียนบ้าน" },
                { def_address_type: "ที่อยู่ปัจจุบัน" },
                { def_address_type: "ที่ทำงาน" }
            ];
            address_defaults.forEach(data => {
                let row = frm.add_child('table_borrower_address');
                row.address_type = data.def_address_type;
            });
            frm.refresh_field('table_borrower_address');
            
            const social_defaults = [
                { social_type: "Email", social_remark: "email@example.com" },
                { social_type: "Line", social_remark: "line_id" },
                { social_type: "Facebook", social_remark: "facebook_username" },
                { social_type: "Instagram", social_remark: "instagram_handle" },
                { social_type: "Tiktok", social_remark: "tiktok_account" }
            ];
            social_defaults.forEach(data => {
                let row = frm.add_child('table_borrower_social_info');
                row.platform = data.social_type;
                row.remark = data.social_remark;
            });
            frm.refresh_field('table_borrower_social_info');
        }
        // ----------------------------------------------- End --- ขั้นตอนสร้างเอกสารใหม่

        
        // ----------------------------------------------- Start --- Disable save button
        frm.disable_save();
        // ----------------------------------------------- End --- Disable save button
        

        // ----------------------------------------------- Start --- ข้อมูลใน field virtual ยอดจัด
        frm.fields_dict.banner_financing_amount_net.$wrapper
            .find('.like-disabled-input')
            .css({
                "text-align": "right"
            });
        // ----------------------------------------------- End --- ข้อมูลใน field virtual ยอดจัด

        // ----------------------------------------------- Start --- ข้อมูลใน field virtual ค่าธรรมเนียม
        frm.fields_dict.banner_total_fees_net.$wrapper
            .find('.like-disabled-input')
            .css('text-align', 'right');
        // ----------------------------------------------- End --- ข้อมูลใน field virtual ค่าธรรมเนียม

        // ----------------------------------------------- Start --- ข้อมูลใน field virtual ยอดโอน
        frm.fields_dict.banner_remaining_transfer_amount.$wrapper
            .find('.like-disabled-input')
            .css('text-align', 'right');
        // ----------------------------------------------- End --- ข้อมูลใน field virtual ยอดโอน

        // ----------------------------------------------- Start --- Disable add row button on child table
        frm.fields_dict.table_fees.grid.cannot_add_rows = true;
        frm.fields_dict.table_insurance.grid.cannot_add_rows = true;
        frm.fields_dict.table_deduction.grid.cannot_add_rows = true;
        frm.fields_dict.table_outstanding_balance.grid.cannot_add_rows = true;
        // End   --- Disable add row button on child table

        // Add refresh call with 1 second delay
        setTimeout(function() {
            frm.refresh();
        }, 1000);
    },

    refresh(frm) { 

        load_idcardreader_js(function(frm) {
            call_SDK_ID_Card(frm);
        }, frm);


        load_application_js(function(frm) {
            set_col_model_year_options(frm);
            set_registration_year_options(frm);
            set_col_year_of_possession_options(frm);
            update_days_options(frm);
            disable_application_source(frm);
            display_fields_by_cus_customer_type(frm);
            display_fields_by_col_product(frm);
            hide_add_button_loan_field_checking_connection(frm);
            set_filter_col_product(frm);
            setup_custom_add_button_for_all_tables(frm);
        }, frm);
        
        load_borrower_js(function(frm) {
            fn_btn_duplicate(frm);
            ['table_borrower_address', 'table_borrower_social_info', 'table_transfer'].forEach(fieldname => {
                bindMoveDeleteButtonOnCheck(frm, fieldname);
            });
            initialize_borrower_search(frm);
        }, frm);

        frm.fields_dict.section_header_document.wrapper.hide();
        frm.fields_dict.section_header_borrower.wrapper.hide();
        frm.fields_dict.section_borrower_result.wrapper.hide();
        frm.fields_dict.section_preview.wrapper.hide();
        frm.fields_dict.section_borrower_details.wrapper.hide();
        frm.fields_dict.section_borrower_details2.wrapper.hide();
        frm.fields_dict.section_borrower_details3.wrapper.hide();
        frm.fields_dict.section_borrower_details4.wrapper.hide();
        frm.fields_dict.section_borrower_details5.wrapper.hide();
        frm.fields_dict.section_borrower_details6.wrapper.hide();
        frm.fields_dict.section_borrower_details7.wrapper.hide();
        frm.fields_dict.section_borrower_details8.wrapper.hide();
        frm.fields_dict.section_borrower_details9.wrapper.hide();
        frm.fields_dict.section_borrower_details10.wrapper.hide();
        frm.fields_dict.section_borrower_details11.wrapper.hide();
        frm.fields_dict.section_borrower_details12.wrapper.hide();
        frm.fields_dict.section_borrower_details13.wrapper.hide();
        frm.fields_dict.section_borrower_details14.wrapper.hide();
        frm.fields_dict.section_header_guarantor.wrapper.hide();
        frm.fields_dict.section_guarantor.wrapper.hide();
        frm.fields_dict.section_guarantor2.wrapper.hide();
        frm.fields_dict.section_header_collateral.wrapper.hide();
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
        frm.fields_dict.section_header_loan_condition.wrapper.hide();
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
        frm.fields_dict.section_loan_condition14_2.wrapper.hide();
        frm.fields_dict.section_loan_condition15.wrapper.hide();
        frm.fields_dict.section_header_collateral_search.wrapper.hide();
        frm.fields_dict.section_collateral_search.wrapper.hide();
        frm.fields_dict.section_input_progress_bar.wrapper.hide();
        frm.fields_dict.section_form_action.wrapper.hide();

        // แสดง section สำหรับหน้าเอกสารที่สร้างใหม่หรือสถานะเป็น Draft อยู่
        if (!frm.is_new() || frm.doc.status == 'Draft') {
            // Hide borrower search sections first
            frm.fields_dict.section_header_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_result.wrapper.hide();
            

            // Then show other sections
            frm.fields_dict.section_header_borrower.wrapper.show();
            frm.fields_dict.section_preview.wrapper.show();
            frm.fields_dict.section_borrower_details.wrapper.show();

            // Show all borrower sections
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

            frm.fields_dict.section_header_guarantor.wrapper.show();
            frm.fields_dict.section_guarantor.wrapper.show();
            frm.fields_dict.section_guarantor2.wrapper.show();

            // Check if we need to scroll to guarantor section
            if (window.justSavedBorrower) {
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: frm.fields_dict.section_header_guarantor.wrapper.offset().top - 50
                    }, 500);
                    window.justSavedBorrower = false;
                }, 1500); // Increased delay to ensure page is fully loaded
            }

            frm.fields_dict.section_header_collateral_search.wrapper.show();
            frm.fields_dict.section_collateral_search.wrapper.show();
            frm.fields_dict.section_header_collateral.wrapper.show();
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
            frm.fields_dict.section_loan_condition14_2.wrapper.show();
            frm.fields_dict.section_loan_condition15.wrapper.show();
            frm.fields_dict.section_input_progress_bar.wrapper.show();
            frm.fields_dict.section_form_action.wrapper.show();

            // Initialize collateral search section
            load_collateral_js(function(frm) {
                initialize_collateral_search(frm);
            }, frm);
        }

        if (frm.doc.status_flag == 'Pending Approval') {
            frm.fields_dict.section_header_document.wrapper.show();
        }


        // ----------------------------------------------- Start ซ่อนปุ่ม print
        $('use[href="#icon-printer"]')
            .closest('button')
            .hide();
        // ----------------------------------------------- End ซ่อนปุ่ม print
        
        // ----------------------------------------------- Start สีขอบของ field ทั้งหมด
        frm.$wrapper
            .find('.frappe-control input, .frappe-control textarea, .frappe-control select')
            .css({
                "border": "1px solid darkgrey",
            });
        // ----------------------------------------------- End สีขอบของ field ทั้งหมด

        // ----------------------------------------------- Start --- เลขที่ใบสมัครขอสินเชื่อ
        frm.fields_dict.internal_loan_application_id.$wrapper
            .find('.form-control')
            .css({
                "border": "2px solid #007bff"
            });
        // ----------------------------------------------- End --- เลขที่ใบสมัครขอสินเชื่อ

        // ----------------------------------------------- Start input progress bar
        let progress_bar_html = `
        <div id="step-progress-bar" style="display: flex; justify-content: space-around; margin-bottom: 20px;">
            <div class="step" data-step="1">
                <div class="circle">1</div>
                <div class="label">ผู้กู้</div>
            </div>
            <div class="step" data-step="2">
                <div class="circle">2</div>
                <div class="label">ผู้ค้ำ</div>
            </div>
            <div class="step" data-step="3">
                <div class="circle">3</div>
                <div class="label">หลักประกัน</div>
            </div>
            <div class="step" data-step="4">
                <div class="circle">4</div>
                <div class="label">รายละเอียดสินเชื่อ</div>
            </div>
        </div>

        <style>
            #step-progress-bar .step {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
            }

            #step-progress-bar .circle {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #e0e0e0;
                color: #555;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 5px;
            }

            #step-progress-bar .label {
                font-size: 13px;
                text-align: center;
                color: #555;
            }

            #step-progress-bar .step.active .circle {
                background-color: #ff914d;
                color: white;
            }

            #step-progress-bar .step.active .label {
                font-weight: bold;
                color: #ff914d;
            }
        </style>
        `;

        frm.fields_dict.input_progress_bar.$wrapper.html(progress_bar_html);

        // กำหนดขั้นตอนที่ active เริ่มต้น
        set_active_step(1);

        function set_active_step(step_number) {
            $('#step-progress-bar .step').removeClass('active');
            $(`#step-progress-bar .step[data-step="${step_number}"]`).addClass('active');
        }
        
        const stepToSectionMap = {
            1: 'section_header_borrower',
            2: 'section_header_guarantor',
            3: 'section_header_collateral',
            4: 'section_header_loan_condition'
        };
        
        // เพิ่ม event สำหรับคลิกที่วงกลม
        $('#step-progress-bar .step').on('click', function () {
            const stepNumber = $(this).data('step');
            const sectionFieldname = stepToSectionMap[stepNumber];
        
            if (sectionFieldname && frm.fields_dict[sectionFieldname]) {
                const sectionWrapper = frm.fields_dict[sectionFieldname].wrapper;
        
                // Scroll ไปยังตำแหน่งของ section นั้น
                $('html, body').animate({
                    scrollTop: $(sectionWrapper).offset().top - 50 // เว้นระยะห่างขอบจอด้านบน
                }, 500); // ระยะเวลาเลื่อน 0.5 วินาที
        
                // ตั้งค่า active สีใน progress bar
                set_active_step(stepNumber);
            }
        });
        // ----------------------------------------------- End input progress bar


        // ----------------------------------------------- Start --- Attachment custom button
        frm.add_custom_button(
            '<i class="fa fa-plus" style="margin-right: 5px;"></i> เพิ่มเอกสารแนบ',
            function () {
                // const url = 'http://10.1.112.126:8000/app/file-attachment/IA000%E0%B8%AEQ250400001';
                const url = '/app/swp-file-attachment/' + frm.doc.name;
                const width = 1000;
                const height = 700;
                const left = (window.screen.width / 2) - (width / 2);
                const top = (window.screen.height / 2) - (height / 2);
        
                window.open(
                    url,
                    'เอกสารแนบ',
                    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
                );
            }
        ).css({
            "background-color": "#007bff",
            "color": "#fff",
            "border": "none",
            "box-shadow": "0 0 15px rgba(0,123,255,0.6)",
            "animation": "pulseGlow 1.5s infinite"
        });
        
        // Animation
        $(`<style>
        @keyframes pulseGlow {
            0% {
                box-shadow: 0 0 10px rgba(0,123,255, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(0,123,255, 1);
            }
            100% {
                box-shadow: 0 0 10px rgba(0,123,255, 0.5);
            }
        }
        </style>`).appendTo("head");
        // ----------------------------------------------- End --- Attachment custom button


        // ปุ่มเพิ่มใบคำขอใหม่ // Start
        frm.add_custom_button(
            __('เพิ่มใบคำขอใหม่'),
            function() {
                frappe.new_doc('SWP_Loan_Request', {}, (doc) => {
                    // Refresh the page after 1 second
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                });
            }
        )
        // ปุ่มเพิ่มใบคำขอใหม่ // End


        // ----------------------------------------------- Start --- Scroll button
        // Check existing button (because this function use in refresh event)
        if (!frm.page.scroll_buttons_added) {
            // HTML Scroll to top
            let $btnTop = $(`<button class="btn btn-secondary" style="position:fixed; bottom:80px; right:30px; z-index:1000; display:none;">
                                <i class="fa fa-arrow-up"></i> เลื่อนบนสุด
                            </button>`);

            // HTML Scroll to bottom
            let $btnBottom = $(`<button class="btn btn-secondary" style="position:fixed; bottom:30px; right:30px; z-index:1000; display:none;">
                                    <i class="fa fa-arrow-down"></i> เลื่อนล่างสุด
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

            // Scroll to top
            $btnTop.on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });

            // Scroll to bottom
            $btnBottom.on('click', function() {
                $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            });

            frm.page.scroll_buttons_added = true; // protect duplicate button
        }
        // ----------------------------------------------- End --- Scroll button

        // ----------------------------------------------- Start --- Collateral search button
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
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',
            });
        // ----------------------------------------------- End --- Collateral search button

        
        // ----------------------------------------------- Start --- Collateral search button
        frm.fields_dict.btn_search_collateral_ocr.$wrapper
            .css({
                "text-align": "left",
            })
            .find("button")
            .removeClass("btn-xs btn-default")
            .addClass("btn-md btn-info")
            .css({
                "font-size": "16px",
                "padding": "8px 16px",
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',
            });
        // ----------------------------------------------- End --- Collateral search button

            
        
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
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',                
            });
        // ----------------------------------------------- End --- Land search button

        // ----------------------------------------------- Start --- Campaign search button
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
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',
            });
        // ----------------------------------------------- End --- Campaign search button

        

        // ----------------------------------------------- Start --- Loan condition calculate button
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
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',
            });
        // ----------------------------------------------- End --- Loan condition calculate button

        
        // ----------------------------------------------- Start --- Collateral save button
        load_collateral_js(function(frm) {
            initialize_collateral_header(frm);
            fn_btn_save_collateral(frm);
            fn_btn_find_rate_book(frm);
        }, frm);

        load_search_collateral_js(function(frm) {
            initialize_collateral_search_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Collateral save button

        // ----------------------------------------------- Start --- Loan condition save button
        load_loan_condition_js(function(frm) {
            fn_btn_save_loan_condition(frm);
            initialize_loan_condition_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Loan condition save button

        // ----------------------------------------------- Start --- Borrower search
        load_search_borrower_js(function(frm) {
            initialize_borrower_search_header(frm);
            fn_search_borrower(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower search
        
        // ----------------------------------------------- Start --- Borrower save button
        load_borrower_js(function(frm) {
            fn_btn_save_borrower(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower save button

        // load_GuarantorSWP_js(function(frm){
        //     fn_btn_save_borrower_SWP(frm);
        // }, frm);

        // ----------------------------------------------- Start --- Borrower save button
        load_guarantor_js(function(frm) {
            initialize_guarantor_header(frm);
            fn_btn_save_guarantor(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower save button

        load_submit_js(function(frm) {
            fn_btn_submit(frm);
        }, frm);



        // ----------------------------------------------- Start --- Submit button
        frm.fields_dict.btn_submit.$wrapper
        .css({
            "text-align": "center",
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
            frm.set_value('status_flag', 'Pending Approval');
            frm.save().then(() => {
                frappe.show_alert({
                    message: 'สร้างใบคำขอสำเร็จ ระบบจะส่งให้ผู้อนุมัติโดยอัตโนมัติ',
                    indicator: 'green'
                }, 7);

                // Redirect to the specified URL after a short delay
                setTimeout(function() {
                    window.location.href = '/app/swp_loan_request';
                }, 2000); // 2 seconds delay to show the alert message
            });
        });
        // ----------------------------------------------- End --- Submit button

        

        // ----------------------------------------------- Start --- Hyperlink for open Treasury department website
        let html_hyperlink_treasury_page = `
            <a href="ttps://landsmaps.dol.go.th/" target="_blank" style="color: black; text-decoration: underline; font-size: 13px;">
                ค้นหาราคากรมธนารักษ์
            </a>
        `;
        frm.fields_dict['hyperlink_treasury_page'].wrapper.innerHTML = html_hyperlink_treasury_page;
        // ----------------------------------------------- End --- Hyperlink for open Treasury department website



        // ----------------------------------------------- Start --- Hyperlink for open DOL website
        let html_hyperlink_dol_page = `
            <a href="้https://landsmaps.dol.go.th/" target="_blank" style="color: black; text-decoration: underline; font-size: 13px;">
                ค้นหาข้อมูลกรมที่ดิน
            </a>
        `;
        frm.fields_dict['hyperlink_dol_page'].wrapper.innerHTML = html_hyperlink_dol_page;
        // ----------------------------------------------- End --- Hyperlink for open DOL website
    },
    
    
    col_year_of_possession: function (frm) {
        update_days_options(frm);
        calculate_total_days(frm);
        if ((frm.doc.col_day_of_possession != "" || frm.doc.col_day_of_possession != null) && frm.doc.col_month_of_possession == 2) {
            frm.set_value("col_day_of_possession", "");
        }
    },
    col_month_of_possession: function (frm) {
        update_days_options(frm);
        calculate_total_days(frm);
        if (frm.doc.col_day_of_possession != "" || frm.doc.col_day_of_possession != null) {
            frm.set_value("col_day_of_possession", "");
        }
    },
    col_day_of_possession: function (frm) {
        calculate_total_days(frm);
    },
    
    col_product: function (frm) {
        display_agenda_button_by_product(frm);
        if (frm.col_product_prev_value) {
            if (frm.col_product_prev_value != frm.doc.col_product && frm.col_product_confirm_dialog == undefined) {
                frm.col_product_confirm_dialog = frappe.confirm(__("Do you want to change Collateral type ?"), () => {
                    frm.col_product_prev_value = frm.doc.col_product;
                    frm.col_product_confirm_dialog = undefined;

                    // frm.set_value("sales_kit_number", null);
                    if (frm.doc.application_source == "Sales Kit") {
                        frm.set_value("application_source", null);
                    }
                    // clear subproduct
                    frm.doc.col_subproduct = null;
                    frm.col_subproduct_prev_value = null;
                    frm.refresh_field("col_subproduct");
                    clear_value_by_subproduct(frm);

                    set_filter_col_product(frm);
                    defualt_field_from_collateral_id(frm);

                    display_fields_by_col_product(frm);
                }, () => {
                    frm.doc.col_product = frm.col_product_prev_value;
                    frm.col_product_confirm_dialog = undefined;
                    frm.doc.col_collatteral_id = frm.col_collatteral_id_prev_value;
                    frm.refresh_field("col_collatteral_id");
                    frm.refresh_field("col_product");
                });
            }
        }
        else {
            frm.col_product_prev_value = frm.doc.col_product;
            frm.doc.col_subproduct = null;
            frm.col_subproduct_prev_value = null;
            frm.refresh_field("col_subproduct");
            clear_value_by_subproduct(frm);

            set_filter_col_product(frm);
            defualt_field_from_collateral_id(frm);
            display_fields_by_col_product(frm);
        }
    },
    col_subproduct: function (frm) {
        if ((frm.doc.col_product != "H" && frm.doc.col_product != "L") || ((frm.doc.col_product == "H" || frm.doc.col_product == "L") )) {
            if (frm.col_subproduct_confirm_dialog?.display) {
                return;
            }
            if (frm.col_subproduct_prev_value) {
                frm.col_subproduct_confirm_dialog = frappe.confirm(__("Do you want to change Collateral type ?"), () => {
                    frm.col_subproduct_prev_value = frm.doc.col_subproduct;
                    clear_value_by_subproduct(frm);
                }, () => {
                    frm.doc.col_subproduct = frm.col_subproduct_prev_value;
                    frm.refresh_field("col_subproduct");
                });
            }
            else {
                frm.col_subproduct_prev_value = frm.doc.col_subproduct;
                clear_value_by_subproduct(frm);
            }
        }
    },
    col_model_year: function (frm) {
        if (frm.doc.col_model_year) {
            let current_date = frappe.datetime.now_date()
            let current_year = current_date.substring(0, current_date.indexOf("-"))
            let model_year = frm.doc.col_model_year
            let col_age = current_year - model_year + 1;
            frm.set_value("col_age", col_age);
        }
    },
    cus_search_id: function (frm) {
        load_search_borrower_js(function(frm) {
            fn_search_borrower2(frm);
        }, frm);
    },
    cus_issuer: function (frm) {
        if(frm.doc.cus_issuer=='01'){
            mockup_found_borrower_not_blacklist(frm);
        }     
    },
    
    

    // table_transfer_on_form_rendered(frm) {
    //     const rows = frm.doc.table_transfer || [];

    //     if (rows.length > 0) {
    //         frm.fields_dict.table_transfer.grid.grid_rows.forEach(gridRow => {
    //             // ใช้ gridRow.grid_form.fields_dict เพื่อเข้าถึง field ภายใน child form
    //             const fields = gridRow.grid_form.fields_dict;

    //             fields.bank_account.$wrapper
    //                 .find('.control-label')
    //                 .html('บัญชีธนาคารผู้กู้ <span class="text-danger">*</span>');

    //             fields.bank_account_type.$wrapper
    //                 .find('.control-label')
    //                 .html('ประเภทบัญชี <span class="text-danger">*</span>');

    //             fields.bank_account_number.$wrapper
    //                 .find('.control-label')
    //                 .html('เลขที่บัญชี <span class="text-danger">*</span>');

    //             fields.bank_account_name.$wrapper
    //                 .find('.control-label')
    //                 .html('ชื่อบัญชีธนาคารผู้กู้ <span class="text-danger">*</span>');
    //         });
    //     } else {
    //         console.warn("ไม่มีข้อมูลใน table_transfer");
    //     }
    // }
    table_transfer_on_form_rendered(frm) {
        const rows = frm.doc.table_transfer || [];

        if (rows.length > 0) {
            frm.fields_dict.table_transfer.grid.grid_rows.forEach(gridRow => {
                const childFrm = gridRow.grid_form;

                load_loan_condition_js(function(loadedFrm) {
                    initialize_loan_condition_header_table_transfer(loadedFrm);
                }, childFrm);
            });
        } else {
            console.warn("ไม่มีข้อมูลใน table_transfer");
        }
    },

    col_button_search_collateral(frm) {
        console.log(frm.doc.col_search_collateral);
        if (frm.doc.col_search_collateral) {
            let search_collateral_id = frm.doc.col_search_collateral;
            frappe.call({
                method: "swp_loan.api.search_collateral",
                args: {
                    search_collateral_id: search_collateral_id
                },
                freeze: true,
                freeze_message: __("กำลังค้นหาข้อมูล กรุณารอสักครู่.."),
                callback: function (response) {
                    let data = response.message?.data ?? {};
                    console.log(response);
                    if (data && Object.keys(data).length > 0 && response.message.statusCode == 200) {
                        // if (data.col_is_collateral_blocked) {
                        //     frm.doc.col_collateral_blocked_status = data["col_collateral_blocked_status"];
                        //     if (frm.doc.col_is_collateral_blocked) {
                        //         render_collateral_blocked_message(frm);
                        //     }
                        //     else {
                        //         frm.doc.col_collateral_blocked_status = data["col_collateral_blocked_status"];
                        //         if (frm.doc.col_is_collateral_blocked) {
                        //             render_collateral_blocked_message(frm);
                        //         }
                        //         else {
                        //             frm.set_value("col_is_collateral_blocked", true);
                        //         }
                        //     }
                        //     frm.set_value("col_collatteral_id", "");
                        //     frm.col_collatteral_id_prev_value = "";
                        //     frm.set_value("col_product", null);
                        // }
                        // else {
                        //     frm.doc.col_search_collateral = "";
                        //     frm.refresh_field("col_search_collateral");
                        //     let field_names = frm.meta.fields.map(field => field.fieldname);
                        //     for (let key in data) {
                        //         if (data.hasOwnProperty(key) && field_names.includes(key)) {
                        //             frm.doc[key] = data[key];
                        //             frm.refresh_field(key);
                        //         }
                        //     }

                        //     display_fields_by_col_product(frm);
                        //     display_agenda_button_by_product(frm);
                        //     if (data.agreement?.length > 0) {
                        //         let agreement_outstanding = data.agreement?.find(t => cint(t.outstanding_amount) != 0);
                        //         if (agreement_outstanding) {
                        //             frm.set_value("loan_reference_agreement_number", agreement_outstanding?.agreement_id);
                        //             frm.set_value("loan_reference_agreement_company", agreement_outstanding?.company);
                        //             frm.set_value("loan_reference_agreement_requested_amount", agreement_outstanding?.requested_amount);
                        //         }
                        //         render_collateral_info(frm, data.agreement);
                        //     }
                        //     frm.trigger("col_is_collateral_blocked");
                        //     if (!frm.doc.col_is_collateral_new) {
                        //         frm.trigger("col_is_collateral_new");
                        //     }
                        //     else {
                        //         frm.set_value("col_is_collateral_new", false);
                        //     }
                        //     validate_date_of_license_expiry(frm);
                        //     validate_date_of_tax_expiry(frm);

                        //     if(frm.doc.sales_kit_number) {
                        //         frappe.db.get_doc("Sales Kit", frm.doc.sales_kit_number).then((doc) => {
                        //             if(doc.col_search_collateral == frm.doc.col_collatteral_id) {
                        //                 if(["H", "L"].includes(doc.col_product)) {
                        //                     frm.doc.col_appraisal_value = doc.col_hl_appraisal_value;
                        //                     frm.doc.col_appraisal_value_by_branch = doc.col_branch_hl_appraisal_value;
                        //                     frm.doc.col_appraisal_value_by_crd = doc.col_crd_hl_appraisal_value;
                        //                 }
                        //                 else {
                        //                     frm.doc.col_appraisal_value = doc.col_vehicle_appraisal_value;
                        //                     frm.doc.col_appraisal_value_by_branch = doc.col_branch_vehicle_appraisal_value;
                        //                     frm.doc.col_appraisal_value_by_crd = doc.col_crd_vehicle_appraisal_value;
                        //                 }
                        //                 frm.refresh_field("col_appraisal_value");
                        //                 frm.refresh_field("col_appraisal_value_by_branch");
                        //                 frm.refresh_field("col_appraisal_value_by_crd");
                        //             }
                        //         });
                        //     }

                        //     frappe.show_alert({
                        //         message: __("Found Collateral information"),
                        //         indicator: "yellow"
                        //     }, 5);
                        // }
                    }
                    else {
                        frm.doc.col_search_collateral = "";
                        frm.refresh_field("col_search_collateral");

                        frm.set_value("col_collatteral_id", search_collateral_id);
                        frm.col_collatteral_id_prev_value = search_collateral_id;

                        frm.set_value("col_vehicle_identification_number", search_collateral_id);
                        frm.set_value("col_is_collateral_new", true);
                        // frm.set_value("col_is_collateral_blocked", false);
                        if (frm.doc.sales_kit_number && frm.doc.cus_is_customer_blocked == false) {
                            set_fields_by_sales_kit(frm);
                        }
                        frappe.show_alert({
                            message: response.message?.message,
                            indicator: "yellow"
                        }, 5);
                    }
                },
                error: function (response) {
                    frm.doc.col_search_collateral = "";
                    frm.refresh_field("col_search_collateral");

                    frm.set_value("col_collatteral_id", search_collateral_id);
                    frm.col_collatteral_id_prev_value = search_collateral_id;

                    frm.set_value("col_vehicle_identification_number", search_collateral_id);
                    frm.set_value("col_is_collateral_new", true);
                    // frm.set_value("col_is_collateral_blocked", false);
                    if (frm.doc.sales_kit_number && frm.doc.cus_is_customer_blocked == false) {
                        set_fields_by_sales_kit(frm);
                    }
                }
            });
        }
        else {
            frm.set_value("col_collatteral_id", "");
            frm.col_collatteral_id_prev_value = "";
        }
    }

});

frappe.ui.form.on('SWP_Related_Person', {
    telephone: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        // ตรวจสอบว่ามีค่า
        if (row.telephone && !/^\d{10}$/.test(row.telephone)) {
            frappe.show_alert({
                message: __('กรุณากรอกเบอร์โทรให้ถูกต้อง (10 หลัก)'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'telephone', '');
            frm.refresh_field('table_related_person');
        }
    }
});

frappe.ui.form.on('SWP_Guarantor', {
    identification_telephone: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        // ตรวจสอบว่ามีค่า
        if (row.identification_telephone && !/^\d{10}$/.test(row.identification_telephone)) {
            frappe.show_alert({
                message: __('กรุณากรอกเบอร์โทรให้ถูกต้อง (10 หลัก)'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'identification_telephone', '');
            frm.refresh_field('table_guarantor');
        }
    }
});


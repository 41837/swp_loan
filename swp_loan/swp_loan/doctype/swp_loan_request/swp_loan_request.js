let borrowerJsLoaded = false;
let searchBorrowerJsLoaded = false;
let guarantorJsLoaded = false;
let searchCollateralJsLoaded = false;
let collateralJsLoaded = false;
let loanConditionJsLoaded = false;
 
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


frappe.ui.form.on("SWP_Loan_Request", {
    onload: function(frm) {
        // Initialize date of birth validation
        load_borrower_js(function(frm) {
            initialize_date_of_birth_validation(frm);
            initialize_customer_id_validation(frm);
        }, frm);

        // แสดงข้อความในฟิลด์ html_borrower_search_remark
        frm.fields_dict.html_borrower_search_remark.$wrapper.html(`
            <div style="color: red; font-size: 14px;">
                กรอกหมายเลขบัตรประชาชนของลูกค้า 13 หลัก หรือ เลข Passport เพื่อตรวจสอบข้อมูลในระบบก่อน! หรือ สามารถใส่บัตรประชาชนในเครื่องอ่านบัตร และกด ปุ่มอ่านบัตร/ค้นหา
            </div><br>
        `);

        // ----------------------------------------------- Start --- Header borrower search section
        let html_header_borrower_search = `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
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
        // ----------------------------------------------- End --- Header borrower search section



        // ----------------------------------------------- Start --- Header borrower section
        let html_header_borrower = `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ข้อมูลผู้กู้</div>
            <button id="toggle-borrower-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;
        
        frm.fields_dict.header_borrower.$wrapper.html(html_header_borrower);
        
        let isCollapsed_header_borrower = false;
        
        $("#toggle-borrower-btn").on("click", function () {
            isCollapsed_header_borrower = !isCollapsed_header_borrower ;
        
            if (isCollapsed_header_borrower) {
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
                $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            } else {
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
                $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }
        });
        // ----------------------------------------------- End --- Header borrower section



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

        // ----------------------------------------------- Start --- สีของ header เอกสาร
        $(frm.fields_dict.section_header_document?.wrapper)
            .css({
                "background-color": "#C5D9F1"
            })
            .find('.section-head')
            .css({
                // "background-color": "#d6deb8", //เขียว
                "background-color": "#abc1e4", //ฟ้า
                // "background-color": "#dccbe7", //ม่วง บริษัท ศรีสวัสดิ์ ดิจิตอล จำกัด
                "border-radius": "6px",
                "text-align": "center",
                "color": "black"
            });
        // ----------------------------------------------- End--- สีของ header เอกสาร


        
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

        // ----------------------------------------------- Start --- Header collateral search section
        load_search_collateral_js(function(frm) {
            initialize_collateral_search_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Header collateral search section

        // ----------------------------------------------- Start --- Header collateral section
        load_collateral_js(function(frm) {
            initialize_collateral_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Header collateral section

        // ----------------------------------------------- Start --- Header loan condition section
        load_loan_condition_js(function(frm) {
            initialize_loan_condition_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Header loan condition section

        
        // ----------------------------------------------- Start --- Header guarantor section
        let html_header_guarantor= `
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
        // ----------------------------------------------- End --- Header guarantor section

    },

    refresh(frm) {

        
        set_col_model_year_options(frm);
        set_registration_year_options(frm);
        set_col_year_of_possession_options(frm);
        update_days_options(frm);
        // set_application_source_options(frm);
        disable_application_source(frm);
        display_fields_by_cus_customer_type(frm);
        display_fields_by_col_product(frm);
        hide_add_button_loan_field_checking_connection(frm);
        set_disable_fields(frm);
        // set filters
        set_filter_col_product(frm);
       
        load_borrower_js(function(frm) {
            initialize_borrower_search(frm);
        }, frm);

        frm.fields_dict.section_header_document.wrapper.hide();
        frm.fields_dict.section_header_borrower.wrapper.hide();
        frm.fields_dict.section_borrower_result.wrapper.hide();
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
        frm.fields_dict.section_loan_condition15.wrapper.hide();
        frm.fields_dict.section_header_collateral_search.wrapper.hide();
        frm.fields_dict.section_collateral_search.wrapper.hide();
        frm.fields_dict.section_input_progress_bar.wrapper.hide();
        frm.fields_dict.section_form_action.wrapper.hide();

        // Show all sections if document is not new
        if (!frm.is_new()) {
            // Hide borrower search sections first
            frm.fields_dict.section_header_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_search.wrapper.hide();
            frm.fields_dict.section_borrower_result.wrapper.hide();

            // Then show other sections
            frm.fields_dict.section_header_document.wrapper.show();
            frm.fields_dict.section_header_borrower.wrapper.show();
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
            frm.fields_dict.section_loan_condition15.wrapper.show();
            frm.fields_dict.section_input_progress_bar.wrapper.show();
            frm.fields_dict.section_form_action.wrapper.show();

            // Initialize collateral search section
            load_collateral_js(function(frm) {
                initialize_collateral_search(frm);
            }, frm);

            // Reinitialize header_guarantor HTML content
            let html_header_guarantor = `
            <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ผู้ค้ำ</div>
                <button id="toggle-guarantor-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                    <i class="fa fa-chevron-up"></i>
                </button>
            </div>
            `;
            frm.fields_dict.header_guarantor.$wrapper.html(html_header_guarantor);

            // Reinitialize has_guarantor checkbox
            frm.fields_dict.has_guarantor.$wrapper.html(`
                <div style="margin: 10px 0;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="has_guarantor_checkbox" style="margin-right: 8px;">
                        <span>ไม่มีผู้ค้ำ</span>
                    </label>
                </div>
            `);

            // Reinitialize event handlers
            $("#has_guarantor_checkbox").on("change", function() {
                if ($(this).is(":checked")) {
                    frm.fields_dict.section_guarantor.wrapper.show();
                    $("#toggle-guarantor-btn i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                } else {
                    frm.fields_dict.section_guarantor.wrapper.hide();
                    $("#toggle-guarantor-btn i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                }
            });

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
            fn_btn_save_collateral(frm);
            initialize_collateral_header(frm);
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

        // ----------------------------------------------- Start --- Borrower search button
        load_search_borrower_js(function(frm) {
            fn_search_borrower(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower search button
        
        // ----------------------------------------------- Start --- Borrower save button
        load_borrower_js(function(frm) {
            fn_btn_save_borrower(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower save button

        // ----------------------------------------------- Start --- Borrower save button
        load_guarantor_js(function(frm) {
            fn_btn_save_guarantor(frm);
            initialize_guarantor_header(frm);
        }, frm);
        // ----------------------------------------------- End --- Borrower save button



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
            frm.set_value('status_flag', 'Waiting approve');
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
            <a href="ttps://landsmaps.dol.go.th/" target="_blank" style="color: black; text-decoration: underline; font-size: 13px;">
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
    // ----------------------------------------------- Start --- On change field cus_search_id
    cus_search_id: function(frm) {
        // If has value
        if (frm.doc.cus_search_id) {
            frm.fields_dict.cus_search_id.$wrapper
                .closest('.frappe-control')
                .find('.control-label')
                .css('color', '');
        }
    },
    // ----------------------------------------------- End --- On change field cus_search_id
});

function get_first_value_in_select(options) {
    var result = null
    if (options != null) {
        if (options instanceof Array) {
            result = options[0];
        }
        else {
            index_new_line_first = options.indexOf("\n");
            if (index_new_line_first > -1) {
                result = options.substring(0, options.indexOf("\n"));
            }
            else {
                result = options
            }
        }
    }
    return result;
}

function clear_value(frm, field_name, field_type, field_options) {
    let number_type = ["Int", "Float"]
    if (field_type == "Data") {
        frm.set_value(field_name, "");
    }
    else if (field_type == "Link" || field_type == "Date") {
        frm.set_value(field_name, null);
    }
    else if (field_type == "Check" || number_type.includes(field_type)) {
        frm.set_value(field_name, 0);
    }
    else if (field_type == "Select") {
        first_value_in_select = get_first_value_in_select(field_options);
        if (first_value_in_select) {
            frm.set_value(field_name, first_value_in_select);
        }
    }
    else if (field_type == "Table") {
        frm.set_value(field_name, []);
    }
    else {
        frm.set_value(field_name, null);
    }
}

function clear_fields_value_in_section(frm, target_sections, ignore_fields = []) {
    target_sections.forEach(section_name => {
        if (frm.fields_dict[section_name]) {
            frm.fields_dict[section_name]["fields_list"].forEach(function (item) {
                if (!ignore_fields.includes(item.df.fieldname)) {
                    if (frm.get_field(item.df.fieldname).value && frm.get_field(item.df.fieldname).value != 0 && frm.get_field(item.df.fieldname).value != []) {
                        clear_value(frm, item.df.fieldname, item.df.fieldtype, item.df.options);
                    }
                }
            });
        }
    });
}
function enable_fields_in_section(frm, target_sections, enable, ignore_fields = []) {
    target_sections.forEach(section_name => {
        if (frm.fields_dict[section_name]) {
            frm.fields_dict[section_name]["fields_list"].forEach(function (item) {
                let meta_field = frm.meta.fields.find(f => f.fieldname == item.df.fieldname);
                if (!ignore_fields.includes(item.df.fieldname) && !meta_field.read_only) {
                    frm.toggle_enable(item.df.fieldname, enable);
                }
            });
        }
    });
}

function display_fields_in_section(frm, target_sections, show, ignore_fields = []) {
    target_sections.forEach(section_name => {
        if (frm.fields_dict[section_name]) {
            frm.fields_dict[section_name]["fields_list"].forEach(function (item) {
                if (!ignore_fields.includes(item.df.fieldname)) {
                    frm.toggle_display(item.df.fieldname, show);
                }
            });
        }
    });
}

function create_action_history(frm, action, document_reason, remark) {
    return frappe.call({
        method: "smart_connect.k2.doctype.action_history.action_history.create_action_history",
        args: {
            doctype: frm.doctype,
            action: action,
            doctype_name: frm.doc.name,
            reason: document_reason,
            remark: remark,
            is_active: 1,
            is_update_status: 1,
            user_name: frappe.boot.employee_name
        },
        callback: function (response) {
            if (response.message) {
                frappe.show_alert({ message: __("Create Action History Success."), indicator: "green" });
            }
        }
    })
}

function get_workflow_reason(frm, action) {
    return frappe.call({
        method: "smart_connect.k2.doctype.k2_workflow_settings.k2_workflow_settings.get_k2_workflow_reason",
        args: {
            doctype: frm.doctype,
            name: frm.doc.name,
            action: action,
        }
    })
}

// function set_fields_by_sales_kit(frm) {
//     frappe.db.get_doc("Sales Kit", frm.doc.sales_kit_number).then((doc) => {
//         frm.doc.col_product = doc.col_product;
//         frm.col_product_prev_value = doc.col_product;
//         frm.doc.col_subproduct = doc.col_subproduct;
//         set_filter_col_product(frm);

//         if (doc.col_product == "H" || doc.col_product == "L") {
//             frm.doc.col_title_deed_number = doc.col_land_title_deed_number;
//             frm.doc.col_dealing_file_number = doc.col_dealing_file_number;
//             frm.doc.col_land_parcel_number = doc.col_land_parcel_number;
//             frm.doc.col_sheet = doc.col_land_sheet;
//             frm.doc.col_rai = doc.col_land_rai;
//             frm.doc.col_ngan = doc.col_land_ngan;
//             frm.doc.col_square_wah = doc.col_land_square_wah;
//             frm.doc.col_building_type = doc.col_building_type;

//             if (doc.col_land_appraisal_value_manual) {
//                 frm.doc.col_land_appraisal_value = doc.col_land_appraisal_value_manual;
//             }
//             else {
//                 frm.doc.col_land_appraisal_value = doc.col_land_appraisal_value;
//             }

//             frm.doc.col_building_appraisal_value = doc.col_total_building_appraisal_value;
//             frm.set_value("col_appraisal_value",doc.col_hl_appraisal_value);
//             frm.doc.col_appraisal_value_by_branch = doc.col_branch_hl_appraisal_value;
//             frm.doc.col_appraisal_value_by_crd = doc.col_crd_hl_appraisal_value;
//             frm.doc.col_subdistrict = doc.col_subdistrict;
//             frm.doc.col_district = doc.col_district;
//             frm.doc.col_province = doc.col_province;
//             calc_remaining_loan_principal(frm);
//         }
//         else {
//             frm.doc.col_vehicle_identification_number = frm.doc.col_collatteral_id;
//             frm.doc.col_brand = doc.col_brand;
//             frm.doc.col_model_year = doc.col_model_year;
//             frm.doc.col_model = doc.col_model;
//             frm.doc.col_engine_size = doc.col_engine_size;
//             frm.doc.col_body = doc.col_body;
//             frm.doc.col_appraisal_value = doc.col_vehicle_appraisal_value;
//             frm.doc.col_appraisal_value_by_branch = doc.col_branch_vehicle_appraisal_value;
//             frm.doc.col_appraisal_value_by_crd = doc.col_crd_vehicle_appraisal_value;
//             frm.doc.col_subproduct = doc.col_subproduct;
//             frm.doc.col_submodel = doc.col_submodel;
//             frm.doc.col_age = doc.col_age;
//             frm.doc.col_gear = doc.col_gear;
//             frm.doc.col_drive_system = doc.col_drive_system;
//         }
//         frm.refresh_fields();
//         display_fields_by_col_product(frm);
//     });
// }

function set_col_model_year_options(frm) {
    currentYear = new Date().getFullYear();
    const model_year_list = [];
    for (let year = currentYear; currentYear - 20 < year; year--) {
        model_year_list.push(year);
    }
    if(frm.doc.col_model_year && !model_year_list.includes(cint(frm.doc.col_model_year))){
        model_year_list.push(frm.doc.col_model_year);
    }
    frm.set_df_property("col_model_year", "options", model_year_list);
}
// function set_application_source_options(frm) {
//     if (frm.doc.sales_kit_number == "" || frm.doc.sales_kit_number == null) {
//         frm.set_df_property("application_source", "options", ["", "Direct Key-in"]);
//     }
//     else {
//         let loan_app_fields = frm.meta.fields;
//         frm.set_df_property("application_source", "options", loan_app_fields.find(t => t.fieldname == "cus_first_name").options);
//     }
//     frm.refresh_field("application_source");
// }
function disable_application_source(frm) {
    const disable_application_source_list = ["Sales Kit", "Sawad Mobile", "Fast Money", "Insurance"]
    if (disable_application_source_list.includes(frm.doc.application_source)) {
        frm.toggle_enable("application_source", false);
    }
    else {
        frm.toggle_enable("application_source", true);
    }
}

function display_fields_by_cus_customer_type(frm) {
    let target_sections_organization = [
        "organization_information_section",
        "organization_authorized_person_section"
    ];
    let target_sections_personal = [
        "personal_information_section",
        "personal_detail_section",
        "personal_spouse_information_section"];
    switch (frm.doc.cus_customer_type) {
        case "Personal":
            clear_fields_value_in_section(frm, target_sections_organization);
            display_fields_in_section(frm, target_sections_organization, false);
            display_fields_in_section(frm, target_sections_personal, true, ["cus_dopa_code", "cus_dopa_verify_status"]);
            break;
        case "Organization":
            clear_fields_value_in_section(frm, target_sections_personal);
            display_fields_in_section(frm, target_sections_personal, false);
            display_fields_in_section(frm, target_sections_organization, true);
            break;
        default:
            display_fields_in_section(frm, target_sections_personal, true, ["cus_dopa_code", "cus_dopa_verify_status"]);
            display_fields_in_section(frm, target_sections_organization, true);
            break;
    }
}

function set_filter_col_product(frm) {
    if (frm.doc.col_product) {
        frm.set_query("col_subproduct", function () {
            return {
                filters: {
                    product: frm.doc.col_product
                }
            };
        });
    }
    else {
        frm.set_query("col_subproduct", function () { return {}; });
    }
    frm.set_query("col_brand", function () {
        return {
            filters: {
                subproduct: frm.doc.col_subproduct
            }
        };
    });
    frm.set_query("col_model", function () {
        return {
            filters: {
                brand: frm.doc.col_brand
            }
        };
    });
    frm.set_query("col_submodel", function () {
        return {
            filters: {
                model: frm.doc.col_model
            }
        };
    });
}

function display_fields_by_col_product(frm) {
    // let home_land_section = ["home_and_land_section", "home_and_land_summary_section"];
    // let vehicle_section = ["vehicle_section", "vehicle_detail_section"];
    let home_land_section = ["section_collateral_land", "section_collateral_land2", "section_collateral_land3", "section_collateral_land4", "section_collateral_land5", "section_collateral_land6"];
    let vehicle_section = ["section_collateral_vehicle", "section_collateral_vehicle2", "section_collateral_vehicle3", "section_collateral_vehicle4", "section_collateral_vehicle5"];
    if (frm.doc.col_product == "H" || frm.doc.col_product == "L") {
        clear_fields_value_in_section(frm, vehicle_section, ["col_age"]);
        frm.set_value("col_model_year", "");
        frm.set_value("col_year_of_possession", "");
        display_fields_in_section(frm, home_land_section, true);
        display_fields_in_section(frm, vehicle_section, false);
        frm.fields_dict["section_collateral_land"].collapse(false);
        frm.fields_dict["section_collateral_land2"].collapse(false);
        frm.fields_dict["section_collateral_land3"].collapse(false);
        frm.fields_dict["section_collateral_land4"].collapse(false);
        frm.fields_dict["section_collateral_land5"].collapse(false);
        frm.fields_dict["section_collateral_land6"].collapse(false);
    }
    else {
        clear_fields_value_in_section(frm, home_land_section, ["col_total_appraisal_value"]);
        display_fields_in_section(frm, home_land_section, false);
        display_fields_in_section(frm, vehicle_section, true);
        frm.fields_dict["section_collateral_vehicle"].collapse(false);
        frm.fields_dict["section_collateral_vehicle2"].collapse(false);
        frm.fields_dict["section_collateral_vehicle3"].collapse(false);
        frm.fields_dict["section_collateral_vehicle4"].collapse(false);
        frm.fields_dict["section_collateral_vehicle5"].collapse(false);
    }
}

function setup_banner(frm) {
    frappe.db.get_list("Loan Condition", {
        fields: [
            "lease_type",
            "installment_type",
            "application_type",
            "source_of_customer",
            "ownership",
            "campaign_interest_rate",
            "requested_amount",
            "calculation_type",
            "financing_amount_net",
            "yield_percent",
            "yield_amount",
            "tax_amount",
            "total_debtor",
            "payment_frequency",
            "total_periods_month",
            "agreement_date",
            "agreement_start_date",
            "agreement_end_date",
            "due_day",
            "installment_amount",
            "last_installment_amount",
            "total_fees_net",
            "total_insurance_net",
            "total_deduction",
            "advanced_installment_amount",
            "remaining_transfer_amount",
            "campaign_code",
            "company"
        ],
        filters: {
            internal_loan_application_id: frm.doc.name,
        },
        limit: 0
    }).then((doc) => {
        // custom action
        if (doc.length > 0) {
            let loan_condition_doc = doc[0];
            let company_color = get_company_colors(frm.doc.company, loan_condition_doc);
            loan_condition_doc.requested_amount = format_number(loan_condition_doc.requested_amount);
            loan_condition_doc.yield_amount = format_number(loan_condition_doc.yield_amount);
            loan_condition_doc.yield_percent = format_number(loan_condition_doc.yield_percent) + "%";
            loan_condition_doc.tax_amount = format_number(loan_condition_doc.tax_amount);
            loan_condition_doc.installment_amount = format_number(loan_condition_doc.installment_amount);
            loan_condition_doc.last_installment_amount = format_number(loan_condition_doc.last_installment_amount);
            loan_condition_doc.advanced_installment_amount = format_number(loan_condition_doc.advanced_installment_amount);
            loan_condition_doc.remaining_transfer_amount = format_number(loan_condition_doc.remaining_transfer_amount);
            loan_condition_doc.total_debtor = format_number(loan_condition_doc.total_debtor);
            loan_condition_doc.total_fees_net = format_number(loan_condition_doc.total_fees_net);
            loan_condition_doc.total_insurance_net = format_number(loan_condition_doc.total_insurance_net);
            loan_condition_doc.total_deduction = format_number(loan_condition_doc.total_deduction);
            loan_condition_doc.financing_amount_net = format_number(loan_condition_doc.financing_amount_net);
            loan_condition_doc.agreement_date = frappe.datetime.str_to_user(loan_condition_doc.agreement_date);
            loan_condition_doc.agreement_start_date = (loan_condition_doc.agreement_start_date ? frappe.datetime.str_to_user(loan_condition_doc.agreement_start_date) : "");
            loan_condition_doc.agreement_end_date = (loan_condition_doc.agreement_end_date ? frappe.datetime.str_to_user(loan_condition_doc.agreement_end_date) : "");
            loan_condition_doc.installment_type = (loan_condition_doc.installment_type ? __(loan_condition_doc.installment_type) : "");
            loan_condition_doc.calculation_type = (loan_condition_doc.calculation_type ? __(loan_condition_doc.calculation_type) : "");
            loan_condition_doc.application_type = (loan_condition_doc.application_type ? __(loan_condition_doc.application_type) : "");
            display_loan_condition_button(frm);
            display_loan_transfer_button(frm, true);
            frm.layout.tabs.find(t => t.df.fieldname == "credit_info_tab").show();
            get_customer_banner_html(frm, loan_condition_doc).then((customer_banner_html) => {
                // credit details tab
                frappe.model.with_doctype("Loan Condition").then(() => {
                    let loan_condition_meta = frappe.get_meta("Loan Condition");
                    let fields = loan_condition_meta.fields;
                    credit_info.html(frappe.render_template("tmpl_credit_info", {
                        label_header: {
                            installment_type: __(fields.find(t => t.fieldname == "installment_type").label),
                            application_type: __(fields.find(t => t.fieldname == "application_type").label),
                            source_of_customer: __(fields.find(t => t.fieldname == "source_of_customer").label),
                            ownership: __(fields.find(t => t.fieldname == "ownership").label),
                            campaign_interest_rate: __(fields.find(t => t.fieldname == "campaign_interest_rate").label),
                            requested_amount: __(fields.find(t => t.fieldname == "requested_amount").label),
                            calculation_type: __(fields.find(t => t.fieldname == "calculation_type").label),
                            financing_amount_net: __(fields.find(t => t.fieldname == "financing_amount_net").label),
                            yield_percent: __(fields.find(t => t.fieldname == "yield_percent").label),
                            yield_amount: __(fields.find(t => t.fieldname == "yield_amount").label),
                            tax_amount: __(fields.find(t => t.fieldname == "tax_amount").label),
                            total_debtor: __(fields.find(t => t.fieldname == "total_debtor").label),
                            payment_frequency: __(fields.find(t => t.fieldname == "payment_frequency").label),
                            total_periods_month: __(fields.find(t => t.fieldname == "total_periods_month").label),
                            agreement_date: __(fields.find(t => t.fieldname == "agreement_date").label),
                            agreement_start_date: __(fields.find(t => t.fieldname == "agreement_start_date").label),
                            agreement_end_date: __(fields.find(t => t.fieldname == "agreement_end_date").label),
                            due_day: __(fields.find(t => t.fieldname == "due_day").label),
                            installment_amount: __(fields.find(t => t.fieldname == "installment_amount").label),
                            last_installment_amount: __(fields.find(t => t.fieldname == "last_installment_amount").label),
                            total_fees_net: __(fields.find(t => t.fieldname == "total_fees_net").label),
                            total_insurance_net: __(fields.find(t => t.fieldname == "total_insurance_net").label),
                            total_deduction: __(fields.find(t => t.fieldname == "total_deduction").label),
                            advanced_installment_amount: __(fields.find(t => t.fieldname == "advanced_installment_amount").label),
                            remaining_transfer_amount: __(fields.find(t => t.fieldname == "remaining_transfer_amount").label),
                        },
                        credit_info: loan_condition_doc,
                        customer_banner: customer_banner_html,
                        label_title: __(loan_condition_meta.name),
                        company_color: company_color
                    }));
                    render_customer_banner(customer_banner_html);
                });
            });
            setup_loan_transfer_tab(frm, loan_condition_doc);
        }
        else {
            display_loan_condition_button(frm);
            display_loan_transfer_button(frm, false);
            get_customer_banner_html(frm, null).then((customer_banner_html) => {
                render_customer_banner(customer_banner_html);
            });
            frm.layout.tabs.find(t => t.df.fieldname == "credit_info_tab").hide();
            setup_loan_transfer_tab(frm, null);
        }
    });
}
function setup_loan_transfer_tab(frm, loan_condition_doc) {
    // transfer details tab
    frappe.db.get_list("Loan Transfer Detail", {
        fields: [
            "transfer_type",
            "transfer_date",
            "transfer_status",
            "transfer_amount",
            "bank_account",
            "bank_account_type",
            "bank_account_number",
        ],
        filters: {
            ref_loan_application: frm.doc.name,
        },
        limit: 0
    }).then(async (transfer_list) => {
        let input_data = [];
        let company_color = get_company_colors(frm.doc.company, loan_condition_doc);
        if (transfer_list.length > 0) {
            input_data = transfer_list.map(t => ({
                "transfer_type": __(t.transfer_type),
                "transfer_date": (t.transfer_date ? frappe.datetime.str_to_user(t.transfer_date) : ""),
                "transfer_status": __(t.transfer_status),
                "transfer_amount": format_number(t.transfer_amount),
                "bank_account": t.bank_account,
                "bank_account_type": __(t.bank_account_type),
                "bank_account_number": t.bank_account_number,
            }));
        }
        else {
            input_data = [{
                "transfer_type": "",
                "transfer_date": "",
                "transfer_status": "",
                "transfer_amount": "",
                "bank_account": "",
                "bank_account_type": "",
                "bank_account_number": "",
            }]
        }
        for (const item of input_data) {
            if (item.bank_account) {
                const result = await frappe.db.get_value("Bank", item.bank_account, "description");
                item.bank_account = result.message?.description || "";
            }
        }
        transfer_details.html(frappe.render_template("tmpl_transfer_details", {
            label_header: [
                __("Transfer Type"),
                __("Date"),
                __("Transfer Status"),
                __("Transfer Amount"),
                __("Bank Account"),
                __("Bank Account Type"),
                __("Bank Account Number"),
            ],
            transfer_details: input_data,
            title: __("Loan Transfer Detail"),
            company_color: company_color
        }));
        frm.toggle_display("transfer_details", true);
    });
}
function hide_add_button_loan_field_checking_connection(frm) {
    frappe.db.get_list("Loan Field Checking", {
        fields: ["name"],
        filters: {
            ref_loan_application: frm.doc.name,
        },
        limit: 0
    }).then((doc) => {
        let document_link = $(frm.wrapper).find(".document-link").filter('[data-doctype="Loan Field Checking"]');
        if (doc.length >= 5) {
            document_link.find("button").hide();
        } else {
            document_link.find("button").show();
        }
    });
}
function initial_attachment_custom_actions(frm) {
    if (values.value.indexOf("/") > -1) {
        frappe.throw(__("Folder name should not include '/' (slash)."));
    }
    const data = {
        file_name: values.value,
        folder: this.current_folder,
    };
    frappe.call({
        method: "frappe.core.api.file.create_new_folder",
        args: data,
    });
}
function show_alert_copy_address_successfully(frm) {
    frappe.show_alert({
        message: __("Address copied successfully."),
        indicator: "green"
    }, 2);
}
function display_loan_condition_button(frm) {
    let loancondition_label = __("Loan Condition");
    let loan_condition_button = $(frm.wrapper).find(`.custom-actions >  [data-label="${encodeURIComponent(loancondition_label.trim())}"]`);
    if (frm.doc.col_collatteral_id && !frm.doc.col_is_collateral_blocked) {
        loan_condition_button.show();
    }
    else {
        loan_condition_button.hide();
    }
}
function display_functions_button(frm) {
    let group_label = __("Functions");
    let refresh_loan_label = __("Refresh data from LMS");
    let refresh_loan_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(refresh_loan_label.trim())}"]`);
    let submit_loan_label = __("Confirm Loan Application");
    let submit_loan_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(submit_loan_label.trim())}"]`);
    let cancel_loan_label = __("Cancel Loan Application");
    let cancel_loan_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(cancel_loan_label.trim())}"]`);

    if (frm.doc.is_confirm || frm.doc.status == "20300") {
        submit_loan_button.hide();
    }
    else {
        submit_loan_button.show();
    }

    if (frm.doc.process_instance_id == 0 && frm.doc.status != "20300") {
        refresh_loan_button.show();
        cancel_loan_button.show();
    }
    else {
        refresh_loan_button.hide();
        cancel_loan_button.hide();
    }
}
function display_agenda_button(frm, visible) {
    let agenda_label = __("Agenda");
    let agenda_button = $(frm.wrapper).find(`.custom-actions >  [data-label="${encodeURIComponent(agenda_label.trim())}"]`);
    if (visible) {
        agenda_button.show();
    }
    else {
        agenda_button.hide();
    }
}
function display_request_agenda_button(frm, visible) {
    let request_agenda_label = __("Request for Agenda");
    let request_agenda_button = $(frm.wrapper).find(`.custom-actions >  [data-label="${encodeURIComponent(request_agenda_label.trim())}"]`);
    if (visible) {
        request_agenda_button.show();
    }
    else {
        request_agenda_button.hide();
    }
}
function display_agenda_button_by_product(frm) {
    if (frm.doc.col_product) {
        frappe.db.get_doc("Product", frm.doc.col_product).then((doc) => {
            display_agenda_button(frm, doc.is_agenda);
            display_request_agenda_button(frm, doc.is_agenda);
        });
    }
    else {
        display_agenda_button(frm, false);
        display_request_agenda_button(frm, false);
    }
}

function display_print_button(frm) {
    let group_label = __("Print");
    let print_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"]`);

    let agreement_document_label = __("Agreement Document");
    let agreement_document_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(agreement_document_label.trim())}"]`);
    let request_for_transfer_label = __("Request For Transfer");
    let request_for_transfer_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(request_for_transfer_label.trim())}"]`);

    let kyc_guarantor_label = __("KYC Guarantor");
    let kyc_guarantor_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(kyc_guarantor_label.trim())}"]`);
    
    let kyc_coborrower_label = __("KYC Coborrower");
    let kyc_coborrower_button = $(frm.wrapper).find(`.custom-actions > [data-label="${encodeURIComponent(group_label.trim())}"] >  .dropdown-menu > [data-label="${encodeURIComponent(kyc_coborrower_label.trim())}"]`);
    // agreement document
    if (frm.doc.is_confirm) {
        print_button.show();
    }
    else {
        print_button.hide();
    }
    // transfer
    frappe.db.get_list("Loan Transfer Detail", {
        filters: {
            ref_loan_application: frm.doc.name,
            transfer_status: "Draft"
        },
        limit: 0
    }).then((transfer_list) => {
        if (transfer_list.length > 0) {
            request_for_transfer_button.show();
        } else {
            request_for_transfer_button.hide();
        }
    });

    if(frm.doc.table_guarantor.some(r => r.guarantor_type == "Guarantor")) {
        kyc_guarantor_button.show();
    }
    else {
        kyc_guarantor_button.hide();
    }

    if(frm.doc.table_guarantor.some(r => r.guarantor_type == "Co-borrower")) {
        kyc_coborrower_button.show();
    }
    else {
        kyc_coborrower_button.hide();
    }
}
function display_loan_transfer_button(frm, visible) {
    let loan_transfer_label = __("Loan Transfer Detail");
    let loan_transfer_button = $(frm.wrapper).find(`.custom-actions >  [data-label="${encodeURIComponent(loan_transfer_label.trim())}"]`);
    if (visible) {
        loan_transfer_button.show();
    }
    else {
        loan_transfer_button.hide();
    }
}
function create_default_address(frm) {
    if (frm.doc.cus_addresses_detail.length == 0) {
        // create default address details
        frm.add_child("cus_addresses_detail", { address_type: "Identification" });
        frm.add_child("cus_addresses_detail", { address_type: "Home" });
        frm.add_child("cus_addresses_detail", { address_type: "Current" });
        frm.add_child("cus_addresses_detail", { address_type: "Work" });
        refresh_cus_addresses_detail(frm);
    }
}
// function default_value_from_sales_kit(frm) {
//     if (frm.doc.sales_kit_number) {
//         frappe.db.get_doc("Sales Kit", frm.doc.sales_kit_number).then((sales_kit) => {
//             frm.doc.cus_addresses_detail[0].mobile_number = sales_kit.cus_telephone;
//             refresh_cus_addresses_detail(frm);
//             if (sales_kit.cus_identification_number) {
//                 frm.set_value("cus_search_id", sales_kit.cus_identification_number);
//                 frm.set_value("col_search_collateral", sales_kit.col_search_collateral);
//             }
//             else {
//                 if(["H", "L"].includes(sales_kit.col_product)) {
//                     if(sales_kit.col_land_title_deed_number) {
//                         frm.set_value("col_search_collateral", sales_kit.col_land_title_deed_number +"_"+frm.doc.branch);
//                     }
//                     else {
//                         frm.set_value("col_search_collateral", sales_kit.col_land_parcel_number +"_"+frm.doc.branch);
//                     }
//                 }
//             }
//         });
//     }
// }
function setup_customs_actions(frm) {
    const error_print_document_message = __("Attachment not found in the system. Please contact the administrator to setting the file.");
    frm.add_custom_button(__("Attachment"), () => {
        frappe.open_in_new_tab = true;
        if (frm.is_dirty()) {
            frappe.throw(__("Please save the document before navigating to the attachment page."));
        }
        else {
            frappe.route_options = {
                loan_app_doc: frm.doc,
            }
            frappe.set_route("file-attachment", frm.doc.name);
        }
    });
    frm.add_custom_button(__("Loan Condition"), () => {
        frappe.db.get_list("Loan Condition", {
            fields: ["name"],
            filters: {
                internal_loan_application_id: frm.doc.name,
            },
            limit: 0
        }).then((doc) => {
            // custom action
            if (doc.length > 0) {
                if (frm.is_dirty()) {
                    frm.save().then(() => frappe.set_route("Form", "Loan Condition", doc[0].name));
                }
                else {
                    frappe.set_route("Form", "Loan Condition", doc[0].name);
                }
            }
            else {
                frappe.route_options = {
                    internal_loan_application_id: frm.doc.name
                };

                if (frm.is_dirty()) {
                    frm.save().then(() => frappe.set_route("Form", "Loan Condition", "new"));
                }
                else {
                    frappe.set_route("Form", "Loan Condition", "new");
                }
            }
        });
    });
    frm.add_custom_button(__("Loan Transfer Detail"), () => {
        frappe.route_options = {
            ref_loan_application: frm.doc.name,
        }
        frappe.set_route("List", "Loan Transfer Detail");
    });
    frm.add_custom_button(__("Loan Field Checking"), () => {
        frappe.route_options = {
            ref_loan_application: frm.doc.name,
        }
        frappe.set_route("List", "Loan Field Checking");
    });
    frm.add_custom_button(__("Refresh data from LMS"), () => {
        if (frm.doc.cus_search_id && !frm.doc.cus_is_new) {
            search_customer(frm, frm.doc.cus_customer_id, is_refresh = true);
        }
        if (frm.doc.col_collatteral_id && !frm.doc.col_is_collateral_new) {
            frm.doc.col_search_collateral = frm.doc.col_collatteral_id;
            frm.trigger("col_button_search_collateral");
        }
        frm.doc.table_guarantor.forEach(function (child) {
            if (child.identification_number && !child.guarantor_is_new) {
                let row = frm.get_field("table_guarantor").grid.get_row(child.name);
                search_guarantor(frm, child.identification_number, row, true,null);
            }
        });

    }, __("Functions"));
    frm.add_custom_button(__("Confirm Loan Application"), () => {
        frappe.call({
            doc: frm.doc,
            method: "confirm_loan_application",
            freeze: true,
            freeze_message: __("Validating Loan Application..."),
            callback: function (response) {
                if (response) {
                    window.location.reload();
                }
            }
        });
    }, __("Functions"));
    frm.add_custom_button(__("Copy Loan Application"), () => {
        frappe.call({
            doc: frm.doc,
            method: "copy_loan_application",
            freeze: true,
            freeze_message: __("Copying Loan Application..."),
            callback: function (response) {
                let new_app = response.message;
                if (new_app) {
                    frappe.show_alert({
                        message: __("Copy succeeded."),
                        indicator: "green"
                    }, 5);
                    frappe.set_route("Form", "Loan Application", new_app.name);
                }
            }
        });
    }, __("Functions"));
    frm.add_custom_button(__("Cancel Loan Application"), () => {
        let d = new frappe.ui.Dialog({
            title: __("Cancel Loan Application"),
            fields: [
                {
                    label: __("Action"),
                    fieldname: "action",
                    fieldtype: "Data",
                },
                {
                    fieldname: "document_reason",
                    fieldtype: "Link",
                    options: "K2 Workflow Reason",
                    label: __("Reason"),
                    reqd: true,
                    filters: {
                        "document_type": frm.doctype,
                        "state": frm.doc.status,
                        "action": "Cancel"
                    }
                },
                {
                    fieldname: "remark",
                    fieldtype: "SmallText",
                    label: __("Remark")
                },
            ],
            primary_action: function () {
                let data = d.get_values();
                create_action_history(frm, data.action, data.document_reason, data.remark).then(() => {
                    window.location.reload();
                });
            },
        });
        d.set_value("action", "Cancel").then(() => {
            d.set_df_property("action", "read_only", 1);
            d.show();
        });
    }, __("Functions"));
    frm.add_custom_button(__("Agenda"), () => {
        frappe.route_options = {
            ref_loan_application: frm.doc.name,
        }
        frappe.set_route("List", "Agenda");
    });
    frm.add_custom_button(__("Request for Agenda"), () => {
        frappe.call({
            doc: frm.doc,
            method: "request_new_agenda",
            callback: function (response) {
                frappe.show_alert({ message: __("Agenda created."), indicator: "green" });
            }
        });
    });
    frm.add_custom_button(__("Agreement Document"), () => {
        download_print_document(frm.doc.name, "agreement_document_format","",true,true);
    }, __("Print"));
    frm.add_custom_button(__("Request For Transfer"), () => {
        download_print_document(frm.doc.name, "request_for_transfer_format","",true,true);
    }, __("Print"));
    frm.add_custom_button(__("KYC Customer"), async () => {
        const agreement_document_format_name = frm.loan_app_settings?.customer_document_format;
        if(agreement_document_format_name) {
            download_print_document(frm.doc.name,agreement_document_format_name,"",false,true);
        }
        else {
            frappe.throw(error_print_document_message);
        }
    }, __("Print"));
    frm.add_custom_button(__("KYC Guarantor"), async () => {
        const agreement_document_format_name = frm.loan_app_settings?.guarantor_document_format;
        if(agreement_document_format_name) {
            frm.doc.table_guarantor.forEach(guarantor => {
                if(guarantor.guarantor_type == "Guarantor") {
                    download_print_document(guarantor.name,agreement_document_format_name,agreement_document_format_name + '_' + guarantor.idx,false,true);
                }
            });
        }
        else {
            frappe.throw(error_print_document_message);
        }
    }, __("Print"));
    frm.add_custom_button(__("KYC Coborrower"), async () => {
        const agreement_document_format_name = frm.loan_app_settings?.co_borrower_document_format;
        if(agreement_document_format_name) {
            frm.doc.table_guarantor.forEach(guarantor => {
                if(guarantor.guarantor_type == "Co-borrower") {
                    download_print_document(guarantor.name,agreement_document_format_name,agreement_document_format_name + '_' + guarantor.idx,false,true);
                }
            });
        }
        else {
            frappe.throw(error_print_document_message);
        }
    }, __("Print"));
}

async function search_customer(frm, search_id, is_refresh = false) {
    // call api
    await frappe.call({
        method: "z_loan.api.search_customer",
        args: { search_id: search_id, is_guarantor: 1 },
        freeze: true,
        freeze_message: __("Searching for information..."),
        callback: async function (response) {
            let data = response.message?.data ?? {};
            if (data && Object.keys(data).length > 0 && response.message.statusCode == 200) {
                render_loan_history(frm, data);
                frm.set_value("cus_customer_id", frm.doc.cus_search_id);
                if (data.cus_is_customer_blocked == true) {
                    frm.doc.cus_customer_blocked_status = data.cus_customer_blocked_status;
                    if (is_refresh) {
                        if (frm.doc.cus_customer_blocked_status) {
                            frappe.msgprint({ title: __("Error"), message: frm.doc.cus_customer_blocked_status, indicator: "red" });
                        }
                        else if (frm.loan_app_settings) {
                            frappe.msgprint({ title: __("Error"), message: frm.loan_app_settings?.is_customer_block_message, indicator: "red" });
                        }
                    }
                    else {
                        if (frm.doc.cus_is_customer_blocked) {
                            render_customer_blocked_message(frm);
                        }
                        else {
                            frm.set_value("cus_is_customer_blocked", true);
                        }
                    }
                }
                else {
                    await frm.set_value({
                        cus_is_customer_blocked : false,
                        cus_identification_type : data.cus_identification_type,
                        cus_identification_number : data.cus_identification_number,
                        cus_nationality : data.cus_nationality,
                        cus_delivery_address : data.cus_delivery_address,
                        cus_marketing_consent : data.cus_marketing_consent,
                        cus_sensitive_data_consent : data.cus_sensitive_data_consent,
                        cus_addresses_detail : data.cus_addresses_detail,
                    });

                    if (data.cus_customer_type == "Personal") {
                        if(frm.smart_card_data) {
                            let row = frm.doc.cus_addresses_detail.find(p => p.address_type == "Identification");
                            await frappe.db.get_value(
                                "Issuer",
                                { description: frm.smart_card_data.issuer },
                                "name",
                                (r) => {
                                    if (r && r.name) {
                                        frm.set_value("cus_issuer", r.name);
                                    }
                                }
                            );
                            row.address = frm.smart_card_data.address;
                            await frappe.db.get_list("Subdistrict", {
                                fields: ["name","post_code"],
                                filters: {
                                    description: frm.smart_card_data.subdistrict,
                                },
                                limit: 0
                            }).then((doc) => {
                                if (doc.length == 1) {
                                    let subdistrict_doc = doc[0];
                                    row.subdistrict = subdistrict_doc.name;
                                    row.district = frm.smart_card_data.district;
                                    row.province = frm.smart_card_data.province;
                                    row.post_code = subdistrict_doc.post_code;
                                    refresh_cus_addresses_detail(frm);
                                }
                            });
                        }
                        else {
                            frm.set_value("cus_issuer",data.cus_issuer);
                        }

                        await frm.set_value({
                            cus_blacklist_status : data.cus_blacklist_status,
                            cus_salutation : frm.smart_card_data ? frm.smart_card_data.salutation : data.cus_salutation,
                            cus_first_name : frm.smart_card_data ? frm.smart_card_data.firstname : data.cus_first_name,
                            cus_last_name : frm.smart_card_data ? frm.smart_card_data.lastname : data.cus_last_name,
                            cus_date_of_birth : frm.smart_card_data ? frm.smart_card_data.date_of_birth : data.cus_date_of_birth,
                            cus_issue_date : frm.smart_card_data ? frm.smart_card_data.issue_date : data.cus_issue_date,
                            cus_expiry_date : frm.smart_card_data ? frm.smart_card_data.expiry_date : data.cus_expiry_date,
                            cus_marital_status : data.cus_marital_status,
                            cus_race : data.cus_race,
                            cus_occupation : data.cus_occupation,
                            cus_occupation_detail : data.cus_occupation_detail,
                            cus_department : data.cus_department,
                            cus_workplace : data.cus_workplace,
                            cus_name_of_manager : data.cus_name_of_manager,
                            cus_work_experience_year : data.cus_work_experience_year,
                            cus_work_experience_month : data.cus_work_experience_month,
                            cus_monthly_salary : data.cus_monthly_salary,
                            cus_extra_income : data.cus_extra_income,
                            cus_total_expense : data.cus_total_expense,
                            cus_additional_occupation : data.cus_additional_occupation,
                            cus_gender : data.cus_gender,
                        });
                    }
                    else {
                        await frm.set_value({
                            cus_organization_type : data.cus_organization_type,
                            cus_organization_name : data.cus_organization_name,
                            cus_business_segment : data.cus_business_segment,
                            cus_line_of_business : data.cus_line_of_business,
                            cus_business_type : data.cus_business_type,
                            cus_date_of_establishment : data.cus_date_of_establishment,
                            cus_paidup_capital : data.cus_paidup_capital,
                            cus_registered_capital : data.cus_registered_capital,
                            cus_labor : data.cus_labor,
                            authorized_person : data.authorized_person,
                            cus_issuer : data.cus_issuer,
                            cus_issue_date : data.cus_issue_date,
                            cus_expiry_date : data.cus_expiry_date,
                        });
                    }
                    frm.doc.cus_customer_type = data.cus_customer_type;
                    frm.refresh_field("cus_customer_type");
                    frm.cus_customer_type_prev_value = data.cus_customer_type;
                    frm.smart_card_data = undefined;
                    display_fields_by_cus_customer_type(frm);
                }
                if (frm.doc.is_new) {
                    frm.set_value("cus_is_new", false);
                }
                else {
                    frm.trigger("cus_is_new");
                }
                frappe.show_alert({
                    message: __("Found customer information"),
                    indicator: "green"
                }, 5);
            }
            else {
                loan_history.html("");
                frm.set_value("cus_customer_id", frm.doc.cus_search_id);
                frm.set_value("cus_identification_number", frm.doc.cus_search_id);
                if (is_refresh == false) {
                    frm.set_value("cus_is_new", true);
                    frm.set_value("cus_is_customer_blocked", false);
                }
                if(frm.smart_card_data) {
                    await frm.set_value({
                        cus_salutation : frm.smart_card_data.salutation,
                        cus_first_name : frm.smart_card_data.firstname,
                        cus_last_name : frm.smart_card_data.lastname,
                        cus_date_of_birth : frm.smart_card_data.date_of_birth,
                        cus_issue_date : frm.smart_card_data.issue_date,
                        cus_expiry_date : frm.smart_card_data.expiry_date,
                    });
                    await frappe.db.get_value(
                        "Issuer",
                        { description: frm.smart_card_data.issuer },
                        "name",
                        (r) => {
                            if (r && r.name) {
                                frm.set_value("cus_issuer", r.name);
                            }
                        }
                    );
                    let row = frm.doc.cus_addresses_detail.find(p => p.address_type == "Identification");
                    row.address = frm.smart_card_data.address;
                    await frappe.db.get_list("Subdistrict", {
                        fields: ["name","post_code"],
                        filters: {
                            description: frm.smart_card_data.subdistrict,
                        },
                        limit: 0
                    }).then((doc) => {
                        if (doc.length == 1) {
                            let subdistrict_doc = doc[0];
                            row.subdistrict = subdistrict_doc.name;
                            row.district = frm.smart_card_data.district;
                            row.province = frm.smart_card_data.province;
                            row.post_code = subdistrict_doc.post_code;
                            refresh_cus_addresses_detail(frm);
                        }
                        frm.smart_card_data = undefined;
                        frm.layout.tabs.find(t => t.df.fieldname == "customer_information_tab").set_active();
                    });
                }

                let error_message = response.message?.message;
                frappe.msgprint({ title: __("Error"), message: error_message, indicator: "red" });
            }
        },
        error: function (response) {
            loan_history.html("");
            frm.set_value("cus_customer_id", frm.doc.cus_search_id);
            frm.set_value("cus_identification_number", frm.doc.cus_search_id);
            frm.set_value("cus_is_new", true);
            frm.set_value("cus_is_customer_blocked", false);
        }
    });
}

function search_guarantor(frm, search_id, input_row = null, is_refresh=false,dialog=null) {
    // call api
    frappe.call({
        method: "z_loan.api.search_customer",
        args: { search_id: search_id, is_guarantor: 0 },
        freeze: true,
        freeze_message: __("Searching for information..."),
        callback: function (response) {
            let data = response.message?.data ?? {};
            if (data && Object.keys(data).length > 0 && response.message.statusCode == 200) {
                if (is_refresh == true) {
                    if (input_row.doc.identification_number == search_id) {
                        assign_guarantor(frm, input_row, data,dialog);
                    }
                }
                else {
                    assign_guarantor(frm, input_row, data,dialog);
                }
                if (!is_refresh) {
                    frappe.show_alert({
                        message: __("Found guarantor information"),
                        indicator: "green"
                    }, 5);
                }
            }
            else {
                input_row.doc["guarantor_is_new"] = true;
                if (!is_refresh) {
                    frappe.show_alert({
                        message: response.message?.message,
                        indicator: "red"
                    }, 5);
                }
            }
            frm.refresh_field("table_guarantor");
            if(dialog) {
                setTimeout(() => {
                    dialog.hide();
                }, 1000);
            }
        },
        error: function (response) {
            let grid = frm.fields_dict["table_guarantor"].grid;
            let row = grid.grid_rows[0];
            if (row) {
                row.toggle_view(true);
            }
            frm.refresh_field("table_guarantor");
            if(dialog) {
                setTimeout(() => {
                    dialog.hide();
                }, 1000);
            }
        }
    });
}

function assign_guarantor(frm, row, data, dialog) {
    row.doc["guarantor_is_new"] = false;
    prefix = "cus_";
    let grid_row = frm.get_field("table_guarantor").grid.get_row(row.doc.name);
    if (data["cus_is_customer_blocked"] == true) {
        grid_row.remove();
        if(dialog) {
            setTimeout(() => {
                dialog.hide();
            }, 1000);
        }
        frappe.throw(frm.loan_app_settings.is_customer_block_message);
    }
    for (const key in data) {
        if (data.hasOwnProperty(key) && key.startsWith(prefix)) {
            const newKey = key.substring(prefix.length);
            if (newKey != "is_new") {
                row.doc[newKey] = data[key];
            }
        }
    }

    // calc age
    frappe.call({
        method: "z_loan.loan.methods.calc_age",
        args: { date_of_birth: row.doc.date_of_birth },
        callback: function (response) {
            let age = response.message.age;
            row.doc["age"] = age;
            frm.refresh_field("table_guarantor");
        }
    });
    // map address
    data.cus_addresses_detail.forEach(address => {
        if (address.address_type == "Home") {
            row.doc.home_address_nearby = address.address_nearby;
            row.doc.home_address = address.address;
            row.doc.home_telephone = address.mobile_number;
            row.doc.home_subdistrict = address.subdistrict;
            row.doc.home_extension = address.extension;
            row.doc.home_district = address.district;
            row.doc.home_province = address.province;
            row.doc.home_post_code = address.post_code;
        }
        else if (address.address_type == "Identification") {
            row.doc.identification_address_nearby = address.address_nearby;
            row.doc.identification_address = address.address;
            row.doc.identification_telephone = address.mobile_number;
            row.doc.identification_subdistrict = address.subdistrict;
            row.doc.identification_extension = address.extension;
            row.doc.identification_district = address.district;
            row.doc.identification_province = address.province;
            row.doc.identification_post_code = address.post_code;
        }
        else if (address.address_type == "Work") {
            row.doc.work_address_nearby = address.address_nearby;
            row.doc.work_address = address.address;
            row.doc.work_telephone = address.mobile_number;
            row.doc.work_subdistrict = address.subdistrict;
            row.doc.work_extension = address.extension;
            row.doc.work_district = address.district;
            row.doc.work_province = address.province;
            row.doc.work_post_code = address.post_code;
        }
        else {
            row.doc.address_nearby = address.address_nearby;
            row.doc.address = address.address;
            row.doc.telephone = address.mobile_number;
            row.doc.subdistrict = address.subdistrict;
            row.doc.extension = address.extension;
            row.doc.district = address.district;
            row.doc.province = address.province;
            row.doc.post_code = address.post_code;
        }
    });

    // set readonly
    set_guarantor_readonly(frm, row.doc.name);
    refresh_table_guarantor(frm, row.doc.name);
}

function child_calc_age(frm, child, refresh_field) {
    let row = frm.get_field(refresh_field).grid.get_row(child.name);
    if (validate_not_future_date(frm, "date_of_birth", child.doctype, child.name)) {
        frappe.call({
            method: "z_loan.loan.methods.calc_age",
            args: { date_of_birth: child.date_of_birth },
            callback: function (response) {
                let age = response.message.age;
                row.doc.age = age;
                row.refresh_field("age");
                if (refresh_field == "table_guarantor" || refresh_field == "authorized_person") {
                    if (age < frm.loan_app_settings?.minimum_age) {
                        let error_message = "";
                        if (refresh_field == "table_guarantor") {
                            error_message = __("Guarantor/Co-borrower age must be greater than or equal {0} years.", [frm.loan_app_settings.minimum_age])
                        }
                        if (refresh_field == "authorized_person") {
                            error_message = __("Authorized Person age must be greater than or equal {0} years.", [frm.loan_app_settings.minimum_age])
                        }
                        display_error_message_for_child(error_message);
                    }
                }
            }
        });
    }
    else {
        row.doc.age = 0;
        row.refresh_field("age");
    }
}

function child_calc_spouse_age(frm, child) {
    let row = frm.get_field("table_guarantor").grid.get_row(child.name);
    if (validate_not_future_date(frm, "spouse_date_of_birth", child.doctype, child.name)) {
        frappe.call({
            method: "z_loan.loan.methods.calc_age",
            args: { date_of_birth: child.spouse_date_of_birth },
            callback: function (response) {
                let age = response.message.age;
                child.spouse_age = age;
                row.refresh_field("spouse_age");
            }
        });
    }
    else {
        child.spouse_age = 0;
        row.refresh_field("spouse_age");
    }
}

function setup_k2_custom_start_workflow_condition(frm) {
    if (frm.doc.status == "20100" && frm.doc.process_instance_id == 0) {
        frm.k2_variables.k2_custom_start_workflow_condition = true;
    }
    else {
        frm.k2_variables.k2_custom_start_workflow_condition = false;
    }
}

function get_loan_applicaion_settings(frm) {
    frappe.call({
        method: "z_loan.loan.doctype.loan_application_settings.loan_application_settings.get_loan_applicaion_settings",
        callback: function (response) {
            frm.loan_app_settings = response.message;
        },
        async: false
    });
}
async function get_status_name(frm) {
    if (frm.doc.status != undefined && frm.doc.status != "") {
        await frappe.db.get_doc("K2 Workflow State", frm.doc.status).then((doc) => {
            frm.state = doc.state;
        });
    }
}

function render_customer_banner(html) {
    customer_banner.html(html);
    general_banner.html(html);
    collateral_banner.html(html);
    guarantor_banner.html(html);
    transfer_banner.html(html);
}

function get_customer_banner_html(frm, loan_condition_doc) {
    return frappe.model.with_doctype("Loan Condition").then(() => {
        let loan_condition_meta = frappe.get_meta("Loan Condition");
        let loan_app_fields = frm.meta.fields;
        let loan_condition_fields = loan_condition_meta.fields;
        let company_color = get_company_colors(frm.doc.company, loan_condition_doc);
        let pea_label = "A:"
        let dlt_label = "B:"
        let pea_point = "-"
        let dlt_point = "-"
        let total_fees_net = 0.00;
        if (loan_condition_doc) {
            total_fees_net = flt(loan_condition_doc.total_fees_net) + flt(loan_condition_doc.total_insurance_net) + flt(loan_condition_doc.total_deduction) + flt(loan_condition_doc.advanced_installment_amount);
            total_fees_net = format_number(total_fees_net);
        }
        if (frm.doc.result_pea.length > 0) {
            let customer_pea_point = ""
            let guarantor_pea_point = ""
            let guarantor_identification_number_list = []
            if (frm.doc.table_guarantor.length > 0) {
                guarantor_identification_number_list = frm.doc.table_guarantor.map(item => item.identification_number);
            }
            for (let item of frm.doc.result_pea) {
                if(!customer_pea_point && item.identification_number == frm.doc.cus_customer_id) {
                    customer_pea_point = item.pea_point || item.pea_grade
                }
                else if(!guarantor_pea_point && guarantor_identification_number_list.length > 0 && guarantor_identification_number_list.includes(item.identification_number)) {
                    guarantor_pea_point = item.pea_point || item.pea_grade
                }
                if(customer_pea_point && (guarantor_pea_point || guarantor_identification_number_list.length == 0)) {
                    break;
                }
            }
            if (customer_pea_point || guarantor_pea_point) {
                pea_point = customer_pea_point + guarantor_pea_point;
            }
        }
        if (frm.doc.result_dlt.length > 0) {
            let item = frm.doc.result_dlt[0];
            if (item.dlt_point) {
                dlt_point = item.dlt_point
            }
        }

        return frappe.render_template("tmpl_banner", {
            label_title: __("Loan Application Information"),
            label_id: __("Loan Application ID"),
            label_header: {
                lease_type: __(loan_condition_fields.find(t => t.fieldname == "lease_type").label,null,"Banner"),
                financing_amount_net: __(loan_condition_fields.find(t => t.fieldname == "financing_amount_net").label,null,"Banner"),
                total_fees_net: __(loan_condition_fields.find(t => t.fieldname == "total_fees_net").label,null,"Banner"),
                remaining_transfer_amount: __(loan_condition_fields.find(t => t.fieldname == "remaining_transfer_amount").label,null,"Banner"),
                campaign_code: __(loan_condition_fields.find(t => t.fieldname == "campaign_code").label,null,"Banner"),
                cus_first_name: __(loan_app_fields.find(t => t.fieldname == "cus_first_name").label,null,"Banner"),
                cus_organization_name: __(loan_app_fields.find(t => t.fieldname == "cus_organization_name").label,null,"Banner"),
                cus_customer_id: __(loan_app_fields.find(t => t.fieldname == "cus_customer_id").label,null,"Banner"),
                col_collatteral_id: __(loan_app_fields.find(t => t.fieldname == "col_collatteral_id").label,null,"Banner"),
                status: __(loan_app_fields.find(t => t.fieldname == "status").label,null,"Banner"),
            },
            loan_app_doc: frm.doc,
            loan_condition_doc: loan_condition_doc,
            state: frm.state,
            company_color: company_color,
            total_fees_net: total_fees_net,
            pea_point: pea_label + pea_point,
            dlt_point: dlt_label + dlt_point
        });
    });
}
function refresh_table_guarantor(frm, cdn) {
    const sectionFields = [
        "guarantor_information_section",
        "address_section",
        "home_address_section",
        "identification_address_section",
        "work_address_section",
        "guarantor_spouse_information"
    ];

    const tableGuarantor = frm.fields_dict.table_guarantor.grid.grid_rows;

    tableGuarantor.forEach(row => {
        if (row.doc.name === cdn && row.grid_form) {
            const collapseStates = sectionFields.map(field => {
                let section = row.grid_form.fields_dict[field];
                let isCollapsed = section.is_collapsed();
                return isCollapsed;
            });

            frm.refresh_field("table_guarantor");

            sectionFields.forEach((field, index) => {
                let section = row.grid_form.fields_dict[field];
                if (!collapseStates[index]) {
                    section.collapse(false);
                }
            });
        }
    });
}

function refresh_table_related_person(frm, cdn) {
    const sectionFields = [
        "related_person_section",
        "related_person_detail_section",
        "current_address_section",
        "home_address_section",
        "identification_address_section",
        "work_address_section"
    ];

    const tableRelatedPerson = frm.fields_dict.table_related_person.grid.grid_rows;

    tableRelatedPerson.forEach(row => {
        if (row.doc.name === cdn) {
            const collapseStates = sectionFields.map(field => {
                let section = row.grid_form.fields_dict[field];
                let isCollapsed = section.is_collapsed();
                return isCollapsed;
            });

            frm.refresh_field("table_related_person");

            sectionFields.forEach((field, index) => {
                let section = row.grid_form.fields_dict[field];
                if (!collapseStates[index]) {
                    section.collapse(false);
                }
            });
        }
    });
}

function show_smartcard_dialog(frm) {
    const agent_port = frm.loan_app_settings.smartcard_agent_port
    const agent_url = (agent_port == "0") ? "http://127.0.0.1" : "http://127.0.0.1:" + frm.loan_app_settings.smartcard_agent_port
    $.ajax({
        url: agent_url + "/smartcard",
        type: "GET",
        success: function(response) {
            let dialog = new frappe.ui.Dialog({
                title: __("Thai National ID Card"),
                static: true,
                size: "extra-large",
                fields: [
                    {
                        fieldname: "number",
                        fieldtype: "Data",
                        label: __("Identification Number"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "date_of_birth",
                        fieldtype: "Date",
                        label: __("Date of Birth"),
                        read_only: true
                    },
                    {
                        fieldtype: "Section Break",
                    },
                    {
                        fieldname: "salutation",
                        fieldtype: "Data",
                        label: __("Salutation"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "firstname",
                        fieldtype: "Data",
                        label: __("First Name"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "lastname",
                        fieldtype: "Data",
                        label: __("Last Name"),
                        read_only: true
                    },
                    {
                        fieldtype: "Section Break",
                    },
                    {
                        fieldname: "issuer",
                        fieldtype: "Data",
                        label: __("Issuer"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "issue_date",
                        fieldtype: "Date",
                        label: __("Issue Date"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "expiry_date",
                        fieldtype: "Date",
                        label: __("Expiry Date"),
                        read_only: true
                    },
                    {
                        fieldtype: "Section Break",
                    },
                    {
                        fieldname: "address",
                        fieldtype: "Data",
                        label: __("Address"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "subdistrict",
                        fieldtype: "Data",
                        label: __("Sub District"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "district",
                        fieldtype: "Data",
                        label: __("District"),
                        read_only: true
                    },
                    {
                        fieldtype: "Column Break"
                    },
                    {
                        fieldname: "province",
                        fieldtype: "Data",
                        label: __("Province"),
                        read_only: true
                    },
                    {
                        fieldtype: "Section Break",
                    },
                    {
                        fieldname: "status",
                        fieldtype: "HTML",
                        read_only: true
                    }
                ],
                primary_action_label: __("Read"),
                primary_action() {
                    dialog.set_value("status", "")
                    read_data_from_smartcard(dialog, agent_url)
                },
                secondary_action_label: __("Close"),
                secondary_action() {
                    if(dialog.get_value("number")) {
                        frm.smart_card_data = dialog.get_values();
                        frm.set_value("cus_search_id", dialog.get_value("number")).then(() => {
                            frm.trigger("cus_search_button");
                            dialog.hide();
                        });
                    }
                    else {
                        dialog.hide();
                    }
                },
        
            });
            dialog.show();
            read_data_from_smartcard(dialog, agent_url);
        },
        error: function(error) {
            // do nothing
        }
    });    
}

function read_data_from_smartcard(dialog, agent_url) {
    $.ajax({
        url: agent_url + "/smartcard",
        type: "GET",
        success: function(r) {
            if(r) {
                let json_data = JSON.parse(r);
                let response = json_data[0];
                dialog.set_value("number", response.cid);
                dialog.set_value("date_of_birth", transform_date_smart_card(response.cusBirthday));
    
                dialog.set_value("issuer", response.cusCardBy);
                dialog.set_value("issue_date", transform_date_smart_card(response.cusCardIssue));
                dialog.set_value("expiry_date", transform_date_smart_card(response.cusCardExpire));
    
                dialog.set_value("salutation", response.cusPrefix);
                dialog.set_value("firstname", response.cusName);
                dialog.set_value("lastname", response.cusSurname);
    
                dialog.set_value("address", response.cusAddr1);
                dialog.set_value("subdistrict", response.cusTumbon1);
                dialog.set_value("district", response.cusAmphur1);
                dialog.set_value("province", response.cusProvince1);
    
                dialog.get_primary_btn().addClass("hide");
            }
        },
        error: function(error) {
            let error_message = __("Data not found")
            if(error) {
                error_message = error;
            }
            dialog.set_value("status", "<b style='color:red;'>" + error_message + "</b>")
        }
    });
}

function transform_date_smart_card(be_date_str) {
    let year = parseInt(be_date_str.substring(0, 4)) - 543;
    let month = be_date_str.substring(4, 6);
    let day = be_date_str.substring(6, 8);
    let ce_date = `${year}-${month}-${day}`;
    return ce_date;
}

function render_loan_history(frm, customer_info) {
    let label = {
        agreement_title: (__("Contract History")),
        guarantor_title: (__("Gurantor History")),
        agreement_start_date: __("Agreement Start Date"),
        outstanding_period: __("Outstanding Period"),
        current_outstanding_period: __("Current Outstanding Period"),
    }
    let data = [];
    let company_names = [];
    company_names = company_names.concat(customer_info.agreement?.map(item => item.company), customer_info.guarantor?.map(item => item.company));
    if (company_names.length > 0) {
        company_names = [...new Set(company_names)];
    }
    company_names.forEach(company => {
        let agreements = customer_info.agreement?.filter(t => t.company == company);
        let guarantors = customer_info.guarantor?.filter(t => t.company == company);
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
        data.push({
            "name": company,
            "color": get_company_colors(company, null),
            "contracts": agreement_data,
            "guarantors": guarantor_data,
            "is_show_agreement": agreement_data.length > 0 ? true : false,
            "is_show_guarantor": guarantor_data.length > 0 ? true : false,
        })
    });
    loan_history.html(frappe.render_template("tmpl_loan_history", { label: label, contract_history: data }));
}
function render_collateral_info(frm, agreements) {
    let label = {
        agreement_title: (__("Contract History")),
        agreement_start_date: __("Agreement Start Date"),
        outstanding_period: __("Outstanding Period"),
        current_outstanding_period: __("Current Outstanding Period"),
    }
    let data = [];
    let company_names = [];
    company_names = agreements.map(item => item.company)
    if (company_names.length > 0) {
        company_names = [...new Set(company_names)];
    }
    company_names.forEach(company => {
        let filter_agreements = agreements.filter(t => t.company == company);
        let agreement_data = []
        let guarantor_data = []
        if (filter_agreements) {
            filter_agreements.forEach(agreement => {
                agreement_data.push({
                    "agreement_id": `${agreement.agreement_id}[${agreement.target}]`,
                    "agreement_start_date": frappe.datetime.str_to_user(agreement.agreement_start_date),
                    "outstanding_period": agreement.outstanding_period,
                    "current_outstanding_period": agreement.current_outstanding_period,
                    "remark": agreement.remark
                },)
            });
        }
        data.push({
            "name": company,
            "color": get_company_colors(company, null),
            "contracts": agreement_data,
            "guarantors": guarantor_data,
            "is_show_agreement": agreement_data.length > 0 ? true : false,
        })
    });
    frm.fields_dict["contract_history_section"].show();
    frm.fields_dict["contract_history_section"].collapse(false);
    collateral_info.html(frappe.render_template("tmpl_collateral_info", { label: label, contract_history: data }));
}

function check_form_disable(frm) {
    let serial_number = frm.get_serial_number();
    if (serial_number == null || serial_number == undefined || serial_number == "") {
        if (frm.doc.process_instance_id != 0 || frm.doc.is_confirm) {
            frm.disable_form();
            remove_row_check_cus_addresses_detail(frm);
            frm.toggle_display("verify_dopa", false);
            frm.toggle_display("btn_search_location", false);
            frm.get_field("table_guarantor").grid.toggle_display("search", false);
            frm.get_field("table_guarantor").grid.toggle_display("verify_dopa", false);
        }
        else {
            frm.enable_save();
        }
    }
}

function set_guarantor_readonly(frm, row_name) {
    const ignore_readonly_list = [
        "relationship",
        "guarantor_type",
        "spouse_name",
        "spouse_nickname",
        "spouse_identification_type",
        "spouse_identification_number",
        "spouse_date_of_birth",
        "spouse_telephone",
    ]
    const check_null_list = [
        "race", 
        "marital_status",
        "address_nearby",
        "home_address_nearby",
        "identification_address_nearby",
        "work_address_nearby",
        "sensitive_data_consent",
        "marketing_consent",
    ];
    let grid_row = frm.get_field("table_guarantor").grid.get_row(row_name);
    let child = frm.doc.table_guarantor.find(item => item.name == row_name);
    if (child.expiry_date) {
        let days_diff = frappe.datetime.get_day_diff(child.expiry_date, frappe.datetime.now_date());
        if (days_diff < 0) {
            let error_message = __("ID card has expired.");
            child.expiry_date = null;
            ignore_readonly_list.push("issue_date");
            ignore_readonly_list.push("expiry_date");
            display_error_message_for_child(error_message);
        }
    }
    else {
        ignore_readonly_list.push("issue_date");
        ignore_readonly_list.push("expiry_date");
    }

    grid_row.docfields.forEach(field => {
        if (ignore_readonly_list.includes(field["fieldname"])) {
            set_child_df_property(frm, "table_guarantor", child, field["fieldname"], "read_only", 0);
        }
        else {
            if (check_null_list.includes(field["fieldname"])) {
                let value = grid_row.doc[field["fieldname"]];
                if (value == "" || value == null) {
                    set_child_df_property(frm, "table_guarantor", child, field["fieldname"], "read_only", 0);
                }
                else {
                    set_child_df_property(frm, "table_guarantor", child, field["fieldname"], "read_only", 1);
                }
            }
            else {
                if (field["fieldname"] == "search" || field["fieldname"] == "verify_dopa") {
                    set_child_df_property(frm, "table_guarantor", child, field["fieldname"], "hidden", 1);
                }
                else {
                    set_child_df_property(frm, "table_guarantor", child, field["fieldname"], "read_only", 1);
                }
            }
        }
    });
}

function validate_expiry_date(frm) {
    if (frm.doc.cus_expiry_date && frm.doc.cus_issue_date) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.cus_expiry_date, frm.doc.cus_issue_date);
        if (days_diff <= 0) {
            frm.set_value("cus_expiry_date", null);
            frappe.show_alert({
                message: __("Expiry Date must more than Issue Date."),
                indicator: "red"
            }, 5);
        }
    }
    if (frm.doc.cus_expiry_date) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.cus_expiry_date, frappe.datetime.now_date());
        if (days_diff < 0) {
            frm.set_value("cus_expiry_date", null);
            frappe.show_alert({
                message: __("ID card has expired."),
                indicator: "red"
            }, 5);
        }
    }
}

function validate_issue_date(frm) {
    if (frm.doc.cus_expiry_date && frm.doc.cus_issue_date) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.cus_issue_date, frm.doc.cus_expiry_date);
        if (days_diff >= 0) {
            frm.set_value("cus_issue_date", null);
            frappe.show_alert({
                message: __("Issue Date must less than Expiry Date."),
                indicator: "red"
            }, 5);
        }
    }
    if (frm.doc.cus_issue_date) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.cus_issue_date, frappe.datetime.now_date());
        if (days_diff > 0) {
            frm.set_value("cus_issue_date", null);
            frappe.show_alert({
                message: __("Issue Date must less than Current Date."),
                indicator: "red"
            }, 5);
        }
    }
}

function validate_date_of_license_expiry(frm) {
    if (frm.doc.col_date_of_license_expiry) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.col_date_of_license_expiry, frappe.datetime.now_date());
        if (days_diff < 0) {
            frm.set_value("col_date_of_license_expiry", null);
            frappe.show_alert({
                message: __("License has expired."),
                indicator: "red"
            }, 5);
        }
    }
}
function validate_date_of_tax_expiry(frm) {
    if (frm.doc.col_date_of_tax_expiry) {
        let days_diff = frappe.datetime.get_day_diff(frm.doc.col_date_of_tax_expiry, frappe.datetime.now_date());
        if (days_diff < 0) {
            frm.set_value("col_date_of_tax_expiry", null);
            frappe.show_alert({
                message: __("Vehicle has expired."),
                indicator: "red"
            }, 5);
        }
    }
}

function validate_child_expiry_date(child) {
    if (child.expiry_date && child.issue_date) {
        let days_diff = frappe.datetime.get_day_diff(child.expiry_date, child.issue_date);
        if (days_diff <= 0) {
            child.expiry_date = null;
            frappe.show_alert({
                message: __("Expiry Date must more than Issue Date."),
                indicator: "red"
            }, 5);
        }
    }
    if (child.expiry_date) {
        let days_diff = frappe.datetime.get_day_diff(child.expiry_date, frappe.datetime.now_date());
        if (days_diff < 0) {
            child.expiry_date = null;
            frappe.show_alert({
                message: __("ID card has expired."),
                indicator: "red"
            }, 5);
        }
    }
}

function validate_child_issue_date(child) {
    if (child.expiry_date && child.issue_date) {
        let days_diff = frappe.datetime.get_day_diff(child.issue_date, child.expiry_date);
        if (days_diff >= 0) {
            child.issue_date = null;
            frappe.show_alert({
                message: __("Issue Date must less than Expiry Date."),
                indicator: "red"
            }, 5);
        }
    }
    if (child.issue_date) {
        let days_diff = frappe.datetime.get_day_diff(child.issue_date, frappe.datetime.now_date());
        if (days_diff > 0) {
            child.issue_date = null;
            frappe.show_alert({
                message: __("Issue Date must less than Current Date."),
                indicator: "red"
            }, 5);
        }
    }
}

function disable_fields(frm, ignore_fields = []) {
    frm.fields.forEach((field) => {
        if (!ignore_fields.includes(field.df.fieldname)) {
            frm.set_df_property(field.df.fieldname, "read_only_depends_on", "");
            frm.set_df_property(field.df.fieldname, "read_only", "1");
        }
        else {
            frm.set_df_property(field.df.fieldname, "read_only_depends_on", "");
        }
    });
}

function clear_child_row(doctype, child, ignore_fields = []) {
    const number_type = ["Int", "Float"]
    frappe.meta.get_docfields(doctype, child.name).forEach(field => {
        let field_type = field.fieldtype
        let field_name = field.fieldname
        if (!ignore_fields.includes(field_name)) {
            if (field_type == "Data") {
                child[field_name] = "";
            }
            else if (field_type == "Link" || field_type == "Date" || field_type == "Select") {
                child[field_name] = null;
            }
            else if (field_type == "Check" || number_type.includes(field_type)) {
                child[field_name] = 0;
            }
        }
    });
}

function clear_value_by_subproduct(frm) {
    // let clear_sections = ["home_and_land_section", "vehicle_section", "vehicle_detail_section", "appraisal_section", "home_and_land_summary_section"];
    let clear_sections = [
        "section_collateral_land",
        "section_collateral_land2",
        "section_collateral_land3",
        "section_collateral_land4",
        "section_collateral_land5",
        "section_collateral_land6",
        "section_collateral_vehicle",
        "section_collateral_vehicle2",
        "section_collateral_vehicle3",
        "section_collateral_vehicle4",
        "section_collateral_vehicle5",
        "section_collateral_details2",
    ];
    clear_fields_value_in_section(frm, clear_sections, ["col_total_appraisal_value", "col_age", "col_vehicle_identification_number"]);
}

function disable_fields_by_dopa_flag(frm) {
    if (frm.doc.cus_dopa_code == "0" && frm.doc.cus_dopa_result == "สถานะปกติ" && frm.doc.cus_dopa_verify_status == "Y") {
        frm.toggle_enable("cus_customer_id", false);
        frm.toggle_enable("cus_identification_type", false);
        frm.toggle_enable("cus_customer_type", false);
        frm.toggle_enable("cus_first_name", false);
        frm.toggle_enable("cus_last_name", false);
        frm.toggle_enable("cus_date_of_birth", false);
    }
}
function disable_guarantor_fields_by_dopa_flag(frm, child) {
    let guarantor = frm.doc.table_guarantor.find(t => t.name == child.name);
    if (child.dopa_code == "0" && child.dopa_result == "สถานะปกติ" && child.dopa_verify_status == "Y") {
        set_child_df_property(frm, "table_guarantor", guarantor, "identification_number", "read_only", 1);
        set_child_df_property(frm, "table_guarantor", guarantor, "identification_type", "read_only", 1);
        set_child_df_property(frm, "table_guarantor", guarantor, "guarantor_type", "read_only", 1);
        set_child_df_property(frm, "table_guarantor", guarantor, "first_name", "read_only", 1);
        set_child_df_property(frm, "table_guarantor", guarantor, "last_name", "read_only", 1);
        set_child_df_property(frm, "table_guarantor", guarantor, "date_of_birth", "read_only", 1);
    }
}

function set_disable_fields(frm) {
    const cus_addresses_detail_meta = frappe.get_meta("Address Detail");

    let target_sections = [
        "customer_section",
        "personal_information_section",
        "personal_detail_section",
        "personal_spouse_information_section",
        "organization_information_section",
        "organization_authorized_person_section",
    ]

    if (frm.doc.cus_is_new) {
        enable_fields_in_section(frm, target_sections, true, ["cus_is_new"]);
        if (frm.doc.cus_customer_type == "Organization") {
            frm.toggle_display("authorized_person", true);
        }
        frm.toggle_enable("cus_delivery_address", true);
        
        frm.doc.cus_addresses_detail.forEach(address_item => {
            let grid_row = frm.get_field("cus_addresses_detail").grid.get_row(address_item.name);
            grid_row.docfields.forEach(field => {
                if(cus_addresses_detail_meta.fields.find(t => t.fieldname == field["fieldname"])?.read_only == 0) {
                    set_child_df_property(frm, "cus_addresses_detail", address_item, field["fieldname"], "read_only", 0);
                }
            });
        });
        frm.refresh_field("cus_addresses_detail");
        frm.toggle_enable("table_related_person", true);
        frm.refresh_field("table_related_person");
    }
    else {
        enable_fields_in_section(frm, target_sections, false, ["cus_is_new"]);
        frm.toggle_enable("cus_delivery_address", false);
        if (frm.doc.cus_customer_type == "Personal") {
            let ignore_empty_field_list = [
                "cus_race",
                "cus_marital_status",
                "cus_gender",
                "cus_delivery_address",
                "cus_marketing_consent",
                "cus_sensitive_data_consent",
                "cus_issue_date",
                "cus_expiry_date",
                "cus_issuer",
            ]
            ignore_empty_field_list.forEach(item => {
                if (frm.doc[item] == "" || frm.doc[item] == null) {
                    if(item == "cus_issue_date") {
                        frm.toggle_enable("cus_expiry_date", true);
                        frm.refresh_field("cus_expiry_date");
                    }
                    if(item == "cus_expiry_date") {
                        frm.toggle_enable("cus_issue_date", true);
                        frm.refresh_field("cus_issue_date");
                    }
                    frm.toggle_enable(item, true);
                    frm.refresh_field(item);
                }
            });
        }
        else {
            let ignore_empty_field_list = [
                "cus_organization_type",
                "cus_organization_name",
                "cus_nationality",
                "cus_delivery_address",
            ]
            ignore_empty_field_list.forEach(item => {
                if (frm.doc[item] == "" || frm.doc[item] == null) {
                    frm.toggle_enable(item, true);
                    frm.refresh_field(item);
                }
            });
        }
        
        let ignore_required_address_field = ["address_nearby"];
        frm.doc.cus_addresses_detail.forEach(address_item => {
            let grid_row = frm.get_field("cus_addresses_detail").grid.get_row(address_item.name);
            grid_row.docfields.forEach(field => {
                let field_name = field["fieldname"];
                let field_value = address_item[field_name];
                if((ignore_required_address_field.includes(field_name)) && (field_value == undefined || field_value == "" || field_value == null)) {
                    set_child_df_property(frm, "cus_addresses_detail", address_item, field_name, "read_only", 0);
                }
                else {
                    set_child_df_property(frm, "cus_addresses_detail", address_item, field_name, "read_only", 1);
                }
            });
        });
        frm.refresh_field("cus_addresses_detail");
        frm.toggle_enable("table_related_person", false);
        frm.refresh_field("table_related_person");
    }
    remove_row_check_cus_addresses_detail(frm);
    disable_fields_by_dopa_flag(frm);
}

function download_print_document(document_name, document_format,file_name,validate_agreement_document_setup,is_download) {
    frappe.call({
        method: "z_loan.api.validate_print_document",
        args: { doc_name: document_name, document_format: document_format,validate_agreement_document_setup:validate_agreement_document_setup },
        callback: function (response) {
            const agreement_document_format_name = response.message.agreement_document_format_name;
            const w = window.open(
                frappe.urllib.get_full_url(`/api/method/z_loan.api.print_document?doc_name=${encodeURIComponent(document_name)}&agreement_document_format_name=${encodeURIComponent(agreement_document_format_name)}&file_name=${encodeURIComponent(file_name)}&is_download=${encodeURIComponent(is_download)}`)
            );
            if (!w) {
                frappe.msgprint(__("Please enable pop-ups"));
            }
        }
    });
}

function validate_not_future_date(frm, field_name, child_doctype = null, child_docname = null) {
    let is_child = child_doctype && child_docname ? true : false;
    let input_date = is_child ? locals[child_doctype][child_docname]?.[field_name] : frm.doc[field_name];
    if (!input_date) {
        return false;
    }

    let today = frappe.datetime.get_today();
    if (input_date > today) {
        if (is_child) {
            frappe.model.set_value(child_doctype, child_docname, field_name, null);
        }
        else {
            frm.set_value(field_name, null);
        }
        frappe.show_alert({
            message: __("Date of Birth must more than Current Date."),
            indicator: "red"
        }, 5);
        return false;
    }
    else {
        return true;
    }
}

function defualt_field_from_collateral_id(frm) {
    if (frm.doc.col_product != null && frm.doc.col_product != "" && ["H", "L"].includes(frm.doc.col_product)) {
        frm.set_value("col_title_deed_number", frm.doc.col_collatteral_id);
    }
    else {
        frm.set_value("col_vehicle_identification_number", frm.doc.col_collatteral_id);
    }
}

function render_collateral_blocked_message(frm) {
    if (frm.doc.col_is_collateral_blocked) {
        if (frm.doc.col_collateral_blocked_status) {
            $(frm.fields_dict.col_is_collateral_blocked_message.wrapper).html(frm.doc.col_collateral_blocked_status);
        }
        else if (frm.loan_app_settings?.is_collateral_block_message) {
            $(frm.fields_dict.col_is_collateral_blocked_message.wrapper).html(frm.loan_app_settings.is_collateral_block_message);
        }
        else {
            $(frm.fields_dict.col_is_collateral_blocked_message.wrapper).html("");
        }
    }
    else {
        $(frm.fields_dict.col_is_collateral_blocked_message.wrapper).html("");
    }
}

function override_hide_dialogs_for_child(d) {
    d.$wrapper.off("hide.bs.modal");
    d.$wrapper.on("hide.bs.modal", function () {
        d.display = false;
        d.is_minimized = false;
        d.hide_scrollbar(false);

        if (frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1] === d) {
            frappe.ui.open_dialogs.pop();
            if (frappe.ui.open_dialogs.length) {
                window.cur_dialog =
                    frappe.ui.open_dialogs[frappe.ui.open_dialogs.length - 1];
            } else {
                window.cur_dialog = null;
            }
        }
        d.onhide && d.onhide();
        d.on_hide && d.on_hide();
    })
}

function display_error_message_for_child(error_message) {
    msg = { message: error_message, title: __("Error"), indicator: "red" };
    let d = frappe.msgprint(msg);
    override_hide_dialogs_for_child(d);
}

function render_customer_blocked_message(frm) {
    // show blocked message
    if (frm.doc.cus_is_customer_blocked) {
        if (frm.doc.cus_customer_blocked_status) {
            $(frm.fields_dict.cus_is_customer_blocked_message.wrapper).html(frm.doc.cus_customer_blocked_status);
        }
        else if (frm.loan_app_settings?.is_customer_block_message) {
            $(frm.fields_dict.cus_is_customer_blocked_message.wrapper).html(frm.loan_app_settings.is_customer_block_message);
        }
        else {
            $(frm.fields_dict.cus_is_customer_blocked_message.wrapper).html("");
        }
        frm.disable_save();
    }
    else {
        // clear blocked message
        $(frm.fields_dict.cus_is_customer_blocked_message.wrapper).html("");
        frm.enable_save();
    }
}

function set_registration_year_options(frm) {
    currentYear = new Date().getFullYear();
    const year_of_registration_list = [];
    for (let year = currentYear; currentYear - 20 < year; year--) {
        year_of_registration_list.push(year + 543);
    }
    frm.set_df_property("registration_year", "options", year_of_registration_list);
    
}

function set_col_year_of_possession_options(frm) {
    currentYear = new Date().getFullYear();
    const year_of_possession_list = [];
    for (let year = currentYear; currentYear - 20 < year; year--) {
        year_of_possession_list.push(year + 543);
    }
    frm.set_df_property("col_year_of_possession", "options", year_of_possession_list);
    
}

function update_days_options(frm) {
    const year = frm.doc.col_year_of_possession;
    const month = frm.doc.col_month_of_possession;

    if (!year || !month) {
        frm.set_df_property("days", "options", []);
        return;
    }

    const gregorianYear = year - 543;
    const daysInMonth = new Date(gregorianYear, month, 0).getDate();

    const dayOptions = [];
    for (let day = 1; day <= daysInMonth; day++) {
        dayOptions.push(day.toString());
    }

    frm.set_df_property("col_day_of_possession", "options", dayOptions.join("\n"));
}

function calculate_total_days(frm) {
    const day = frm.doc.col_day_of_possession;
    const month = frm.doc.col_month_of_possession;
    const year = frm.doc.col_year_of_possession;

    if (!day || !month || !year) {
        frm.set_value("col_total_day_of_possession", 0);
        return;
    }

    const gregorianYear = year - 543;

    const possession_date = `${gregorianYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (!frappe.datetime.validate(possession_date)) {
        frm.set_value("col_total_day_of_possession", 0);
        return;
    }

    const today = frappe.datetime.get_today();

    const daysDiff = frappe.datetime.get_diff(today, possession_date);

    const totalDays = daysDiff + 1;

    if(totalDays < 0) {
        frm.set_value("col_year_of_possession", "");
        frm.set_value("col_month_of_possession", "");
        frm.set_value("col_day_of_possession", "");
        frm.set_df_property("col_total_day_of_possession", "description", "");
        frappe.show_alert({
            message: __("Date of Possession must equal to or less than Current Date."),
            indicator: "red"
        }, 5);
    }
    else if(totalDays < 30) {
        let warning_message = __("Date of Possession less 30 Days.");
        let description_message = __(`<b style="color:red;">{0}</b>`,[warning_message]);

        frm.set_value("col_total_day_of_possession", totalDays);
        frm.set_df_property("col_total_day_of_possession", "description", description_message);
    }
    else {
        frm.set_value("col_total_day_of_possession", totalDays);
        frm.set_df_property("col_total_day_of_possession", "description", "");
    }
}

function calc_remaining_loan_principal(frm) {
    let calc = flt(frm.doc.col_mortgage_limit) - flt(frm.doc.col_total_loan_principal);
    if (calc < 0) {
        calc = 0;
    }
    frm.set_value("col_remaining_loan_principal", calc);
}

function default_value_by_submodel(frm) {
    frappe.db.get_doc("Submodel", frm.doc.col_submodel).then((doc) => {
        if (doc.year) {
            frm.doc.col_model_year = doc.year;
            const model_year_list = frm.fields_dict["col_model_year"].df.options;
            if(!model_year_list.includes(doc.year)){
                model_year_list.push(doc.year);
                frm.set_df_property("col_model_year","options",model_year_list);
            }
            frm.refresh_field("col_model_year");
        }
        if (doc.gear) {
            frm.doc.col_gear = doc.gear;
            frm.refresh_field("col_gear");
        }
        if (doc.engine_size) {
            frm.doc.col_engine_size = doc.engine_size;
            frm.refresh_field("col_engine_size");
        }
    });
}

function refresh_cus_addresses_detail(frm) {
    frm.refresh_field("cus_addresses_detail");
    remove_row_check_cus_addresses_detail(frm);
}

function remove_row_check_cus_addresses_detail(frm) {
    setTimeout(function () {
        frm.fields_dict["cus_addresses_detail"].$wrapper.find(".row-check").remove();
    }, 1000);
}

function set_child_df_property(frm, child_table, child_item, child_field, property, value) {
    if (child_item.__islocal) {
        let row = frm.get_field(child_table).grid.get_row(child_item.name);
        row.docfields.find(obj => obj["fieldname"] === child_field)[property] = value;
    }
    else {
        frm.set_df_property(child_table, property, value, frm.docname, child_field, child_item.name);
    }
}

function add_confirm_customer_information_dialog(frm) {

    if (!frm.validate_customer_information_custom_event_listener_added) {
        document.getElementById("loan-application-customer_information_tab-tab").addEventListener("click", function () {
            if (frm.is_new() && frm.doc.cus_is_new == false) {
                let d = frappe.confirm(__("Confirm customer history and start recording agreement."), () => {
                    frm.layout.tabs.find(t => t.df.fieldname == "customer_information_tab").set_active();
                    delete frm.validate_customer_information_custom_event_listener_added;
                    this.removeEventListener("click", arguments.callee, false);
                }, () => {
                    frm.layout.tabs.find(t => t.df.fieldname == "general_tab").set_active();
                });
            }
        });
        frm.validate_customer_information_custom_event_listener_added = true;
    }

    if (!frm.validate_guarantor_coborrower_custom_event_listener_added) {
        document.getElementById("loan-application-guarantor_coborrower_tab-tab").addEventListener("click", function () {
            if (frm.is_new() && frm.doc.cus_is_new == false) {
                frappe.confirm(__("Confirm customer history and start recording agreement."), () => {
                    frm.layout.tabs.find(t => t.df.fieldname == "guarantor_coborrower_tab").set_active();
                    delete frm.validate_guarantor_coborrower_custom_event_listener_added;
                    this.removeEventListener("click", arguments.callee, false);
                    frm.save();
                }, () => {
                    frm.layout.tabs.find(t => t.df.fieldname == "general_tab").set_active();
                });
            }
        });
        frm.validate_guarantor_coborrower_custom_event_listener_added = true;
    }
}
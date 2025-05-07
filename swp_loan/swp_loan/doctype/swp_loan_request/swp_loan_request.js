// Copyright (c) 2025, SWP and contributors
// For license information, please see license.txt

// frappe.ui.form.on("SWP_Loan_Request", {
// 	refresh(frm) {

// 	},
// });

let borrowerJsLoaded = false;
function load_borrower_js(callback) {
    if (!borrowerJsLoaded) {
        frappe.require("/assets/swp_loan/js/borrower.js", function () {
            borrowerJsLoaded = true;
            console.log("borrower.js loaded");
            if (typeof callback === "function") callback();
        });
    } else {
        if (typeof callback === "function") callback();
    }
}

frappe.ui.form.on("SWP_Loan_Request", {
    onload: function(frm) {
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

        // Show only borrower search section
        frm.fields_dict.section_header_borrower_search.wrapper.show();
        frm.fields_dict.section_borrower_search.wrapper.show();

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
        let html_header_collateral_search= `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาหลักประกัน</div>
            <button id="toggle-collateral_search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;

        frm.fields_dict.header_collateral_search.$wrapper.html(html_header_collateral_search);

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
        // ----------------------------------------------- End --- Header collateral search section

        // ----------------------------------------------- Start --- Header collateral section
        let html_header_collateral = `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">หลักประกัน</div>
            <button id="toggle-collateral-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;

        frm.fields_dict.header_collateral.$wrapper.html(html_header_collateral);

        let isCollapsed_header_collateral = false;

        $("#toggle-collateral-btn").on("click", function () {
            isCollapsed_header_collateral = !isCollapsed_header_collateral;

            if (isCollapsed_header_collateral) {
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
                $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            } else {
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
                $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }
        });
        // ----------------------------------------------- End --- Header collateral section

        // ----------------------------------------------- Start --- Header loan condition section
        let html_header_loan_condition= `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">รายละเอียดสินเชื่อ</div>
            <button id="toggle-loan_condition-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;

        frm.fields_dict.header_loan_condition.$wrapper.html(html_header_loan_condition);

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


        
        // ----------------------------------------------- Start --- Collateral save button
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
                    "col_collatteral_id",
                    "col_product",
                    "col_subproduct",
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

                            // Redirect to saved document
                            frappe.set_route("form", "SWP_Loan_Request", r.message.name);
                            // cur_frm.refresh_doc();

                            // Collapse section
                            $("#toggle-collateral-btn").trigger("click");
                        }
                    }
                });
            });

        
        // ----------------------------------------------- End --- Collateral save button


        
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

        

        // ----------------------------------------------- Start --- Loan condition save button
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
                    "registration_year",
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

                            // Redirect to saved document
                            frappe.set_route("form", "SWP_Loan_Request", r.message.name);

                            // Collapse section
                            $("#toggle-loan_condition-btn").trigger("click");
                        }
                    }
                });
            });
        // ----------------------------------------------- End --- Loan condition save button

        

        // ----------------------------------------------- Start --- Borrower search button
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
                'background-color': 'salmon',
                'color': 'white',
                'border': 'none',
            })
            .on('click', function() {
                // Validate empty field before search
                if (!frm.doc.cus_search_id) {
                    load_borrower_js(function () {
                        test();
                    });
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
                            cus_customer_id: frm.doc.cus_search_id
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
                                // เพิ่มโค้ดสำหรับการยอมรับประวัติผู้กู้ที่นี่
                            });

                            // เพิ่ม event handler สำหรับปุ่มยกเลิก
                            $("#btn_cancel_borrower").on("click", function() {
                                // ล้างค่าในฟิลด์
                                frm.set_value('cus_search_id', '');
                                frm.set_value('cus_is_new', 0);
                                frm.fields_dict.section_borrower_result.wrapper.hide();
                                
                                frappe.show_alert({
                                    message: 'ยกเลิกการค้นหาเรียบร้อยแล้ว',
                                    indicator: 'orange'
                                }, 5);
                                // เพิ่มโค้ดสำหรับการยกเลิกที่นี่
                            });
                        }

                        // แสดง section ผลการค้นหา
                        frm.fields_dict.section_borrower_result.wrapper.show();
                    }
                });
            });
        // ----------------------------------------------- End --- Borrower search button


        // ----------------------------------------------- Start --- Borrower save button
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
        // ----------------------------------------------- End --- Borrower save button



        // ----------------------------------------------- Start --- Borrower save button
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
                $("#toggle-guarantor-btn").trigger("click");

                frm.fields_dict.section_header_collateral_search.wrapper.show();
                frm.fields_dict.section_collateral_search.wrapper.show();
            });
        


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
            frappe.show_alert({
                message: 'สร้างใบคำขอสำเร็จ ระบบจะส่งให้ผู้อนุมัติโดยอัตโนมัติ',
                indicator: 'green'
            }, 7);
        });
        // ----------------------------------------------- End --- Sudbmit button

        

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
function initialize_collateral_header(frm) {

    frm.fields_dict.col_collatteral_id.$wrapper.find('.control-label').html('เลขที่หลักประกัน <span class="text-danger">*</span>');
    frm.fields_dict.col_product.$wrapper.find('.control-label').html('กลุ่มหลักประกัน <span class="text-danger">*</span>');
    frm.fields_dict.col_subproduct.$wrapper.find('.control-label').html('ประเภทหลักประกัน <span class="text-danger">*</span>');
    frm.fields_dict.col_vehicle_identification_number.$wrapper.find('.control-label').html('เลขตัวถัง <span class="text-danger">*</span>');
    frm.fields_dict.col_brand.$wrapper.find('.control-label').html('ยี่ห้อ <span class="text-danger">*</span>');
    frm.fields_dict.col_model_year.$wrapper.find('.control-label').html('ปีที่ผลิต <span class="text-danger">*</span>');
    frm.fields_dict.col_model.$wrapper.find('.control-label').html('รุ่น <span class="text-danger">*</span>');
    frm.fields_dict.col_submodel.$wrapper.find('.control-label').html('รุ่นย่อย <span class="text-danger">*</span>');
    frm.fields_dict.col_gear.$wrapper.find('.control-label').html('เกียร์ <span class="text-danger">*</span>');
    frm.fields_dict.col_color.$wrapper.find('.control-label').html('สีรถ <span class="text-danger">*</span>');
    frm.fields_dict.col_engine_number.$wrapper.find('.control-label').html('เลขที่เครื่องยนต์ <span class="text-danger">*</span>');
    frm.fields_dict.col_no_engine_number.$wrapper.find('.control-label').html('เลขที่เครื่องยนต์ <span class="text-danger">*</span>');
    frm.fields_dict.col_engine_size.$wrapper.find('.control-label').html('ขนาดเครื่องยนต์ <span class="text-danger">*</span>');
    frm.fields_dict.col_car_mileage.$wrapper.find('.control-label').html('เลขไมล์ <span class="text-danger">*</span>');
    frm.fields_dict.col_license_plate_number.$wrapper.find('.control-label').html('เลขทะเบียนรถ <span class="text-danger">*</span>');
    frm.fields_dict.col_date_of_license_expiry.$wrapper.find('.control-label').html('วันที่ใบอนุญาติหมดอายุ <span class="text-danger">*</span>');
    frm.fields_dict.col_province_registration.$wrapper.find('.control-label').html('ทะเบียนจังหวัด <span class="text-danger">*</span>');
    

    let html_header_collateral = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #80AFE0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
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
}

function fn_btn_save_collateral(frm){
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
        const resValidate = ValidateFromCollateral(frm);
        if (resValidate) {
            frm.save()
        }
    });
}

function ValidateFromCollateral(frm) {
    let errors = [];
    let col_collatteral_id = frm.fields_dict.col_collatteral_id.$input.val();
    let col_product = frm.fields_dict.col_product.$input.val();
    let col_subproduct = frm.fields_dict.col_subproduct.$input.val();
    let col_vehicle_identification_number = frm.fields_dict.col_vehicle_identification_number.$input.val();
    let col_brand = frm.fields_dict.col_brand.$input.val();
    let col_model_year = frm.fields_dict.col_model_year.$input.val();
    let col_model = frm.fields_dict.col_model.$input.val();
    let col_submodel = frm.fields_dict.col_submodel.$input.val();
    let col_gear = frm.fields_dict.col_gear.$input.val();
    let col_color = frm.fields_dict.col_color.$input.val();
    let col_engine_number = frm.fields_dict.col_engine_number.$input.val();
    let col_no_engine_number = frm.fields_dict.col_no_engine_number.$input; 
    let col_engine_size = frm.fields_dict.col_engine_size.$input.val();
    let col_car_mileage = frm.fields_dict.col_car_mileage.$input.val();
    let col_license_plate_number = frm.fields_dict.col_license_plate_number.$input.val();
    let col_date_of_license_expiry = frm.fields_dict.col_date_of_license_expiry.$input.val();
    let col_province_registration = frm.fields_dict.col_province_registration.$input.val();


    if (!col_collatteral_id) errors.push('- เลขที่หลักประกัน');
    if (!col_product) errors.push('- กลุ่มหลักประกัน');
    if (!col_subproduct) errors.push('- ประเภทหลักประกัน');
    if (!col_vehicle_identification_number) errors.push('- เลขตัวถัง');
    if (!col_brand) errors.push('- ยี่ห้อ');
    if (!col_model_year) errors.push('- ปีที่ผลิต');
    if (!col_model) errors.push('- รุ่น');
    if (!col_submodel) errors.push('- รุ่นย่อย');
    if (!col_gear) errors.push('- เกียร์');
    if (!col_color) errors.push('- สีรถ');

    if (!col_engine_number && !col_no_engine_number.prop("checked")) {
        errors.push('- เลขที่เครื่องยนต์');
    }
    if (!col_engine_size) errors.push('- ขนาดเครื่องยนต์');
    if (!col_car_mileage) errors.push('- เลขไมล์');
    if (!col_license_plate_number) errors.push('- เลขทะเบียนรถ');
    if (!col_date_of_license_expiry) errors.push('- วันที่ใบอนุญาติหมดอายุ');
    if (!col_province_registration) errors.push('- ทะเบียนจังหวัด');
    
    
    if (errors.length > 0) {
        errors.unshift('กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง <br/>');
        frappe.throw(errors.join('<br>'));
    }

    return true;
}

function fn_btn_find_rate_book(frm){
    frm.fields_dict.btn_find_rate_book.$wrapper
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
        let test_data = {
            "parm_product": frm.doc.col_product,
            "parm_sub_product": frm.doc.col_subproduct,
            "parm_brand": frm.doc.col_brand,
            "parm_model_year": frm.doc.col_model_year,
            "parm_model": frm.doc.col_model,
            "parm_sub_model": frm.doc.col_submodel,
            "parm_gear": frm.doc.col_gear,
            "parm_body": frm.doc.col_body,
            "parm_driver_system": frm.doc.col_drive_system
        }
        console.log(test_data);
            frappe.call({
              args: {
                    parm_product : frm.doc.col_product
                    , parm_sub_product : frm.doc.col_subproduct
                    , parm_brand : frm.doc.col_brand
                    , parm_model_year : frm.doc.col_model_year
                    , parm_model : frm.doc.col_model
                    , parm_sub_model : frm.doc.col_submodel
                    , parm_gear : frm.doc.col_gear
                    , parm_body : frm.doc.col_body
                    , parm_driver_system : frm.doc.col_drive_system 
                },
              method: "z_loan.loan.doctype.rate_book.rate_book.find_rate_book",
              callback: function (response) {
                console.log(response);
                let result_rate = response.message.result_rate;
                console.log(result_rate);
                frm.set_value("col_appraisal_value", result_rate);
                // frm.set_value("col_appraisal_value_by_branch", frm.doc.customer_requested_amount);
              },
            });


    });
}
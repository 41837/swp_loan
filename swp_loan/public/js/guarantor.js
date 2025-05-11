function initialize_guarantor_header(frm) {
    let html_header_guarantor = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #80AFE0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ผู้ค้ำ</div>
        <button id="toggle-guarantor-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;

    frm.fields_dict.header_guarantor.$wrapper.html(html_header_guarantor);

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
        const resValidate = ValidateFromGurarantor(frm);
        console.log(resValidate,"resValidate");
        if (resValidate === true) {
            frm.save();
        }
        //เลื่อนหน้าจอ
        $('html, body').animate({
            scrollTop: frm.fields_dict.section_header_collateral_search.wrapper.offset().top - 50
        }, 500);
    });    
}

function ValidateFromGurarantor(frm) {
    let hasError = false;
    let errorMessages = [];

    if (!frm.doc.table_guarantor || frm.doc.table_guarantor.length === 0) {
        frappe.show_alert({
            message: __('กรุณากรอกข้อมูลผู้ค้ำประกัน'),
            indicator: 'red'
        }, 5);
        return false;
    }
    const isValidPhone = phone => /^\d{10}$/.test(phone);


    frm.doc.table_guarantor.forEach((row, index) => {
        let rowErrors = [];
        let idCardAddressErrors = [];
        let homeAddressErrors = [];
        let currentAddressErrors = [];

        // ข้อมูลทั่วไป
        // ตรวจสอบประเภทบัตรและเลขบัตร
        if (!row.identification_number) rowErrors.push('- กรุณากรอกเลขบัตรประชาชน');
        if (!row.identification_type) rowErrors.push('- กรุณากรอกประเภทบัตร');
        if (!row.first_name) rowErrors.push('- กรุณากรอกชื่อ');
        if (!row.last_name) rowErrors.push('- กรุณากรอกนามสกุล');
        if (!row.issue_date) rowErrors.push('- กรุณากรอกวันที่ออกบัตร');
        if (!row.age) rowErrors.push('- กรุณากรอกอายุ');
        if (!row.expiry_date) rowErrors.push('- กรุณากรอกวันหมดอายุบัตร');
        if (!row.issuer) rowErrors.push('- กรุณากรอกออกบัตรโดย');
        if (!row.guarantor_type) rowErrors.push('- กรุณากรอกประเภทผู้ค้ำ');
        if (!row.nationality) rowErrors.push('- กรุณากรอกสัญชาติ');
        if (!row.race) rowErrors.push('- กรุณากรอกเชื้อชาติ');
        if (!row.occupation) rowErrors.push('- กรุณากรอกอาชีพ');
       
        // ข้อมูลที่อยู่บัตรประชาชน
        if (!row.identification_address) idCardAddressErrors.push('- กรุณากรอกที่อยู่บัตรประชาชน');
        if (!row.identification_address_nearby) idCardAddressErrors.push('- กรุณากรอกที่อยู่ใกล้เคียง บัตรประชาชน');
        if (!row.identification_subdistrict) idCardAddressErrors.push('- กรุณากรอกตำบล/แขวง');
        if (!row.identification_province) idCardAddressErrors.push('- กรุณากรอกจังหวัด');
        if (!row.identification_district) idCardAddressErrors.push('- กรุณากรอก อำเภอ/เขต');
        if (!row.identification_post_code) idCardAddressErrors.push('- กรุณากรอกรหัสไปรษณีย์');
        if (!row.identification_telephone) {
            idCardAddressErrors.push('- กรุณากรอกเบอร์โทรศัพท์');
        } else if (!isValidPhone(row.identification_telephone)) {
            idCardAddressErrors.push('- เบอร์โทรศัพท์บัตรประชาชนต้องเป็นตัวเลข 10 หลัก');
            frappe.show_alert({
                message: __('เบอร์โทรบัตรประชาชนต้องเป็นตัวเลข 10 หลัก'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(row.doctype, row.name, 'identification_telephone', '');
            frm.refresh_field('table_guarantor');
        }
        // ข้อมูลที่อยู่ทะเบียนบ้าน
        if (!row.home_address) homeAddressErrors.push('- กรุณากรอกที่อยู่ทะเบียนบ้าน');
        if (!row.home_address_nearby) homeAddressErrors.push('- กรุณากรอกที่อยู่ใกล้เคียง');
        if (!row.home_subdistrict) homeAddressErrors.push('- กรุณากรอก ตำบล/แขวง');
        if (!row.home_province) homeAddressErrors.push('- กรุณากรอกจังหวัด');
        if (!row.home_district) homeAddressErrors.push('- กรุณากรอก อำเภอ/เขต');
        if (!row.home_post_code) homeAddressErrors.push('- กรุณากรอกรหัสไปรษณีย์');
        if (!row.home_telephone) {
            homeAddressErrors.push('- กรุณากรอกเบอร์โทรศัพท์');
        } else if (!isValidPhone(row.home_telephone)) {
            homeAddressErrors.push('- เบอร์โทรศัพท์ทะเบียนบ้านต้องเป็นตัวเลข 10 หลัก');
            frappe.show_alert({
                message: __('เบอร์โทรทะเบียนบ้านต้องเป็นตัวเลข 10 หลัก'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(row.doctype, row.name, 'home_telephone', '');
            frm.refresh_field('table_guarantor');
        }

        // ข้อมูลที่อยู่ปัจจุบัน
        if (!row.address) currentAddressErrors.push('- กรุณากรอกที่อยู่ปัจจุบัน');
        if (!row.address_nearby) currentAddressErrors.push('- กรุณากรอกที่อยู่ใกล้เคียง');
        if (!row.subdistrict) currentAddressErrors.push('- กรุณากรอก ตำบล/แขวง');
        if (!row.province) currentAddressErrors.push('- กรุณากรอกจังหวัด');
        if (!row.district) currentAddressErrors.push('- กรุณากรอก อำเภอ/เขต');
        if (!row.post_code) currentAddressErrors.push('- กรุณากรอกรหัสไปรษณีย์');
        if (!row.telephone) {
            currentAddressErrors.push('- กรุณากรอกเบอร์โทรศัพท์');
        } else if (!isValidPhone(row.telephone)) {
            currentAddressErrors.push('- เบอร์โทรศัพท์ปัจจุบันต้องเป็นตัวเลข 10 หลัก');
            frappe.show_alert({
                message: __('เบอร์โทรปัจจุบันต้องเป็นตัวเลข 10 หลัก'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(row.doctype, row.name, 'telephone', '');
            frm.refresh_field('table_guarantor');
        }
        if (
            rowErrors.length > 0 ||
            idCardAddressErrors.length > 0 ||
            homeAddressErrors.length > 0 ||
            currentAddressErrors.length > 0
        ) {
            hasError = true;
            let fullMessage = `แถวที่ ${index + 1}:<br>`;
            if (rowErrors.length > 0) fullMessage += `${rowErrors.join('<br>')}<br>`;
            if (idCardAddressErrors.length > 0) fullMessage += `ที่อยู่ตามบัตรประชาชน<br>${idCardAddressErrors.join('<br>')}<br>`;
            if (homeAddressErrors.length > 0) fullMessage += `ที่อยู่ทะเบียนบ้าน<br>${homeAddressErrors.join('<br>')}<br>`;
            if (currentAddressErrors.length > 0) fullMessage += `ที่อยู่ปัจจุบัน<br>${currentAddressErrors.join('<br>')}<br>`;
            errorMessages.push(fullMessage);
        }
    });

    if (hasError) {
        frappe.msgprint(errorMessages.join('<br><br>'));
        return false;
    }

    return true;
}

function initialize_no_guarantor_checkbox(frm) {
    let html_no_guarantor = `
    <div class="checkbox" style="margin: 10px 0;">
        <label>
            <input type="checkbox" id="no_guarantor_checkbox" style="margin-right: 5px;">
            ไม่มีผู้ค้ำ
        </label>
    </div>
    `;
    frm.fields_dict.no_guarantor.$wrapper.html(html_no_guarantor);

    let isCollapsed_header_guarantor = false;
    $("#no_guarantor_checkbox").on("change", function() {
        isCollapsed_header_guarantor = !isCollapsed_header_guarantor;
        if (this.checked) {
            frm.fields_dict.section_guarantor.wrapper.hide();
            frm.fields_dict.section_guarantor2.wrapper.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        }
    });
}

frappe.ui.form.on('SWP_Guarantor', {
    identification_telephone: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        // ตรวจสอบเบอร์โทรศัพท์
        if (row.identification_telephone && !/^\d{10}$/.test(row.identification_telephone)) {
            frappe.show_alert({
                message: __('กรุณากรอกเบอร์โทรให้ถูกต้อง (10 หลัก)'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'identification_telephone', '');
            frm.refresh_field('table_guarantor');
        }
    },

    identification_number: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        console.log("identification_type:", row.identification_type);
        console.log("identification_number:", row.identification_number);
        // ตรวจสอบประเภทบัตรก่อนกรอกหมายเลขบัตร
        if (row.identification_number && !row.identification_type) {
            frappe.show_alert({
                message: __('กรุณาเลือกประเภทบัตรก่อนกรอกหมายเลขบัตร'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'identification_number', '');  // ลบหมายเลขบัตรที่กรอกไป
            frm.refresh_field('table_guarantor');
            return;  // หยุดการทำงานที่นี่หากไม่เลือกประเภทบัตร
        }

        // ตรวจสอบว่าเลขบัตรเป็นตัวเลขและมีความยาวถูกต้อง
        if (row.identification_number && !/^\d+$/.test(row.identification_number)) {
            frappe.show_alert({
                message: __('หมายเลขบัตรต้องเป็นตัวเลขเท่านั้น'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'identification_number', '');  // ลบหมายเลขบัตรที่กรอกไป
            frm.refresh_field('table_guarantor');
            return;  // หยุดการทำงานหากเลขบัตรไม่เป็นตัวเลข
        }

        // ตรวจสอบประเภทบัตรและเลขบัตร
        if (row.identification_type === '01') {
            if (row.identification_number.length !== 13) {
                frappe.show_alert({
                    message: __('หมายเลขบัตรประชาชนต้องมี 13 หลัก'),
                    indicator: 'red'
                }, 5);
                frappe.model.set_value(cdt, cdn, 'identification_number', '');  // ลบหมายเลขบัตรที่กรอกไป
                frm.refresh_field('table_guarantor');
            } else {
                // ใช้ฟังก์ชันที่ตรวจสอบบัตรประชาชน (ต้องเพิ่มฟังก์ชัน `isValidThaiCitizenID`)
                let is_valid = isValidThaiCitizenID(row.identification_number);
                if (!is_valid) {
                    frappe.show_alert({
                        message: __('หมายเลขบัตรประชาชนไม่ถูกต้อง'),
                        indicator: 'red'
                    }, 5);
                    frappe.model.set_value(cdt, cdn, 'identification_number', '');  // ลบหมายเลขบัตรที่กรอกไป
                    frm.refresh_field('table_guarantor');
                }
            }
        } else if (row.identification_type === '02') {
            if (row.identification_number.length < 6) {
                frappe.show_alert({
                    message: __('หมายเลขพาสปอร์ตควรมีอย่างน้อย 6 หลัก'),
                    indicator: 'red'
                }, 5);
                frappe.model.set_value(cdt, cdn, 'identification_number', '');  // ลบหมายเลขบัตรที่กรอกไป
                frm.refresh_field('table_guarantor');
            }
        }
    },

     // เพิ่มการตรวจสอบ issue_date และ expiry_date
     issue_date: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        const current_date = frappe.datetime.now_date(); // ใช้วันที่ปัจจุบัน

        if (row.issue_date && row.issue_date > current_date) {
            frappe.show_alert({
                message: __('วันที่ออกบัตรไม่สามารถมากกว่าปัจจุบันได้'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'issue_date', '');  // ลบวันที่ออกบัตร
            frm.refresh_field('table_guarantor');
        }
    },

    expiry_date: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        const current_date = frappe.datetime.now_date(); // ใช้วันที่ปัจจุบัน

        if (row.expiry_date && row.expiry_date < current_date) {
            frappe.show_alert({
                message: __('วันที่หมดอายุไม่สามารถน้อยกว่าปัจจุบันได้'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'expiry_date', '');  // ลบวันที่หมดอายุ
            frm.refresh_field('table_guarantor');
        }
    },
    salary: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];  // เพิ่มการดึงค่าของ row
        if (row.salary && !/^\d+$/.test(row.salary)) {
            frappe.show_alert({
                message: __('กรอกเป็นตัวเลขเท่านั้น'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'salary', '');  // ลบหมายเลขบัตรที่กรอกไป
            frm.refresh_field('table_guarantor');
            return; 
        }
    },
    
    work_experience_year: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];  // เพิ่มการดึงค่าของ row
        if (row.work_experience_year && !/^\d+$/.test(row.work_experience_year)) {
            frappe.show_alert({
                message: __('กรอกเป็นตัวเลขเท่านั้น'),
                indicator: 'red'
            }, 5);
            frappe.model.set_value(cdt, cdn, 'work_experience_year', '');  // ลบหมายเลขบัตรที่กรอกไป
            frm.refresh_field('table_guarantor');
            return;  
        }
    },
});
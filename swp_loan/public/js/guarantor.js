
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

    // ตั้งค่า HTML ของ has_guarantor เป็น checkbox
    frm.fields_dict.has_guarantor.$wrapper.html(`
        <div style="margin: 10px 0;">
            <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" id="has_guarantor_checkbox" style="margin-right: 8px;">
                <span>ไม่มีผู้ค้ำ</span>
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
        if (resValidate === true) {
            frm.save();
        }
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

    date_of_birth: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
    
        if (row.date_of_birth) {
            const birthDate = new Date(row.date_of_birth);
            const today = new Date();
    
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
    
            // ถ้ายังไม่ถึงวันเกิดปีนี้ให้ลบอายุออก 1 ปี
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
    
            if (age < 0 || isNaN(age)) {
                frappe.show_alert({
                    message: __('วันเกิดไม่ถูกต้อง'),
                    indicator: 'red'
                }, 5);
                frappe.model.set_value(cdt, cdn, 'age', '');
                frappe.model.set_value(cdt, cdn, 'date_of_birth', '');
            } else if (age < 18) {
                frappe.show_alert({
                    message: __('อายุต้องไม่ต่ำกว่า 18 ปี'),
                    indicator: 'red'
                }, 5);
                frappe.model.set_value(cdt, cdn, 'age', '');
                frappe.model.set_value(cdt, cdn, 'date_of_birth', '');
            } else {
                frappe.model.set_value(cdt, cdn, 'age', age);
            }
    
            frm.refresh_field('table_guarantor');
        }
    },

    search(frm, cdt, cdn) {
        let child = locals[cdt][cdn];
        console.log("chid =>",child);

        if (child.guarantor_is_new) {
            let row = frm.get_field("table_guarantor").grid.get_row(child.name);
            clear_child_row("SWP_Guarantor", child, ["guarantor_identification_number","guarantor_is_new", "guarantor_type"]);

            // waiting dialog

            let d = new frappe.ui.Dialog({
                title: __("SWP_Guarantor"),
                static: true,
                fields: [
                    {
                        fieldname: 'message',
                        fieldtype: 'HTML',
                        options: '<p>'+__("Searching for information...")+'</p>'
                    }
                ]
            });
            d.show();
            override_hide_dialogs_for_child_X(d);

            search_guarantor_X(frm, child.guarantor_identification_number, row,false,d);

        }  
    }  
});



function override_hide_dialogs_for_child_X(d) {
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

function search_guarantor_X(frm, search_id, input_row = null, is_refresh=false,dialog=null) {
    // console.log("Search_guarantor",search_id);
    // return false;
    // // call api
    frappe.call({
        method: "swp_loan.api.search_customer",
        args: { search_id: search_id, is_guarantor: 0 },
        freeze: true,
        freeze_message: __("Searching for information..."),
        callback: function (response) {
            let data = response.message?.data ?? {};
            if (data && Object.keys(data).length > 0 && response.message.statusCode == 200) {
                if (is_refresh == true) {
                    if (input_row.doc.guarantor_identification_number == search_id) {
                        assign_guarantor_X(frm, input_row, data,dialog);
                    }
                }
                else {
                    assign_guarantor_X(frm, input_row, data,dialog);
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



function assign_guarantor_X(frm, row, data, dialog) {
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
        else if(address.address_type == "Current") {
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
    // set_guarantor_readonly_X(frm, row.doc.name);
    // refresh_table_guarantor_X(frm, row.doc.name);
}



function set_guarantor_readonly_X(frm, row_name) {
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
function initialize_borrower_search(frm) {
    frm.fields_dict.cus_customer_id.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>'); 
    frm.fields_dict.cus_salutation.$wrapper.find('.control-label').html('คำนำหน้า <span class="text-danger">*</span>');
    frm.fields_dict.cus_first_name.$wrapper.find('.control-label').html('ชื่อ <span class="text-danger">*</span>');
    frm.fields_dict.cus_last_name.$wrapper.find('.control-label').html('นามสกุล <span class="text-danger">*</span>');
    frm.fields_dict.cus_date_of_birth.$wrapper.find('.control-label').html('วันเดือนปีเกิด <span class="text-danger">*</span>');
    frm.fields_dict.cus_age.$wrapper.find('.control-label').html('อายุ <span class="text-danger">*</span>');
    frm.fields_dict.cus_issue_date.$wrapper.find('.control-label').html('วันที่ออกบัตร <span class="text-danger">*</span>');
    frm.fields_dict.cus_expiry_date.$wrapper.find('.control-label').html('บัตรหมดอายุ <span class="text-danger">*</span>');
    frm.fields_dict.cus_identification_type.$wrapper.find('.control-label').html('ประเภทบัตร <span class="text-danger">*</span>');
    frm.fields_dict.cus_issuer.$wrapper.find('.control-label').html('ออกบัตรโดย <span class="text-danger">*</span>');
    frm.fields_dict.cus_customer_type.$wrapper.find('.control-label').html('ประเภทผู้กู้ <span class="text-danger">*</span>');
    frm.fields_dict.cus_nationality.$wrapper.find('.control-label').html('สัญชาติ <span class="text-danger">*</span>');
    frm.fields_dict.cus_race.$wrapper.find('.control-label').html('เชื้อชาติ <span class="text-danger">*</span>');
    frm.fields_dict.cus_gender.$wrapper.find('.control-label').html('เพศ <span class="text-danger">*</span>');
    frm.fields_dict.cus_marital_status.$wrapper.find('.control-label').html('สถานภาพการสมรส <span class="text-danger">*</span>');
    frm.fields_dict.cus_occupation.$wrapper.find('.control-label').html('อาชีพ <span class="text-danger">*</span>');
    frm.fields_dict.household_registration_status.$wrapper.find('.control-label').html('สถานะในทะเบียนบ้าน <span class="text-danger">*</span>');
    frm.fields_dict.cus_delivery_address.$wrapper.find('.control-label').html('ที่อยู่จัดส่งเอกสาร <span class="text-danger">*</span>');
    
    set_default_map_type(frm);
}

function fn_btn_save_borrower(frm){    
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
       const resValidate = ValidateFromBorrower(frm);
       if (resValidate) {
            frm.save()
        }
        //เลื่อนหน้าจอ
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: frm.fields_dict.section_header_guarantor.wrapper.offset().top - 50
            }, 500);
        }, 1000);
    });    
}

function ValidateFromBorrower(frm) {
    let errors = [];
    
    let cus_customer_id = frm.fields_dict.cus_customer_id.$input.val();
    let cus_salutation = frm.fields_dict.cus_salutation.$input.val();
    let cus_first_name = frm.fields_dict.cus_first_name.$input.val();
    let cus_last_name = frm.fields_dict.cus_last_name.$input.val();
    let cus_date_of_birth = frm.fields_dict.cus_date_of_birth.$input.val();
    let cus_age = frm.fields_dict.cus_age.$input.val();
    let cus_issue_date = frm.fields_dict.cus_issue_date.$input.val();
    let cus_expiry_date = frm.fields_dict.cus_expiry_date.$input.val();
    let cus_identification_type = frm.fields_dict.cus_identification_type.$input.val();
    let cus_issuer = frm.fields_dict.cus_issuer.$input.val();
    let cus_customer_type = frm.fields_dict.cus_customer_type.$input.val();
    let cus_nationality = frm.fields_dict.cus_nationality.$input.val();
    let cus_race = frm.fields_dict.cus_race.$input.val();
    let cus_gender = frm.fields_dict.cus_gender.$input.val();
    let cus_marital_status = frm.fields_dict.cus_marital_status.$input.val();
    let cus_occupation = frm.fields_dict.cus_occupation.$input.val();
    let household_registration_status = frm.fields_dict.household_registration_status.$input.val();
    let cus_delivery_address = frm.fields_dict.cus_delivery_address.$input.val();

    let addressTypes = [
        { label: 'บัตรประชาชน', index: 0, prefix: 'บัตรประชาชน' },
        { label: 'ทะเบียนบ้าน', index: 1, prefix: 'ทะเบียนบ้าน' },
        { label: 'ที่อยู่ปัจจุบัน', index: 2, prefix: 'ที่อยู่ปัจจุบัน' },
        { label: 'ที่ทำงาน', index: 3, prefix: 'ที่ทำงาน' },
    ];
    
    let addressFields = [
        { key: 'address', label: 'ที่อยู่' },
        { key: 'address_nearby', label: 'สถานที่ใกล้เคียง' },
        { key: 'subdistrict', label: 'ตำบล' },
        { key: 'district', label: 'อำเภอ' },
        { key: 'province', label: 'จังหวัด' },
        { key: 'post_code', label: 'รหัสไปรษณีย์' },
        { key: 'mobile_number', label: 'โทรศัพท์' }
    ];



    if (!cus_customer_id) errors.push('- หมายเลขบัตร');
    if (!cus_salutation) errors.push('- คำนำหน้า');
    if (!cus_first_name) errors.push('- ชื่อ');
    if (!cus_last_name) errors.push('- นามสกุล');
    if (!cus_date_of_birth) errors.push('- วันเกิด');
    if (!cus_age) errors.push('- อายุ');
    if (!cus_issue_date) errors.push('- วันที่ออกบัตร');
    if (!cus_expiry_date) errors.push('- วันหมดอายุบัตร');
    if (!cus_issuer) errors.push('- หน่วยงานที่ออกบัตร');

    if (!cus_identification_type) {
        errors.push('- ประเภทบัตร');
    } else {
        if (cus_identification_type === 'บัตรประชาชน') {
            if (cus_customer_id.length !== 13) {
                errors.push('- หมายเลขบัตรประชาชนต้องมี 13 หลัก');
            } else {
                let is_valid = isValidThaiCitizenID(cus_customer_id);
                if (!is_valid) {
                    errors.push('- หมายเลขบัตรประชาชนไม่ถูกต้อง');
                }
            }
        } else if (cus_identification_type === 'พาสปอร์ต') {
            if (cus_customer_id.length < 6) {
                errors.push('- หมายเลขพาสปอร์ตควรมีอย่างน้อย 6 หลัก');
            }
        }
    }

    if (cus_age && cus_age < 18) {
        errors.push('- อายุต่ำกว่า 18 ปี กรุณาเลือกวันที่เกิดที่ทำให้คุณมีอายุ 18 ปีขึ้นไป');
    }

    if (!cus_customer_type) errors.push('- ประเภทผู้กู้');
    if (!cus_nationality) errors.push('- สัญชาติ');
    if (!cus_race) errors.push('- เชื้อชาติ');
    if (!cus_gender) errors.push('- เพศ');
    if (!cus_marital_status) errors.push('- สถานภาพการสมรส');
    if (!cus_occupation) errors.push('- อาชีพ');
    if (!household_registration_status) errors.push('- สถานะในทะเบียนบ้าน');
    if (!cus_delivery_address) errors.push('- ที่อยู่จัดส่งเอกสาร');

    
    addressTypes.forEach(type => {
        let row = frm.fields_dict.section_borrower_details6.columns[0].doc.table_borrower_address[type.index];
        
        let addressErrorLines = [];
    
        addressFields.forEach(field => {
            let value = row ? row[field.key] : null;
            if (!value) {
                addressErrorLines.push(`- ${field.label}`);
            }
        });
    
        if (addressErrorLines.length > 0) {
            errors.push(`ตรวจสอบข้อมูลที่อยู่ (${type.prefix})`);
            errors.push(...addressErrorLines);
            errors.push('<hr/>');
        }
    });



    if (errors.length > 0) {
        errors.unshift('กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง <br/>');
        frappe.throw(errors.join('<br/>'));
    }

    return true;
}

function initialize_date_of_birth_validation(frm) {
    frm.fields_dict.cus_date_of_birth.$wrapper.find('input').on('change', function () {
        let inputVal = $(this).val();  // เช่น '29-04-2025'

        // ตรวจสอบรูปแบบ dd-mm-yyyy
        let datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        let match = inputVal.match(datePattern);

        if (!match) {
            frappe.msgprint(__('รูปแบบวันที่ไม่ถูกต้อง (ควรเป็น dd-mm-yyyy เช่น 29-04-2025)'));
            $(this).val('');
            frm.set_value('cus_date_of_birth', '');
            return;
        }

        // แปลงเป็น yyyy-mm-dd เพื่อใช้สร้าง Date ได้อย่างถูกต้อง
        let day = match[1];
        let month = match[2];
        let year = match[3];
        let formattedDate = `${year}-${month}-${day}`;

        let selected_date = new Date(formattedDate);
        let today = new Date();

        today.setHours(0, 0, 0, 0);
        selected_date.setHours(0, 0, 0, 0);

        if (selected_date > today) {
            frappe.msgprint({
                title: 'ไม่สามารถเลือกวันที่ในอนาคตได้',
                message: 'กรุณาเลือกวันที่ในอดีตหรือวันนี้เท่านั้น',
                indicator: 'red'
            });
            $(this).val('');
            frm.set_value('cus_date_of_birth', '');
        } else {
            let age = today.getFullYear() - selected_date.getFullYear();
            let m = today.getMonth() - selected_date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < selected_date.getDate())) {
                age--;
            }
            frm.set_value('cus_age', age);
            if (age < 18) {
                frappe.msgprint({
                    title: 'อายุต่ำกว่า 18 ปี',
                    message: 'กรุณาเลือกวันที่เกิดที่ทำให้คุณมีอายุ 18 ปีขึ้นไป',
                    indicator: 'red'
                });
                $(this).val('');
                frm.set_value('cus_date_of_birth', '');
            }
        }
    });
}

function initialize_customer_id_validation(frm) {
    // ตรวจสอบเมื่อมีการเปลี่ยนค่าของ cus_customer_id
    frm.fields_dict.cus_customer_id.$wrapper.find('input').on('input', function() {
        // อ่านค่าจาก cus_identification_type ปัจจุบัน
        let cus_identification_type = frm.fields_dict.cus_identification_type.$input.val();

        // ล้างอักขระที่ไม่ใช่ตัวอักษรหรือตัวเลขออกจากค่า input
        let value = $(this).val();
        value = value.replace(/[^A-Za-z0-9]/g, '');
        $(this).val(value); // อัปเดตค่าที่ผ่านการกรองกลับเข้าไปในช่อง input

        // เช็คว่า value เป็นตัว เลขหรือไม่
        if (isNaN(value)) {
            frappe.msgprint(__('กรุณากรอกหมายเลขบัตรเป็นตัวเลข'));
            return;
        }

        if (!cus_identification_type) {
            frappe.msgprint(__('กรุณาระบุประเภทบัตร'));
            frm.fields_dict.cus_identification_type.$wrapper.find('input').focus();
        }
        if (cus_identification_type === 'บัตรประชาชน') {
            if (value.length >= 13) {
                let is_valid = isValidThaiCitizenID(value);
                if (!is_valid) {
                    return false;
                }
            } 
        }

        // เพิ่ม validation สำหรับกรณีพาสปอร์ตถ้าต้องการ เช่นความยาวขั้นต่ำ
        if (cus_identification_type == 'พาสปอร์ต' && value.length < 6) {
            frappe.msgprint(__('หมายเลขพาสปอร์ตควรมีอย่างน้อย 6 หลัก'));
        }
    });
}

function isValidThaiCitizenID(id) {
    if (id.length == 13) {
        if (isNaN(id)) {
            frappe.msgprint(__('กรุณากรอกหมายเลขบัตรเป็นตัวเลข'));
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(id.charAt(i)) * (13 - i);
        }

        let check_digit = (11 - (sum % 11)) % 10;

        if (check_digit !== parseInt(id.charAt(12))) {
            frappe.msgprint(__('หมายเลขบัตรประชาชนไม่ถูกต้อง'));
            return false;
        }
    }else if (id.length > 13) {
        frappe.msgprint(__('หมายเลขบัตรประชาชนต้องมี 13 หลัก'));
        return false;
    }
    return true;
}

function initialize_cus_issue_date_validation(frm) {
    frm.fields_dict.cus_issue_date.$wrapper.find('input').on('change', function () {
        let inputVal = $(this).val();  // เช่น '29-04-2025'

        // ตรวจสอบรูปแบบ dd-mm-yyyy
        let datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        let match = inputVal.match(datePattern);

        if (!match && match.length > 0) {
            frappe.msgprint(__('รูปแบบวันที่ไม่ถูกต้อง (ควรเป็น dd-mm-yyyy เช่น 29-04-2025)'));
            $(this).val('');
            frm.set_value('cus_issue_date', '');
            return;
        }

        // แปลงเป็น yyyy-mm-dd เพื่อใช้สร้าง Date ได้อย่างถูกต้อง
        let day = match[1];
        let month = match[2];
        let year = match[3];
        let formattedDate = `${year}-${month}-${day}`;

        let selected_date = new Date(formattedDate);
        let today = new Date();

        today.setHours(0, 0, 0, 0);
        selected_date.setHours(0, 0, 0, 0);

        if (selected_date > today) {
            frappe.msgprint({
                title: 'ไม่สามารถเลือกวันที่ในอนาคตได้',
                message: 'กรุณาเลือกวันที่ในอดีตหรือวันนี้เท่านั้น',
                indicator: 'red'
            });
            frm.doc.cus_issue_date = '';
            frm.refresh_field('cus_issue_date');
        }
    });
}

function initialize_cus_expiry_date_validation(frm) {
    frm.fields_dict.cus_expiry_date.$wrapper.find('input').on('change', function () {
        let inputVal = $(this).val();  // เช่น '29-04-2025'
        let cus_issue_date = frm.fields_dict.cus_issue_date.$wrapper.find('input').val();

        // ตรวจสอบรูปแบบ dd-mm-yyyy
        let datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        let match = inputVal.match(datePattern);

        if (!match && match.length > 0) {
            frappe.msgprint(__('รูปแบบวันที่ไม่ถูกต้อง (ควรเป็น dd-mm-yyyy เช่น 29-04-2025)'));
            $(this).val('');
            frm.set_value('cus_expiry_date', '');
            return;
        }

        // แปลงเป็น yyyy-mm-dd เพื่อใช้สร้าง Date ได้อย่างถูกต้อง
        let day = match[1];
        let month = match[2];
        let year = match[3];
        let formattedDate = `${year}-${month}-${day}`;

        let selected_date = new Date(formattedDate);
        let today = new Date();

        today.setHours(0, 0, 0, 0);
        selected_date.setHours(0, 0, 0, 0);

        if (selected_date < today) {
            frappe.msgprint({
                title: 'ไม่สามารถเลือกวันที่ในอดีตได้',
                message: 'กรุณาเลือกวันที่ในอนาคตหรือวันนี้เท่านั้น',
                indicator: 'red'
            });
            $(this).val('');
            frm.set_value('cus_expiry_date', '');
        }

         // ตรวจสอบว่าไม่น้อยกว่า cus_issue_date ถ้ามีค่า
         if (cus_issue_val) {
            let issue_match = cus_issue_val.match(datePattern);
            if (issue_match) {
                let issue_formatted = `${issue_match[3]}-${issue_match[2]}-${issue_match[1]}`;
                let issue_date = new Date(issue_formatted);
                issue_date.setHours(0, 0, 0, 0);

                if (selected_date < issue_date) {
                    frappe.msgprint({
                        title: 'วันที่หมดอายุไม่ถูกต้อง',
                        message: 'วันที่หมดอายุจะต้องไม่น้อยกว่าวันที่ออกเอกสาร',
                        indicator: 'orange'
                    });
                    $(this).val('');
                    frm.set_value('cus_expiry_date', '');
                    return;
                }
            }
        }

    });
}

function initialize_borrower_header(frm) {
    let html_header_borrower = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #80AFE0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ข้อมูลผู้กู้</div>
        <button id="toggle-borrower-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;
    
    frm.fields_dict.header_borrower.$wrapper.html(html_header_borrower);
    
    let isCollapsed_header_borrower = false;
    
    $("#toggle-borrower-btn").on("click", function () {
        isCollapsed_header_borrower = !isCollapsed_header_borrower;
    
        if (isCollapsed_header_borrower) {
            hide_borrower_sections(frm);
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
            show_borrower_sections(frm);
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }
    });
}

function initialize_marketing_consent_radio_button(frm) {
    frm.fields_dict.consent_marketing.$wrapper.html(`
        <label>ความยินยอมด้านการตลาด</label><br>
        <input type="radio" name="marketing_consent" value="ยินยอม"> ยินยอม<br>
        <input type="radio" name="marketing_consent" value="ไม่ยินยอม"> ไม่ยินยอม
    `);
    frm.fields_dict.consent_marketing.$wrapper.on("change", "input[name=marketing_consent]", function() {
        let selected_value = $(this).val();
        frm.set_value("consent_marketing_value", selected_value);
    });
}

function initialize_sensitive_data_consent_radio_button(frm) {
    frm.fields_dict.consent_sensitive_data.$wrapper.html(`
        <label>ความยินยอมด้านข้อมูลอ่อนไหว</label><br>
        <input type="radio" name="sensitive_data_consent" value="ยินยอม"> ยินยอม<br>
        <input type="radio" name="sensitive_data_consent" value="ไม่ยินยอม"> ไม่ยินยอม
    `);
    frm.fields_dict.consent_sensitive_data.$wrapper.on("change", "input[name=sensitive_data_consent]", function() {
        let selected_value = $(this).val();
        frm.set_value("consent_sensitive_data_value", selected_value);
    });
}

// function fn_btn_duplicate(frm) {
//     frm.fields_dict.table_borrower_address.grid.add_custom_button(__('Duplicate'), function() {
//         let selected = frm.fields_dict.table_borrower_address.grid.get_selected_children();
        
//         if (!selected.length) {
//             frappe.msgprint(__('Please select at least one row to duplicate.'));
//             return;
//         }

//         selected.forEach(row => {
//             let new_row = frm.add_child('table_borrower_address');

//             // คัดลอกข้อมูลที่ต้องการ
//             new_row.address_type = row.address_type;
//             new_row.address = row.address;
//             new_row.sub_district = row.sub_district;
//             new_row.district = row.district;
//             new_row.province = row.province;

//             // เพิ่มฟิลด์อื่นๆ ถ้ามี
//         });

//         frm.refresh_field('table_borrower_address');
//     });
// }

function fn_btn_duplicate(frm) {
    frm.fields_dict.table_borrower_address.grid.add_custom_button(__('Duplicate'), function () {
        let selected = frm.fields_dict.table_borrower_address.grid.get_selected_children();

        if (!selected.length) {
            frappe.msgprint(__('Please select at least one row to duplicate.'));
            return;
        }

        selected.forEach(row => {
            let new_row = frm.add_child('table_borrower_address');
            new_row.address_type = row.address_type;
            new_row.address = row.address;
            new_row.sub_district = row.sub_district;
            new_row.district = row.district;
            new_row.province = row.province;
        });

        frm.refresh_field('table_borrower_address');
    });

    // ย้ายปุ่ม Duplicate ไปหลัง
    setTimeout(() => {
        let $buttons = frm.fields_dict.table_borrower_address.grid.grid_buttons;
        let $addRowBtn = $buttons.find('.grid-add-row');
        let $duplicateBtn = $buttons.find('.btn:contains("Duplicate")');

        if ($addRowBtn.length && $duplicateBtn.length) {
            $duplicateBtn.insertAfter($addRowBtn);
        }
    }, 100);
}

function bindMoveDeleteButtonOnCheck(frm, fieldname) {
    frm.fields_dict[fieldname].grid.wrapper.on('click', '.grid-row-check', function () {
        setTimeout(() => {
            moveDeleteButtonToEnd();
        });
    });
}

function moveDeleteButtonToEnd() {
    $('.grid-remove-rows').each(function () {
        const $deleteBtn = $(this);
        const $container = $deleteBtn.parent();

        // เอาปุ่มอื่นไว้ก่อน แล้วให้ delete มาทีหลัง
        // $container.append($container.find('[data-action="add_row"]'));
        // $container.append($container.find('[data-action="duplicate"]'));
        $container.append($deleteBtn);
    });
}

function hide_borrower_sections(frm) {
    const sections = [
        'section_preview',
        'section_borrower_details',
        'section_borrower_details2',
        'section_borrower_details3',
        'section_borrower_details4',
        'section_borrower_details5',
        'section_borrower_details6',
        'section_borrower_details7',
        'section_borrower_details8',
        'section_borrower_details9',
        'section_borrower_details10',
        'section_borrower_details11',
        'section_borrower_details12',
        'section_borrower_details13',
        'section_borrower_details14'
    ];

    sections.forEach(section => {
        if (frm.fields_dict[section]) {
            frm.fields_dict[section].wrapper.hide();
        }
    });
}

function show_borrower_sections(frm) {
    const sections = [
        'section_preview',
        'section_borrower_details',
        'section_borrower_details2',
        'section_borrower_details3',
        'section_borrower_details4',
        'section_borrower_details5',
        'section_borrower_details6',
        'section_borrower_details7',
        'section_borrower_details8',
        'section_borrower_details9',
        'section_borrower_details10',
        'section_borrower_details11',
        'section_borrower_details12',
        'section_borrower_details13',
        'section_borrower_details14'
    ];

    sections.forEach(section => {
        if (frm.fields_dict[section]) {
            frm.fields_dict[section].wrapper.show();
        }
    });
}

function set_default_map_type(frm) {
    // ตรวจสอบว่ามี child table หรือไม่
    if (frm.doc.table_borrower_address && frm.doc.table_borrower_address.length > 0) {
        frm.doc.table_borrower_address.forEach((row, index) => {
            // กำหนดค่า default เป็น "กรุงเทพมหานคร"
            frappe.model.set_value(row.doctype, row.name, 'map_type', 'กรุงเทพมหานคร');
        });
        frm.refresh_field('table_borrower_address');
    }
}

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
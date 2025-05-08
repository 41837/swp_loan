function initialize_borrower_search(frm) {
    frm.fields_dict.cus_customer_id.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>');       
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
        if (!frm.doc.cus_customer_id) {
            frappe.throw(__('กรุณากรอกหมายเลขบัตร'));
        }
        frm.save()
    });    
}

function initialize_date_of_birth_validation(frm) {
    frm.fields_dict.cus_date_of_birth.$wrapper.find('input').on('change', function() {
        let selected_date = new Date($(this).val());
        let today = new Date();
        
        // Reset time part for accurate date comparison
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
        }
    });
}

function initialize_customer_id_validation(frm) {
    frm.fields_dict.cus_customer_id.$wrapper.find('input').on('input', function() {
        let value = $(this).val();
        
        // Remove any non-alphanumeric characters
        value = value.replace(/[^A-Za-z0-9]/g, '');
        
        // Check if it's a Thai ID (13 digits)
        if (/^\d{1,13}$/.test(value)) {
            // Format as Thai ID: XXXX-XXXX-XXXX-X
            if (value.length > 0) {
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += '-';
                    }
                    formatted += value[i];
                }
                value = formatted;
            }
        } else {
            // Format as passport: XXXX-XXXXXX
            if (value.length > 0) {
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i === 4) {
                        formatted += '-';
                    }
                    formatted += value[i].toUpperCase();
                }
                value = formatted;
            }
        }
        
        // Update the input value
        $(this).val(value);
        
        // Validate the format
        if (value.length > 0) {
            if (value.includes('-')) {
                // Thai ID format
                if (!/^\d{4}-\d{4}-\d{4}-\d{1}$/.test(value)) {
                    frm.fields_dict.cus_customer_id.$wrapper.find('.help-box').html('รูปแบบบัตรประชาชนไม่ถูกต้อง (XXXX-XXXX-XXXX-X)');
                } else {
                    frm.fields_dict.cus_customer_id.$wrapper.find('.help-box').html('');
                }
            } else {
                // Passport format
                if (!/^[A-Z]{4}-\d{6}$/.test(value)) {
                    frm.fields_dict.cus_customer_id.$wrapper.find('.help-box').html('รูปแบบพาสปอร์ตไม่ถูกต้อง (XXXX-XXXXXX)');
                } else {
                    frm.fields_dict.cus_customer_id.$wrapper.find('.help-box').html('');
                }
            }
        } else {
            frm.fields_dict.cus_customer_id.$wrapper.find('.help-box').html('');
        }
    });
}
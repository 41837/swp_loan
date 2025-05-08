// Copyright (c) 2025, SWP and contributors
// For license information, please see license.txt

// frappe.ui.form.on("SWP_Test_Validate", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on("SWP_Test_Validate", {
    onload(frm) {
           },
	refresh(frm) {
        // Add asterisk to label
        frm.fields_dict.first_name.$wrapper.find('.control-label').html('Firstname <span class="text-danger">*</span>');
        frm.fields_dict.last_name.$wrapper.find('.control-label').html('Lastname <span class="text-danger">*</span>');
	
    
        frm.fields_dict.btn_save_name.$wrapper
        .on('click', function() {
                if (!frm.doc.first_name) {
                    frappe.throw(__('กรุณากรอกชื่อ'));
                }
                frm.save();

        });

        frm.fields_dict.btn_save_name.$wrapper
        .on('click', function() {
                if (!frm.doc.last_name) {
                    frappe.throw(__('กรุณากรอกนามสกุล'));
                }
                frm.save();

        });
    },

    

});




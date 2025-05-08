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
        frm.save();// Save data

    });

    
}

function initialize_borrower_search(frm) {
    frm.fields_dict.cus_customer_id.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>');
        
}   
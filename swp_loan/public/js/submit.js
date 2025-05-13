function fn_btn_submit(frm) {
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
}
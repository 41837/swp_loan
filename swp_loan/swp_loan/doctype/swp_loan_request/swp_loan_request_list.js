frappe.listview_settings['SWP_Loan_Request'] = {
    refresh(listview) {
        listview.page.set_primary_action(__('เพิ่มใบคำขอสินเชื่อ'), () => {
            frappe.new_doc('SWP_Loan_Request');
        });
    }
};
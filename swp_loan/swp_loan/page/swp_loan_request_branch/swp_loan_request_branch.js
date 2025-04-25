frappe.pages['swp_loan_request_branch'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Loan Request Branch',
		single_column: true
	});


	// const attachment_form = new frappe.ui.form.Form({
    //     doctype: 'SWP_Attachment',
    //     parent: page.body
    // });

	// const field_checking_form = new frappe.ui.form.Form({
    //     doctype: 'SWP_Field_Checking',
    //     parent: page.body
    // });

    // attachment_form.refresh();
	// field_checking_form.refresh();




	// frappe.ui.form.make_quick_entry('SWP_Attachment', '', page.body);
	// frappe.ui.form.make_quick_entry('SWP_Field_Checking', '', page.body);


}
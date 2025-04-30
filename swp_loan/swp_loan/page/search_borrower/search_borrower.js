frappe.pages['search_borrower'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Search Borrower',
		single_column: true
	});
}
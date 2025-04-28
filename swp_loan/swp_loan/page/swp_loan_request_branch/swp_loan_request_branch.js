frappe.pages['swp_loan_request_branch'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
	  parent: wrapper,
	  title: 'Loan Request Branch',
	  single_column: true
	});
  
	// เพิ่ม CSS
	frappe.require('/assets/swp_loan/css/loan_detail_page.css');
	
	// เพิ่ม Vue.js (ถ้ายังไม่มี)
	frappe.require('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js', function() {
	  // เพิ่ม Vue Component
	  frappe.require('/assets/swp_loan/js/vue_components/LoanDetailPage.js', function() {
		// สร้าง container สำหรับ Vue app
		$(page.main).html('<div id="loan-detail-vue-app"></div>');
		
		// สร้าง Vue instance
		new Vue({
		  el: '#loan-detail-vue-app',
		  components: {
			'loan-detail-page': swp_loan.vue_components.LoanDetailPage
		  },
		  template: '<loan-detail-page></loan-detail-page>'
		});
	  });
	});
  };
  
  // เพิ่ม API method สำหรับดึงข้อมูล
  frappe.pages['swp_loan_request_branch'].get_loan_details = function(name) {
	return frappe.call({
	  method: 'swp_loan.swp_loan.page.swp_loan_request_branch.swp_loan_request_branch.get_loan_details',
	  args: {
		name: name  // เปลี่ยนจาก loan_id เป็น name
	  }
	});
  };
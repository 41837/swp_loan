let customBannerJsLoaded = false;

function load_custom_banner_js(callback, frm) {
    if (!customBannerJsLoaded) {
        frappe.require("/assets/swp_loan/js/custom_banner.js", function () {
            customBannerJsLoaded = true;
            if (typeof callback === "function") callback(frm);
        });
    } else {
        if (typeof callback === "function") callback(frm);
    }
}

frappe.ui.form.on("SWP_Loan_Request_View", {
	refresh(frm) {
		// Load related person data
		frappe.db.get_list('SWP_Related_Person', {
			filters: {
				'parent': frm.doc.name
			},
			fields: ['name', 'parent', 'parentfield', 'parenttype', 'idx', 'docstatus', 'doctype',
				'first_name',
				'last_name',
				'nickname', 
				'telephone']
		}).then(records => {
			console.log('Related Person Records:', records); // Debug log
			if (records && records.length > 0) {
				frm.clear_table('table_related_person');
				records.forEach(record => {
					let row = frm.add_child('table_related_person');
					// Map fields explicitly
					row.first_name = record.first_name;
					row.last_name = record.last_name;
					row.nickname = record.nickname;
					row.telephone = record.telephone;
					row.relationship = record.relationship;
					console.log('Added row:', row); // Debug log
				});
				frm.refresh_field('table_related_person');
			}
		});

		load_custom_banner_js(function(frm) {
			if (frm.fields_dict.custom_banner_general) {
				initialize_custom_banner(frm, 'custom_banner_general');
			}
			if (frm.fields_dict.custom_banner_borrower) {
				initialize_custom_banner(frm, 'custom_banner_borrower');
			}
			if (frm.fields_dict.custom_banner_guarantor) {
				initialize_custom_banner(frm, 'custom_banner_guarantor');
			}
			if (frm.fields_dict.custom_banner_collateral) {
				initialize_custom_banner(frm, 'custom_banner_collateral');
			}
			if (frm.fields_dict.custom_banner_loan_details) {
				initialize_custom_banner(frm, 'custom_banner_loan_details');
			}
			if (frm.fields_dict.custom_banner_transaction) {
				initialize_custom_banner(frm, 'custom_banner_transaction');
			}
		}, frm);

		// Add custom styling for approve button
		if (frm.fields_dict.btn_approve) {
			frm.fields_dict.btn_approve.$wrapper.find('button').css({
				'font-size': '18px',
				'padding': '15px 30px',
				'margin': '20px 0 20px auto',
				'display': 'block',
				'width': '200px',
				'height': '60px',
				'border-radius': '10px',
				'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'transition': 'all 0.3s ease',
				'background-color': '#5e64ff',
				'color': 'white',
				'border': 'none',
				'font-weight': 'bold'
			});

			// Add hover effect for approve button
			frm.fields_dict.btn_approve.$wrapper.find('button').hover(
				function() {
					$(this).css({
						'transform': 'scale(1.05)',
						'box-shadow': '0 6px 8px rgba(0, 0, 0, 0.2)',
						'background-color': '#4a4fff'
					});
				},
				function() {
					$(this).css({
						'transform': 'scale(1)',
						'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
						'background-color': '#5e64ff'
					});
				}
			);
		}

		// Add custom styling for reject button
		if (frm.fields_dict.btn_reject) {
			frm.fields_dict.btn_reject.$wrapper.find('button').css({
				'font-size': '18px',
				'padding': '15px 30px',
				'margin': '20px auto 20px 0',
				'display': 'block',
				'width': '200px',
				'height': '60px',
				'border-radius': '10px',
				'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'transition': 'all 0.3s ease',
				'background-color': '#ff5858',
				'color': 'white',
				'border': 'none',
				'font-weight': 'bold'
			});

			// Add hover effect for reject button
			frm.fields_dict.btn_reject.$wrapper.find('button').hover(
				function() {
					$(this).css({
						'transform': 'scale(1.05)',
						'box-shadow': '0 6px 8px rgba(0, 0, 0, 0.2)',
						'background-color': '#ff4040'
					});
				},
				function() {
					$(this).css({
						'transform': 'scale(1)',
						'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
						'background-color': '#ff5858'
					});
				}
			);
		}

		// Add custom styling for release button
		if (frm.fields_dict.btn_release) {
			frm.fields_dict.btn_release.$wrapper.find('button').css({
				'font-size': '18px',
				'padding': '15px 30px',
				'margin': '20px 0 20px auto',
				'display': 'block',
				'width': '250px',
				'height': '60px',
				'border-radius': '10px',
				'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'transition': 'all 0.3s ease',
				'background-color': '#6c757d',
				'color': 'white',
				'border': 'none',
				'font-weight': 'bold'
			});

			// Add hover effect for release button
			frm.fields_dict.btn_release.$wrapper.find('button').hover(
				function() {
					$(this).css({
						'transform': 'scale(1.05)',
						'box-shadow': '0 6px 8px rgba(0, 0, 0, 0.2)',
						'background-color': '#5a6268'
					});
				},
				function() {
					$(this).css({
						'transform': 'scale(1)',
						'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
						'background-color': '#6c757d'
					});
				}
			);
		}

		// Add custom styling for rework button
		if (frm.fields_dict.btn_rework) {
			frm.fields_dict.btn_rework.$wrapper.find('button').css({
				'font-size': '18px',
				'padding': '15px 30px',
				'margin': '20px auto 20px 0',
				'display': 'block',
				'width': '200px',
				'height': '60px',
				'border-radius': '10px',
				'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'transition': 'all 0.3s ease',
				'background-color': '#6c757d',
				'color': 'white',
				'border': 'none',
				'font-weight': 'bold'
			});

			// Add hover effect for rework button
			frm.fields_dict.btn_rework.$wrapper.find('button').hover(
				function() {
					$(this).css({
						'transform': 'scale(1.05)',
						'box-shadow': '0 6px 8px rgba(0, 0, 0, 0.2)',
						'background-color': '#5a6268'
					});
				},
				function() {
					$(this).css({
						'transform': 'scale(1)',
						'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
						'background-color': '#6c757d'
					});
				}
			);
		}
	}
});
// CopyrFght (c) 2025, SWP and contributors
// For license information, please see license.txt

// frappe.ui.form.on("SWP_Loan_Request_View", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("SWP_Loan_Request_View", {
	refresh(frm) {
		let custom_banner_html = `
		<div style="border:1px solid #b5c9e7; border-radius:8px; background:#fff; padding:10px; margin-bottom:16px; width:100%; box-sizing:border-box;">
			<div style="display:flex; justify-content:space-between; align-items:center; background:#c5d9f1; border-radius:6px 6px 0 0; padding:10px 16px;">
				<div style="font-weight:bold;">ข้อมูลใบคำขอสินเชื่อเบื้องต้น</div>
				<div style="font-weight:bold;">A000B5680302000003NFX</div>
			</div>
			<div style="display:grid; grid-template-columns: 1.2fr 1.2fr 1.2fr 1.2fr 1fr 1fr 1fr; gap:12px; margin-top:8px; width:100%; box-sizing:border-box;">
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:span 2; display:flex; flex-direction:column; justify-content:center;">
					CE<br><span style='font-size:14px; font-weight:normal;'>Credit กำลังแก้ไขรายการ</span>
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:span 2; display:flex; flex-direction:column; justify-content:center;">
					LOAN
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>ชื่อลูกค้า</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">ทองเหมียว ทดสอบอยู่</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>ยอดจัด</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">26,800.00</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:1 / span 3; grid-column:7; display:flex; flex-direction:column; align-items:center; justify-content:center;">
					<span>A : -</span>
					<span style="margin-top:12px;">B : -</span>
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>รหัสลูกค้า</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">1234567890123</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>ค่าธรรมเนียม</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">800.00</div>
				<div style='background:#f5f6fa; border-radius:6px; padding:12px; text-align:center; font-size:14px; grid-column: 1 / span 2;'>M001N - รถจักรยานยนต์ รายเดือน ดอกเบี้ยปกติ</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>รหัสสินค้า</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">MH123425535343</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div style='color:#888;'>ยอดโอน</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">26,000.00</div>
			</div>
			<div style="margin-top:20px; display:grid; grid-template-columns:repeat(5, 1fr); gap:20px; width:100%;">
				<button onclick="window.open('https://www.google.com/search', '_blank')" style="background:#ff914d; color:#fff; border:none; border-radius:6px; padding:16px 0; font-size:16px; width:100%;">ข้อมูลโอนเงิน</button>
				<button onclick="window.open('https://www.google.com/search', '_blank')" style="background:#ff914d; color:#fff; border:none; border-radius:6px; padding:16px 0; font-size:16px; width:100%;">ตั๋ว/สัญญาเงินกู้</button>
				<button onclick="window.open('https://www.google.com/search', '_blank')" style="background:#ff914d; color:#fff; border:none; border-radius:6px; padding:16px 0; font-size:16px; width:100%;">ใบขอโอนเงิน</button>
				<button onclick="window.open('https://www.google.com/search', '_blank')" style="background:#ff914d; color:#fff; border:none; border-radius:6px; padding:16px 0; font-size:16px; width:100%;">VDO HL</button>
				<button onclick="window.open('https://www.google.com/search', '_blank')" style="background:#ff914d; color:#fff; border:none; border-radius:6px; padding:16px 0; font-size:16px; width:100%;">ยกเลิกใบคำขอ</button>
			</div>
		</div>
		`;
		if (frm.fields_dict.custom_banner_general) {
			frm.fields_dict.custom_banner_general.$wrapper.html(custom_banner_html);
		}
        if (frm.fields_dict.custom_banner_borrower) {
            frm.fields_dict.custom_banner_borrower.$wrapper.html(custom_banner_html);
        }
        if (frm.fields_dict.custom_banner_guarantor) {
            frm.fields_dict.custom_banner_guarantor.$wrapper.html(custom_banner_html);
        }
		if (frm.fields_dict.custom_banner_collateral) {
			frm.fields_dict.custom_banner_collateral.$wrapper.html(custom_banner_html);
		}
		if (frm.fields_dict.custom_banner_loan_details) {
			frm.fields_dict.custom_banner_loan_details.$wrapper.html(custom_banner_html);
		}
        if (frm.fields_dict.custom_banner_transaction) {
			frm.fields_dict.custom_banner_transaction.$wrapper.html(custom_banner_html);
		}

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
function initialize_custom_banner(frm, target_field = 'custom_banner') {
    // ดึงค่าจาก field ต่างๆ
    let customerName = `${frm.doc.cus_first_name || ''} ${frm.doc.cus_last_name || ''}`.trim();
    let customerId = frm.doc.cus_customer_id || '';
    let collateralId = frm.doc.col_collatteral_id || '';
    let loanAmount = frm.doc.loan_amount || '0.00';
    let feeAmount = frm.doc.fee_amount || '0.00';
    let transferAmount = frm.doc.transfer_amount || '0.00';
	
    let custom_banner_html = `
        <div style="border:1px solid #b5c9e7; border-radius:8px; background:#fff; padding:10px; margin-bottom:16px; width:100%; box-sizing:border-box;">
			<div style="display:flex; justify-content:space-between; align-items:center; background:#c5d9f1; border-radius:6px 6px 0 0; padding:10px 16px;">
				<div style="font-weight:bold;">ข้อมูลใบคำขอสินเชื่อเบื้องต้น</div>
				<div style="font-weight:bold;">${frm.doc.name || ''}</div>
			</div>
			<div style="display:grid; grid-template-columns: 1.2fr 1.2fr 1.2fr 1.2fr 1fr 1fr 1fr; gap:12px; margin-top:8px; width:100%; box-sizing:border-box;">
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:span 2; display:flex; flex-direction:column; justify-content:center;">
					CE<br><span style='font-size:14px; font-weight:normal;'>Credit กำลังแก้ไขรายการ</span>
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:span 2; display:flex; flex-direction:column; justify-content:center;">
					LOAN
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>ชื่อผู้กู้</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${customerName}</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>ยอดจัด</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${loanAmount}</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px; text-align:center; font-size:22px; font-weight:bold; grid-row:1 / span 3; grid-column:7; display:flex; flex-direction:column; align-items:center; justify-content:center;">
					<span>A : -</span>
					<span style="margin-top:12px;">B : -</span>
				</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>รหัสผู้กู้</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${customerId}</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>ค่าธรรมเนียม</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${feeAmount}</div>
				<div style='background:#f5f6fa; border-radius:6px; padding:12px; text-align:center; font-size:14px; grid-column: 1 / span 2;'>ก030N (24% รถยนต์ แบบงวดใหญ่ งวดย่อย)</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>เลขที่หลักประกัน</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${collateralId}</div>
				<div style="background:#c5d9f1; border-radius:6px; padding:12px;"><div>ยอดโอน</div></div>
				<div style="background:#f5f6fa; border-radius:6px; padding:12px;">${transferAmount}</div>
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
    frm.fields_dict[target_field].$wrapper.html(custom_banner_html);    
} 
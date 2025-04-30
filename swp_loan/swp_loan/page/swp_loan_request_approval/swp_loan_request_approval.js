frappe.pages['swp_loan_request_approval'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Custom page',
		single_column: true
	});

	// frappe.msgprint('Custom page - Loan Request Approval');

	let route = frappe.get_route(); 
    let loan_request_name = route[1]; // ตัวที่ 1 คือ parameter หลังชื่อ page


	// สร้าง div ที่จะใช้วางฟอร์ม
    $(page.body).html(`<div id="form-area"></div>`);


    // เพิ่ม Textbox
    let internal_loan_application_id_field = frappe.ui.form.make_control({
        parent: $('#form-area'),
        df: {
            fieldname: 'internal_loan_application_id',
            label: 'เลขที่ใบคำขอสินเชื่อ',
            fieldtype: 'Data',
            reqd: 0,
			read_only: 1
        },
        render_input: true
    });

	let attachment_group_field = frappe.ui.form.make_control({
        parent: $('#form-area'),
        df: {
            fieldname: 'attachment_group',
            label: 'ไฟล์ของ',
            fieldtype: 'Data',
            reqd: 0,
			read_only: 1
        },
        render_input: true
    });

	// เพิ่มตัวเลือกดำเนินการ
	let approval_status_field = frappe.ui.form.make_control({
        parent: $('#form-area'),
        df: {
            fieldname: 'action',
            label: 'ตัวเลือกดำเนินการ',
            fieldtype: 'Select',
            options: ['อนุมัติ', 'ไม่อนุมัติ'],  // ตัวเลือกใน Select field
            default: 'ไม่อนุมัติ', // ตัวเลือกเริ่มต้น
            reqd: 1,  // ถ้าต้องการให้ฟิลด์นี้เป็น mandatory
        },
        render_input: true
    });

	// div ของปุ่มบันทึก
	let button_container = $('<div>', {
        css: {
            'display': 'flex',
            'justify-content': 'center',  // จัดกึ่งกลางในแนวนอน
            'align-items': 'center',  // จัดกึ่งกลางในแนวตั้ง
            'height': '100px'  // กำหนดความสูงพื้นที่ที่ใช้จัดตำแหน่ง
        }
    });


	// เพิ่มปุ่มบันทึก
	let save_button = $('<button>', {
        text: 'บันทึก',
        class: 'btn btn-default',
        css: {
            'font-size': '16px',
            'padding': '10px 20px',
            'background-color': 'salmon',
            'color': 'white',
            'border': 'none',
            'border-radius': '5px'
        },
        click: function() {
            frappe.msgprint('บันทึกสำเร็จ!');
        }
    });

    // เพิ่มปุ่มลงในหน้าจอ (หลังจากทุก field)
    save_button.appendTo(page.body);





	frappe.call({
		method: 'frappe.client.get',
		args: {
			doctype: 'SWP_Loan_Request',
			name: 'LR-2504-00064'
		},
		callback: function(r) {
            const doc = r.message;
            internal_loan_application_id_field.set_value(doc.name);
        }
	});


	frappe.call({
		method: 'frappe.client.get',
		args: {
			doctype: 'SWP_Attachment',
			name: 'm1e5k5elfu'
		},
		callback: function(r) {
            const doc = r.message;
            attachment_group_field.set_value(doc.f01);
        }
	});


};
frappe.pages["loan_request"].on_page_load = (wrapper) => {
	var page = frappe.ui.make_app_page({
	  parent: wrapper,
	  title: "แบบฟอร์มขอสินเชื่อ",
	  single_column: true,
	})
  
	// เพิ่มคำอธิบายสั้นๆ
	page.set_indicator("กรุณากรอกข้อมูลให้ครบถ้วน", "blue")
  
	// สร้างส่วนค้นหาผู้กู้
	createBorrowerSearchSection(page)
  
	// สร้างฟอร์มและฟิลด์
	createLoanRequestForm(page)
  
	// Store the page object in a global variable for later use
	window.cur_page = page
  }
  
  function createBorrowerSearchSection(page) {
	// สร้าง HTML สำหรับส่วนหัวที่สามารถคลิกเพื่อซ่อน/แสดงได้
	const header_search_borrower_html = `
		  <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
			  <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาประวัติผู้กู้</div>
			  <button id="toggle-borrower-search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
				  <i class="fa fa-chevron-up"></i>
			  </button>
		  </div>
	  `
  
	// สร้าง HTML สำหรับส่วนค้นหา
	const search_html = `
		  <div id="borrower-search-section">
			  <div class="frappe-card" style="padding: 15px; background-color: white; border-radius: 8px; margin-bottom: 20px;">
				  <div class="row">
					  <div class="col-md-8">
						  <div class="form-group">
							  <label for="id_card_search">ค้นหาจากเลขบัตรประจำตัวผู้กู้</label>
							  <input type="text" id="id_card_search" class="form-control" placeholder="กรอกเลขบัตรประชาชน 13 หลัก / เลขพาสปอร์ต">
						  </div>
					  </div>
					  <div class="col-md-4 d-flex align-items-end">
						  <button id="btn-search-borrower" 
						  		class="btn btn-primary"
								style="
									font-size: 26px;
									padding: 8px 16px;
									background-color: salmon;
									color: white;
									border: none;
								">อ่านบัตร/ค้นหา
						  </button>
					  </div>
				  </div>

					<div class="row mt-2">
						<div class="col-md-12">
							<p class="small" style="color: red;">
								<i class="fa fa-info-circle"></i> 
								กรอกหมายเลขบัตรประชาชนของลูกค้า 13 หลัก หรือ เลข Passport เพื่อตรวจสอบข้อมูลในระบบก่อน!
								หรือ สามารถใส่บัตรประชาชนในเครื่องอ่านบัตร และกด ปุ่มอ่านบัตร/ค้นหา
							</p>
						</div>
					</div>
				  
				  <div class="row mt-3">
					  <div class="col-md-6">
						  <div class="checkbox">
							  <label>
								  <input type="checkbox" id="blacklist_check"> บล็อก (ผู้ติด Blacklist)
							  </label>
						  </div>
					  </div>
					  <div class="col-md-6">
						  <div class="checkbox">
							  <label>
								  <input type="checkbox" id="new_borrower_check"> ผู้กู้ใหม่
							  </label>
						  </div>
					  </div>
				  </div>
			  </div>
			  
			  <div id="search-results" class="mt-3" style="display: none;">
				  <!-- ผลลัพธ์การค้นหาจะแสดงที่นี่ -->
			  </div>
		  </div>
	  `
  
	// เพิ่ม HTML ไปยังส่วน main ของหน้า
	$(header_search_borrower_html).appendTo(page.main)
	$(search_html).appendTo(page.main)
  
	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มซ่อน/แสดง
	let isCollapsed = false
  
	$("#toggle-borrower-search-btn").on("click", function () {
	  isCollapsed = !isCollapsed
  
	  if (isCollapsed) {
		$("#borrower-search-section").hide()
		$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down")
	  } else {
		$("#borrower-search-section").show()
		$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")
	  }
	})
  
	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มค้นหา
	setupSearchFunctionality(page)
  }
  
  function setupSearchFunctionality(page) {
	// จัดการเหตุการณ์คลิกปุ่มค้นหา
	page.main.find("#btn-search-borrower").on("click", () => {
	  const id_card = $("#id_card_search").val()
	  const check_blacklist = $("#blacklist_check").is(":checked")
	  const new_borrower = $("#new_borrower_check").is(":checked")
  
	  if (!id_card) {
		frappe.msgprint({
		  title: "กรุณากรอกข้อมูล",
		  indicator: "red",
		  message: "กรุณากรอกเลขบัตรประจำตัวผู้กู้",
		})
		return
	  }
  
	  // แสดง loading indicator
	  frappe.show_alert({
		message: "กำลังค้นหาข้อมูล...",
		indicator: "blue",
	  })
  
	  // เรียกใช้ method ที่ server เพื่อค้นหาข้อมูลผู้กู้
	  frappe.call({
		method: "swp_loan.swp_loan.page.loan_request.loan_request.search_borrower",
		args: {
		  id_card_no: id_card,
		  check_blacklist: check_blacklist,
		  new_borrower: new_borrower,
		},
		callback: (response) => {
		  if (response.message) {
			if (response.message.found) {
			  // พบข้อมูลผู้กู้
			  displayBorrowerInfo(page, response.message.borrower)
  
			  // กรอกข้อมูลลงในฟอร์ม
			  if (page.loan_form) {
				fillBorrowerData(page.loan_form, response.message.borrower)
			  }
			} else {
			  // ไม่พบข้อมูลผู้กู้
			  $("#search-results")
				.html(`
							  <div class="alert alert-warning">
								  ไม่พบข้อมูลผู้กู้ กรุณาตรวจสอบเลขบัตรประจำตัวผู้กู้อีกครั้ง หรือสร้างข้อมูลผู้กู้ใหม่
							  </div>
						  `)
				.show()
  
			  // รีเซ็ตฟอร์ม
			  if (page.loan_form) {
				resetBorrowerFields(page.loan_form)
			  }
			}
		  } else {
			// เกิดข้อผิดพลาด
			frappe.msgprint({
			  title: "เกิดข้อผิดพลาด",
			  indicator: "red",
			  message: "ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
			})
		  }
		},
	  })
	})
  
	// เพิ่มการตรวจสอบการกด Enter ในช่องค้นหา
	$("#id_card_search").keypress((e) => {
	  if (e.which === 13) {
		// รหัส Enter key
		$("#btn-search-borrower").click()
	  }
	})
  }
  
  function displayBorrowerInfo(page, borrower) {
	// แสดงข้อมูลผู้กู้ที่ค้นพบ
	const status_color = borrower.blacklisted ? "red" : "green"
	const status_text = borrower.blacklisted ? "ผู้กู้ติด Blacklist" : "ผู้กู้ปกติ"
  
	$("#search-results")
	  .html(`
		  <div class="frappe-card" style="padding: 15px; background-color: white; border-radius: 8px;">
			  <div class="row">
				  <div class="col-md-12">
					  <h4>ข้อมูลผู้กู้</h4>
					  <hr>
				  </div>
			  </div>
			  <div class="row">
				  <div class="col-md-6">
					  <p><strong>ชื่อ-นามสกุล:</strong> ${borrower.title || ""} ${borrower.first_name || ""} ${borrower.last_name || ""}</p>
					  <p><strong>เลขบัตรประชาชน:</strong> ${borrower.id_card_no || ""}</p>
					  <p><strong>เบอร์โทรศัพท์:</strong> ${borrower.phone || ""}</p>
				  </div>
				  <div class="col-md-6">
					  <p><strong>สถานะ:</strong> <span style="color: ${status_color};">${status_text}</span></p>
					  <p><strong>ที่อยู่:</strong> ${borrower.address || ""}</p>
					  <p><strong>อาชีพ:</strong> ${borrower.occupation || ""}</p>
				  </div>
			  </div>
		  </div>
	  `)
	  .show()
  }
  
  function fillBorrowerData(loan_form, borrower) {
	// กรอกข้อมูลผู้กู้ลงในฟอร์ม
	loan_form.set_values({
	  title: borrower.title || "",
	  first_name: borrower.first_name || "",
	  last_name: borrower.last_name || "",
	  id_card_no: borrower.id_card_no || "",
	  birth_date: borrower.birth_date || "",
	  phone: borrower.phone || "",
	  email: borrower.email || "",
	  address: borrower.address || "",
	  province: borrower.province || "",
	  postal_code: borrower.postal_code || "",
	  occupation: borrower.occupation || "",
	  company_name: borrower.company_name || "",
	  job_position: borrower.job_position || "",
	  work_experience: borrower.work_experience || "",
	  monthly_income: borrower.monthly_income || "",
	})
  
	// เปิด section ข้อมูลผู้กู้
	if (loan_form.fields_dict.borrower_section) {
	  loan_form.fields_dict.borrower_section.collapse(false)
	}
  }
  
  function resetBorrowerFields(loan_form) {
	// รีเซ็ตฟิลด์ข้อมูลผู้กู้
	loan_form.set_values({
	  title: "",
	  first_name: "",
	  last_name: "",
	  id_card_no: "",
	  birth_date: "",
	  phone: "",
	  email: "",
	  address: "",
	  province: "",
	  postal_code: "",
	  occupation: "",
	  company_name: "",
	  job_position: "",
	  work_experience: "",
	  monthly_income: "",
	})
  }
  
  function createLoanRequestForm(page) {
	// สร้างคอนเทนเนอร์สำหรับฟอร์ม
	const form_container = $('<div class="loan-form-container"></div>').appendTo(page.main)
  
	// สร้างอ็อบเจ็กต์ฟอร์ม
	const loan_form = new frappe.ui.FieldGroup({
	  fields: getLoanFormFields(),
	  body: form_container,
	})
  
	loan_form.make()
  
	// เพิ่มปุ่มส่งฟอร์ม
	form_container.append(`
		  <div class="frappe-card" style="margin-top: 20px; padding: 15px; text-align: center;">
			  <button class="btn btn-primary btn-lg" id="btn-submit-loan">ส่งคำขอสินเชื่อ</button>
		  </div>
	  `)
  
	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มส่ง
	setupFormSubmission(page, loan_form)
  
	// เก็บอ้างอิงฟอร์มไว้ใน page
	page.loan_form = loan_form
  }
  
  function getLoanFormFields() {
	return [
	  {
		fieldtype: "Section Break",
		label: "ข้อมูลคำขอสินเชื่อ",
	  },
	  {
		label: "ประเภทสินเชื่อ",
		fieldname: "loan_type",
		fieldtype: "Select",
		options: "\nสินเชื่อส่วนบุคคล\nสินเชื่อบ้าน\nสินเชื่อรถยนต์\nสินเชื่อการศึกษา\nสินเชื่อเพื่อธุรกิจ\nอื่นๆ",
		reqd: 1,
	  },
	  {
		label: "จำนวนเงินที่ต้องการกู้ (บาท)",
		fieldname: "loan_amount",
		fieldtype: "Currency",
		reqd: 1,
	  },
	  {
		fieldtype: "Column Break",
	  },
	  {
		label: "ระยะเวลาผ่อนชำระ (เดือน)",
		fieldname: "loan_term",
		fieldtype: "Int",
		reqd: 1,
	  },
	  {
		label: "วัตถุประสงค์การกู้",
		fieldname: "loan_purpose",
		fieldtype: "Small Text",
		reqd: 1,
	  },
  
	  // เริ่มส่วนข้อมูลผู้กู้ที่สามารถ collapse/expand ได้
	  {
		fieldtype: "Collapsible Section",
		label: "ข้อมูลผู้กู้",
		collapsible: 1,
		fieldname: "borrower_section",
	  },
	  {
		fieldtype: "Section Break",
		label: "ข้อมูลส่วนตัว",
		depends_on: "eval:!doc.borrower_section", // แสดงเมื่อส่วนผู้กู้ไม่ถูก collapse
	  },
	  {
		label: "คำนำหน้า",
		fieldname: "title",
		fieldtype: "Select",
		options: "\nนาย\nนาง\nนางสาว\nอื่นๆ",
		reqd: 1,
	  },
	  {
		label: "ชื่อ",
		fieldname: "first_name",
		fieldtype: "Data",
		reqd: 1,
	  },
	  {
		label: "นามสกุล",
		fieldname: "last_name",
		fieldtype: "Data",
		reqd: 1,
	  },
	  {
		fieldtype: "Column Break",
	  },
	  {
		label: "เลขบัตรประชาชน",
		fieldname: "id_card_no",
		fieldtype: "Data",
		reqd: 1,
		description: "กรุณากรอกเลข 13 หลักโดยไม่มีขีด",
	  },
	  {
		label: "วันเกิด",
		fieldname: "birth_date",
		fieldtype: "Date",
		reqd: 1,
	  },
	  {
		label: "เบอร์โทรศัพท์",
		fieldname: "phone",
		fieldtype: "Data",
		reqd: 1,
	  },
	  {
		fieldtype: "Section Break",
		label: "ที่อยู่ติดต่อ",
		depends_on: "eval:!doc.borrower_section", // แสดงเมื่อส่วนผู้กู้ไม่ถูก collapse
	  },
	  {
		label: "อีเมล",
		fieldname: "email",
		fieldtype: "Data",
		options: "Email",
	  },
	  {
		label: "ที่อยู่ปัจจุบัน",
		fieldname: "address",
		fieldtype: "Small Text",
		reqd: 1,
	  },
	  {
		fieldtype: "Column Break",
	  },
	  {
		label: "จังหวัด",
		fieldname: "province",
		fieldtype: "Select",
		options:
		  "\nกรุงเทพมหานคร\nกระบี่\nกาญจนบุรี\nกาฬสินธุ์\nกำแพงเพชร\nขอนแก่น\nจันทบุรี\nฉะเชิงเทรา\nชลบุรี\nชัยนาท\nชัยภูมิ\nชุมพร\nเชียงราย\nเชียงใหม่\nตรัง\nตราด\nตาก\nนครนายก\nนครปฐม\nนครพนม\nนครราชสีมา\nนครศรีธรรมราช\nนครสวรรค์\nนนทบุรี\nนราธิวาส\nน่าน\nบึงกาฬ\nบุรีรัมย์\nปทุมธานี\nประจวบคีรีขันธ์\nปราจีนบุรี\nปัตตานี\nพระนครศรีอยุธยา\nพะเยา\nพังงา\nพัทลุง\nพิจิตร\nพิษณุโลก\nเพชรบุรี\nเพชรบูรณ์\nแพร่\nภูเก็ต\nมหาสารคาม\nมุกดาหาร\nแม่ฮ่องสอน\nยโสธร\nยะลา\nร้อยเอ็ด\nระนอง\nระยอง\nราชบุรี\nลพบุรี\nลำปาง\nลำพูน\nเลย\nศรีสะเกษ\nสกลนคร\nสงขลา\nสตูล\nสมุทรปราการ\nสมุทรสงคราม\nสมุทรสาคร\nสระแก้ว\nสระบุรี\nสิงห์บุรี\nสุโขทัย\nสุพรรณบุรี\nสุราษฎร์ธานี\nสุรินทร์\nหนองคาย\nหนองบัวลำภู\nอ่างทอง\nอำนาจเจริญ\nอุดรธานี\nอุตรดิตถ์\nอุทัยธานี\nอุบลราชธานี",
		reqd: 1,
	  },
	  {
		label: "รหัสไปรษณีย์",
		fieldname: "postal_code",
		fieldtype: "Data",
		reqd: 1,
	  },
	  {
		fieldtype: "Section Break",
		label: "ข้อมูลการทำงานและรายได้",
		depends_on: "eval:!doc.borrower_section", // แสดงเมื่อส่วนผู้กู้ไม่ถูก collapse
	  },
	  {
		label: "อาชีพ",
		fieldname: "occupation",
		fieldtype: "Select",
		options: "\nพนักงานบริษัท\nข้าราชการ\nรัฐวิสาหกิจ\nธุรกิจส่วนตัว\nอาชีพอิสระ\nอื่นๆ",
		reqd: 1,
	  },
	  {
		label: "ชื่อสถานที่ทำงาน",
		fieldname: "company_name",
		fieldtype: "Data",
		reqd: 1,
	  },
	  {
		label: "ตำแหน่งงาน",
		fieldname: "job_position",
		fieldtype: "Data",
	  },
	  {
		fieldtype: "Column Break",
	  },
	  {
		label: "อายุงาน (ปี)",
		fieldname: "work_experience",
		fieldtype: "Int",
		reqd: 1,
	  },
	  {
		label: "รายได้ต่อเดือน (บาท)",
		fieldname: "monthly_income",
		fieldtype: "Currency",
		reqd: 1,
	  },
	  // จบส่วนข้อมูลผู้กู้
  
	  {
		fieldtype: "Section Break",
		label: "ข้อมูลเพิ่มเติม",
	  },
	  {
		label: "หลักประกัน (ถ้ามี)",
		fieldname: "collateral",
		fieldtype: "Small Text",
	  },
	]
  }
  
  function setupFormSubmission(page, loan_form) {
	page.main.find("#btn-submit-loan").on("click", () => {
	  // ตรวจสอบความถูกต้องของฟอร์ม
	  if (!loan_form.validate()) {
		frappe.msgprint({
		  title: "กรุณากรอกข้อมูลให้ครบถ้วน",
		  indicator: "red",
		  message: "กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน",
		})
		return
	  }
  
	  // แสดงข้อความยืนยัน
	  frappe.confirm(
		"คุณต้องการส่งคำขอสินเชื่อใช่หรือไม่?",
		() => {
		  // ผู้ใช้กดตกลง
		  submitLoanRequest(loan_form.get_values())
		},
		() => {
		  // ผู้ใช้กดยกเลิก
		  frappe.show_alert({
			message: "ยกเลิกการส่งคำขอสินเชื่อ",
			indicator: "yellow",
		  })
		},
	  )
	})
  }
  
  function submitLoanRequest(form_values) {
	// แสดง loading indicator
	frappe.show_alert({
	  message: "กำลังส่งข้อมูล...",
	  indicator: "blue",
	})
  
	// ส่งข้อมูลไปยัง server
	frappe.call({
	  method: "swp_loan.swp_loan.page.loan_request.loan_request.submit_loan_request",
	  args: {
		loan_data: form_values,
	  },
	  callback: (response) => {
		if (response.message && response.message.success) {
		  // แสดงข้อความสำเร็จ
		  frappe.msgprint({
			title: "ส่งคำขอสินเชื่อสำเร็จ",
			indicator: "green",
			message: "คำขอสินเชื่อของคุณถูกส่งเรียบร้อยแล้ว เลขที่คำขอ: " + response.message.loan_id,
		  })
  
		  // รีเซ็ตฟอร์ม
		  if (window.cur_page && window.cur_page.loan_form) {
			window.cur_page.loan_form.set_values({
			  title: "",
			  first_name: "",
			  last_name: "",
			  id_card_no: "",
			  birth_date: "",
			  phone: "",
			  email: "",
			  address: "",
			  province: "",
			  postal_code: "",
			  occupation: "",
			  company_name: "",
			  job_position: "",
			  work_experience: "",
			  monthly_income: "",
			  loan_type: "",
			  loan_amount: "",
			  loan_term: "",
			  loan_purpose: "",
			  collateral: "",
			})
		  }
  
		  // ซ่อนผลลัพธ์การค้นหา
		  $("#search-results").hide()
  
		  // ล้างช่องค้นหา
		  $("#id_card_search").val("")
		  $("#blacklist_check").prop("checked", false)
		  $("#new_borrower_check").prop("checked", false)
		} else {
		  // แสดงข้อความผิดพลาด
		  frappe.msgprint({
			title: "เกิดข้อผิดพลาด",
			indicator: "red",
			message: response.message.error || "ไม่สามารถส่งคำขอสินเชื่อได้ กรุณาลองใหม่อีกครั้ง",
		  })
		}
	  },
	  error: (err) => {
		frappe.msgprint({
		  title: "เกิดข้อผิดพลาด",
		  indicator: "red",
		  message: "ไม่สามารถส่งคำขอสินเชื่อได้ กรุณาลองใหม่อีกครั้ง",
		})
		console.error("Error submitting loan request:", err)
	  },
	})
  }
  
frappe.pages["loan_request"].on_page_load = (wrapper) => {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "ใบคำขอสินเชื่อ",
		single_column: true,
	})
  
	// เพิ่มคำอธิบายสั้นๆ
	page.set_indicator("กรุณากรอกข้อมูลให้ครบถ้วน", "blue")
  
	// สร้างส่วนค้นหาผู้กู้
	createBorrowerSearchSection(page)
  
	// สร้างส่วนข้อมูลผู้กู้
	createBorrowerInfoSection(page)
  
	// Store the page object in a global variable for later use
	window.cur_page = page
}
  
function createBorrowerSearchSection(page) {
	// สร้าง HTML สำหรับส่วนหัวที่สามารถคลิกเพื่อซ่อน/แสดงได้
	const header_search_borrower_html = `
		  <div id="borrower-search-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
			  <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาประวัติผู้กู้</div>
			  <button id="toggle-borrower-search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
				  <i class="fa fa-chevron-up"></i>
			  </button>
		  </div>
	  `
  
	// สร้าง HTML สำหรับส่วนค้นหา
	const search_borrower_html = `
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
	$(search_borrower_html).appendTo(page.main)
  
	// เพิ่ม HTML สำหรับส่วนผลการค้นหา
	const search_borrower_results_html = `
		<div id="borrower-search-result-section" style="display: none;">
			<div class="frappe-card" style="padding: 15px; background-color: white; border-radius: 8px; margin-bottom: 20px;">
				<div class="row">
					<div class="col-md-8">
						<div class="form-group">
							<label for="label_result">ผลการค้นหาประวัติผู้กู้</label>
						</div>
					</div>
				</div>

				<div class="row mt-4">
					<div class="col-md-12 text-center">
						<button id="btn-borrower-result-accept-search" class="btn btn-primary" style="margin-right: 10px;">
							<i class="fa fa-check"></i> ยอมรับประวัติผู้กู้
						</button>
						<button id="btn-borrower-result-cancel-search" class="btn btn-default">
							<i class="fa fa-times"></i> ยกเลิก
						</button>
					</div>
				</div>
			</div>
		</div>
	`

	// เพิ่ม HTML สำหรับส่วนผลการค้นหา
	$(search_borrower_results_html).appendTo(page.main)
  
	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มซ่อน/แสดง
	let isCollapsed = false
  
	$("#toggle-borrower-search-btn").on("click", function () {
		isCollapsed = !isCollapsed

		if (isCollapsed) {
			$("#borrower-search-section").hide()
			$("#borrower-search-result-section").hide()
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down")
		} else {
			$("#borrower-search-section").show()
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")
		}
	})
  
	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มค้นหา
	$("#btn-search-borrower").on("click", function() {
		const id_card = $("#id_card_search").val()

		if (!id_card) {
			frappe.msgprint({
				title: "กรุณากรอกข้อมูล",
				indicator: "red",
				message: "กรุณากรอกเลขบัตรประจำตัวผู้กู้",
			})
			return
		} else {
			$("#borrower-search-result-section").show()
		}		
	})

	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มยอมรับและยกเลิก
	$("#btn-borrower-result-accept-search").on("click", function() {
		// แสดงส่วนข้อมูลผู้กู้
		$("#borrower-search-header").hide()
		$("#borrower-search-section").hide()
		$("#borrower-search-result-section").hide()
		$("#borrower-info-header").show().css("display", "flex")
		$("#borrower-info-section").show()
		$("#toggle-borrower-info-btn").find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")
	})

	$("#btn-borrower-result-cancel-search").on("click", function() {
		// ซ่อนส่วนผลการค้นหา
		$("#borrower-search-result-section").hide()
		// เคลียร์ข้อมูลการค้นหา
		$("#id_card_search").val("")
	})
}
  
function createBorrowerInfoSection(page) {
	// สร้าง HTML สำหรับส่วนหัวที่สามารถคลิกเพื่อซ่อน/แสดงได้
	const header_borrower_info_html = `
		<div id="borrower-info-header" style="margin-bottom: 10px; display: none; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
			<div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ข้อมูลผู้กู้</div>
			<button id="toggle-borrower-info-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
				<i class="fa fa-chevron-down"></i>
			</button>
		</div>
	`

	// สร้าง HTML สำหรับส่วนข้อมูลผู้กู้
	const borrower_info_html = `
		<div id="borrower-info-section" style="display: none;">
			<div class="frappe-card" style="padding: 15px; background-color: white; border-radius: 8px; margin-bottom: 20px;">
				<div class="container" style="max-width: 800px;">
					<div class="row justify-content-center">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_name">ชื่อ</label>
								<input type="text" id="borrower_name" class="form-control" placeholder="กรอกชื่อ">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_lastname">นามสกุล</label>
								<input type="text" id="borrower_lastname" class="form-control" placeholder="กรอกนามสกุล">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_id">รหัสลูกค้า</label>
								<input type="text" id="borrower_id" class="form-control" placeholder="กรอกรหัสลูกค้า">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_phone">เบอร์โทรศัพท์</label>
								<input type="text" id="borrower_phone" class="form-control" placeholder="กรอกเบอร์โทรศัพท์">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-10">
							<div class="form-group">
								<label for="borrower_address">ที่อยู่</label>
								<textarea id="borrower_address" class="form-control" rows="3" placeholder="กรอกที่อยู่"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`

	// เพิ่ม HTML ไปยังส่วน main ของหน้า
	$(header_borrower_info_html).appendTo(page.main)
	$(borrower_info_html).appendTo(page.main)

	// เพิ่มการจัดการเหตุการณ์สำหรับปุ่มซ่อน/แสดง
	let isCollapsed = true

	$("#toggle-borrower-info-btn").on("click", function () {
		isCollapsed = !isCollapsed

		if (isCollapsed) {
			$("#borrower-info-section").hide() 
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down")
		} else {
			$("#borrower-info-section").show()
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")
		}
	})
}
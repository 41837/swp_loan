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
								<label for="borrower_id_card">หมายเลขบัตร <span class="text-danger">*</span></label>
								<input type="text" id="borrower_id_card" class="form-control" placeholder="กรอกหมายเลขบัตร">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_position">คำนำหน้า <span class="text-danger">*</span></label>
								<select id="borrower_position" class="form-control">
									<option value="">เลือกคำนำหน้า</option>
								</select>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_name">ชื่อ <span class="text-danger">*</span></label>
								<input type="text" id="borrower_name" class="form-control" placeholder="กรอกชื่อ">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_lastname">นามสกุล <span class="text-danger">*</span></label>
								<input type="text" id="borrower_lastname" class="form-control" placeholder="กรอกนามสกุล">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_birthdate">วันเดือนปีเกิด <span class="text-danger">*</span></label>
								<input type="date" id="borrower_birthdate" class="form-control">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_age">อายุ</label>
								<input type="text" id="borrower_age" class="form-control" placeholder="อายุ" readonly>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_card_issue">วันที่ออกบัตร <span class="text-danger">*</span></label>
								<input type="date" id="borrower_card_issue" class="form-control">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_card_expiry">บัตรหมดอายุ <span class="text-danger">*</span></label>
								<input type="date" id="borrower_card_expiry" class="form-control">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_card_type">ประเภทบัตร <span class="text-danger">*</span></label>
								<select id="borrower_card_type" class="form-control">
									<option value="">เลือกประเภทบัตร</option>
									<option value="บัตรประชาชน">บัตรประชาชน</option>
								</select>
								<small class="text-danger">*สำหรับบัตรประเภทตลอดชีพ ให้เลือกวันที่บัตรหมดอายุเพิ่มไปอีก 20 ปีจากวันที่ออกบัตร !</small>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_card_issuer">ออกบัตรโดย <span class="text-danger">*</span></label>
								<input type="text" id="borrower_card_issuer" class="form-control" placeholder="ระบุผู้ออกบัตร">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_nickname">ชื่อเล่น</label>
								<input type="text" id="borrower_nickname" class="form-control" placeholder="ชื่อเล่น">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_type">ประเภทผู้กู้ <span class="text-danger">*</span></label>
								<select id="borrower_type" class="form-control">
									<option value="">เลือกประเภทผู้กู้</option>
									<option value="บุคคลธรรมดา">บุคคลธรรมดา</option>
								</select>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_nationality">สัญชาติ <span class="text-danger">*</span></label>
								<select id="borrower_nationality" class="form-control">
									<option value="">เลือกสัญชาติ</option>
									<option value="ไทย">ไทย</option>
								</select>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_gender">เพศ <span class="text-danger">*</span></label>
								<select id="borrower_gender" class="form-control">
									<option value="">เลือกเพศ</option>
									<option value="ชาย">ชาย</option>
								</select>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_ethnicity">เชื้อชาติ <span class="text-danger">*</span></label>
								<select id="borrower_ethnicity" class="form-control">
									<option value="">เลือกเชื้อชาติ</option>
									<option value="ไทย">ไทย</option>
								</select>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_marital_status">สถานภาพการสมรส <span class="text-danger">*</span></label>
								<select id="borrower_marital_status" class="form-control">
									<option value="">เลือกสถานภาพการสมรส</option>
									<option value="โสด">โสด</option>
								</select>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_occupation">อาชีพ <span class="text-danger">*</span></label>
								<select id="borrower_occupation" class="form-control">
									<option value="">เลือกอาชีพ</option>
									<option value="โปรแกรมเมอร์">โปรแกรมเมอร์</option>
								</select>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_main_income">รายได้หลัก</label>
								<input type="number" id="borrower_main_income" class="form-control" placeholder="0.00" step="0.01">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_experience_years">ประสบการณ์ (ปี)</label>
								<input type="number" id="borrower_experience_years" class="form-control" placeholder="0">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_extra_income">รายได้เสริม</label>
								<input type="number" id="borrower_extra_income" class="form-control" placeholder="0.00" step="0.01">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_experience_months">ประสบการณ์ (เดือน)</label>
								<input type="number" id="borrower_experience_months" class="form-control" placeholder="0">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_total_expenses">ค่าใช้จ่ายรวม</label>
								<input type="number" id="borrower_total_expenses" class="form-control" placeholder="0.00" step="0.01">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="borrower_extra_occupation">อาชีพเสริม</label>
								<select id="borrower_extra_occupation" class="form-control">
									<option value="">เลือกอาชีพเสริม</option>
								</select>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-10">
							<div class="form-group">
								<label for="borrower_occupation_details">รายละเอียดอาชีพ</label>
								<textarea id="borrower_occupation_details" class="form-control" rows="3" placeholder="รายละเอียดอาชีพ"></textarea>
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="work_location">สถานที่ทำงาน</label>
								<input type="text" id="work_location" class="form-control" placeholder="กรอกสถานที่ทำงาน">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="department">แผนก</label>
								<input type="text" id="department" class="form-control" placeholder="กรอกแผนก">
							</div>
						</div>
					</div>

					<div class="row justify-content-center mt-3">
						<div class="col-md-5">
							<div class="form-group">
								<label for="manager_name">ชื่อผู้จัดการ</label>
								<input type="text" id="manager_name" class="form-control" placeholder="กรอกชื่อผู้จัดการ">
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group">
								<label for="position">ตำแหน่ง</label>
								<input type="text" id="position" class="form-control" placeholder="ตำแหน่ง">
							</div>
						</div>
					</div>

					<!-- Address Tabs Section -->
					<div class="row justify-content-center mt-4">
						<div class="col-md-10">
							<div class="form-group">
								<div class="address-tabs">
									<ul class="nav nav-tabs" role="tablist">
										<li class="nav-item">
											<a class="nav-link active" id="id-card-tab" data-toggle="tab" data-target="#id-card-address" role="tab">
												[1] ที่อยู่บัตรประชาชน
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="house-tab" data-toggle="tab" data-target="#house-address" role="tab">
												[2] ที่อยู่ทะเบียนบ้าน
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="current-tab" data-toggle="tab" data-target="#current-address" role="tab">
												[3] ที่อยู่ปัจจุบัน / อื่น ๆ
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" id="work-tab" data-toggle="tab" data-target="#work-address" role="tab">
												[4] ที่อยู่ที่ทำงาน
											</a>
										</li>
									</ul>

									<!-- Tab Content -->
									<div class="tab-content border border-top-0 rounded-bottom p-3">
										${createAddressTabContent('id-card-address', true)}
										${createAddressTabContent('house-address', false)}
										${createAddressTabContent('current-address', false)}
										${createAddressTabContent('work-address', false)}
									</div>
								</div>
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

	// Load salutation options
	frappe.db.get_list('Salutation', {
		fields: ['salutation'],
		limit: 0, // no limit
		order_by: 'salutation ASC'
	}).then(function(result) {
		let $select = $('#borrower_position');
		result.forEach(function(row) {
			$select.append($('<option>', {
				value: row.salutation,
				text: row.salutation
			}));
		});
	});

	// Object to store all address data
	let addressData = {
		'id-card-address': {},
		'house-address': {},
		'current-address': {},
		'work-address': {}
	};

	// Initialize custom tab handling
	$('.nav-tabs a').on('click', function(e) {
		e.preventDefault()
		const targetId = $(this).data('target')
		
		// Remove active class from all tabs and contents
		$('.nav-tabs a').removeClass('active')
		$('.tab-pane').removeClass('show active')
		
		// Add active class to clicked tab and its content
		$(this).addClass('active')
		$(targetId).addClass('show active')
	})

	// Handle input changes for all address fields
	$('.tab-content').on('change', 'input', function() {
		const $input = $(this);
		const fieldId = $input.attr('id');
		const value = $input.val();
		
		// Extract address type from field ID (e.g., "id-card-address" from "id-card-address-postal")
		const addressType = fieldId.split('-').slice(0, -1).join('-');
		const fieldName = fieldId.split('-').pop();

		// Store the value in our addressData object
		if (!addressData[addressType]) {
			addressData[addressType] = {};
		}
		addressData[addressType][fieldName] = value;

		console.log('Updated address data:', addressData);
	});

	// Function to get all address data
	function getAllAddressData() {
		return addressData;
	}

	// Function to get specific address type data
	function getAddressData(addressType) {
		return addressData[addressType] || {};
	}

	// Function to validate if all required fields are filled for an address type
	function validateAddressData(addressType) {
		const requiredFields = ['address', 'subdistrict', 'district', 'province', 'postal'];
		const data = addressData[addressType];
		
		for (const field of requiredFields) {
			if (!data[field]) {
				return false;
			}
		}
		return true;
	}

	// Add clear button functionality
	$('.tab-content').on('click', '[id$="-clear"]', function() {
		const addressType = $(this).attr('id').replace('-clear', '');
		
		// Clear all inputs for this address type
		$(`#${addressType} input`).val('');
		
		// Clear stored data
		addressData[addressType] = {};
		
		console.log(`Cleared ${addressType} data`);
	});

	// Add copy button functionality
	$('.tab-content').on('click', '[id$="-copy"]', function() {
		const sourceAddressType = $(this).attr('id').replace('-copy', '');
		const sourceData = addressData[sourceAddressType];
		
		if (Object.keys(sourceData).length === 0) {
			frappe.msgprint({
				title: 'ไม่พบข้อมูล',
				message: 'กรุณากรอกข้อมูลที่อยู่ก่อนทำการคัดลอก',
				indicator: 'red'
			});
			return;
		}

		// Show dialog to select target address type
		const otherAddressTypes = Object.keys(addressData).filter(type => type !== sourceAddressType);
		const dialog = new frappe.ui.Dialog({
			title: 'เลือกที่อยู่ที่ต้องการคัดลอกไป',
			fields: [
				{
					label: 'ประเภทที่อยู่',
					fieldname: 'target_address',
					fieldtype: 'Select',
					options: otherAddressTypes.map(type => {
						return {
							label: $(`a[data-target="#${type}"]`).text().trim(),
							value: type
						}
					})
				}
			],
			primary_action_label: 'คัดลอก',
			primary_action(values) {
				const targetType = values.target_address;
				
				// Copy data to target address type
				addressData[targetType] = {...sourceData};
				
				// Update input fields
				Object.entries(sourceData).forEach(([field, value]) => {
					$(`#${targetType}-${field}`).val(value);
				});
				
				dialog.hide();
				frappe.show_alert({
					message: 'คัดลอกข้อมูลที่อยู่เรียบร้อยแล้ว',
					indicator: 'green'
				});
			}
		});
		
		dialog.show();
	});
}

// Function to create address fields content for each tab
function createAddressTabContent(id, isActive) {
	return `
		<div class="tab-pane fade ${isActive ? 'show active' : ''}" id="${id}" role="tabpanel">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label for="${id}-address">ที่อยู่</label>
						<input type="text" id="${id}-address" class="form-control" placeholder="กรอกที่อยู่">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-subdistrict">ตำบล</label>
						<div class="input-group">
							<input type="text" id="${id}-subdistrict" class="form-control" placeholder="ตำบล">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button">...</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-mobile">โทรศัพท์ (มือถือ)</label>
						<input type="text" id="${id}-mobile" class="form-control" placeholder="กรอกเบอร์โทรศัพท์มือถือ">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-district">อำเภอ</label>
						<input type="text" id="${id}-district" class="form-control" placeholder="อำเภอ">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-phone">โทรศัพท์</label>
						<input type="text" id="${id}-phone" class="form-control" placeholder="กรอกเบอร์โทรศัพท์">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-province">จังหวัด</label>
						<input type="text" id="${id}-province" class="form-control" placeholder="จังหวัด">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-ext">หมายเลขต่อ</label>
						<input type="text" id="${id}-ext" class="form-control" placeholder="กรอกหมายเลขต่อ">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="${id}-postal">รหัสไปรษณีย์</label>
						<input type="text" id="${id}-postal" class="form-control" placeholder="รหัสไปรษณีย์">
					</div>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-md-12 text-right">
					<button class="btn btn-secondary" id="${id}-clear">ล้าง</button>
					<button class="btn btn-primary" id="${id}-copy">คัดลอกที่อยู่</button>
				</div>
			</div>
		</div>
	`
}
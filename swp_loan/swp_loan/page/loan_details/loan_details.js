frappe.pages['loan_details'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'รายละเอียดการสมัครสินเชื่อ',
        single_column: true
    });

    // สร้าง action buttons ด้านบน
    let action_buttons = $('<div class="loan-action-buttons">').appendTo(page.main);
    
    // เพิ่มปุ่มต่างๆ
    const buttons = [
        { id: 'loan-agreement', label: 'ตั๋ว/สัญญาเงินกู้' },
        { id: 'transfer-request', label: 'ใบขอโอนเงิน' },
        { id: 'vdo-hl', label: 'VDO HL' },
        { id: 'create-agenda', label: 'สร้างวาระ' }
    ];
    
    // สร้าง HTML สำหรับปุ่ม
    let buttons_html = '';
    buttons.forEach(button => {
        buttons_html += `<button class="loan-action-button" data-id="${button.id}">${button.label}</button>`;
    });
    
    action_buttons.html(buttons_html);
    
    // เพิ่ม event handler สำหรับปุ่ม
    $('.loan-action-button').click(function() {
        // ดึง id ของปุ่มที่คลิก
        const buttonId = $(this).data('id');
        
        // แสดงข้อความแจ้งเตือน (สามารถแก้ไขให้ทำงานตามที่ต้องการได้)
        frappe.show_alert(`คลิกปุ่ม: ${$(this).text()}`, 2);
        
        // ตัวอย่างการทำงานเมื่อคลิกปุ่มต่างๆ
        switch(buttonId) {
            case 'loan-agreement':
                frappe.show_alert('กำลังเปิดตั๋ว/สัญญาเงินกู้...', 3);
                break;
            case 'transfer-request':
                frappe.show_alert('กำลังเปิดใบขอโอนเงิน...', 3);
                break;
            case 'vdo-hl':
                frappe.show_alert('กำลังเปิด VDO HL...', 3);
                break;
            case 'create-agenda':
                frappe.show_alert('กำลังสร้างวาระ...', 3);
                break;
        }
    });
    
    // สร้าง menu bar
    let menu_bar = $('<div class="loan-menu-bar">').appendTo(page.main);
    
    // เพิ่มเมนูต่างๆ
    const menus = [
        { id: 'general', label: 'ทั่วไป', active: false },
        { id: 'collateral', label: 'หลักประกัน', active: false },
        { id: 'loan-details', label: 'รายละเอียดสินเชื่อ', active: false },
        { id: 'borrower', label: 'ผู้กู้', active: true },
        { id: 'guarantor', label: 'ผู้ค้ำ', active: false },
        { id: 'scoring', label: 'Scoring', active: false },
        { id: 'approval', label: 'บันทึกอนุมัติ', active: false },
        { id: 'attachments', label: 'เอกสารแนบ', active: false }
    ];
    
    // สร้าง HTML สำหรับเมนู
    let menu_html = '';
    menus.forEach(menu => {
        const activeClass = menu.active ? 'active' : '';
        menu_html += `<div class="loan-menu-item ${activeClass}" data-id="${menu.id}">${menu.label}</div>`;
    });
    
    menu_bar.html(menu_html);
    
    // สร้าง container สำหรับแต่ละเมนู
    let menu_containers = {};
    menus.forEach(menu => {
        menu_containers[menu.id] = $(`<div id="${menu.id}-container" class="menu-container"${menu.active ? '' : ' style="display:none"'}>`).appendTo(page.main);
    });
    
    // สร้างฟอร์มข้อมูลผู้กู้
    createBorrowerForm(menu_containers['borrower']);
    
    // สร้างฟอร์มรายละเอียดสินเชื่อ
    createLoanDetailsForm(menu_containers['loan-details']);
    
    // เพิ่ม event handler สำหรับเมนู
    $('.loan-menu-item').click(function() {
        // ลบ class active จากทุกเมนู
        $('.loan-menu-item').removeClass('active');
        
        // เพิ่ม class active ให้กับเมนูที่คลิก
        $(this).addClass('active');
        
        // ดึง id ของเมนูที่คลิก
        const menuId = $(this).data('id');
        
        // ซ่อนทุก container
        $('.menu-container').hide();
        
        // แสดง container ของเมนูที่คลิก
        $(`#${menuId}-container`).show();
    });
    
    // ฟังก์ชันสร้างฟอร์มข้อมูลผู้กู้
    function createBorrowerForm(container) {
        container.empty();
        
        // สร้างฟอร์มข้อมูลผู้กู้
        let borrower_form = $(`
            <div class="form-layout borrower-form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">รหัสลูกค้า</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="customer_code" value="1104500012211">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">แจ้งหนี้โดย</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="billing_by">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="email">อีเมล</option>
                                    <option value="sms">SMS</option>
                                    <option value="post">ไปรษณีย์</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ประเภทลูกค้า</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="customer_type">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="individual" selected>บุคคลธรรมดา</option>
                                    <option value="corporate">นิติบุคคล</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">คำนำหน้า</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="title">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="mr" selected>นาย</option>
                                    <option value="mrs">นาง</option>
                                    <option value="miss">นางสาว</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">เพศ</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="gender">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="male" selected>ชาย</option>
                                    <option value="female">หญิง</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ชื่อ</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="first_name">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">นามสกุล</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="last_name">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ชื่อเล่น</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="nickname">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ประเภทบัตร</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="id_type">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="id_card" selected>บัตรประชาชนประชาชน</option>
                                    <option value="passport">หนังสือเดินทาง</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ออกบัตรโดย</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="id_issued_by">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="district_office" selected>ที่ว่าการอำเภอ</option>
                                    <option value="city_hall">ศาลาว่าการเมือง</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">หมายเลขบัตร</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="id_number" value="1104500012211">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">วันเดือนปีเกิด</label>
                            <div class="control-input-wrapper">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="birth_date" value="28/04/2568">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">อายุ</label>
                            <div class="control-input-wrapper">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="age" value="0">
                                    <span class="input-group-addon">ปี</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">สัญชาติ</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="nationality">
                                    <option value="">โปรดเลือก...</option>
                                    <option value="thai" selected>ไทย</option>
                                    <option value="other">อื่นๆ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">วันที่ออกบัตร</label>
                            <div class="control-input-wrapper">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="id_issue_date" value="29/04/2568">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">บัตรหมดอายุ</label>
                            <div class="control-input-wrapper">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="id_expiry_date" value="30/04/2568">
                                    <span class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="control-input-wrapper">
                                <p class="text-danger" style="margin-top: 5px;"><strong>หมายเหตุ :</strong> สำหรับบัตรประเภทตลอดชีพ ให้เลือกวันที่บัตรหมดอายุเป็นไปอีก 20 ปีจากวันที่ออกบัตรค่ะ!</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">กลุ่มอาชีพ</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="occupation_group">
                                    <option value="" selected>โปรดเลือก...</option>
                                    <option value="government">ข้าราชการ</option>
                                    <option value="private">พนักงานเอกชน</option>
                                    <option value="business">ธุรกิจส่วนตัว</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">รายละเอียดอาชีพ</label>
                            <div class="control-input-wrapper">
                                <input type="text" class="form-control" name="occupation_detail">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">อายุงาน</label>
                            <div class="control-input-wrapper">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="work_years" value="0">
                                    <span class="input-group-addon">ปี</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;"></label>
                            <div class="control-input-wrapper" style="margin-top: 25px;">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="work_months" value="0">
                                    <span class="input-group-addon">เดือน</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">รายได้ต่อเดือน</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="monthly_income">
                                    <option value="" selected>โปรดเลือก...</option>
                                    <option value="less_15k">น้อยกว่า 15,000 บาท</option>
                                    <option value="15k_30k">15,000 - 30,000 บาท</option>
                                    <option value="30k_50k">30,000 - 50,000 บาท</option>
                                    <option value="50k_100k">50,000 - 100,000 บาท</option>
                                    <option value="more_100k">มากกว่า 100,000 บาท</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ความยินยอมด้านการตลาด</label>
                            <div class="control-input-wrapper">
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" name="marketing_consent" value="yes" checked> ยินยอม
                                    </label>
                                </div>
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" name="marketing_consent" value="no"> ไม่ยินยอม
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">ความยินยอมด้านข้อมูลออนไลน์</label>
                            <div class="control-input-wrapper">
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" name="online_consent" value="yes" checked> ยินยอม
                                    </label>
                                </div>
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" name="online_consent" value="no"> ไม่ยินยอม
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">จัดส่งเอกสารไปที่</label>
                            <div class="control-input-wrapper">
                                <select class="form-control" name="document_delivery">
                                    <option value="" selected>โปรดเลือก...</option>
                                    <option value="home">ที่อยู่ตามทะเบียนบ้าน</option>
                                    <option value="work">ที่อยู่ที่ทำงาน</option>
                                    <option value="current">ที่อยู่ปัจจุบัน</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label" style="color: #9c27b0;">อีเมล</label>
                            <div class="control-input-wrapper">
                                <input type="email" class="form-control" name="email">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- แท็บที่อยู่ -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="address-tabs">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#id_address" data-toggle="tab">[1] ที่อยู่บัตรประชาชน</a></li>
                                <li><a href="#house_address" data-toggle="tab">[2] ที่อยู่ทะเบียนบ้าน</a></li>
                                <li><a href="#current_address" data-toggle="tab">[3] ที่อยู่ปัจจุบัน / อื่น ๆ</a></li>
                                <li><a href="#work_address" data-toggle="tab">[4] ที่อยู่ที่ทำงาน</a></li>
                            </ul>
                            
                            <div class="tab-content">
                                <div class="tab-pane active" id="id_address">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">ที่อยู่</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_address">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">ตำบล</label>
                                                <div class="control-input-wrapper">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" name="id_subdistrict" style="background-color: #fffde7;">
                                                        <span class="input-group-addon" style="cursor: pointer;">
                                                            <i class="fa fa-ellipsis-h"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">โทรศัพท์ (มือถือ)</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_mobile">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">อำเภอ</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_district" style="background-color: #fffde7;">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">โทรศัพท์</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_phone">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">จังหวัด</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_province" style="background-color: #fffde7;">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">หมายเลขต่อ</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_phone_ext">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label" style="color: #9c27b0;">รหัสไปรษณีย์</label>
                                                <div class="control-input-wrapper">
                                                    <input type="text" class="form-control" name="id_postal_code" style="background-color: #fffde7;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-12 text-right">
                                            <button class="btn btn-default" id="btn-clear-id-address">ล้าง</button>
                                            <button class="btn btn-primary" id="btn-copy-address">คัดลอกที่อยู่</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane" id="house_address">
                                    <!-- เนื้อหาแท็บที่อยู่ทะเบียนบ้าน (คล้ายกับแท็บที่อยู่บัตรประชาชน) -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="text-muted">ข้อมูลที่อยู่ทะเบียนบ้าน</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane" id="current_address">
                                    <!-- เนื้อหาแท็บที่อยู่ปัจจุบัน / อื่น ๆ (คล้ายกับแท็บที่อยู่บัตรประชาชน) -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="text-muted">ข้อมูลที่อยู่ปัจจุบัน / อื่น ๆ</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane" id="work_address">
                                    <!-- เนื้อหาแท็บที่อยู่ที่ทำงาน (คล้ายกับแท็บที่อยู่บัตรประชาชน) -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="text-muted">ข้อมูลที่อยู่ที่ทำงาน</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-12 text-right">
                        <button class="btn btn-success" id="btn-save-borrower">
                            <i class="fa fa-save"></i> บันทึกข้อมูลลูกค้า
                        </button>
                    </div>
                </div>
            </div>
        `).appendTo(container);
        
        // เพิ่ม event handlers สำหรับแท็บที่อยู่
        $('.nav-tabs a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
        
        // เพิ่ม event handlers สำหรับปุ่มต่างๆ
        $('#btn-clear-id-address').click(function() {
            $('input[name^="id_"]').val('');
        });
        
        $('#btn-copy-address').click(function() {
            frappe.show_alert('คัดลอกที่อยู่สำเร็จ', 3);
        });
        
        $('#btn-save-borrower').click(function() {
            frappe.show_alert({
                message: 'บันทึกข้อมูลลูกค้าสำเร็จ',
                indicator: 'green'
            }, 3);
        });
    }
    
    // ฟังก์ชันสร้างฟอร์มรายละเอียดสินเชื่อ
    function createLoanDetailsForm(container) {
        container.empty();
        
        // สร้าง section สำหรับแสดงข้อมูล
        let loan_details_area = $('<div class="loan-details-container">').appendTo(container);
        
        // ดึงข้อมูลจาก Doctype
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'SWP_Loan_Request',
                name: 'LR-2504-00064'  // ระบุ name ที่ต้องการดึงข้อมูล
            },
            callback: function(response) {
                if (response.message) {
                    // แสดงข้อมูลในฟอร์ม
                    displayForm(loan_details_area, response.message);
                } else {
                    // กรณีไม่พบข้อมูล ให้แสดงฟอร์มเปล่า
                    displayForm(loan_details_area);
                }
            },
            error: function(err) {
                // กรณีเกิดข้อผิดพลาด ให้แสดงฟอร์มเปล่า
                displayForm(loan_details_area);
                frappe.msgprint('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + err);
            }
        });
    }
    
    // ฟังก์ชันแสดงแบบฟอร์ม (รับพารามิเตอร์ data เพื่อแสดงข้อมูลที่ดึงมาได้)
    function displayForm(container, data = {}) {
        container.empty();
        
        // สร้าง form layout
        let form = $('<div class="form-layout">').appendTo(container);
        
        // สร้าง section ข้อมูลส่วนตัว
        let personal_section = $(`
            <div class="section-head">ข้อมูลส่วนตัวผู้สมัคร</div>
            <div class="section-body">
                <div class="row">
                    <div class="form-section">
                        ${createFormField('ชื่อ นามสกุลลูกค้า', 'customer_name', 'Data', '', data.cus_first_name || '')}
                        ${createFormField('เลขบัตรประชาชน', 'id_card_no', 'Data', '', data.id_card_no || '')}
                        ${createFormField('วันเกิด', 'birth_date', 'Date', '', data.birth_date || '')}
                        ${createFormField('เบอร์โทรศัพท์', 'mobile_no', 'Data', '', data.mobile_no || '')}
                        ${createFormField('อีเมล', 'email', 'Data', '', data.email || '')}
                    </div>
                </div>
            </div>
        `).appendTo(form);
        
        // สร้าง section ข้อมูลสินเชื่อ
        let loan_section = $(`
            <div class="section-head">ข้อมูลสินเชื่อ</div>
            <div class="section-body">
                <div class="row">
                    <div class="form-section">
                        ${createFormField('ประเภทสินเชื่อ', 'loan_type', 'Select', 'สินเชื่อส่วนบุคคล\nสินเชื่อบ้าน\nสินเชื่อรถยนต์\nสินเชื่อ SME', data.loan_type || '')}
                        ${createFormField('จำนวนเงินที่ขอ', 'loan_amount', 'Currency', '', data.loan_amount || '')}
                        ${createFormField('ระยะเวลาผ่อนชำระ (เดือน)', 'loan_term', 'Int', '', data.loan_term || '')}
                        ${createFormField('วัตถุประสงค์การกู้', 'loan_purpose', 'Small Text', '', data.loan_purpose || '')}
                        ${createFormField('สถานะคำขอ', 'status', 'Select', 'รอพิจารณา\nอนุมัติ\nไม่อนุมัติ\nยกเลิก', data.status || '')}
                    </div>
                </div>
            </div>
        `).appendTo(form);
        
        // สร้าง section ข้อมูลที่อยู่
        let address_section = $(`
            <div class="section-head">ข้อมูลที่อยู่</div>
            <div class="section-body">
                <div class="row">
                    <div class="form-section">
                        ${createFormField('ที่อยู่ปัจจุบัน', 'current_address', 'Small Text', '', data.current_address || '')}
                        ${createFormField('จังหวัด', 'province', 'Data', '', data.province || '')}
                        ${createFormField('รหัสไปรษณีย์', 'postal_code', 'Data', '', data.postal_code || '')}
                    </div>
                </div>
            </div>
        `).appendTo(form);
        
        // สร้าง section ข้อมูลการทำงาน
        let work_section = $(`
            <div class="section-head">ข้อมูลการทำงาน</div>
            <div class="section-body">
                <div class="row">
                    <div class="form-section">
                        ${createFormField('อาชีพ', 'occupation', 'Data', '', data.occupation || '')}
                        ${createFormField('สถานที่ทำงาน', 'workplace', 'Data', '', data.workplace || '')}
                        ${createFormField('รายได้ต่อเดือน', 'monthly_income', 'Currency', '', data.monthly_income || '')}
                    </div>
                </div>
            </div>
        `).appendTo(form);
        
        // เพิ่มปุ่มดำเนินการ
        let action_section = $(`
            <div class="section-body">
                <div class="row">
                    <div class="form-section text-right">
                        <button class="btn btn-default btn-sm" id="btn-refresh">
                            <i class="fa fa-refresh"></i> รีเฟรช
                        </button>
                        <button class="btn btn-primary btn-sm" id="btn-save">
                            <i class="fa fa-save"></i> บันทึก
                        </button>
                    </div>
                </div>
            </div>
        `).appendTo(form);
        
        // เพิ่ม event handlers สำหรับปุ่ม
        $('#btn-refresh').click(function() {
            createLoanDetailsForm(container.parent());
        });
        
        $('#btn-save').click(function() {
            saveLoanRequestData();
        });
    }
    
    // ฟังก์ชันบันทึกข้อมูล
    function saveLoanRequestData() {
        // รวบรวมข้อมูลจากฟอร์ม
        let formData = {};
        $('.form-layout input, .form-layout select, .form-layout textarea').each(function() {
            let fieldName = $(this).attr('name');
            let fieldValue = $(this).val();
            formData[fieldName] = fieldValue;
        });
        
        // แสดงข้อความแจ้งเตือนว่ากำลังบันทึกข้อมูล
        frappe.show_alert('กำลังบันทึกข้อมูล...', 3);
        
        // บันทึกข้อมูลลงใน Doctype
        frappe.call({
            method: 'frappe.client.save',
            args: {
                doc: {
                    doctype: 'SWP_Loan_Request',
                    name: 'LR-2504-00064',
                    ...formData
                }
            },
            callback: function(response) {
                if (response.message) {
                    // แสดงข้อความแจ้งเตือนว่าบันทึกข้อมูลสำเร็จ
                    frappe.show_alert({
                        message: 'บันทึกข้อมูลสำเร็จ',
                        indicator: 'green'
                    }, 3);
                }
            }
        });
    }
    
    // ฟังก์ชันสร้าง form field
    function createFormField(label, fieldname, fieldtype, options = '', value = '') {
        let field_html = '';
        
        switch(fieldtype) {
            case 'Data':
                field_html = `<input type="text" class="form-control" name="${fieldname}" value="${value}">`;
                break;
            case 'Int':
                field_html = `<input type="number" class="form-control" name="${fieldname}" value="${value}">`;
                break;
            case 'Currency':
                field_html = `<input type="number" class="form-control" name="${fieldname}" value="${value}" step="0.01">`;
                break;
            case 'Date':
                field_html = `<input type="date" class="form-control" name="${fieldname}" value="${value}">`;
                break;
            case 'Select':
                let options_html = options.split('\n').map(opt => {
                    let selected = (opt === value) ? 'selected' : '';
                    return `<option value="${opt}" ${selected}>${opt}</option>`;
                }).join('');
                
                field_html = `<select class="form-control" name="${fieldname}">
                    <option value="">-- เลือก --</option>
                    ${options_html}
                </select>`;
                break;
            case 'Small Text':
                field_html = `<textarea class="form-control" name="${fieldname}" rows="3">${value}</textarea>`;
                break;
            default:
                field_html = `<input type="text" class="form-control" name="${fieldname}" value="${value}">`;
        }
        
        return `
            <div class="form-group frappe-control">
                <div class="clearfix">
                    <label class="control-label">${label}</label>
                </div>
                <div class="control-input-wrapper">
                    ${field_html}
                </div>
            </div>
        `;
    }
}

// เพิ่ม CSS สำหรับหน้า
frappe.pages['loan_details'].on_page_show = function() {
    // เพิ่ม CSS
    frappe.dom.set_style(`
        /* CSS สำหรับ Action Buttons */
        .loan-action-buttons {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .loan-action-button {
            background-color: #e9967a;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            flex: 1;
            min-width: 150px;
            text-align: center;
        }
        
        .loan-action-button:hover {
            background-color: #d2691e;
        }
        
        /* CSS สำหรับ Menu Bar */
        .loan-menu-bar {
            display: flex;
            background-color: #f9efe3;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .loan-menu-item {
            padding: 12px 20px;
            cursor: pointer;
            font-weight: 500;
            text-align: center;
            transition: background-color 0.2s;
            white-space: nowrap;
        }
        
        .loan-menu-item:hover {
            background-color: #f5e5d0;
        }
        
        .loan-menu-item.active {
            background-color: #f5e5d0;
            font-weight: bold;
            position: relative;
        }
        
        .loan-menu-item.active:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #e67e22;
        }
        
        /* CSS สำหรับ Form */
        .loan-details-container {
            margin-top: 20px;
        }
        
        .form-layout {
            background-color: #f8f8f8;
            border-radius: 5px;
            padding: 15px;
        }
        
        .section-head {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ddd;
        }
        
        .section-body {
            margin-bottom: 20px;
        }
        
        .form-section {
            width: 100%;
            padding: 0 15px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .control-label {
            font-weight: bold;
            color: #555;
        }
        
        .control-input-wrapper {
            padding: 5px 0;
        }
        
        /* CSS สำหรับฟอร์มผู้กู้ */
        .borrower-form .nav-tabs {
            background-color: #f5f5f5;
            border-radius: 5px 5px 0 0;
        }
        
        .borrower-form .nav-tabs > li > a {
            color: #333;
            font-weight: 500;
        }
        
        .borrower-form .nav-tabs > li.active > a {
            background-color: #fff;
            color: #9c27b0;
            font-weight: bold;
        }
        
        .borrower-form .tab-content {
            background-color: #fff;
            border: 1px solid #ddd;
            border-top: none;
            padding: 15px;
            border-radius: 0 0 5px 5px;
        }
        
        @media (min-width: 768px) {
            .form-section {
                width: 50%;
                float: left;
            }
        }
        
        /* CSS สำหรับ Responsive Menu */
        @media (max-width: 768px) {
            .loan-menu-bar {
                flex-wrap: wrap;
            }
            
            .loan-menu-item {
                flex: 1 1 33.33%;
                padding: 10px;
                font-size: 0.9em;
            }
            
            .loan-action-buttons {
                flex-direction: column;
            }
            
            .loan-action-button {
                width: 100%;
            }
        }
    `);
}
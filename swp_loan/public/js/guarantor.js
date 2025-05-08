function initialize_guarantor_header(frm) {
    let html_header_guarantor = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ผู้ค้ำ</div>
        <button id="toggle-guarantor-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;

    frm.fields_dict.header_guarantor.$wrapper.html(html_header_guarantor);

    // ตั้งค่า HTML ของ has_guarantor เป็น checkbox
    frm.fields_dict.has_guarantor.$wrapper.html(`
        <div style="margin: 10px 0;">
            <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" id="has_guarantor_checkbox" style="margin-right: 8px;">
                <span>ไม่มีผู้ค้ำ</span>
            </label>
        </div>
    `);

    // เพิ่ม event handler สำหรับ checkbox
    $("#has_guarantor_checkbox").on("change", function() {
        if ($(this).is(":checked")) {
            frm.fields_dict.section_guarantor.wrapper.show();
            $("#toggle-guarantor-btn i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        } else {
            frm.fields_dict.section_guarantor.wrapper.hide();
            $("#toggle-guarantor-btn i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        }
    });

    // เพิ่ม event handler สำหรับปุ่ม toggle
    let isCollapsed_header_guarantor = false;
    $("#toggle-guarantor-btn").on("click", function () {
        isCollapsed_header_guarantor = !isCollapsed_header_guarantor;

        if (isCollapsed_header_guarantor) {
            frm.fields_dict.section_guarantor.wrapper.hide();
            frm.fields_dict.section_guarantor2.wrapper.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            $("#has_guarantor_checkbox").prop("checked", false);
        } else {
            frm.fields_dict.section_guarantor.wrapper.show();
            frm.fields_dict.section_guarantor2.wrapper.show();
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            $("#has_guarantor_checkbox").prop("checked", true);
        }
    });
}

function fn_btn_save_guarantor(frm){
    frm.fields_dict.btn_save_guarantor.$wrapper
    .css({
        "text-align": "right",
    })
    .find("button")
    .removeClass("btn-xs btn-default")
    .addClass("btn-md btn-primary")
    .css({
        "font-size": "16px",
        "padding": "8px 16px",
        'background-color': '#4a7ef6',
        'color': 'white',
        'border': 'none',
    })
    .on('click', function() {
        // if (!frm.doc.cus_customer_id) {
        //     frappe.throw(__('กรุณากรอกหมายเลขบัตร'));
        // }
        frm.save()
    });
}
function initialize_collateral_header(frm) {
    let html_header_collateral = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">หลักประกัน</div>
        <button id="toggle-collateral-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;

    frm.fields_dict.header_collateral.$wrapper.html(html_header_collateral);

    let isCollapsed_header_collateral = false;

    $("#toggle-collateral-btn").on("click", function () {
        isCollapsed_header_collateral = !isCollapsed_header_collateral;

        if (isCollapsed_header_collateral) {
            frm.fields_dict.section_collateral_details.wrapper.hide();
            frm.fields_dict.section_collateral_details2.wrapper.hide();
            frm.fields_dict.section_collateral_vehicle.wrapper.hide();
            frm.fields_dict.section_collateral_vehicle2.wrapper.hide();
            frm.fields_dict.section_collateral_vehicle3.wrapper.hide();
            frm.fields_dict.section_collateral_vehicle4.wrapper.hide();
            frm.fields_dict.section_collateral_vehicle5.wrapper.hide();
            frm.fields_dict.section_collateral_land.wrapper.hide();
            frm.fields_dict.section_collateral_land2.wrapper.hide();
            frm.fields_dict.section_collateral_land3.wrapper.hide();
            frm.fields_dict.section_collateral_land4.wrapper.hide();
            frm.fields_dict.section_collateral_land5.wrapper.hide();
            frm.fields_dict.section_collateral_land6.wrapper.hide();
            frm.fields_dict.section_collateral_details3.wrapper.hide();
            frm.fields_dict.section_collateral_details4.wrapper.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
            frm.fields_dict.section_collateral_details.wrapper.show();
            frm.fields_dict.section_collateral_details2.wrapper.show();
            frm.fields_dict.section_collateral_vehicle.wrapper.show();
            frm.fields_dict.section_collateral_vehicle2.wrapper.show();
            frm.fields_dict.section_collateral_vehicle3.wrapper.show();
            frm.fields_dict.section_collateral_vehicle4.wrapper.show();
            frm.fields_dict.section_collateral_vehicle5.wrapper.show();
            frm.fields_dict.section_collateral_land.wrapper.show();
            frm.fields_dict.section_collateral_land2.wrapper.show();
            frm.fields_dict.section_collateral_land3.wrapper.show();
            frm.fields_dict.section_collateral_land4.wrapper.show();
            frm.fields_dict.section_collateral_land5.wrapper.show();
            frm.fields_dict.section_collateral_land6.wrapper.show();
            frm.fields_dict.section_collateral_details3.wrapper.show();
            frm.fields_dict.section_collateral_details4.wrapper.show();
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }
    });
}

function fn_btn_save_collateral(frm){
    frm.fields_dict.btn_save_collateral.$wrapper
    .css({
        "text-align": "right",
    })
    .find("button")
    .removeClass("btn-xs btn-default")
    .addClass("btn-md btn-primary")
    .css({
        'font-size': '16px',
        'padding': '8px 16px',
        'background-color': '#4a7ef6',
        'color': 'white',
        'border': 'none',
    })
    .on('click', function() {
        if (!frm.doc.col_collatteral_id) {
            frappe.throw(__('กรุณากรอกหมายเลขหลักประกัน'));
        }
        frm.save()
    });
}
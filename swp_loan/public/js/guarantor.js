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
        $("#toggle-guarantor-btn").trigger("click");

        // Show collateral sections
        frm.fields_dict.section_header_collateral.wrapper.show();
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

        // Show and initialize collateral search section
        frm.fields_dict.section_header_collateral_search.wrapper.show();
        frm.fields_dict.section_collateral_search.wrapper.show();

        // Initialize header_collateral HTML content
        let html_header_collateral = `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">หลักประกัน</div>
            <button id="toggle-collateral-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;

        frm.fields_dict.header_collateral.$wrapper.html(html_header_collateral);

        // Initialize header_collateral_search HTML content
        let html_header_collateral_search = `
        <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #ffb28d; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
            <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาหลักประกัน</div>
            <button id="toggle-collateral_search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
                <i class="fa fa-chevron-up"></i>
            </button>
        </div>
        `;

        frm.fields_dict.header_collateral_search.$wrapper.html(html_header_collateral_search);
    });
}
function initialize_collateral_search_header(frm) {
    let html_header_collateral_search = `
    <div id="custom-toggle-header" style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; background: #80AFE0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-size: 20px; font-weight: bold; text-align: center; flex-grow: 1;">ค้นหาหลักประกัน</div>
        <button id="toggle-collateral_search-btn" class="btn btn-sm btn-default" style="margin-left: auto;">
            <i class="fa fa-chevron-up"></i>
        </button>
    </div>
    `;

    frm.fields_dict.header_collateral_search.$wrapper.html(html_header_collateral_search);

    let isCollapsed_header_collateral_search = false;

    $("#toggle-collateral_search-btn").on("click", function () {
        isCollapsed_header_collateral_search = !isCollapsed_header_collateral_search;

        if (isCollapsed_header_collateral_search) {
            frm.fields_dict.section_collateral_search.wrapper.hide();
            $(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        } else {
            frm.fields_dict.section_collateral_search.wrapper.show();
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }
    });
}

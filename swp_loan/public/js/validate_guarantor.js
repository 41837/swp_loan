function test(frm){
console.log("TEST FRAPPE WWEEWEWEW03498230948230948234");
}


// function initialize_guarantor_search(frm) {
    

//     console.log('initialize_guarantor_search called');

//     frm.fields_dict.identification_number.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>');
    // frm.fields_dict.identification_number.$wrapper.find('.control-label').html('หมายเลขบัตร <span style="color: red;">*</span>');
    // frm.fields_dict.salutation.$wrapper.find('.control-label').html('คำนำหน้า <span class="text-danger">*</span>');
    // frm.fields_dict.first_name.$wrapper.find('.control-label').html('ชื่อ XXXX <span class="text-danger">*</span>');
    // frm.fields_dict.last_name.$wrapper.find('.control-label').html('นามสกุล <span class="text-danger">*</span>');
    // frm.fields_dict.date_of_birth.$wrapper.find('.control-label').html('วันเดือนปีเกิด <span class="text-danger">*</span>');
    // frm.fields_dict.age.$wrapper.find('.control-label').html('อายุ <span class="text-danger">*</span>');
    // frm.fields_dict.issue_date.$wrapper.find('.control-label').html('วันที่ออกบัตร <span class="text-danger">*</span>');
    // frm.fields_dict.expiry_date.$wrapper.find('.control-label').html('บัตรหมดอายุ <span class="text-danger">*</span>');
    // frm.fields_dict.identification_type.$wrapper.find('.control-label').html('ประเภทบัตร <span class="text-danger">*</span>');
    // frm.fields_dict.issuer.$wrapper.find('.control-label').html('ออกบัตรโดย <span class="text-danger">*</span>');
//     console.log("SWP GUARANTOR");

// }


function fn_btn_save_borrower_SWP(frm){    
    console.log("field:", frm.fields_dict.btn_save_guarantor);
console.log("wrapper html:", frm.fields_dict.btn_save_borrower.$wrapper.html());

    const field = frm.fields_dict.btn_save_guarantor;
    if (!field) {
        console.warn("Field btn_save_guarantor not found in form.");
        return;
    }

    field.$wrapper
        .css({ "text-align": "right" })
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
            const resValidate = ValidateFromBorrower(frm);
            console.log(resValidate,"resValidate");
            if (resValidate === true) {
                frm.save();
            }
        });    
}

// frappe.ui.form.on('SWP_Loan_Request', {
//     fn_btn_save_borrower_SWP(frm) {
//         const resValidate = ValidateFromBorrower(frm);
//         if (resValidate) {
//             frm.save();
//         }
//     }
// });



function ValidateFromBorrower(frm) {
    const identificationField = frm.fields_dict.identification_number;
    console.log(identificationField,"identificationField");
    if (!identificationField) {
        console.warn("Field identification_number not found.");
        return false;
    }

    let errors = [];
    let identification_number = identificationField.$input.val();

    if (!identification_number) errors.push('- หมายเลขบัตร');

    if (errors.length > 0) {
        errors.unshift('กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง <br/>');
        setTimeout(() => {
            frappe.throw(errors.join('<br/>'));
        }, 0);
        return false;
    }

    return true;
}



// function ValidateFromBorrower(frm) {
//     console.log('identification_number field:', frm.fields_dict.identification_number);

//     console.log(frm.fields_dict,"Guarantor");
//     let errors = [];

//     let identification_number = frm.fields_dict.identification_number.$input.val();
    
   


//     if (!identification_number) errors.push('- หมายเลขบัตร');
   

//     if (errors.length > 0) {
//         errors.unshift('กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง <br/>');
//         frappe.throw(errors.join('<br/>'));
//     }

//     return true;
// }













function initialize_guarantor_search(frm) {
    console.log('initialize_guarantor_search called');

    if (frm.fields_dict && frm.fields_dict.identification_number) {
        frm.fields_dict.identification_number.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>');
    } else {
        console.warn("Field 'identification_number' not found in frm.fields_dict");
    }

    console.log("SWP GUARANTOR");
}












// frappe.ui.form.on('SWP_Guarantor', {
//     form_render: function(frm, cdt, cdn) {
//          console.log("frm.fields_dict:", frm);
//         console.log("frm.fields_dict:", frm.fields_dict);
//         let identification_number = frm.fields_dict.identification_number.$input.val();

//         console.log(identification_number,"XXXXX")

//         if (frm.fields_dict.guarantors) {
//             console.log("Guarantors grid found", frm.fields_dict.guarantors);
//         } else {
//             console.warn("No guarantors field in frm.fields_dict");
//         }
//     }
// });

// frappe.ui.form.on('SWP_Guarantor', {
//     onload: function(frm) {
//         console.log("frm.fields_dict:", frm);
//                 console.log("frm.fields_dict:", frm.fields_dict);

                
              

//         //         console.log("frm.fields_dict:", frm.fields_dict);
//         // frm.fields_dict.collaterals.grid.on('after_add_row', function(row) {
//             // เซ็ตค่าหลังจากกด Add Row แล้ว
//             // row.collateral_type = "บ้าน";
//             // frm.refresh_field("collaterals");
//         // });
//     }
// });



// frappe.ui.form.on('SWP_Guarantor', {
//     form_render: function(frm, cdt, cdn) {
//         const wrapper = locals[cdt][cdn];
//         console.log('Wrapper:', wrapper);

//         if (!wrapper) {
//             console.warn('No wrapper found');
//             return;
//         }

//         const fieldnames = [
//             { name: 'identification_number', label: 'หมายเลขบัตร' },
//             { name: 'salutation', label: 'คำนำหน้า' },
//             { name: 'first_name', label: 'ชื่อ' },
//             { name: 'last_name', label: 'นามสกุล' },
//         ];
//         console.log('Fields dict:', wrapper.fields_dict);

//         // ตรวจสอบว่า wrapper มี fields_dict หรือไม่
//         if (wrapper.fields_dict) {

//             fieldnames.forEach(f => {
//                 const field = wrapper.fields_dict[f.name];  // ดึงฟิลด์จาก fields_dict ของ wrapper
//                 if (field) {
//                     const $wrapper = field.$wrapper;
//                     if ($wrapper) {
//                         $wrapper.find('.control-label').html(`${f.label} <span class="text-danger">*</span>`);
//                     } else {
//                         console.warn(`No wrapper for field ${f.name}`);
//                     }
//                 } else {
//                     console.warn(`Field ${f.name} not found`);
//                 }
//             });
//         } else {
//             console.warn('No fields_dict found for the wrapper');
//         }
//     }
// });



        // const guarantors = frappe.get_doc("SWP_Guarantor");


        // frappe.ui.form.on('SWP_Guarantor', {
        //     form_render: function(frm, cdt, cdn) {
        //         const wrapper = locals[cdt][cdn];
        
        //         console.log(wrapper);
        //         // Access fields using frappe.get_field in child row
        //         const fieldnames = [
        //             { name: 'identification_number', label: 'หมายเลขบัตร' },
        //             { name: 'salutation', label: 'คำนำหน้า' },
        //             { name: 'first_name', label: 'ชื่อ' },
        //             { name: 'last_name', label: 'นามสกุล' },
        //         ];
        
        //         console.log(fieldnames);

        //         fieldnames.map(f => {
        //             const $wrapper = frappe.form.field_dict[cdn + '-' + f.name]?.$wrapper;

        //             console.log($wrapper);

        //             if ($wrapper) {
        //                 $wrapper.find('.control-label').html(`${f.label} <span class="text-danger">*</span>`);
        //             } else {
        //                 console.warn('Missing field:', f.name);
        //             }
        //         });
        //     }
        // });
        




// frappe.ui.form.on('SWP_Guarantor', {
//     form_render: function(frm, cdt, cdn) {
//         const row = frm.fields_dict.guarantors.grid.grid_rows_by_docname[cdn];
//         if (!row) return;

//         row.fields_dict.identification_number.$wrapper.find('.control-label').html('หมายเลขบัตร <span class="text-danger">*</span>');
//         row.fields_dict.salutation.$wrapper.find('.control-label').html('คำนำหน้า <span class="text-danger">*</span>');
//         row.fields_dict.first_name.$wrapper.find('.control-label').html('ชื่อ <span class="text-danger">*</span>');
//         row.fields_dict.last_name.$wrapper.find('.control-label').html('นามสกุล <span class="text-danger">*</span>');
//     }
// });


function openConnection(frm) {
    // uses global 'conn' object
    if (conn.readyState === undefined || conn.readyState > 1) {

        conn = new WebSocket('ws://127.0.0.1:8008');

        conn.onopen = function () {
            conn.send("Connection Established Confirmation");
        };

        conn.onmessage = function (event)
        {
        //*********************************************//
        //****  Web Socket Server ***//
        //*********************************************//

            var rawStr = event.data.toString();  // Split with '@'
            //alert(rawStr);
            var res = rawStr.split('@');

            console.log(conn);
            // Connected
            if(res[0] == "Connected")
            {

                // yo debug
                // document.getElementById("device_status").innerHTML =  rawStr;


                //"manual"  => Set ID Card to Manual Mode.
                //"auto"    => Set ID Card to Auto Mode.
                setIDCardMode("auto");
            }
            var strtitle1 = ["-",
            "Citizen ID : ",
             "Thai Prefix :",
             "Thai Firstname : ",
             "Thai Lastname : ",
             "Sex : ",
             "Birthday : ",
             "EN_Prefix : ",
             "Eng Firstname : ",
             "Eng Lastname : ",
             "IssueDate : ",
             "ExpireDate : ",
             "Address : ",
             "image"]

            var img = "";
            var text = "";
            var _card = "";

            /////thaiid
            //console.log(res);
            if(res[0] == "idcard")
            {
                img = "1";

                for (i=1; i<= res.length - 2;i++)
                {
                    _card += res[i] + "@";
                }

                for (i = 1; i <= res.length-2; i++)
                {
                    text += strtitle1[i] + res[i] + "<br>";

                }

                let strAddress = res[12];
                let AddArr = strAddress.split("ตำบล");
                let strAumpur = "";
                let strProvince = "";

                if(AddArr.length > 1){
                      strAumpur = "อำเภอ";
                      strProvince = "จังหวัด";
                }else{
                     AddArr = strAddress.split("ต.");
                    if(AddArr.length > 1){
                          strAumpur = "อ.";
                          strProvince = "จ.";
                    }else{
                         AddArr = strAddress.split("แขวง");
                        if(AddArr.length > 1){
                            //alert(AddArr[1]);
                              strAumpur = "เขต";
                              strProvince = " ";
                        }
                    }

                }
                    alert(AddArr[1]);
                    let tbl = AddArr[1];
                    let tblArr = tbl.split(" ");

                    let tambol = tblArr[0];
                    let amphur = tblArr[1].replace(strAumpur,"");
                    let province = tblArr[2].replace(strProvince,"");

                //let f = new Intl.DateTimeFormat('en');
                //let a = f.formatToParts();
                //console.log(res[6]);
                //alert(formatDate(res[6]));

                frm.set_value('cus_search_id', res[1]);

                frm.set_value('cus_customer_id', res[1]);
                if(res[2] == "นาย"){
                    frm.set_value('cus_salutation', '01');
                }else if(res[2] == "นาง"){
                    frm.set_value('cus_salutation', '02');
                }else if(res[2] == "นางสาว"){
                    frm.set_value('cus_salutation', '03');
                }else{
                    frm.set_value('cus_salutation', '04');
                }
                frm.set_value('cus_first_name', res[3]);
                frm.set_value('cus_last_name', res[4]);

                
                frm.set_value('cus_date_of_birth', formatDate(res[6]));
                frm.set_value('cus_issue_date', formatDate(res[10]));
                frm.set_value('cus_expiry_date', formatDate(res[11]));
                frm.set_value('cus_identification_type', '01');
                frm.set_value('cus_issuer', '01');
                
                frm.set_value('cus_gender', res[5]);
                
                

                console.log(res);

                if (!frm.doc.table_borrower_address || frm.doc.table_borrower_address.length === 0) {
                    let new_row = frm.add_child('table_borrower_address');
                    new_row.address_type = 'บัตรประชาชน';
                    new_row.address = AddArr[0];
                    new_row.subdistrict = tambol;
                    new_row.district = amphur;
                    new_row.province = province;
                    new_row.post_code = res[21];
                    // อัปเดต UI ให้แสดงผล
                    frm.refresh_field('table_borrower_address');
                }

                
                // frm.set_value('preview_id_card', "data:image/png;base64," + res[13]);

                frm.fields_dict.preview_id_card.$wrapper.html(`
                    <div style="text-align: center;">
                     <img src="data:image/jpeg;base64,${res[13]}" style="max-width: 100%;"/>
                    </div>

                `);

                // frm.fields_dict["preview_id_card_html"].$wrapper.html(
                // `<img src="data:image/jpeg;base64,${res[13]}" style="max-width: 100%;"/>`
                // );

                // document.getElementById('citizenid').value = res[1];
                // document.getElementById('title_th_id').value = res[2];
                // document.getElementById('first_name_th').value = res[3];
                // document.getElementById('last_name_th').value = res[4];
                // document.getElementById('gender').value = res[5];
                // document.getElementById('dob').value = formatDate(res[6]);
                // document.getElementById('title_en_id').value = res[7];
                // document.getElementById('first_name_eng').value = res[8];
                // document.getElementById('last_name_eng').value = res[9];
                // document.getElementById('issue_date').value = formatDate(res[10]);
                // document.getElementById('expiry_date').value = formatDate(res[11]);
                // document.getElementById('address').value = AddArr[0];
                // document.getElementById('preview').src = "data:image/png;base64," + res[13];
                // document.getElementById('customer_images').value = res[13];
                // document.getElementById('subdistrict').value = tambol;
                // document.getElementById('district').value = amphur;
                // document.getElementById('province').value = province;


                // document.getElementById('zipcode').value = res[21];
                //document.getElementById("content_idcard1").innerHTML = _card.substring(0,_card.length-1);
                //document.getElementById("content_idcard").innerHTML = text;

                
            }



           // yo debug
            // if(img == "")
            // {

            //         document.getElementById("chk").style.display = "none";
            //         document.getElementById("chk2").style.display = "none";
            // }
            // else
            // {

            //         document.getElementById("chk").style.display = "block";
            //         document.getElementById("chk2").style.display = "block";
            // }

      };

        conn.onerror = function (event) {
            // Web Socket Error
            // document.getElementById("device_status").innerHTML = "Web Socket Error";
      };


        conn.onclose = function (event) {
            // Web Socket Closed
            // document.getElementById("device_status").innerHTML = "Web Socket Closed";

        };
    }
}

function formatDate(date) {
    let dateStr = date;
    let dateArr = [];
    if(dateStr.search("-")>-1){
        dateArr = dateStr.split("-");
    }
    if(dateStr.search("/")>-1){
        dateArr = dateStr.split("/");
    }
    day = dateArr[0];
    month = dateArr[1];
    year = dateArr[2];
    if ( month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    //alert([year, month, day].join('-'));
    return [year, month, day].join('-');
}


function setIDCardMode(mode)
{	//"manual"  => Set ID Card to Manual Mode.
    //"auto"    => Set ID Card to Auto Mode.
    conn.send(mode);

}

function doReadIDCard()
{
    conn.send("thaiid");

}

function Clear()
{

    // document.getElementById("content_idcard1").innerHTML = "";
    // document.getElementById("content_idcard").innerHTML = "";
    // document.getElementById("chk").style.display = "none";
    // document.getElementById("chk2").style.display = "none";
}
function CloseSocket()
{
    conn.close();
}
function call_SDK_ID_Card(frm)
{
    conn = {}, window.WebSocket = window.WebSocket || window.MozWebSocket;
    openConnection(frm);
}


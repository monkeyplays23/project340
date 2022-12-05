function deletePurchase(purch_ID) {
    let link = '/deletePurchase-AJAX/';
    let data = {
      purch_ID: purch_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(purch_ID);
      }
    });
}

function deleteRow(purch_ID){
  let table = document.getElementById("PurchasesTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].cells[0].innerHTML == purch_ID) {
          table.deleteRow(i);
          table.deleteRow(i+1);
          deleteDropDownMenus(purch_ID);
          break;
        }
    }
}

function deleteDropDownMenus(purch_ID){
    let selectMenu = document.getElementById("input-pID");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(purch_ID)){
        selectMenu[i].remove();
        break;
      }
    }
    let selectMenu2 = document.getElementById("input-pID_for_pd");
    for (let i = 0; i < selectMenu2.length; i++){
      if (Number(selectMenu2.options[i].value) === Number(purch_ID)){
        selectMenu[i].remove();
        break;
      }
    }
    let selectMenu3 = document.getElementById("selected_pID_for_add");
    for (let i = 0; i < selectMenu3.length; i++){
      if (Number(selectMenu3.options[i].value) === Number(purch_ID)){
        selectMenu[i].remove();
        break;
      }
    }
}

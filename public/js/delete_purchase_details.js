function deletePurchaseDetails(game_purch_details_ID) {
    let link = '/deletePurchaseDetails-AJAX/';
    let data = {
        game_purch_details_ID: game_purch_details_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(game_purch_details_ID);
        location.reload();
      }
    });
}

function deleteRow(game_purch_details_ID){
  let table = document.getElementById("PurchaseDetailsTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == game_purch_details_ID) {
          table.deleteRow(i);
          table.deleteRow(i+1);
          deleteDropDownMenu(game_purch_details_ID);
          location.reload();
          break;
        }
    }
}

function deleteDropDownMenu(game_purch_details_ID){
    let selectMenu = document.getElementById("selected_pdID");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(game_purch_details_ID)){
        selectMenu[i].remove();
        break;
      }
    }
}
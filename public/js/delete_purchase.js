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
      if (table.rows[i].getAttribute("data-value") == purch_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(purch_ID);
          break;
        }
    }
  }

  function deleteDropDownMenu(purch_ID){
    let selectMenu = document.getElementById("selected_title");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(purch_ID)){
        selectMenu[i].remove();
        break;
      }
    }
  }
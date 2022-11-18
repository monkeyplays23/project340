function deleteCustomer(cust_ID) {
    let link = '/deleteCustomer-AJAX/';
    let data = {
      cust_ID: cust_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(cust_ID);
      }
    });
  }

function deleteRow(cust_ID){
  let table = document.getElementById("CustomersTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == cust_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(cust_ID);
          break;
        }
    }
  }

  function deleteDropDownMenu(cust_ID){
    let selectMenu = document.getElementById("selected_fullname");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(cust_ID)){
        selectMenu[i].remove();
        break;
      }
    }
  }
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
              break;
         }
      }
  }
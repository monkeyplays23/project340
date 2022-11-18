function deleteDeveloper(dev_ID) {
    let link = '/deleteDeveloper-AJAX/';
    let data = {
      dev_ID: dev_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(dev_ID);
      }
    });
  }

function deleteRow(dev_ID){
  let table = document.getElementById("DevelopersTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == dev_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(dev_ID);
          break;
        }
    }
  }

  function deleteDropDownMenu(dev_ID){
    let selectMenu = document.getElementById("selected_devname");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(dev_ID)){
        selectMenu[i].remove();
        break;
      }
    }
  }
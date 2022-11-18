function deleteGenre(genre_ID) {
    let link = '/deleteGenre-AJAX/';
    let data = {
      genre_ID: genre_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(genre_ID);
      }
    });
  }

function deleteRow(genre_ID){
  let table = document.getElementById("GenresTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == genre_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(genre_ID);
          break;
        }
    }
  }

  function deleteDropDownMenu(genre_ID){
    let selectMenu = document.getElementById("selected_title");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(genre_ID)){
        selectMenu[i].remove();
        break;
      }
    }
  }
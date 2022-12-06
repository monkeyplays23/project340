function deleteGame(game_ID) {
    let link = '/deleteGame-AJAX/';
    let data = {
      game_ID: game_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(game_ID);
      }
    });
}

function deleteRow(game_ID){
  let table = document.getElementById("GamesTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == game_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(game_ID);
          break;
        }
    }
}

function deleteDropDownMenu(game_ID){
    let selectMenu = document.getElementById("selected_gametitle");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(game_ID)){
        selectMenu[i].remove();
        break;
      }
    }
}
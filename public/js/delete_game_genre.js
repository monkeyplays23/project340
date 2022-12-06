function deleteGameGenre(game_genre_details_ID) {
    let link = '/deleteGameGenre-AJAX/';
    let data = {
      game_genre_details_ID: game_genre_details_ID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(game_genre_details_ID);
      }
    });
}

function deleteRow(game_genre_details_ID){
  let table = document.getElementById("GamesGenresTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == game_genre_details_ID) {
          table.deleteRow(i);
          deleteDropDownMenu(game_genre_details_ID);
          break;
        }
    }
}

function deleteDropDownMenu(game_genre_details_ID){
    let selectMenu = document.getElementById("");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(game_genre_details_ID)){
        selectMenu[i].remove();
        break;
      }
    }
}
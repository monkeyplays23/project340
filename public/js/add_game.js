let addGameForm = document.getElementById('addGame-AJAX-form');

// Modify the objects we need
addGameForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-gtitle");
    let inputPrice = document.getElementById("input-price");
    let inputDev = document.getElementById("selected_devname_for_game");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let priceValue = inputPrice.value;
    let devValue = inputDev.value;


    // Put our data we want to send in a javascript object
    let data = {
        game_title: titleValue,
        game_price: priceValue,
        dev_ID: devValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addGame-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputPrice.value = '';
            inputDev.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// Games
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("GamesTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let devCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.game_ID;
    titleCell.innerText = newRow.game_title;
    priceCell.innerText = newRow.game_price;
    devCell.innerText = newRow.dev_ID;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteGame(newRow.game_ID)
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(priceCell);
    row.appendChild(devCell);

    row.appendChild(deleteCell);
    // Add the row to the table
    row.setAttribute('data-value', newRow.game_ID);

    currentTable.appendChild(row);

    let selectMenu = document.getElementById("selected_gametitle");
    let option = document.createElement("option");
    option.text = newRow.game_title;
    option.value = newRow.game_ID;
    selectMenu.add(option);
}
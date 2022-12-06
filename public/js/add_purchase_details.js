let addPurchaseDetailsForm = document.getElementById('addPurchaseDetails-AJAX-form');

// Modify the objects we need
addPurchaseDetailsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPurch = document.getElementById("selected_pID_for_add");
    let inputGame = document.getElementById("selected_game_for_pd");

    // Get the values from the form fields
    let purchValue = inputPurch.value;
    let gameValue = inputGame.value;

    // Put our data we want to send in a javascript object
    let data = {
        purch_ID: purchValue,
        game_ID: gameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addPurchaseDetails-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable2(xhttp.response);
            location.reload();
            // Clear the input fields for another transaction
            inputGame.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// PurchaseDetailss
addRowToTable2 = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("PurchaseDetailsTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let PidCell = document.createElement("TD");
    let gameCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.game_purch_details_ID;
    PidCell.innerText = newRow.purch_ID;
    gameCell.innerText = newRow.game_ID;
    priceCell.innerText = newRow.game_price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePurchaseDetails(newRow.game_purch_details_ID)
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(PidCell);
    row.appendChild(gameCell);
    row.appendChild(priceCell);

    row.appendChild(deleteCell);
    // Add the row to the table
    row.setAttribute('data-value', newRow.game_purch_details_ID);

    currentTable.appendChild(row);

    let selectMenu = document.getElementById("selected_pdID");
    let option = document.createElement("option");
    option.text = newRow.game_genre_details_ID;
    option.value = newRow.game_purch_details_ID;
    selectMenu.add(option);
}
// Get the objects we need to modify
let updatePurchaseDetailsForm = document.getElementById('updatePurchaseDetails-AJAX-form');

// Modify the objects we need
updatePurchaseDetailsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputpdID = document.getElementById("selected_pdID");
    let inputpID = document.getElementById("selected_pID_for_pd");
    let inputGame = document.getElementById("selected_game_update");

    // Get the values from the form fields
    let pdIDValue= inputpdID.value;
    let pIDValue= inputpID.value;
    let gameValue = inputGame.value;

    if (!(gameValue))
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        game_purch_details_ID: pdIDValue,
        purch_ID: pIDValue,
        game_ID: gameValue,
        }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/putPurchaseDetails-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, pdIDValue);
            location.reload();
        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, game_purch_details_ID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("PurchaseDetailsTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == game_purch_details_ID) {

            // Get the location of the row where we found the matching devomer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of changed values
            let td_purch = updateRowIndex.getElementsByTagName("td")[1];
            let td_game = updateRowIndex.getElementsByTagName("td")[2];
            let td_price = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign values to our new values we updated to
            td_purch.innerHTML = parsedData[0].purch_ID;
            td_game.innerHTML = parsedData[0].game_ID;
            td_price.inerHTML = parsedData[0].game_price;
       }
    }
}
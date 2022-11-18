let addDeveloperForm = document.getElementById('addDeveloper-AJAX-form');

// Modify the objects we need
addDeveloperForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-devname");
    let inputLocation = document.getElementById("input-location");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let locationValue = inputLocation.value;

    // Put our data we want to send in a javascript object
    let data = {
        dev_name: nameValue,
        dev_location: locationValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addDeveloper-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputLocation.value = '';
        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// Developers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("DevelopersTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let locationCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.dev_ID;
    nameCell.innerText = newRow.dev_name;
    locationCell.innerText = newRow.dev_location;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.dev_ID)
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(locationCell);

    row.appendChild(deleteCell);
    // Add the row to the table
    row.setAttribute('data-value', newRow.dev_ID);

    currentTable.appendChild(row);

    let selectMenu = document.getElementById("selected_name");
    let option = document.createElement("option");
    option.text = newRow.dev_name;
    option.value = newRow.dev_ID;
    selectMenu.add(option);
}
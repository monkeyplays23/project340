let addCustomerForm = document.getElementById('addCustomer-AJAX-form');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        cust_first_name: firstNameValue,
        cust_last_name: lastNameValue,
        cust_email: emailValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addCustomer-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();
            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("CustomersTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.cust_ID;
    firstNameCell.innerText = newRow.cust_first_name;
    lastNameCell.innerText = newRow.cust_last_name;
    emailCell.innerText = newRow.cust_email;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.cust_ID)
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);

    row.appendChild(deleteCell);
    // Add the row to the table
    row.setAttribute('data-value', newRow.cust_ID);

    currentTable.appendChild(row);

    let selectMenu = document.getElementById("selected_fullname");
    let option = document.createElement("option");
    option.text = newRow.cust_first_name + ' ' +  newRow.cust_last_name;
    option.value = newRow.cust_ID;
    selectMenu.add(option);
}
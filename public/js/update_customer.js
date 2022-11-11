// Get the objects we need to modify
let updateCustomerForm = document.getElementById('updateCustomer-AJAX-form');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("input-fname-update");
    let inputLastName = document.getElementById("input-lname-update");
    let inputEmail = document.getElementById("input-email-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;

    if (!(firstNameValue))
    {
        return;
    }
    if (!(lastNameValue))
    {
        return;
    }
    if (!(emailValue))
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        cust_first_name: firstNameValue,
        cust_last_name: lastNameValue,
        cust_email: emailValue
        }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/putCustomer-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, cust_ID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("CustomersTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == cust_ID) {

            // Get the location of the row where we found the matching Customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td_fname = updateRowIndex.getElementsByTagName("td")[1];
            let td_lname = updateRowIndex.getElementsByTagName("td")[2];
            let td_email = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign values to our new values we updated to
            td_fname.innerHTML = parsedData[0].cust_first_name;
            td_lname.innerHTML = parsedData[0].cust_last_name;
            td_email.innerHTML = parsedData[0].cust_email;
       }
    }
}
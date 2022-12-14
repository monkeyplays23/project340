// Get the objects we need to modify
let updatePurchaseForm = document.getElementById('updatePurchase-AJAX-form');

// Modify the objects we need
updatePurchaseForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputpID = document.getElementById("selected_pID");
    let inputDate = document.getElementById("input-date-update");
    let inputName = document.getElementById("selected_custname_update");

    // Get the values from the form fields
    let pIDValue= inputpID.value;
    let dateValue = inputDate.value;
    let nameValue = inputName.value;

    if (!(dateValue))
    {
        return;
    }
    if (!(nameValue))
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        purch_ID: pIDValue,
        purch_date: dateValue,
        cust_ID: nameValue,
        }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/putPurchase-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, pIDValue);
            location.reload();
        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, purch_ID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("PurchasesTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == purch_ID) {

            // Get the location of the row where we found the matching devomer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of changed values
            let td_date = updateRowIndex.getElementsByTagName("td")[1];
            let td_name = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign values to our new values we updated to
            td_date.innerHTML = parsedData[0].purch_date;
            td_name.innerHTML = parsedData[0].cust_ID;
       }
    }
}
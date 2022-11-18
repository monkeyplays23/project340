// Get the objects we need to modify
let updateDeveloperForm = document.getElementById('updateDeveloper-AJAX-form');

// Modify the objects we need
updateDeveloperForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("selected_devname");
    let inputNewName = document.getElementById("input-devname-update");
    let inputLocation = document.getElementById("input-location-update");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let newNameValue = inputNewName.value;
    let locationValue = inputLocation.value;


    if (!(nameValue))
    {
        return;
    }
    if (!(newNameValue))
    {
        return;
    }
    if (!(locationValue))
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        dev_ID: nameValue,
        dev_name: newNameValue,
        dev_location: locationValue,
        }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/putDeveloper-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 3 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, nameValue);

        }
        else if (xhttp.readyState == 3 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, dev_ID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("DevelopersTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == dev_ID) {

            // Get the location of the row where we found the matching devomer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of changed values
            let td_name = updateRowIndex.getElementsByTagName("td")[1];
            let td_location = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign values to our new values we updated to
            td_name.innerHTML = parsedData[0].dev_name;
            td_location.innerHTML = parsedData[0].dev_location;
       }
    }
}
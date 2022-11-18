// Get the objects we need to modify
let updateGenreForm = document.getElementById('updateGenre-AJAX-form');

// Modify the objects we need
updateGenreForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("selected_title");
    let inputNewTitle = document.getElementById("input-title-update");


    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let newTitleValue = inputNewTitle.value;


    // Put our data we want to send in a javascript object
    let data = {
        genre_ID: titleValue,
        genre_title: newTitleValue
        }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/putGenre-AJAX/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, titleValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, genre_ID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("GenresTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == genre_ID) {

            // Get the location of the row where we found the matching Genre ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of changed values
            let td_title = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign values to our new values we updated to
            td_title.innerHTML = parsedData[0].genre_title;
       }
    }
}
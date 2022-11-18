var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

PORT = 7999;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));              // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// app.js

/*
    ROUTES
*/
app.get('/', function (req, res) {
    let query1               // Define our query

    if (req.query.lname === undefined) {
        query1 = "SELECT * FROM Customers;";
    }
    else {
        query1 = `SELECT * FROM Customers WHERE cust_last_name LIKE "${req.query.lname}%"`
    }

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        res.render('index', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                        // received back from the query

app.post('/addCustomer-AJAX/', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let cust_email = data.cust_email;
    if (!cust_email) {
        cust_email = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (cust_first_name, cust_last_name, cust_email) VALUES ('${data.cust_first_name}', '${data.cust_last_name}', '${data.cust_email}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customer
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                    res.render('index', { data: rows });   
                }
            })
        }
    })
});

app.delete('/deleteCustomer-AJAX/', function (req, res, next) {
    let data = req.body;
    let cust_ID = parseInt(data.cust_ID);
    let deleteCustomer = `DELETE FROM Customers WHERE cust_ID = ?`
    // Run the query
    db.pool.query(deleteCustomer, [cust_ID], function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/putCustomer-AJAX/', function (req, res, next) {
    let data = req.body;

    let customer = parseInt(data.fullname);
    let fname = (data.cust_first_name);
    let lname = (data.cust_last_name);
    let email = (data.cust_email);

    let queryUpdateCustomer = `UPDATE Customers SET cust_first_name = ?, cust_last_name  = ?, cust_email = ? WHERE Customers.cust_ID = ?`;
    let selectCustomer = 'SELECT * FROM Customers where Customers.cust_ID = ?';
    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [fname, lname, email, customer], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            //Samuel: runs second query (this finds the row to update)
            db.pool.query(selectCustomer, [customer], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http//flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
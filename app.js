var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 7999;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));              // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// app.js

/*
    ROUTES
*/

// INDEX
app.get('/index', function(req, res)
    {    // Execute the query
            res.render('index');                  // Render the index.hbs file, and also send the renderer                                                // an object where 'data' is equal to the 'rows' we
    });

//CUSTOMERS
app.get('/customers', function(req, res)
    {
        let query1               // Define our query

        if (req.query.lname === undefined)
        {
            query1 = "SELECT * FROM Customers;";
        }
        else
            {
                query1 = `SELECT * FROM Customers WHERE cust_last_name LIKE "${req.query.lname}%"`
            }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                        // received back from the query

app.post('/addCustomer-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values
        let cust_email = data.cust_email;
        if (!cust_email)
        {
            cust_email = 'NULL'
        }


        // Create the query and run it on the database
        query1 = `INSERT INTO Customers (cust_first_name, cust_last_name, cust_email) VALUES ('${data.cust_first_name}', '${data.cust_last_name}', '${data.cust_email}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Customer
                query2 = `SELECT * FROM Customers;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/deleteCustomer-AJAX/', function(req,res,next){
        let data = req.body;
        let cust_ID = parseInt(data.cust_ID);
        let deleteCustomer= `DELETE FROM Customers WHERE cust_ID = ?`
        // Run the query
        db.pool.query(deleteCustomer, [cust_ID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
            })
});

app.put('/putCustomer-AJAX/', function(req,res,next){
    let data = req.body;

    let customerID = (data.cust_ID);
    let fname = (data.cust_first_name);
    let lname = (data.cust_last_name);
    let email = (data.cust_email);

    let queryUpdateCustomer = `UPDATE Customers SET cust_first_name = ?, cust_last_name  = ?, cust_email = ? WHERE Customers.cust_ID = ?`;
    let queryShowCustomer = `SELECT * FROM Customers WHERE cust_ID = ?;`
    // Run the 1st query
        db.pool.query(queryUpdateCustomer, [fname, lname, email, customerID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
            else
            {
                db.pool.query(queryShowCustomer, [customerID], function(error, rows, fields){
                    if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
                    else
                    {
                        res.send(rows);
                    }
            })
        }
    })});

//DEVELOPERS
app.get('/developers', function(req, res)
    {
        let query1               // Define our query

        if (req.query.devname === undefined)
        {
            query1 = "SELECT * FROM Developers;";
        }
        else
            {
                query1 = `SELECT * FROM Developers WHERE dev_name LIKE "${req.query.devname}%"`
            }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            res.render('developers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

app.post('/addDeveloper-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Developers (dev_name, dev_location) VALUES ('${data.dev_name}', '${data.dev_location}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Developer
                query2 = `SELECT * FROM Developers;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/deleteDeveloper-AJAX/', function(req,res,next){
        let data = req.body;
        let dev_ID = parseInt(data.dev_ID);
        let deleteDeveloper= `DELETE FROM Developers WHERE dev_ID = ?`
        // Run the query
        db.pool.query(deleteDeveloper, [dev_ID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
            })
});

app.put('/putDeveloper-AJAX/', function(req,res,next){
    let data = req.body;

    let devID = (data.dev_ID);
    let name = (data.dev_name);
    let location = (data.dev_location);

    let queryUpdateDeveloper = `UPDATE Developers SET dev_name = ?, dev_location  = ? WHERE Developers.dev_ID = ?`;
    let queryShowDeveloper = `SELECT * FROM Developers WHERE dev_ID = ?;`
    // Run the 1st query
        db.pool.query(queryUpdateDeveloper, [name, location, devID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
            else
            {
                db.pool.query(queryShowDeveloper, [devID], function(error, rows, fields){
                    if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
                    else
                    {
                        res.send(rows);
                    }
            })
        }
    })});



//GENRES
    app.get('/genres', function(req, res)
    {
        let query1               // Define our query

        if (req.query.title === undefined)
        {
            query1 = "SELECT * FROM Genres;";
        }
        else
            {
                query1 = `SELECT * FROM Genres WHERE genre_title LIKE "${req.query.title}%"`
            }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            res.render('genres', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

app.post('/addGenre-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Genres (genre_title) VALUES ('${data.genre_title}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Genre
                query2 = `SELECT * FROM Genres;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/deleteGenre-AJAX/', function(req,res,next){
        let data = req.body;
        let genre_ID = parseInt(data.genre_ID);
        let deleteGenre= `DELETE FROM Genres WHERE genre_ID = ?`
        // Run the query
        db.pool.query(deleteGenre, [genre_ID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
            })
});

app.put('/putGenre-AJAX/', function(req,res,next){
    let data = req.body;

    let genreID = (data.genre_ID);
    let title = (data.genre_title);

    let queryUpdateGenre = `UPDATE Genres SET genre_title = ? WHERE Genres.genre_ID = ?`;
    let queryShowGenre = `SELECT * FROM Genres WHERE genre_ID = ?;`
    // Run the 1st query
        db.pool.query(queryUpdateGenre, [title, genreID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
            else
            {
                db.pool.query(queryShowGenre, [genreID], function(error, rows, fields){
                    if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
                    else
                    {
                        res.send(rows);
                    }
            })
        }
    })});


//GAMES
app.get('/games', function(req, res)
{
    let queryGames

    if (req.query.title === undefined)
    {
        queryGames  = "SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID ";
    }
    else
        {
            queryGames  = `SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID WHERE game_title LIKE "${req.query.title}%"`
        }

    db.pool.query(queryGames, function(error, rows, fields){
        res.render('games', {data: rows});                 // Render the index.hbs file, and also send the renderer
    })

});


app.delete('/deleteGame-AJAX/', function(req,res,next){
    let data = req.body;
    let game_ID = parseInt(data.game_ID);
    let deleteGame= `DELETE FROM Games WHERE game_ID = ?`
    // Run the query
    db.pool.query(deleteGame, [game_ID], function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
        })
});



// PURCHASES
app.get('/purchases', function(req, res)
{
    let query1        // Define our query

    if (req.query.title === undefined)
    {
        query1  = "SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ";
    }
    else
        {
            query1  = `SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_last_name LIKE "${req.query.lname}%"`
        }

    db.pool.query(query1, function(error, rows, fields){
        res.render('purchases', {data: rows});                 // Render the index.hbs file, and also send the renderer
    })      // an object where 'data' is equal to the 'rows' we

});

app.delete('/deletePurchase-AJAX/', function(req,res,next){
    let data = req.body;
    let purch_ID = parseInt(data.purch_ID);
    let deletePurchase= `DELETE FROM Purchases WHERE purch_ID = ?`
    // Run the query
    db.pool.query(deletePurchase, [purch_ID], function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
        })
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http//flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
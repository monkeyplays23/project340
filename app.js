var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 5579;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { NULL } = require('mysql/lib/protocol/constants/types');
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
    let queryGamesGenres

    if (req.query.title === undefined & req.query.ggtitle === undefined)
    {

        queryGames  = "SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID ";
        queryGamesGenres = "SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID ORDER BY Games_Genres_Details.game_genre_details_ID";
    }
    else if (req.query.title !== undefined)
        {
            queryGames  = `SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID WHERE game_title LIKE "${req.query.title}%"`
            queryGamesGenres = "SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID ORDER BY Games_Genres_Details.game_genre_details_ID";
        }
    else if (req.query.ggtitle !== undefined)
        {
            queryGames  = "SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID ";
            queryGamesGenres = `SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID WHERE game_title LIKE "${req.query.ggtitle}%"`;
        }
    else
        {
            queryGames  = `SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID WHERE game_title LIKE "${req.query.title}%"`
            queryGamesGenres = `SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID WHERE game_title LIKE "${req.query.ggtitle}%"`;
        }
    let queryDevelopers = 'SELECT * FROM Developers'
    let queryGamesAll = 'SELECT * FROM Games'
    let queryGenres = 'SELECT * FROM Genres '
    db.pool.query(queryGames, function(error, rows, fields)
    {
        db.pool.query(queryDevelopers, function(error, devs, fields)
        {
            db.pool.query(queryGamesGenres, function(error, info, fields)
            {
                db.pool.query(queryGamesAll, function(error, allgame, fields)
                {
                    db.pool.query(queryGenres, function(error, types, fields)
                    {
                        res.render('games', {data: rows, developer: devs, gamesgenres: info, allgames: allgame, generes: types});                 // Render the index.hbs file, and also send the renderer
                    })
                })
            })
        })
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
    let query1    // Define our query
    let queryDetails
    if (req.query.lname === undefined & req.query.pID === undefined)
    {
        query1  = "SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ORDER BY Purchases.purch_ID";
        queryDetails = "SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID";
    }
    else if (req.query.lname !== undefined)
        {
            query1  = `SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE Customers.cust_last_name LIKE "${req.query.lname}%"`;
            queryDetails = "SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID";
        }
    else if (req.query.pID !== undefined)
        {
            query1  = "SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ORDER BY Purchases.purch_ID";
            queryDetails = `SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID WHERE Games_Purchases_Details.purch_ID LIKE "%${req.query.pID}%" ORDER BY Games_Purchases_Details.game_purch_details_ID `;
        }
    else
        {
            query1  = `SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE Customers.cust_last_name LIKE "${req.query.lname}%"`;
            queryDetails = `SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID WHERE Games_Purchases_Details.purch_ID LIKE "%${req.query.pID}%" ORDER BY Games_Purchases_Details.game_purch_details_ID `;
        }
    let queryCustomers = 'SELECT * FROM Customers'
    let queryGames = 'SELECT * FROM Games'
    let queryPurchases = 'SELECT * FROM Purchases'
    db.pool.query(query1, function(error, rows, fields)
    {
        db.pool.query(queryCustomers, function(error, cust, fields)
        {
            db.pool.query(queryDetails, function(error, info, fields)
            {
                db.pool.query(queryGames, function(error, title, fields)
                {
                    db.pool.query(queryPurchases, function(error, purch, fields)
                    {
                        res.render('purchases', {data: rows, customers: cust, details: info, games: title, purchases: purch});                 // Render the index.hbs file, and also send the renderer
                    })
                })
            })
        })
    })
});

app.post('/addPurchase-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Purchases (purch_date, cust_ID) VALUES ('${data.purch_date}', '${data.cust_ID}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT on Purchases
                query2 = "SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ORDER BY Purchases.purch_ID";
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

app.post('/addPurchaseDetails-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Games_Purchases_Details (purch_ID, game_ID, game_price) VALUES ((SELECT MAX(Purchases.purch_ID) FROM Purchases),'${data.game_ID}', (SELECT Games.game_price FROM Games WHERE Games.game_ID = '${data.game_ID}'))`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT on Purchases
                query2 = "SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID INNER JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID";
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

app.post('/addPurchaseDetailsMany-AJAX/', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Create the query and run it on the database
        query1 = `INSERT INTO Games_Purchases_Details (purch_ID, game_ID, game_price) VALUES ((SELECT MAX(Purchases.purch_ID) FROM Purchases),'${data.game_ID}', (SELECT Games.game_price FROM Games WHERE Games.game_ID = '${data.game_ID}'))`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT on Purchases
                query2 = "SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID INNER JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID";
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

app.delete('/deletePurchaseDetails-AJAX/', function(req,res,next){
    let data = req.body;
    let game_purch_details_ID = parseInt(data.game_purch_details_ID);
    let deletePurchaseDetails = `DELETE FROM Games_Purchases_Details WHERE game_purch_details_ID = ?`
    // Run the query
    db.pool.query(deletePurchaseDetails, [game_purch_details_ID], function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
        })
});


app.put('/putPurchase-AJAX/', function(req,res,next){
    let data = req.body;

    let purchID = (data.purch_ID);
    let date = (data.purch_date);
    let custID = (data.cust_ID);

    let queryUpdatePurchase = `UPDATE Purchases SET purch_date = ?, cust_ID = ? WHERE Purchases.purch_ID = ?`;
    let queryShowPurchase = "SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ORDER BY Purchases.purch_ID";
    // Run the 1st query
        db.pool.query(queryUpdatePurchase, [date, custID, purchID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
            else
            {
                db.pool.query(queryShowPurchase, [purchID], function(error, rows, fields){
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

app.put('/putPurchaseDetails-AJAX/', function(req,res,next){
    let data = req.body;

    let purchdetailID = (data.game_purch_details_ID);
    let purchID = (data.purch_ID);
    let gamecustID = (data.game_ID);

    let queryUpdatePurchaseDetails = `UPDATE Games_Purchases_Details SET Games_Purchases_Details.purch_ID = CASE WHEN ? = '' THEN NULL ELSE ? END, Games_Purchases_Details.game_ID = ?, Games_Purchases_Details.game_price = (SELECT Games.game_price FROM Games WHERE Games.game_ID = ?) WHERE Games_Purchases_Details.game_purch_details_ID = ?;`;
    let queryShowPurchaseDetails = "SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID";
    // Run the 1st query
        db.pool.query(queryUpdatePurchaseDetails, [purchID, purchID, gamecustID, gamecustID, purchdetailID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
            else
            {
                db.pool.query(queryShowPurchaseDetails, [purchdetailID], function(error, rows, fields){
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




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http//flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
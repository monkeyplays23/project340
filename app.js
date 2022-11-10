
// Express
var express = require('express');
var app = express();
PORT = 7680;


// Database
var db = require('./database/db-connector');


// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');   


// query
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


// POST ROUTES
app.post('/add-person-ajax', function(req, res) 
{
    let data = req.body;

    let cemail = parseInt(data.email);
    if (isNaN(cemail))
    {
        cemail = 'NULL'
    }


    query1 = `INSERT INTO Customers (cust_first_name, cust_last_name, cust_email ) VALUES ('${data.fname}', '${data.lname}', ${email})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }

                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-person-form', function(req, res){
    let data = req.body;

    let cemail = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }


    query1 = `INSERT INTO Customers (cust_first_name, cust_last_name, cust_email) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${email})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/');
        }
    })
})


// listener 

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
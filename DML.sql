--CUSTOMERS--
--show all customer info in unformatted fashion--
SELECT * FROM Customers;

<<<<<<< HEAD
--dynamic SELECT from Games query
SELECT * FROM Games 
WHERE something_ID = :something_input AND someother_ID = :someother_id;  -- and so on if needed.  --todo

=======
>>>>>>> main
-- add a new customer via html form --
INSERT INTO Customers (cust_first_name, cust_last_name, cust_email)
VALUES (:first_name_input,:last_name_input, :email_input);

-- update a customer via html --
UPDATE Customers
SET first_name = :first_name_input, last_name = :last_name_input, email = :email_input
WHERE cust_ID = :cust_ID_input;

-- delete a customer via html --
DELETE FROM Customers WHERE cust_ID = :cust_ID_input;


--GAMES / GAME-GENRE DETAILS--
--show all game info in unformatted fashion--
SELECT * FROM Games;

-- add a new game via html form --
INSERT INTO Games (game_title, game_price, dev_ID)
VALUES (:game_title_input, :game_price_input, :dev_ID_selected_from_dropdown); 
/*In the html this is a dropdown menu of the developers names, not their IDs to be user friendly*/

-- update a game via html --
UPDATE Games
SET game_title = :game_title_input, game_price = :game_price_input, dev_ID = (SELECT dev_ID FROM DEVELOPERS WHERE dev_name = :dev_name_selected_from_dropdown) 
WHERE game_ID = :game_ID_input;

-- delete a game via html --
DELETE FROM Games WHERE game_ID = :game_ID_input;

--show all game-genre info in unformatted fashion--
SELECT * FROM Games_Genres_Details;

--update game-genre details--
UPDATE Games_Genres_Details
SET game_ID = game_ID_input, genre_ID = (SELECT genre_ID FROM GENRES WHERE genre_title = :genre_title_input_from_checkbox)
                                        /*Might include game_title = :game_title_input as a secondary method to alter the relationship, 
                                        also not entirely sure how checkbox will interact with sql. I imagine it is something like it will 
                                        look for all checked boxes and run the sql query multiple times. If we can't figure it out we'll 
                                        change to another method of input*/
WHERE game_genre_details_ID = :game_genre_details_ID_input;


--DEVELOPERS--
--show all developer info in unformatted fashion--
SELECT * FROM Developers;

-- add a new developer via html form
INSERT INTO Developers (dev_name, dev_location)
VALUES (:dev_name_input,:dev_location_input);

-- update a developer via html
UPDATE Developers
SET dev_name = :dev_name_input, dev_location = :dev_location_input
WHERE dev_ID = :dev_ID_input;

-- delete a developer via html
DELETE FROM Developers WHERE dev_ID = :dev_ID_input;


--PURCHASES / PURCHASE DETAILS--
--show all Purchase info in unformatted fashion--
SELECT * FROM Purchases;

-- add a new Purchase via html form
INSERT INTO Purchases (purch_date, cust_ID)
VALUES (:purch_date_input, :cust_ID_input);

-- update a Purchase via html
UPDATE Purchases
SET purch_date = :purch_date_input, cust_ID = :cust_ID_input
WHERE purch_ID = :purch_ID_input;

-- delete a Purchase via html
DELETE FROM Purchases WHERE purch_ID = :purch_ID_input;

--show all games-purchases details in unformatted fashion--
SELECT * FROM Games_Purchases_Details;

-- add a new game-Purchase detail via html form
INSERT INTO Games_Purchases_Details(purch_ID, game_title, game_price)
VALUES (:purch_ID_input, :game_title_input, :game_price_input);

-- update a game-Purchase detail via html
UPDATE Games_Purchases_Details
SET purch_ID= :purch_ID_input, game_title= :game_title_input, game_price = :game_price_input
WHERE game_purch_details_ID = :game_purch_details_ID_input;

-- delete a game-Purchase detail via html
DELETE FROM Games_Purchases_Details WHERE game_purch_details_ID = :game_purch__detailsID_input;

<<<<<<< HEAD
=======


>>>>>>> main
--Etcetera Queries--
/*Not sure how many of these will actually be implemented*/

-- find all games from a certain developer
SELECT * FROM Games WHERE  dev_ID= (SELECT dev_ID FROM Developers WHERE dev_name = :dev_name_input);

--sort developers by name ascending/descending--
SELECT * FROM Developers ORDER BY dev_name ASC;
SELECT * FROM Developers ORDER BY dev_name DESC;

--find developers by location input --
SELECT * FROM Developers WHERE dev_location = :dev_location_input

-- find all games with a certian genre --
SELECT * FROM Games_Genres_Details WHERE genre_ID= (SELECT genre_ID FROM Genres WHERE genre_title = :genre_title_input);

--sort games by price ascending/descending--
SELECT * FROM Games ORDER BY game_price ASC;
SELECT * FROM Games ORDER BY game_price DESC;

--sort games by title ascending/descending --
SELECT * FROM Games ORDER BY game_title ASC;
SELECT * FROM Games ORDER BY game_title DESC;

-- search all the games-purchase details by their purchase ID --
SELECT * FROM Games_Purchases_Details
INNER JOIN Purchases ON Games_Purchases_Details.purch_ID =  Purchases.purch_ID 
WHERE Purchases.purch_ID = :purch_ID_input;

--sort customers by last name ascending/descending --
SELECT * FROM Customers ORDER BY cust_last_name ASC;
SELECT * FROM Customers ORDER BY cust_last_name DESC;

-- all purchases by date ascending/descending --
SELECT * FROM Purchases ORDER BY purch_date ASC;
SELECT * FROM Purchases ORDER BY purch_date DESC;

-- Grand Finale: all purchases by name of customer date, title and price at time of purchase, ordered by date
SELECT 
    cust_first_name                     AS 'First Name', 
    cust_last_name                      AS 'Last Name',
    purch_date                          AS 'Purchase Date',
    game_title                          AS 'Title',
    Games_Purchases_Details.game_price  AS 'Price'
FROM Customers 
INNER JOIN Purchases               ON Customers.cust_ID  = Purchases.cust_ID 
INNER JOIN Games_Purchases_Details ON Purchases.purch_ID = Games_Purchases_Details.purch_ID
INNER JOIN Games                   ON Games.game_ID      = Games_Purchases_Details.game_ID
ORDER BY purch_date ASC;

-- Same as above but descending date
SELECT
    cust_first_name                     AS 'First Name', 
    cust_last_name                      AS 'Last Name',
    purch_date                          AS 'Purchase Date',
    game_title                          AS 'Title',
    Games_Purchases_Details.game_price  AS 'Price'
FROM Customers 
JOIN Purchases               ON Customers.cust_ID  = Purchases.cust_ID 
JOIN Games_Purchases_Details ON Purchases.purch_ID = Games_Purchases_Details.purch_ID
JOIN Games                   ON Games.game_ID      = Games_Purchases_Details.game_ID
WHERE Games_Purchases_Details.game_price > 30;


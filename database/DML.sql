--CUSTOMERS--
--show all customer info in unformatted fashion--
SELECT * FROM Customers;

--dynamic SELECT from any for searches for customers by last name
SELECT * FROM Customers WHERE cust_last_name LIKE "${req.query.lname}%"

--add new customer via AJAX
INSERT INTO Customers (cust_first_name, cust_last_name, cust_email) VALUES ('${data.cust_first_name}', '${data.cust_last_name}', '${data.cust_email}');


-- update a customer via AJAX --
UPDATE Customers SET cust_first_name = ?, cust_last_name  = ?, cust_email = ? WHERE Customers.cust_ID = ?;


-- delete a customer via AJAX --
DELETE FROM Customers WHERE cust_ID = ?



--DEVELOPERS--
--show all developer info in unformatted fashion--
SELECT * FROM Developers;

--serach for developer --
SELECT * FROM Developers WHERE dev_name LIKE "${req.query.devname}%"

-- add a new developer via AJAX form
INSERT INTO Developers (dev_name, dev_location) VALUES ('${data.dev_name}', '${data.dev_location}');


-- update a developer via AJAX
UPDATE Developers SET dev_name = ?, dev_location  = ? WHERE Developers.dev_ID = ?;


-- delete a developer via AJAX
DELETE FROM Developers WHERE dev_ID = ?

--GENRES--
--show all genres info in unformatted fashion--
SELECT * FROM Genres;


--serach for genres --
SELECT * FROM Genres WHERE genre_title LIKE "${req.query.title}%"


-- add a new genres via AJAX form
INSERT INTO Genres (genre_title) VALUES ('${data.genre_title}');



-- update a genres via AJAX
UPDATE Genres SET genre_title = ? WHERE Genres.genre_ID = ?;


-- delete a genres via AJAX
DELETE FROM Genres WHERE genre_ID = ?




--GAMES / GAME-GENRE DETAILS--
--show all game info in formatted fashion--
SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID ;

--show all game-genre-details info in formatted fashion--
SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID ORDER BY Games_Genres_Details.game_genre_details_ID;

--search for game based on game title --
SELECT Games.game_ID, Games.game_title, Games.game_price, Developers.dev_name FROM Games INNER JOIN Developers ON Games.dev_ID = Developers.dev_ID WHERE game_title LIKE "${req.query.title}%"

--search for game-genre details based on game title --
SELECT Games_Genres_Details.game_genre_details_ID, Genres.genre_title, Games.game_title FROM Games_Genres_Details INNER JOIN Games ON Games_Genres_Details.game_ID = Games.game_ID INNER JOIN Genres ON Games_Genres_Details.genre_ID = Genres.genre_ID WHERE game_title LIKE "${req.query.ggtitle}%";

-- add a new game via AJAX form --
INSERT INTO Games (game_title, game_price, dev_ID) VALUES ('${data.game_title}', '${data.game_price}', '${data.dev_ID}');

--add new game-genre-details --
INSERT INTO Games_Genres_Details (genre_ID, game_ID) VALUES ('${data.genre_ID}', '${data.game_ID}');


-- update a game via AJAX --
N/A

--update game-genre details--
N/A

-- delete a game via AJAX --
DELETE FROM Games WHERE game_ID = ?


-- delete a game genre details via AJAX --
DELETE FROM Games_Genres_Details WHERE game_genre_details_ID = ?




--PURCHASES / PURCHASE DETAILS--
--show all Purchase info in formatted fashion--
SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID ORDER BY Purchases.purch_ID;

--show all Games Purchase Details in formatted fashion --
SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID ORDER BY Games_Purchases_Details.game_purch_details_ID;

--search for purchase by customer last name --
SELECT Purchases.purch_ID, DATE_FORMAT(Purchases.purch_date,'%d-%m-%Y') AS purch_date, CONCAT(Customers.cust_first_name, ' ', Customers.cust_last_name) AS Customer, Purchases.cust_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE Customers.cust_last_name LIKE "${req.query.lname}%";

--search for game-purch-details by purch id --
SELECT Games_Purchases_Details.game_purch_details_ID, Games_Purchases_Details.purch_ID, Games.game_title, Games_Purchases_Details.game_price, Games_Purchases_Details.game_ID FROM Games_Purchases_Details INNER JOIN Games ON Games_Purchases_Details.game_ID = Games.game_ID LEFT JOIN Purchases ON Games_Purchases_Details.purch_ID = Purchases.purch_ID WHERE Games_Purchases_Details.purch_ID LIKE "%${req.query.pID}%" ORDER BY Games_Purchases_Details.game_purch_details_ID ;

-- add a new Purchase via AJAX form --
INSERT INTO Purchases (purch_date, cust_ID) VALUES ('${data.purch_date}', '${data.cust_ID}');

-- add first games-purchase-detail, tied to add purchase form --
INSERT INTO Games_Purchases_Details (purch_ID, game_ID, game_price) VALUES ((SELECT MAX(Purchases.purch_ID) FROM Purchases),'${data.game_ID}', (SELECT Games.game_price FROM Games WHERE Games.game_ID = '${data.game_ID}'));

-- add a new Games Purchase Details via AJAX form (rest of them)--
INSERT INTO Games_Purchases_Details (purch_ID, game_ID, game_price) VALUES (CASE WHEN '${data.purch_ID}' = '' THEN NULL ELSE '${data.purch_ID}' END,'${data.game_ID}', (SELECT Games.game_price FROM Games WHERE Games.game_ID = '${data.game_ID}'));

-- update a Purchase via AJAX --
UPDATE Purchases SET purch_date = ?, cust_ID = ? WHERE Purchases.purch_ID = ?;

-- update a Game Purchase Details via AJAX --
UPDATE Games_Purchases_Details SET Games_Purchases_Details.purch_ID = CASE WHEN ? = '' THEN NULL ELSE ? END, Games_Purchases_Details.game_ID = ?, Games_Purchases_Details.game_price = (SELECT Games.game_price FROM Games WHERE Games.game_ID = ?) WHERE Games_Purchases_Details.game_purch_details_ID = ?;;

-- delete a Purchase via AJAX --
DELETE FROM Purchases WHERE purch_ID = ?

-- delete Game Purchase Details --
DELETE FROM Games_Purchases_Details WHERE game_purch_details_ID = ?


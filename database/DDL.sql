-- By: Samuel Murrah and Cadence Jenkins --

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Purchases;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Developers;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Games_Genres_Details;
DROP TABLE IF EXISTS Games_Purchases_Details;

--  customers table --
CREATE TABLE Customers (
    cust_ID                 INT NOT NULL AUTO_INCREMENT,
    cust_first_name         VARCHAR(50) NOT NULL,
    cust_last_name          VARCHAR(50) NOT NULL,
    cust_email              VARCHAR(255) NOT NULL,
    PRIMARY KEY (cust_ID)
);

--  purchases table --
CREATE TABLE Purchases (
    purch_ID                INT NOT NULL AUTO_INCREMENT,
    purch_date	            DATE NOT NULL,
    cust_ID                 INT NOT NULL, 
    PRIMARY KEY (purch_ID),
    FOREIGN KEY (cust_ID)   REFERENCES Customers(cust_ID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

--  genres table --
CREATE TABLE Genres (
    genre_ID                INT AUTO_INCREMENT NOT NULL,
    genre_title             VARCHAR(255),
    PRIMARY KEY (genre_ID)
);


--  developers table --
CREATE TABLE Developers (
    dev_ID                 INT AUTO_INCREMENT NOT NULL,
    dev_name               VARCHAR(255),
    dev_location           VARCHAR(255),
    PRIMARY KEY (dev_ID)
);

--  games table --
CREATE TABLE Games (
    game_ID                INT AUTO_INCREMENT NOT NULL,
    game_title             VARCHAR(255),
    game_price             DECIMAL(19, 2) NOT NULL,
    dev_ID                 INT,
    PRIMARY KEY (game_ID),
    FOREIGN KEY (dev_ID)   REFERENCES Developers (dev_ID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

--  game-genre inersection table --
CREATE TABLE Games_Genres_Details (
    game_genre_details_ID  INT AUTO_INCREMENT NOT NULL,
    genre_ID               INT NOT NULL,
    game_ID                INT NOT NULL,
    FOREIGN KEY (genre_ID) REFERENCES Genres(genre_ID)
    ON DELETE RESTRICT,
    FOREIGN KEY (game_ID)  REFERENCES Games(game_ID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    PRIMARY KEY (game_genre_details_ID)
);


--  game-purchases inersection table --
CREATE TABLE Games_Purchases_Details (
    game_purch_details_ID  INT AUTO_INCREMENT NOT NULL,
    purch_ID               INT NOT NULL,
    game_ID                INT NOT NULL,
    game_price             DECIMAL(19, 2) NOT NULL,
    FOREIGN KEY (purch_ID) REFERENCES Purchases(purch_ID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    FOREIGN KEY (game_ID)  REFERENCES Games(game_ID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    PRIMARY KEY (game_purch_details_ID)
);




--  sample data INSERT statements --

INSERT INTO Customers(
    cust_first_name,
    cust_last_name,
    cust_email
)
VALUES (
    'Amanda',
    'Black',
    'black.amanda@gmail.com'
),
(
    'Johnathan',
    'Lee',
    'johnlee@yahoo.com'
),
(
    'Amy',
    'Young',
    'amyy@me.com'
),
(
    'Wilbur',
    'Thorn',
    'thorn.will@outlook.com'
),
(
    'Charlotte',
    'Callaghan',
    'ccallaghan@icloud.com'
);

INSERT INTO Purchases (
    purch_date,
    cust_ID
)
VALUES (
    '2019-12-21',
    (SELECT cust_ID FROM Customers WHERE cust_first_name = 'Amanda' AND cust_last_name = 'Black')
),
(
    '2015-07-03',
    (SELECT cust_ID FROM Customers WHERE cust_first_name = 'Johnathan' AND cust_last_name = 'Lee')
),
(
    '2021-08-04',
    (SELECT cust_ID FROM Customers WHERE cust_first_name = 'Amy' AND cust_last_name = 'Young')
),
(
    '2022-01-09',
    (SELECT cust_ID FROM Customers WHERE cust_first_name = 'Wilbur' AND cust_last_name = 'Thorn')
),
(
    '2018-04-18',
    (SELECT cust_ID FROM Customers WHERE cust_first_name = 'Charlotte' AND cust_last_name = 'Callaghan ')
);

INSERT INTO Genres (
    genre_title
)
VALUES (
    'Sports'
),
(
    'Survival'
),
(
    'First Person Shooter'
),
(
    'Horror'
),
(
    'Story'
);

INSERT INTO Developers (
    dev_name,
    dev_location			  
)
VALUES (
    'Survivor Games',
    'Russia'
),
(
    'Sports n Stuff Creations',
    'United States of America'
),
(
    'Wargames Central',
    'Germany'
),
(
    'MovieBrand Games',
    'United States of America'
),
(
    'Spooks Unending',
    'Japan'
);

INSERT INTO Games (
    game_title,
    game_price,
    dev_ID
)
VALUES (
    'Man-Thing Heroes',
    49.99,
    (SELECT dev_ID FROM Developers WHERE dev_name = 'Sports n Stuff Creations')
),
(
    'Lost',
    29.99,
    (SELECT dev_ID FROM Developers WHERE dev_name = 'Survivor Games')
),
(
    'Zombies vs Cats',
    19.99,
    (SELECT dev_ID FROM Developers WHERE dev_name = 'Spooks Unending')
),
(
    'Cowboy Shoot''em',
    39.99,
    (SELECT dev_ID FROM Developers WHERE dev_name = 'Wargames Central')
),
(
    'Stranger Ranger',
    59.99,
    (SELECT dev_ID FROM Developers WHERE dev_name = 'MovieBrand Games')
);

INSERT INTO Games_Genres_Details (
    game_ID,
    genre_ID
)
VALUES(
    (SELECT game_ID FROM Games WHERE game_title = 'Man-Thing Heroes'),
    (SELECT genre_ID FROM Genres where genre_title = 'Sports')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Lost'),
    (SELECT genre_ID FROM Genres where genre_title = 'Survival')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Zombies vs Cats'),
    (SELECT genre_ID FROM Genres where genre_title = 'Horror')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Zombies vs Cats'),
    (SELECT genre_ID FROM Genres where genre_title = 'First Person Shooter')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Cowboy Shoot''em'),
    (SELECT genre_ID FROM Genres where genre_title = 'First Person Shooter')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Stranger Ranger'),
    (SELECT genre_ID FROM Genres where genre_title = 'Survival')
),
(
    (SELECT game_ID FROM Games WHERE game_title = 'Stranger Ranger'),
    (SELECT genre_ID FROM Genres where genre_title = 'Story')
);

INSERT INTO Games_Purchases_Details (
    purch_ID,
    game_ID,
    game_price
)
VALUES(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Amanda' AND cust_last_name = 'Black'),
    (SELECT game_ID FROM Games WHERE game_title = 'Man-Thing Heroes'),
    (SELECT game_price FROM Games WHERE game_title = 'Man-Thing Heroes')
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Johnathan' AND cust_last_name = 'Lee'),
    (SELECT game_ID FROM Games WHERE game_title = 'Man-Thing Heroes'),
    (SELECT game_price FROM Games WHERE game_title = 'Man-Thing Heroes')
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Johnathan' AND cust_last_name = 'Lee'),
    (SELECT game_ID FROM Games WHERE game_title = 'Lost'),
    (SELECT game_price FROM Games WHERE game_title = 'Lost')
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Amy' AND cust_last_name = 'Young'),
    (SELECT game_ID FROM Games WHERE game_title = 'Zombies vs Cats'),
    (SELECT game_price FROM Games WHERE game_title = 'Zombies vs Cats')
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Wilbur' AND cust_last_name = 'Thorn'),
    (SELECT game_ID FROM Games WHERE game_title = "Cowboy Shoot'em"),
    (SELECT game_price FROM Games WHERE game_title = "Cowboy Shoot'em")
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Charlotte' AND cust_last_name = 'Callaghan'),
    (SELECT game_ID FROM Games WHERE game_title = 'Man-Thing Heroes'),
    (SELECT game_price FROM Games WHERE game_title = 'Man-Thing Heroes')
),
(
    (SELECT purch_ID FROM Purchases INNER JOIN Customers ON Purchases.cust_ID = Customers.cust_ID WHERE cust_first_name = 'Charlotte' AND cust_last_name = 'Callaghan'),
    (SELECT game_ID FROM Games WHERE game_title = 'Stranger Ranger'),
    (SELECT game_price FROM Games WHERE game_title = 'Stranger Ranger')
);

--As of the moment only insert queries are implemented. No other kind of queries such as a total price calculation or how many times a game is ordered are included. --

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
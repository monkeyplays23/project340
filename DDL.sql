SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

--  customers table --
CREATE OR REPLACE TABLE Customers (
    cust_ID                     INT NOT NULL AUTO_INCREMENT,
    cust_first_name             VARCHAR(255) NOT NULL,
    cust_last_name              VARCHAR(255) NOT NULL,
    cust_email                  VARCHAR(255) NOT NULL,
    PRIMARY KEY (cust_ID)
);

-- purchases table --
CREATE OR REPLACE TABLE Purchases (
    purch_ID                    INT NOT NULL AUTO_INCREMENT,
    purch_date		            DATE NOT NULL,
    purch_games		            INT,
    purch_cust		            INT,
    purch_total		            DECIMAL(2) NOT NULL,
    PRIMARY KEY (purch_ID)
);


-- games table --
CREATE OR REPLACE TABLE Games (
    game_ID   				    INT AUTO_INCREMENT NOT NULL,
    game_title				    VARCHAR(255),
    game_price     		 	    DECIMAL(2) NOT NULL,
    game_genre				    INT,
    game_dev_ID				    INT,
    game_total_purchased	    INT,
    PRIMARY KEY (game_ID),
    FOREIGN KEY (game_dev_ID)   REFERENCES Developers(dev_ID)
);
-- intersection table here for  games to genres
CREATE OR REPLACE TABLE Games_genres (


    
)
-- Genres table --
CREATE OR REPLACE TABLE Genres (
    genre_ID                    INT AUTO_INCREMENT NOT NULL,
    genre_title                 VARCHAR(255),
    PRIMARY KEY (genre_ID)
);


-- devleopers table --
CREATE OR REPLACE TABLE Developers (
    dev_ID 			            INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    dev_name			        VARCHAR(255),
    dev_location			    VARCHAR(255)
);

DESCRIBE Customers;
DESCRIBE Developers;
DESCRIBE Games;
DESCRIBE Genres;
DESCRIBE Purchases;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;


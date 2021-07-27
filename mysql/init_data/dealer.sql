use carsgo;
DROP TABLE IF EXISTS dealer;
CREATE TABLE dealer(
    dealerID INT PRIMARY KEY,
    dealerName varchar(80),
    sellerRole varchar(80),
    dealerAddress varchar(800)
);         
LOAD DATA LOCAL INFILE  '/home/dealer.csv' INTO TABLE dealer                                                       
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


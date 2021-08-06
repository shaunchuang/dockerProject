SET GLOBAL local_infile = 'ON';
GRANT ALL PRIVILEGES ON *.* TO 'daniel'@'%' WITH GRANT OPTION;
use carsgo;
DROP TABLE IF EXISTS car_list;
CREATE TABLE car_list(
    carID INT PRIMARY KEY,
    carBrand VARCHAR(100),
    carModel VARCHAR(100),
    carYear INT,
    carPrice INT,
    carMileage INT,
    carAddress VARCHAR,
    carTitle VARCHAR,
    carPhoto VARCHAR,
    dealerAddress VARCHAR,
    source VARCHAR(80),
    segment INT
);


LOAD DATA LOCAL INFILE  '/home/carList_forWebsite.csv' INTO TABLE car_list
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
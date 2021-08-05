SET GLOBAL local_infile = 'ON';
GRANT ALL PRIVILEGES ON *.* TO 'daniel'@'%' WITH GRANT OPTION;
use carsgo;
DROP TABLE IF EXISTS car_list;
CREATE TABLE car_list(
    carID INT PRIMARY KEY,
    carBrand varchar(80),
    carModel varchar(80),
    carYear varchar(80),
    carPrice varchar(80),
    carMileage varchar(80),
    car
    carPhoto varchar(800)


LOAD DATA LOCAL INFILE  '/home/cardata.csv' INTO TABLE car
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
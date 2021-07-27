SET GLOBAL local_infile = 'ON';
GRANT ALL PRIVILEGES ON *.* TO 'daniel'@'%' WITH GRANT OPTION;
use carsgo;
DROP TABLE IF EXISTS car;
CREATE TABLE car(
    carID INT PRIMARY KEY,
    carBrand varchar(80),
    carModel varchar(80),
    carYear varchar(80),
    carPrice varchar(40),
    carMileage varchar(40),
    cylinderVolume varchar(40),
    carColor varchar(40),
    carDriveMode varchar(40),
    carFuel varchar(40),
    carDoor varchar(40),
    carSeat varchar(40),
    carGear varchar(40),
    carPhoto varchar(800)
);



LOAD DATA LOCAL INFILE  '/home/cardata.csv' INTO TABLE car
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


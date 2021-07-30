import math
import pickle
import gzip
import numpy as np
import pandas as pd
from sklearn import preprocessing
import re


with gzip.open('myapp/model/randomforestRegressor.pgz', 'r') as f:
    rf_r = pickle.load(f)


def predict(input):
    pred = rf_r.predict(input)[0]
    return pred


def myscale(mydata, dfmean, dfstd):
    return (mydata - dfmean)/dfstd


def data_Collect(form):

    yearMean = 2013.3474867194548
    yearStd = 0.7034532944922058

    mileageMean = 212973.67794677758
    mileageStd = 13297582.558099732

    cylinderVolumeMean = 2394.119487320838
    cylinderVolumeStd = 102726.24208818933

    driveModeMean = 2.264408138719054
    driveModeStd = 0.6774292311531582

    doorMean = 4.660957702716248
    doorStd = 0.7034532944922058

    seatMean = 5.014809060839932
    seatStd = 0.8135488623474101

    car_brand = form.car_brand.data
    car_model = form.car_model.data
    car_year = form.car_year.data
    car_mileage = form.car_mileage.data
    car_color = form.car_color.data
    car_cylinderVolume = form.car_cylinderVolume.data
    car_driveMode = form.car_driveMode.data
    car_gear = form.car_gear.data
    car_fuel = form.car_fuel.data
    car_door = form.car_door.data
    car_seat = form.car_seat.data


    if car_driveMode == '二輪驅動':
        car_driveMode = 2
    if car_driveMode == '四輪驅動':
        car_driveMode = 4
    
    car_year = myscale(int(car_year), yearMean, yearStd)
    car_mileage = myscale(int(car_mileage), mileageMean, mileageStd)
    car_cylinderVolume = myscale(int(car_cylinderVolume), cylinderVolumeMean, cylinderVolumeStd)
    car_driveMode = myscale(float(car_driveMode), driveModeMean, driveModeStd)
    car_door = myscale(float(car_door), doorMean, doorStd)
    car_seat = myscale(float(car_seat), seatMean, seatStd)

    car_door = np.array([car_door])
    car_seat = np.array([car_seat])

    car_color = re.sub(r'色$', '', car_color)

    df1 = pd.read_csv('/Users/shaunchuang/Desktop/testcolumn.csv',
                      encoding='utf8', index_col=0)
    df2 = pd.DataFrame(columns=df1.columns)
    array = np.array([1, 1, int(car_year), int(car_mileage), 1, int(
        car_cylinderVolume), car_driveMode, 1, 1, car_door, car_seat, 0])
    input = pd.DataFrame([array], columns=['car_brand_'+car_brand, 'car_model_'+car_model, 'car_year', 'car_mileage', 'car_color_' +
                         car_color, 'car_cylinderVolume', 'car_driveMode', 'car_gear_'+car_gear, 'car_fuel_'+car_fuel, 'car_door', 'car_seat', 'verified'])
    input = pd.concat([df2, input], join='outer', ignore_index=True)
    input = input.fillna(0)

    return input


def resultcompute(result):
    rmse = 0.001
    result1 = result - rmse
    result2 = result + rmse
    result1 = round(math.exp(result1),2)
    result2 = round(math.exp(result2),2)
    return {'set1': result1, 'set2': result2}

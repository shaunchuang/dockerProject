import pickle
import gzip
import numpy as np
import pandas as pd
from sklearn import preprocessing


with gzip.open('myapp/model/randomforestRegressor.pgz', 'r') as f:
    rf_r = pickle.load(f)



def predict(input):
    pred=rf_r.predict(input)[0]
    return pred

def data_Collect(form):
        
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
        car_door = np.array([car_door])
        car_seat = np.array([car_seat])
        car_door = preprocessing.scale(car_door)
        car_seat = preprocessing.scale(car_seat)
        
        array = np.array([1,1,int(car_year),int(car_mileage), 1, int(car_cylinderVolume), car_driveMode, 1, 1, car_door, car_seat])
        input = pd.DataFrame([array], columns=[car_brand, car_model, 'car_year', 'car_mileage',car_color,'car_cylinderVolume','car_driveMode', car_gear, car_fuel,'car_door','car_seat'])
        return input
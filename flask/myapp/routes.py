import numpy as np
from myapp import app
from myapp.forms import UseModelForm
from flask import render_template
from myapp.model import predict

#from myapp.initpysql import connection


# with connection.cursor() as cursor:
#    sqltest = 'SELECT carBrand from car where carBrand="BMW"'
#    cursor.execute(sqltest)
#    result = cursor.fetchone()
#    connection.close()



@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/usemodel', methods=['GET','POST'])
def usemodel():
    error_info = None
    form = UseModelForm()
    if form.validate_on_submit():
        (form)
        predmodel = form.model.data
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
        car_verified = form.car_verified.data

        input = np.array([])
        result = predict(input)
        return render_template('usemodel_result.html', result = 300000, form=form)
    
    error_info='輸入格式錯誤請重新輸入'
    return render_template('usemodel.html', form=form, error_info=error_info)

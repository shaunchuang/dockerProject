from myapp import app
from myapp.forms import UseModelForm
from flask import render_template
from myapp.model import predict, data_Collect, resultcompute
from myapp.init_conn import connection


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/usemodel', methods=['GET', 'POST'])
def usemodel():
    error_info = None
    form = UseModelForm()
    if form.validate_on_submit():
        input = data_Collect(form)
        result = predict(input)
        result = resultcompute(result)
        return render_template('usemodel_result.html', result=result, form=form)
    else:
        error_info = '輸入格式錯誤請重新輸入'
        return render_template('usemodel.html', form=form, error_info=error_info)


@app.route('/loan')
def loan():
    return render_template('loan.html')


@app.route('/model2result')
def model2result():
    with connection.cursor() as cursor:
        sqltest = 'SELECT carID,carBrand,carModel,carYear,carPrice,carMileage,carAddress,carTitle,carPhoto,dealerAddress,source from car_list where source="abc" limit 1'
        cursor.execute(sqltest)
        result = cursor.fetchone()
        if result['source'] == '8891':
            car_url = f"https://auto.8891.com.tw/usedauto-infos-{result['carID']}.html"
        if result['source'] == 'HOT':
            car_url = f"https://www.hotcar.com.tw/CWA/CWA060.html?TSEQNO={result['carID']}"
        if result['source'] == 'SUM':
            car_url = f"https://www.sum.com.tw/carinfo-{result['carID']}.php"
        if result['source'] == 'abc':
            car_url = f"https://www.abccar.com.tw/car/{result['carID']}?"
        if result['source'] == 'isave':
            car_url = f"https://www.isave.com.tw/car.aspx?cid={result['carID']}"
        if result['source'] == 'usedcar':
            car_url = f"https://used.carnews.com/UsedCar/Details/{result['carID']}"
        if result['source'] == 'ucar':
            car_url = f"https://usedcar.u-car.com.tw/objectdetail.aspx?usedcarid={result['carID']}"
        if result['source'] == 'yahoo':
            car_url = f"https://tw.usedcar.yahoo.com/item/detail/{result['carID']}"
    
    return render_template('model2_result.html', result=result, car_url=car_url)

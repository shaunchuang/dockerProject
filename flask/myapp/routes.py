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
        sqltest = 'SELECT * FROM car_list LIMIT 9'
        cursor.execute(sqltest)
        result = cursor.fetchall()
        car_url = None

    return render_template('model2_result.html', result=result, car_url=car_url)

from myapp import app
from myapp.forms import UseModelForm
from flask import render_template, request
from myapp.model import predict, data_Collect, resultcompute
from myapp.mysql_model import create_url
from myapp.init_conn import connection
import math


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

    cr = connection.cursor()
    sqlrows = 'SELECT COUNT(*) AS items FROM car_list where segment=1'
    cr.execute(sqlrows)
    rows = cr.fetchone()
    page = request.args.get('page', 1, type=int)
    items = rows['items']
    totalpages = math.ceil(items/9)
    limit = 9

    if page < totalpages:
        offset = page*limit - limit
    if page > totalpages:
        offset = totalpages*limit - limit

    cur = connection.cursor()
    sqltest = f'SELECT * FROM car_list where segment=1 LIMIT {limit} OFFSET {offset}'
    cur.execute(sqltest)
    result = cur.fetchall()

    for r in result:
        r['car_url'] = create_url(r)

    return render_template('model2_result.html', result=result, page=page, totalpages=totalpages)

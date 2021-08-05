from myapp import app
from myapp.forms import UseModelForm
from flask import render_template
from myapp.model import predict, data_Collect, resultcompute

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


@app.route('/usemodel', methods=['GET', 'POST'])
def usemodel():
    error_info = None
    form = UseModelForm()
    if form.validate_on_submit():
        input = data_Collect(form)
        result = predict(input)
        result = resultcompute(result)
        return render_template('usemodel_result.html', result=result, form=form)

    error_info = '輸入格式錯誤請重新輸入'
    return render_template('usemodel.html', form=form, error_info=error_info)

@app.route('/loan')
def loan():
    return render_template('loan.html')

@app.route('/model2result')
def model2result():
    return render_template('model2_result.html')

from myapp import app
from myapp.forms import UseModelForm
from flask import render_template
# import myapp.model
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
    form = UseModelForm()
    if form.validate_on_submit():
        predmodel = form.model.data
        car_brand = form.car_brand.data
        car_model = form.car_model.data
        car_year = form.car_year.data
        car_mileage = form.car_mileage.data
        # input = np.array()
        # result = model.predict(input)
        return render_template('usemodel_result.html', result = 300000, form=form)
    return render_template('usemodel.html', form=form)

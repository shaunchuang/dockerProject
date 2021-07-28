import pymysql
from myapp import app
from flask import render_template
#from myapp.initpysql import connection
from config import Config

#with connection.cursor() as cursor:
#    sqltest = 'SELECT carBrand from car where carBrand="BMW"'
#    cursor.execute(sqltest)
#    result = cursor.fetchone()
#    connection.close()
app.config.from_object(Config)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


from flask_wtf import FlaskForm
from wtforms import DecimalField, SelectField, StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired

class UseModelForm(FlaskForm):
    model_choices = [('Xgboost'), ('RandomForest')]

    model = SelectField('Select a model:', choices=model_choices, default='ADD')

    car_Brand = StringField('CarBrand:', validator=['DataRequired()'])

    car_model = StringField('CarModel:', validator=['DataRequired()'])

    car_year = DecimalField('CarYear:', validator=['DataRequired()'])

    car_mileage = DecimalField('CarMileage:', validator=['DataRequired()'])

    submit = SubmitField('Submit')



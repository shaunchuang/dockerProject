from flask_wtf import FlaskForm
from wtforms import DecimalField, SelectField, StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired


class UseModelForm(FlaskForm):
    model_choices = [('Xgboost'), ('RandomForest')]

    model = SelectField('Select a model:',
                        choices=model_choices, default='Xgboost')

    car_brand = StringField('廠牌： ', validators=[DataRequired()])

    car_model = StringField('車型： ', validators=[DataRequired()])

    car_year = DecimalField('年份： ', validators=[DataRequired()])

    car_mileage = DecimalField('里程： ', validators=[DataRequired()])

    submit = SubmitField('Submit')

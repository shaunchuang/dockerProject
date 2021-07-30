from flask_wtf import FlaskForm
from wtforms import DecimalField, SelectField, StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired


class UseModelForm(FlaskForm):
    model_choices = [('RandomForest'), ('Xgboost')]

    model = SelectField('Select a model:',
                        choices=model_choices, default='RandomForest')

    
    brandchoi = [('TOYOTA'),('BENZ'),('BMW'),('FORD'),('HONDA')]
    car_brand = SelectField('廠牌： ', choices=brandchoi, validators=[DataRequired()])
    
    modelchoi=[('ALTIS'),('FOCUS'),('CIVIC'),('CAMRY')]
    car_model = SelectField('車型： ', choices=modelchoi, validators=[DataRequired()])

    car_year = DecimalField('年份： ', max_digits = 4, validators=[DataRequired()])

    car_mileage = DecimalField('里程： ', validators=[DataRequired()])
    
    colorchoi = [('白色'),('黑色'),('紅色'),('藍色')]
    car_color = SelectField('顏色： ', choices=colorchoi, default='白色')
    
    car_cylinderVolume = DecimalField('排氣量： ', max_digits = 4, validators=[DataRequired()])
    
    driveModechoi = [('二輪驅動'),('四輪驅動')]
    car_driveMode = SelectField('驅動方式： ', choices=driveModechoi, default='二輪驅動')
    
    gearchoi = [('手自排'),('自手排'),('自排'),('手排')]
    car_gear = SelectField('變數系統： ', choices=gearchoi, default='手自排')

    fuelchoi = [('汽油'),('柴油'),('油電'),('純電')]
    car_fuel = SelectField('燃料： ', choices=fuelchoi, default='汽油')

    doorchoi = [(2),(4),(5)]
    car_door = SelectField('車門： ', choices=doorchoi, default=4)

    seatchoi = [(5),(7)]
    car_seat = SelectField('座位數： ', choices=seatchoi, default=5)

    verifiedchoi = [('有'),('無')]
    car_verified = SelectField('認證： ', choices=verifiedchoi, default='有')

    submit = SubmitField('Submit')

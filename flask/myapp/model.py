import pickle
import gzip



with gzip.open('./model/randomforestRegressor.pgz', 'r') as f:
    rf_r = pickle.load(f)

def predict(input):
    pred=rf_r.predict(input)[0]
    return pred
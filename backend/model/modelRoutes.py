from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf

model_bp = Blueprint('model_bp', __name__, template_folder='templates')

#import modelleri


@model_bp.route('/model', methods=["POST"])
def get_prediction():
    try:
        tweet = request.get_json()['tweet']
        # pipline
        # model
        # prediction
        # return prediction

        return {"prediction": "success"}, 200
    except Exception as e:
        return json.dumps({"error": str(e)})

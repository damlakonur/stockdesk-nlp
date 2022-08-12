from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf

model_bp = Blueprint('model_bp', __name__, template_folder='templates')

@stock_bp.route('/model', methods=["GET"])
def get_prediction():
    try:
        

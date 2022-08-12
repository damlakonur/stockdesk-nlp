from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf

stock_bp = Blueprint('stock_bp', __name__, template_folder='templates')

@stock_bp.route('/stock', methods=["GET"])
def get_stock():
    try:
        db = current_app.config["db_conn"]
        stock = db["stock"]
        cursor = list(stock.find({}))
        stocks = []

        # for stock in cursor:
        #     try:
        #         stock_data = yf.Ticker(stock["symbol"]+".IS")
        #         #stock_data = stock_data.history(period="1d", interval="1m")
        #         stock_data = stock_data.get_info()
        #         stocks.append(stock_data)
        #     except Exception as e:
        #         print(e)
        #         stock_data = {"date": "2020-01-01", "price": 0}
        #         stocks.append(stock_data)
        #         pass
        stock = cursor[0]
        try:
            stock_data = yf.Ticker(stock["symbol"]+".IS")
            #stock_data = stock_data.history(period="1d", interval="1m")
            stock_data = stock_data.get_info()
            stocks.append(stock_data)
        except Exception as e:
            print(e)
            stock_data = {"date": "2020-01-01", "price": 0}
            stocks.append(stock_data)
            pass

        return {"stocks": stocks}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500



@stock_bp.route('/stock/add', methods=["POST"])
def add_stock():
    try:
        print(request.json["symbol"])
        db = current_app.config["db_conn"]
        stock = db["stock"]
        stock.insert_one(request.json)

        return {"stock": 'SUCCESS'}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock/delete', methods=["POST"])
def delete_stock():
    try:
        print(request.json["symbol"])
        db = current_app.config["db_conn"]
        stock = db["stock"]
        stock.delete_one({"symbol": request.json["symbol"]})

        return {"stock": {stock["symbol"]: stock["symbol"]}}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500


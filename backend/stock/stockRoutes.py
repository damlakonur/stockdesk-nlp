from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf
from bson import json_util, ObjectId

stock_bp = Blueprint('stock_bp', __name__, template_folder='templates')

def getLastPrice(symbol):
    stock = yf.Ticker(symbol)
    #stock_data = stock.history(period="1d", interval="1m")
    stock_data = stock.history(period="1d")
    return stock_data

@stock_bp.route('/stock_info', methods=["GET"])
def get_stock():
    try:
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        cursor = list(stock.find({}))
        stocks = []
        for stock in cursor:
            try:
                last_price = getLastPrice(stock["symbol"])
                stock["close"] = str(round(last_price["Close"].values[0], 2))
                stock["open"] = str(round(last_price["Open"].values[0], 2))
                stock["high"] = str(round(last_price["High"].values[0],2))
                stock["low"] = str(round(last_price["Low"].values[0], 2))
                stocks.append(stock)
            except Exception as e:
                print(e)
                stock_data = {"date": "2020-01-01", "price": 0}
                stocks.append(stock_data)
                pass
        
        return json.dumps({"stocks": stocks})
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock_info/detail', methods=["POST"])
def get_stock_detail():
    try:
        symbol = request.json["symbol"]
        stock = yf.Ticker(symbol)
        #stock_data = stock.history(period="1d", interval="1m")
        stock_data = stock.history(period="1d")
        stock_data = stock_data.to_json(orient="records")
        return {"stock_data": stock_data}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock/add', methods=["POST"])
def add_stock():
    try:
        print(request.json)
        stock_name = request.json["symbol"]+".IS"

        db = current_app.config["db_conn"]
        stock = db["stock"]
        stock.insert_one(request.json)

        return {"stock": 'Success'}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock_info/add', methods=["POST"])
def add_stock_info():
    try:
        print(request.json)
        stock_name = request.json["symbol"]+".IS"
        stock_data = yf.Ticker(stock_name)
        stock_data = stock_data.get_info()
        stock_data["_id"] = stock_name
        stock_data = json.loads(dumps(stock_data))
        #print(stock_data)
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        #stock.drop()
        stock.insert_one(stock_data)

        return {"stock": 'Success'}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500



@stock_bp.route('/stock_info/delete', methods=["POST"])
def delete_stock():
    try:
        print(request.json["symbol"])
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        stock.delete_one({"symbol": request.json["symbol"]})

        return {"stock": {stock["symbol"]: stock["symbol"]}}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf
from bson import json_util, ObjectId

stock_bp = Blueprint('stock_bp', __name__, template_folder='templates')

def getLastPrice(symbol):
    stock = yf.Ticker(symbol)
    #stock_data = stock.history(period="1d", interval="1m")
    stock_data = stock.history(period="min")
    return stock_data

def get1monthPrice(symbol):
    stock = yf.Ticker(symbol)
    stock_data = stock.history(period="1d", interval="1m")
    return stock_data

@stock_bp.route('/stock_info', methods=["GET"])
def get_stock():
    try:
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        cursor = list(stock.find({}))
        stocks = []
        for stock in cursor:
            try:
                last_price = getLastPrice(stock["symbol"])
                stock["close"] = str(round(last_price["Close"].values[0], 2))
                stock["open"] = str(round(last_price["Open"].values[0], 2))
                stock["high"] = str(round(last_price["High"].values[0],2))
                stock["low"] = str(round(last_price["Low"].values[0], 2))
                stocks.append(stock)
            except Exception as e:
                print(e)
                stock_data = {"date": "2020-01-01", "price": 0}
                stocks.append(stock_data)
                pass
        
        return json.dumps({"stocks": stocks})
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock_info/detail', methods=["POST"])
def get_stock_detail():
    try:
        symbol = request.json["symbol"]
        stocks = []
        stock = yf.Ticker(symbol)
        ## FIXX
        stock_data = stock.history(start='2022-07-15', end='2022-08-17', interval='1d')
        for i in range(len(stock_data)):
            stock = {}
            stock['x'] = str(stock_data.iloc[i].name)
            stock['y'] = [round(stock_data["Open"].values[i], 2),round(stock_data["High"].values[i],2),round(stock_data["Low"].values[i], 2),round(stock_data["Close"].values[i], 2)]
            stocks.append(stock)
        return json.dumps({"stock_data": stocks})
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock/add', methods=["POST"])
def add_stock():
    try:
        print(request.json)
        stock_name = request.json["symbol"]+".IS"

        db = current_app.config["db_conn"]
        stock = db["stock"]
        stock.insert_one(request.json)

        return {"stock": 'Success'}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500

@stock_bp.route('/stock_info/add', methods=["POST"])
def add_stock_info():
    try:
        print(request.json)
        stock_name = request.json["symbol"]+".IS"
        stock_data = yf.Ticker(stock_name)
        stock_data = stock_data.get_info()
        stock_data["_id"] = stock_name
        stock_data = json.loads(dumps(stock_data))
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        stock.insert_one(stock_data)

        return {"stock": 'Success'}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500



@stock_bp.route('/stock_info/delete', methods=["POST"])
def delete_stock():
    try:
        print(request.json["symbol"])
        db = current_app.config["db_conn"]
        stock = db["stock_info"]
        stock.delete_one({"symbol": request.json["symbol"]})

        return {"stock": {stock["symbol"]: stock["symbol"]}}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500


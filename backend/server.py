import json
import sys
import os
from dotenv import load_dotenv
import pymongo
import redis
from celery import Celery
from flask import Flask
from flask_cors import CORS
import tweepy
import datetime
from tweepy import OAuthHandler
import sys
import pandas as pd

# Load environment variables from .env file
load_dotenv()

from influencer.routes import influencer_bp
from stock.stockRoutes import stock_bp
from model.modelRoutes import model_bp


def getAuth():
    try:
        auth = OAuthHandler(os.getenv("TWITTER_CONSUMER_KEY"),
                            os.getenv("TWITTER_CONSUMER_SECRET"))
        auth.set_access_token(os.getenv("TWITTER_ACCESS_TOKEN"), os.getenv(
            "TWITTER_ACCESS_TOKEN_SECRET"))
        api = tweepy.API(auth, wait_on_rate_limit=True)
        if api.verify_credentials():
            print("Twitter Authentication OK")
        else:
            print("Twitter Authentication Error")
            return None
    except tweepy.TweepyException as e:
        print("Twitter Authentication Error : " + str(e))
        return None
    return api


app = Flask(__name__)

# Configure CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


app.register_blueprint(influencer_bp)
app.register_blueprint(stock_bp)
app.register_blueprint(model_bp)


app.config["db_conn"] = pymongo.MongoClient(
    os.getenv("MONGO_HOST"),
    int(os.getenv("MONGO_PORT")),
    username=os.getenv("MONGO_USERNAME"),
    password=os.getenv("MONGO_PASSWORD"))[
    os.getenv("MONGO_DB")]

# Make Twitter API optional
try:
    app.config["api"] = getAuth()
except Exception as e:
    print(f"Warning: Twitter API not available: {str(e)}")
    app.config["api"] = None


if __name__ == '__main__':
    if os.getenv("ENVIRONMENT") == "DEV":
        app.run(host=os.getenv("SERVER_HOST"), port=int(
            os.getenv("SERVER_PORT")), debug=True)
    else:
        app.run(host="0.0.0.0", port=5000)

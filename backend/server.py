import json
import sys
import os
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


from influencer.routes import influencer_bp
from stock.stockRoutes import stock_bp


def getAuth():
    try:
        auth = OAuthHandler(os.getenv("TWITTER_CONSUMER_KEY"),
                            os.getenv("TWITTER_CONSUMER_SECRET"))
        auth.set_access_token(os.getenv("TWITTER_ACCESS_TOKEN"), os.getenv(
            "TWITTER_ACCESS_TOKEN_SECRET"))
        api = tweepy.API(auth, wait_on_rate_limit=True)
        if api.verify_credentials():
            print("Authentication OK")
        else:
            print("Error during authentication")
    except tweepy.TweepyException as e:
        print("Error : " + str(e))
        sys.exit()
    return api


app = Flask(__name__)
CORS(app)


app.register_blueprint(influencer_bp)
app.register_blueprint(stock_bp)


app.config["db_conn"] = pymongo.MongoClient(
    os.getenv("MONGO_HOST"),
    int(os.getenv("MONGO_PORT")),
    username=os.getenv("MONGO_USERNAME"),
    password=os.getenv("MONGO_PASSWORD"))[
    os.getenv("MONGO_DB")]

app.config["api"] = getAuth()


if __name__ == '__main__':
    if os.getenv("ENVIRONMENT") == "DEV":
        app.run(host=os.getenv("SERVER_HOST"), port=int(
            os.getenv("SERVER_PORT")), debug=True)
    else:
        app.run(host="0.0.0.0", port=5000)

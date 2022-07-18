import re
from statistics import mode
from traceback import print_tb
from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
from numpy import append
import tweepy

influencer_bp = Blueprint('ueba_bp', __name__, template_folder='templates')


def getTweetsFromUser(username):
    tweets = []
    # try:
    api = current_app.config["api"]
    tweets = api.user_timeline(
        screen_name=username, count=15, mode='extended')

    # except Exception as e:
    #     print(e)
    #     pass
    return tweets


@influencer_bp.route('/influencer', methods=["GET"])
def get_influencer():
    try:
        api = current_app.config["api"]

        influencer = current_app.config["db_conn"]["influencer"]
        cursor = list(influencer.find({}))

        for influencer in cursor:
            try:
                user = api.get_user(screen_name=influencer["username"])
                influencer["followers_count"] = user.followers_count
                influencer["profile_image_url"] = user.profile_image_url[:-
                                                                         10] + "400x400.jpg"

            except Exception as e:
                print(e)
                influencer["followers_count"] = 65
                influencer["profile_image_url"] = "https://pbs.twimg.com/profile_images/1505298408944377861/HERaUhWJ_400x400.jpg"
                pass

        json_data = json.loads(dumps(cursor))

        return {"influencers": json_data}
    except Exception as e:
        print(e)
        return {"status": "fail",
                "reason": str(e), }, 500


@influencer_bp.route('/influencer/add', methods=["POST"])
def add_influencer():
    try:
        print(request.json["username"])
        db = current_app.config["db_conn"]
        influencer = db["influencer"]
        influencer.insert_one(request.json)

        return {"influencer": "aslşdkaşsldka"}
    except Exception as e:
        return {"status": "fail",
                "reason": str(e), }, 500


@influencer_bp.route('/influencer/getdetail', methods=["POST"])
def get_influencer_detail():
    try:

        api = current_app.config["api"]
        username = request.json["username"]

        user = api.get_user(screen_name=username)
        tweets = getTweetsFromUser(username)
        print(tweets)

        tweets_list = []
        for tweet in tweets:

            tweets_list.append(tweet._json)

        return {"user": user._json, "tweets":  tweets_list}
    except Exception as e:
        return {"status": "fail",
                "reason": str(e), }, 500

import re
from statistics import mode
from traceback import print_tb
from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
from numpy import append
import tweepy
import snscrape.modules.twitter as twitter

influencer_bp = Blueprint('influencer_bp', __name__, template_folder='templates')


def getTweetsFromUser(username):
    tweets = []
    query = "from:"+username+ " -filter:links -filter:retweets -filter:replies"
    for i,tweet in enumerate(twitter.TwitterSearchScraper(query).get_items()):
        if i>15:
            break
        tweets.append(tweet)
    return tweets





@influencer_bp.route('/influencer', methods=["GET"])
def get_influencer():
    try:
        influencer = current_app.config["db_conn"]["influencer"]
        cursor = list(influencer.find({}))
        influencers = []

        for influencer in cursor:
            try:
                user1 = twitter.TwitterUserScraper(influencer["username"])._get_entity()
                user1.profileImageUrl = user1.profileImageUrl[:-10] + "400x400.jpg"
                influencers.append(user1)
                                                                        
            except Exception as e:
                print(e)

                pass


        return {"influencers": influencers}
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

        return {"status": "success"}
    except Exception as e:
        return {"status": "fail",
                "reason": str(e), }, 500
@influencer_bp.route('/influencer/delete', methods=["POST"])
def delete_influencer():
    try:
        print(request.json["username"])
        db = current_app.config["db_conn"]
        influencer = db["influencer"]
        influencer.delete_one(request.json)

        return {"status": "success"}
    except Exception as e:
        return {"status": "fail",
                "reason": str(e), }, 500


@influencer_bp.route('/influencer/getdetail', methods=["POST"])
def get_influencer_detail():
    try:
        username = request.json["username"]
        user = twitter.TwitterUserScraper(username)._get_entity()
        tweets = getTweetsFromUser(username)
        user.profileImageUrl = user.profileImageUrl[:-10] + "400x400.jpg"
        return {"user": user, "tweets":  tweets}
    except Exception as e:
        return {"status": "fail",
                "reason": str(e), }, 500

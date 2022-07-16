import re
from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps


influencer_bp = Blueprint('ueba_bp', __name__, template_folder='templates')


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
                influencer["profile_image_url"] = user.profile_image_url

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

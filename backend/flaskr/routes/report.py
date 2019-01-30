from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/report')
def report():
    db = flaskr.mongo.db
    session_id = request.args.get('sessionId')

    data = db.discussions.find_one({'sessionId': session_id})
    return dumps(data) if data else None

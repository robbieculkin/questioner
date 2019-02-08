from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/report')
def report():
    """GET route to get the report of a discussion session."""
    db = flaskr.mongo.db
    session_id = request.args.get('sessionId')

    data = db.discussions.find_one({'sessionId': session_id})
    return dumps(data) if data else dumps({})

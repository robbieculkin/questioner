from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/questions')
def questions():
    """GET route to receive the next question to ask the user."""
    db = flaskr.mongo.db
    QA = flaskr.QA

    session_id = request.args.get('sessionId')
    disc = db.discussions.find_one({'sessionId': session_id})
    data = {
        'question': QA.quote(disc)
    }
    return dumps(data)

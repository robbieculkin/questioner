from bson.json_util import dumps
from flask import request

import flaskr
import src.question_agent.agent as agent
from . import routes


@routes.route('/questions')
def questions():
    """GET route to receive the next question to ask the user."""
    db = flaskr.mongo.db
    session_id = request.args.get('sessionId')
    disc = db.discussions.find_one({'sessionId': session_id})
    data = {
        'question': agent.get_question(disc)
    }
    return dumps(data)

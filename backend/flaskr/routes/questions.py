from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/questions')
def questions():
    # db = flaskr.mongo.db
    session_id = request.args.get('sessionId')

    data = {
        'question': f'Hello, {session_id}.'
    }
    return dumps(data)

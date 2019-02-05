from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/response', methods=['POST'])
def response():
    """POST route to update discussion records."""
    db = flaskr.mongo.db
    data = request.json
    session_id = data['session']['sessionId']

    document = db.discussions.find_one({'sessionId': session_id})
    if document is None:
        db.discussions.insert_one(data['session'])
    else:
        db.discussions.update({
            'sessionId': session_id
        }, {
            '$push': {
                'discussion': {
                    '$each': data['session']['discussion']
                }
            }
        })

    return dumps(str(db.discussions.find_one({'sessionId': session_id})))

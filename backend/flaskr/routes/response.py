"""
Example mongodb record format:

{
    "session": {
        "sessionId": "16c209bc-42ca-4c22-9e80-172c1cf1cd51",
        "selectedPlay": "All's Well That Ends Well",
        "discussion": [
            {
                "msgId": "fc9e81ac-100b-45e2-aae0-393c65f500d8",
                "fromUser": false,
                "text": "How are you?"
            },
            {
                "msgId": "f7dc3f6e-263d-4c28-a7c2-d76c3b6baa5b",
                "fromUser": true,
                "text": "Hello, world!"
            },
            {
                "msgId": "c22b3534-4c62-4aac-837b-45b88807ad7e",
                "fromUser": true,
                "text": "I am doing well."
            },
            {
                "msgId": "d28acf0a-f3c1-4726-a83f-2dca88f96676",
                "fromUser": false,
                "text": "What is your favorite color?"
            },
            {
                "msgId": "aaf5202e-5755-4340-8125-653504b331f2",
                "fromUser": true,
                "text": "Red."
            }
        ]
    }
}
"""

from bson.json_util import dumps
from flask import request

import flaskr
from . import routes


@routes.route('/response', methods=['POST'])
def response():
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

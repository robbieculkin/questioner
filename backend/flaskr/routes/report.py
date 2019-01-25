import json

from flask import request

from . import routes


@routes.route('/report')
def report():
    data = {
        'id': 9,
        'history': [
            {
                'id': 0,
                'fromUser': False,
                'text': 'How are you?'
            },
            {
                'id': 1,
                'fromUser': True,
                'text': 'Hello, world!'
            },
            {
                'id': 1,
                'fromUser': True,
                'text': 'I am doing well.'
            },
            {
                'id': 1,
                'fromUser': False,
                'text': 'What is your favorite color?'
            },
            {
                'id': 1,
                'fromUser': True,
                'text': 'Red.'
            }
        ],
    }
    return json.dumps(data)

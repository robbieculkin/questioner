import json

from flask import request

from . import routes


@routes.route('/questions')
def questions():
    username = request.args.get('username')

    data = {
        'id': 9,
        'question': f'Hello, {username}'
    }
    return json.dumps(data)

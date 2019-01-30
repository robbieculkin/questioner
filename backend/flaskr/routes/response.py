import json

from flask import request

import flaskr
from . import routes


@routes.route('/response', methods=['POST'])
def response():
    data = request.json
    test_collection = flaskr.mongo.db.dev
    test_collection.insert_one({
        'message': data.get('message'),
        'author': data.get('author')
    })
    print(test_collection.find_one({'author': data.get('author')}))
    return json.dumps(str(test_collection.find_one({'author': data.get('author')})))

from flask import request

import flaskr
from . import routes


@routes.route('/use_template')
def use_template(template):
    db = flaskr.mongo.db
    data = request.json
    session_id = data['session']['sessionId']

    db.discussions.update({
        'sessionId': session_id
    }, {
        '$push': {
            'usedTemplates': {
                '$each': data['session']['usedTemplates'].append(template.name)
            }
        }
    })

import json

from flask import request

from . import routes


@routes.route('/response', methods=['POST'])
def response():
   pass

from flask import Blueprint

routes = Blueprint('routes', __name__)

from .questions import questions
from .report import report
from .response import response
from .template import use_template

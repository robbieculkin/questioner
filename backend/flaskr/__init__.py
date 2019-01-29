import os

from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

from .routes import routes


app = Flask(__name__)
CORS(app)
app.config.from_mapping(
    SECRET_KEY='dev',  # override for deployment to some random value
    MONGO_URI='mongodb://localhost:27017/test_collection'
)

mongo = PyMongo(app)
app.register_blueprint(routes, url_prefix='/api/v0/')

from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

from src.question_agent.agent import QuestionAgent
from .routes import routes


app = Flask(__name__)
CORS(app)  # cross-origin resource sharing
app.config.from_mapping(
    SECRET_KEY='dev',  # override for deployment to some random value
    MONGO_URI='mongodb://localhost:27017/dev_discussions',
)

mongo = PyMongo(app)  # Create MongoDB connection
print('MongoDB connected!')

QA = QuestionAgent()
print('Model ready!')

app.register_blueprint(routes, url_prefix='/api/v0/')  # register routes
print('App ready!')

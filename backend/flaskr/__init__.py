from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

from src.question_agent.agent import QuestionAgent, DBOW_MODEL
from .routes import routes


app = Flask(__name__)
CORS(app)  # cross-origin resource sharing
app.config.from_mapping(
    SECRET_KEY='dev',  # override for deployment to some random value
    MONGO_URI='mongodb://localhost:27017/dev_discussions',
)

mongo = PyMongo(app)  # Create MongoDB connection
print('Initialized MongoDB')

QA = QuestionAgent(DBOW_MODEL)
print('initialized!')

app.register_blueprint(routes, url_prefix='/api/v0/')  # register routes
print('Initialized Flask App!')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

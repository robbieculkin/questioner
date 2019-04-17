import re
import random
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity

DBOW_MODEL = 'backend/data/models/dbow/d2v_dbow'
DM_MODEL = 'backend/data/models/dm/d2v_dm'


def tokenize(sentence):
    return re.sub('[!@#$.?,;]', '', sentence).lower().split(' ')

def get_question(discussion):
    """Given a discussion, creates the next question to ask."""
    if discussion is None:
        return "Hello"
    return "Subsequent conversation"

class QuestionAgent:
    def __init__(self, model_path):
        print('Initializing QuestionAgent... ', end='')
        self.model = Doc2Vec.load(model_path)
        relevant = ['play', 'player', 'original', 'modern']
        self.translation = pd.read_csv('backend/data/translation.csv')[relevant].dropna()

        self.translation['modern_token'] = self.translation.modern.apply(tokenize)
        self.translation['modern_embed'] = self.translation.modern_token.apply(
            self.model.infer_vector)

        self.templates = pd.read_csv('backend/data/templates.csv')

    def quote(self, session_data):
        if session_data is None:
            return 'Hello user!'

        last_message = session_data['discussion'][-1]['text']

        user_embed = self.model.infer_vector(tokenize(last_message))
        similarity = cosine_similarity(
            np.array(self.translation.modern_embed.values.tolist()),
            user_embed.reshape(1, -1))

        return self.translation.iloc[np.argmax(similarity)]['original']

    def character_template(self, session_data):
        if session_data is None:
            return 'Hello user!'

        char_temps = self.templates[(self.templates['1'].isin(['Character', 'Major Character'])) &
                                    (self.templates['2'].isin(['Character', 'Major Character']))]

        template = char_temps.loc[random.choice(char_temps.index)]
        if template[1] == 'Major Character':
            template['Question'] = re.sub(r'\[1\]', 'Major', template['Question'])
        elif template[1] == 'Character':
            template['Question'] = re.sub(r'\[1\]', 'Character', template['Question'])

        template['Question'] = re.sub(r'\[2\]', 'Character', template['Question'])

        return template['Question']

import re
from functools import wraps

import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity

DBOW_MODEL = 'backend/data/models/dbow/d2v_dbow'
DM_MODEL = 'backend/data/models/dm/d2v_dm'

def check_none(msg=None):
    def check_none_decorator(func):
        @wraps(func)
        def function_wrapper(*args, **kwargs):
            for arg in args:
                if arg is None:
                    return msg
            return func(*args, **kwargs)
        return function_wrapper
    return check_none_decorator

def tokenize(sentence):
    return re.sub('[!@#$.?,;]', '', sentence).lower().split(' ')

@check_none('Hello')
def get_question(discussion):
    """Given a discussion, creates the next question to ask."""
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

    @check_none('Hello user!')
    def quote(self, session_data):
        last_message = session_data['discussion'][-1]['text']

        user_embed = self.model.infer_vector(tokenize(last_message))
        similarity = cosine_similarity(
            np.array(self.translation.modern_embed.values.tolist()),
            user_embed.reshape(1, -1))  # sometimes throws errors

        return self.translation.iloc[np.argmax(similarity)]['original']

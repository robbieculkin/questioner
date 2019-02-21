import re
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity


def tokenize(sentence):
    return re.sub('[!@#$.?,;]', '', sentence).lower().split(' ')

def get_question(discussion):
    """Given a discussion, creates the next question to ask."""
    if discussion is None:
        return "Hello"
    return "Subsequent conversation"


class QuestionAgent:
    def __init__(self):
        self.pre_trained_DBOW = Doc2Vec.load('data/models/dbow/d2v_dbow')
        relevant = ['play', 'player', 'original', 'modern']
        self.translation = pd.read_csv('data/translation.csv')[relevant].dropna()

        self.translation['modern_token'] = self.translation.modern.apply(tokenize)
        self.translation['modern_embed'] = self.translation.modern_token.apply(self.pre_trained_DBOW.infer_vector)

    def quote(self, user_input):
        user_embed = self.pre_trained_DBOW.infer_vector(tokenize(user_input))
        similarity = cosine_similarity(np.array(self.translation.modern_embed.values.tolist()), user_embed.reshape(1,-1))

        return self.translation.iloc[np.argmax(similarity)]['original']




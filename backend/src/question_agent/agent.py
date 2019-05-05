import re
import pickle
from bson.json_util import dumps
from functools import wraps
import numpy as np
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity

import flaskr

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
        # self.model = Doc2Vec.load(model_path)
        relevant = ['play', 'player', 'original', 'modern']
        self.translation = pd.read_csv(
            'backend/data/translation.csv')[relevant].dropna()

        self.translation['modern_token'] = self.translation.modern.apply(
            tokenize)
        # self.translation['modern_embed'] = self.translation.modern_token.apply(
        #     self.model.infer_vector)

        self.templates = pd.read_csv('backend/data/templates.csv')
        with open('backend/data/lines_spoken.pkl', 'rb') as infile:
            self.lines_spoken = pickle.load(infile)
        self.cooccurrence = pd.read_csv('backend/data/character_cooccurrence.csv',
                                        index_col='Unnamed: 0')

        self.play_names = {
            "All's Well That Ends Well": "Alls well that ends well",
            "Antony and Cleopatra": "Antony and Cleopatra",
            "As You Like It": "As you like it",
            "The Comedy of Errors": "A Comedy of Errors",
            "Coriolanus": "Coriolanus",
            "Cymbeline": "Cymbeline",
            "Hamlet": "Hamlet",
            "Henry IV, Part 1": "Henry IV",
            "Henry IV Part 2": "Henry IV",  # shaky on this one
            "Henry V": "Henry V",
            "Henry VI Part 1": "Henry VI Part 1",
            "Henry VI Part 2": "Henry VI Part 2",
            "Henry VI Part 3": "Henry VI Part 3",
            "Henry VIII": "Henry VIII",
            "Julius Caesar": "Julius Caesar",
            "King John": "King John",
            "King Lear": "King Lear",
            "Love's Labours Lost": "Loves Labours Lost",
            "Macbeth": "macbeth",
            "Measure for Measure": "Measure for measure",
            "The Merchant of Venice": "Merchant of Venice",
            "The Merry Wives of Windsor": "Merry Wives of Windsor",
            "A Midsummer Night’s Dream": "A Midsummer nights dream",
            "Much Ado About Nothing": "Much Ado about nothing",
            "Othello": "Othello",
            "Pericles": "Pericles",
            "Richard II": "Richard II",
            "Richard III": "Richard III",
            "Romeo and Juliet": "Romeo and Juliet",
            "The Taming of the Shrew": "Taming of the Shrew",
            "The Tempest": "The Tempest",
            "Timon of Athens": "Timon of Athens",
            "Titus Andronicus": "Titus Andronicus",
            "Troilus and Cressida": "Troilus and Cressida",
            "Twelfth Night": "Twelfth Night",
            "The Two Gentlemen of Verona": "Two Gentlemen of Verona",
            "The Winter's Tale": "A Winters Tale"
        }

    def __choose_character(self, play):
        # Build probabilities
        play_lines = self.lines_spoken[play]
        total_lines = sum(spoken for spoken in play_lines.values())
        probs = {player: (play_lines[player] / total_lines)
                 for player in play_lines}

        # anchor character: TODO choose given conversation context,
        # or add scaling factor to avoid unimportant characters
        anchor_char_idx = np.random.choice(len(play_lines),
                                           size=1,
                                           p=list(probs.values()),
                                           replace=False)
        anchor_char = list(probs.keys())[anchor_char_idx[0]]

        # supporting character: could do this in a slightly more sophisiticated way
        support_char = self.cooccurrence[anchor_char].idxmax()

        return anchor_char.title(), support_char.title()

    @check_none('Hello user!')
    def quote(self, session_data):
        last_message = session_data['discussion'][-1]['text']

        # user_embed = self.model.infer_vector(tokenize(last_message))
        similarity = cosine_similarity(
            np.array(self.translation.modern_embed.values.tolist()),
            # user_embed.reshape(1, -1) # sometimes throws errors
        )

        return self.translation.iloc[np.argmax(similarity)]['original']

    @check_none('Hello')
    def character_template(self, session_data):
        play = self.play_names[session_data['selectedPlay']]
        character_templates = self.get_character_templates(session_data['sessionId'])

        template = character_templates.loc[np.random.choice(
            character_templates.index)]
        characters = self.__choose_character(play)

        #self.templates = self.templates.drop(template.name, axis=0)
        self.remove_template_user(template.name, session_data['sessionId'])

        template['Question'] = re.sub(
            r'\[1\]', characters[0], template['Question'])
        template['Question'] = re.sub(
            r'\[2\]', characters[1], template['Question'])

        return template['Question']

    def get_character_templates(self, session_id):
        # Use used_templates here to return an unused template question
        used_templates = self.get_used_templates(session_id)
        return self.templates[(self.templates['1'].isin(['Character', 'Major Character'])) &
                              ((self.templates['2'].isnull()) |
                               (self.templates['2'].isin(['Character', 'Major Character'])))]

    def response(self, session_data):
        if self.get_character_templates(session_data['sessionId']).empty:
            return 'No further questions.'
        else:
            return self.character_template(session_data)

    def remove_template_user(self, name, session_id):
        db = flaskr.mongo.db

        db.discussions.update({
            'sessionId': session_id
        }, {
            '$push': {
                'usedTemplates': dumps(str(name))
            }
        })

    def get_used_templates(self, session_id):
        db = flaskr.mongo.db

        data = db.discussions.find_one({'sessionId': session_id})
        return data['usedTemplates']

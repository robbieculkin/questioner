def get_question(discussion):
    """Given a discussion, creates the next question to ask."""
    if discussion is None:
        return "Hello"
    return "Subsequent conversation"


class QuestionAgent:
    def __init__(self):
        print('Initializing QuestionAgent... ', end='')

    def quote(self, session_data):
        if session_data is None:
            return 'Hello user!'

        last_message = session_data['discussion'][-1]['text']
        return f'You said: {last_message}'

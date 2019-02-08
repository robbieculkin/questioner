def get_question(discussion):
    """Given a discussion, creates the next question to ask."""
    if discussion is None:
        return "Hello"
    return "Subsequent conversation"

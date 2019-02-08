# A Questioning Agent for Literary Discussion

By Robbie Culkin and Tim Shur

Questioner is a conversational AI to promote literary discussion in a
seminar style. Users will be asked questions by the AI to expand on
their ideas and can view a discussion report after the conversation
is over.


## Setup and Installation

This repository uses `mongodb` for the database, `flask` for running
Python (3.6) on the backend, and `nodejs` with `reactjs` for the
frontend.

### MongoDB
To run a database locally, you will need to install `mongodb` on your
system; you can follow the instructions
[here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).
Make sure you have a data directory to store database documents. To
create a folder in the default location, you can run the following:
```bash
mkdir -p /data/db/
chmod 777 /data/db/
```
Now you should be able to start a `mongodb` instance by running the
`mongod` command. By default, this starts the `mongodb` instance with
the URI at `mongodb://localhost:27017`.

### Flask
Next, we need to spin up a Flask instance. Create a virtualenv at
`backend/env` and install the `requirements.txt` with the following:
```bash
cd backend
pip3 install virtualenv
python3 -m virtualenv env
source env/bin/activate
pip3 install -r requirements.txt
deactivate
```
Finally, run the script to start Flask: `./run_flask.sh`. The flask
server can be reached by default with API routes at
<http://localhost:5000/api/v0/>

### React
To get React started, you will need to have `nodejs` installed. Then,
run the following to install the required packages and run the
frontend in development mode:
```bash
cd frontend
npm install
npm start
```
This should open the web application in a new tab at
<http://localhost:3000/>.


## Flask API

The Flask application has the following API routes:

`GET - /api/v0/questions`
-------------------------
This route requires a valid `sessionId` and will return the next
question for the session based on the discussion context such as:
```json
{
    "question": "What role does humor play in Hamlet?"
}
```

`GET - /api/v0/report`
----------------------
This route requires a valid `sessionId` and will return a report of
the discussion in the form:
```json
{
    "session": {
        "sessionId": "16c209bc-42ca-4c22-9e80-172c1cf1cd51",
        "discussion": [
            {
                "msgId": "fc9e81ac-100b-45e2-aae0-393c65f500d8",
                "fromUser": false,
                "text": "How are you?"
            },
            {
                "msgId": "c22b3534-4c62-4aac-837b-45b88807ad7e",
                "fromUser": true,
                "text": "I'm doing well!"
            }
        ]
    }
}
```

`POST - /api/v0/response`
-------------------------
This route sends a session object of the form above to be inserted
into the database. If the `sessionId` provided does not exist, a new
document will be made in the given format. Otherwise, the
`discussion` field is extended by the messages that are given in the
body of the POST request.

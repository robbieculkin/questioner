import axios from 'axios';

import { questions } from '../data/static-data';

const terminalResponse = 'Thank you for our discussion. Goodbye!';

class QuestionAgent {
    getQuestion() {
        axios.get('http://localhost:5000/api/v0/question')
            .then(res => {
                const question = res.question;
                return question;
            });
    }

    getStaticQuestion() {
        if (!Array.isArray(questions) || !questions.length) {
            return terminalResponse;
        }
        return questions.shift();
    }
}

export default QuestionAgent;

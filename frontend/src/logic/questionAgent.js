import { questions } from '../data/static-data';

const terminalResponse = 'Thank you for our discussion. Goodbye!';

class QuestionAgent {
    getQuestion() {
        if (!Array.isArray(questions) || !questions.length) {
            return terminalResponse;
        }
        return questions.shift();
    }
}

export default QuestionAgent;

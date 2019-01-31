import uuidv1 from 'uuid';


const errorState = {
  history: {
    msgId: uuidv1(),
    text: 'Oops, something went wrong! Please try again.',
    fromUser: false
  }
};

export { errorState };

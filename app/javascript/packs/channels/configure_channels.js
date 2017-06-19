import * as types from '../actions/types';

const configureChannel = (dispatch) => {
  App.messageThreadsChannel = App.cable.subscriptions.create(
    "MessageThreadsChannel",
    {
      connected: () => {
        console.log('CONNECTED!');
      },
      received: (data) => {
        console.log('Action Cable message received!', data);
        dispatch({
          type: types.RECEIVED_MESSAGE,
          payload: data,
        });
      },
    }
  );
};

export default configureChannel;


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
        switch (data.type) {
          case 'message_created':
            dispatch({
              type: types.RECEIVED_MESSAGE,
              payload: data,
            });
            break;
          case 'user_typing_started': {
            dispatch({
              type: types.USER_TYPING_STARTED,
              messageThreadId: data.messageThreadId,
              userId: data.userId,
            });
            break;
          }
          case 'user_typing_stopped':
            dispatch({
              type: types.USER_TYPING_STOPPED,
              messageThreadId: data.messageThreadId,
              userId: data.userId,
            });
            break;
        }
      },
    }
  );
};

export default configureChannel;


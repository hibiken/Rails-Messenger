const initialState = {
  id: null,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default currentUser;

/*** Selectors ***/
export const getId = (state) => state.id;

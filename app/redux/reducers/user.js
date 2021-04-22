const initalState = {
  currentUser: null,
};

export const user = (state = initalState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};

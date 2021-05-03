import { USER_STATE_CHANGE } from "../constants";

const initalState = {
  currentUser: null,
};

export default function user(state = initalState, action) {
  if (action.currentUser) {
    return {
      ...state,
      type: USER_STATE_CHANGE,
      currentUser: action.currentUser,
    };
  } else {
    return state;
  }
}

import { FETCH_FAVOURITE_ITEMS } from "../constants";

const initalState = {
  favouriteItem: null,
};

export default function favouriteItems(state = initalState, action) {
  if (action.favouriteItem) {
    return {
      ...state,
      type: FETCH_FAVOURITE_ITEMS,
      favouriteItem: action.favouriteItem,
    };
  } else {
    return state;
  }
}

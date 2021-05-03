import { FETCH_MY_LISTINGS } from "../constants";

const initalState = {
  myListingItem: null,
};

export default function myListings(state = initalState, action) {
  if (action.myListingItem) {
    return {
      ...state,
      type: FETCH_MY_LISTINGS,
      myListingItem: action.myListingItem,
    };
  } else {
    return state;
  }
}

import { FETCH_FEED_ITEMS } from "../constants";

const initalState = {
  feedItem: null,
};

export default function feedItems(state = initalState, action) {
  if (action.feedItem) {
    return {
      ...state,
      type: FETCH_FEED_ITEMS,
      feedItem: action.feedItem,
    };
  } else {
    return state;
  }
}

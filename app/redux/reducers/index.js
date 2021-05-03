import { combineReducers } from "redux";
import user from "./user";
import feedItems from "./feedItems";
import favouriteItems from "./favouriteItems";
import myListings from "./myListings";
import location from "./location";

const Reducers = combineReducers({
  userState: user,
  feedItemState: feedItems,
  favouriteItemState: favouriteItems,
  myListingItemState: myListings,
  currentLocationState: location,
});

export default Reducers;

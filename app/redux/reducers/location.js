import { UPDATE_LOCATION } from "../constants";

const initalState = {
  latitude: 0,
  longitude: 0,
};

export default function location(state = initalState, action) {
  if (action.myListingItem) {
    return {
      ...state,
      type: UPDATE_LOCATION,
      latitude: action.latitude,
      longitude: action.longitude,
      city: action.city,
      district: action.district,
    };
  } else {
    return state;
  }
}

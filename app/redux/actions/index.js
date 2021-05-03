import firebase from "firebase";
import {
  USER_STATE_CHANGE,
  FETCH_FEED_ITEMS,
  FETCH_FAVOURITE_ITEMS,
  FETCH_MY_LISTINGS,
  UPDATE_LOCATION,
} from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        }
      })
      .catch((error) => alert("Snapshot does not exist!" + error));
  };
}

export function fetchFeedItems() {
  return async (dispatch) => {
    const markers = [];
    await firebase
      .firestore()
      .collection("feed")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          markers.push(doc.data());
        });
        dispatch({
          type: FETCH_FEED_ITEMS,
          feedItem: markers,
        });
      })
      .catch((error) => alert("Snapshot does not exist!" + error));
  };
}

export function fetchFavouriteItems() {
  return async (dispatch) => {
    const markers = [];
    await firebase
      .firestore()
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .collection("favouriteItems")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          markers.push(doc.data());
        });
        dispatch({
          type: FETCH_FAVOURITE_ITEMS,
          favouriteItem: markers,
        });
      })
      .catch((error) => alert("Snapshot does not exist!" + error));
  };
}

export function fetchmyListings() {
  return async (dispatch) => {
    const markers = [];
    await firebase
      .firestore()
      .collection("feed")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().userID === firebase.auth().currentUser.uid)
            markers.push(doc.data());
        });
        dispatch({
          type: FETCH_MY_LISTINGS,
          myListingItem: markers,
        });
      })
      .catch((error) => alert("Snapshot does not exist!" + error));
  };
}

export function updateLocation(latitude, longitude, city, district) {
  let newLatitude = latitude;
  let newLongitude = longitude;
  let newCity = city;
  let newDistrict = district;
  return {
    type: UPDATE_LOCATION,
    latitude: newLatitude,
    longitude: newLongitude,
    city: newCity,
    district: newDistrict,
  };
}

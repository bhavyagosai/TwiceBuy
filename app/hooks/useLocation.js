import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default useLocation = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getLocation = async () => {
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted)
      alert("You need to enable permissions to access the Library!");
  };
  const setLocation = async () => {
    const { coords } = await Location.getLastKnownPositionAsync();
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  useEffect(() => {
    getLocation();
    setLocation();
  }, []);

  return {
    latitude,
    longitude,
  };
};

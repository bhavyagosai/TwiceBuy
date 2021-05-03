import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default useLocation = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();

  const getLocation = () => {
    Location.requestForegroundPermissionsAsync().then(({ granted }) => {
      if (!granted)
        alert("You need to enable permissions to access the Library!");
      else if (granted)
        Location.enableNetworkProviderAsync().then(() => setLocation());
    });
  };
  const setLocation = () => {
    Location.getLastKnownPositionAsync().then((result) => {
      setLatitude(result.coords.latitude);
      setLongitude(result.coords.longitude);
      getLocationData(result.coords);
    });
  };

  const getLocationData = (coords) => {
    Location.reverseGeocodeAsync(coords).then((locationInfo) => {
      setCity(locationInfo[0].city);
      setDistrict(locationInfo[0].district);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    latitude,
    longitude,
    city,
    district,
  };
};

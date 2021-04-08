import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: "700px",
  height: "500px",
};

const center = {
  lat: 45.5017,
  lng: -73.58781,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  

  if (loadError) {
    return "Eroor loading maps";
  }
  if (!isLoaded) {
    return "Loading maps";
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "../../public/assets/icons8-map-pin-64.png",
                scaledSize: new window.google.maps.Size(20, 20),
              }}
            />
          );
        })}
      </GoogleMap>
      <div>map</div>
    </>
  );
};

export default Map;

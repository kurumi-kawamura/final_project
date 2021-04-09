import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Header from "../header/index";
import {mapStyles} from "./mapStyles";
import styled from "styled-components";

const mapContainerStyle = {
  width: "1000px",
  height: "700px",
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

require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading maps";
  }

  return (
    <>

        <Header />
<Wrapper>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
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
              onClick={() => {
                setSelected(marker);
              }}
            />
          );
        })}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>info</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export default Map;

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {mapStyle} from "./mapStyle";

import { useDispatch, useSelector } from "react-redux";
import {
  receiveMapInfoError,
  requestMapInfo,
  receiveMapInfo,
} from "../../actions";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const libraries = ["places"];
const mapContainerStyle = {
  width: "700px",
  height: "600px",
};

const center = {
  lat: 36.2048,
  lng: 138.2529,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
// const key = process.env.GOOGLEMAP_API_KEY
console.log(REACT_APP_GOOGLE_MAPS_API_KEY);

const Demo = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.map.info);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(requestMapInfo());
    fetch("/moss")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveMapInfo(data.data));
      })
      .catch((err) => dispatch(receiveMapInfoError()));
    // eslint-disable-next-line
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQugiII4OZ9aCT71lT4SR0HDfW9AbzQo0",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading Maps";
  console.log(selected);
  return (
    <>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {info ? (
          <>
            {" "}
            {info.map((i) => (
              <Marker
                key={i._id}
                position={{ lat: i.latitude, lng: i.longitude }}
                icon={{
                  url: "/assets/icons8-map-pin-40.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => {
                  setSelected(i);
                }}
              />
            ))}
          </>
        ) : null}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>location: {selected.location}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      compass
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 36.2048, lng: () => 138.2529 },
      radius: 200 * 1000,
    },
  });

  return (
    <Combobox
      onSelect={async (address) => {
        console.log(address)
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
        } catch (err) {
          console.log("error!");
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map((id, description) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default Demo;

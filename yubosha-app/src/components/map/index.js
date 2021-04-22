import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {mapStyle} from "./mapStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveMapInfoError,
  requestMapInfo,
  receiveMapInfo,
} from "../../actions";
import MossComponent from "./MossComponent";
import { AppContext } from "../../context";
import AddNewMoss from "./AddNewMoss";
import { Loading } from "../../decolation/FormItem";
import Footer from "../footer/index";
import Spinner from "../../decolation/spinner";
import { useWindowDimensions } from "./hooks";
import "@reach/combobox/styles.css"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import {DiCompass} from "react-icons/di"



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

require("dotenv").config({path: "/.env"});
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
console.log(REACT_APP_GOOGLE_MAPS_API_KEY);

const Map = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AppContext);
  const info = useSelector((state) => state.map.info);
  const [clicked, setClicked] = useState(null);
  const [currentMoss, setCurrentMoss] = useState(null);
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQugiII4OZ9aCT71lT4SR0HDfW9AbzQo0",
    libraries,
  });

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

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);


  const markerClick = (e) => {
    console.log(e)
    if (e) {
      setCurrentMoss({ ...e });
      setSelected(e)
      setClicked(true);
      return true;
    } else {
      return null;
    }
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading Maps";


  return (
    <>
      <H1>Moss Map</H1>
      {info ? (
        <>
          <Container>
            {Object.keys(currentUser).length !== 0 && <AddNewMoss />}

            <Wrapper>
              {info !== null ? (
                <>
                <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >

      <Locate panTo={panTo} />
{info ? (
          <>
            {info.map((i) => (
              <Marker
                key={i._id}
                position={{ lat: i.latitude, lng: i.longitude }}
                icon={{
                  url: "/assets/8911338461548336120-128.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => {
                  markerClick(i);
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
              ) : (
                <Loading>
                  <div>
                    <Spinner />
                    Loading...
                  </div>
                </Loading>
              )}
            </Wrapper>
            {clicked && (
              <>
                {currentMoss ? (
                  <MossWrapper>
                    <MossComponent
                      location={currentMoss.location}
                      setClicked={setClicked}
                    />
                  </MossWrapper>
                ) : (
                  <Loading>
                    <div>
                      <Spinner />
                      Loading...
                    </div>
                  </Loading>
                )}
              </>
            )}
          </Container>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </>
      ) : (
        <Loading>
          <div>
            <Spinner />
            Loading...
          </div>
        </Loading>
      )}
    </>
  );
};

function Locate({ panTo }) {
  return (
    <Compass
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
      <DiCompass style={{width: "30px", height: "30px", cursor:"pointer"}}/>
    </Compass>
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
            data.map(({id, description, index}) => {
              return <ComboboxOption key={index} value={description} />
            }
            )}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1250px) {
    flex-direction: column;
  }
  @media (max-width: 500px) {
    width: 400px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 500px) {
    width: 400px;
  }
`;

const Compass = styled.button`
background: none;
border: none;
position: absolute;
top: 2%; 
right: 2%;
`;

const H1 = styled.h1`
  margin-bottom: 20px;
  margin-top: 70px;
  text-align: center;
`;

const MossWrapper = styled.div`
  background-color: rgba(198, 204, 204, 0.5);
  /* background-color: #8bc0c4; */
  height: 400px;
  width: 400px;
  border-radius: 50%;
  margin-top: 40px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 15px;
    height: 7px;
  }
`;

const FooterWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
`;

export default Map;

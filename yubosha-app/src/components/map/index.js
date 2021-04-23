import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { mapStyle } from "./mapStyle";
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
import "@reach/combobox/styles.css";


//for the search bar
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";

import { DiCompass } from "react-icons/di";

// const libraries = ["places"];
const mapContainerStyle = {
  width: "65vw",
  height: "95vh",
  borderRadius: "10px",
};

const center = {
  lat: 38.7437,
  lng: 136.9805,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const Map = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AppContext);
  const info = useSelector((state) => state.map.info);
  const [clicked, setClicked] = useState(null);
  const [currentMoss, setCurrentMoss] = useState(null);
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries,
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
    if (e) {
      setCurrentMoss({ ...e });
      setSelected(e);
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
            <Div>
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
              {Object.keys(currentUser).length !== 0 && <AddNewMoss />}
            </Div>

            <Wrapper>
              {info !== null ? (
                <>
                  {/* <Search panTo={panTo} /> */}
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={width > 800 ? 6 : 5}
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
                                url: "/assets/icons8-google-maps-50.png",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(30, 30),
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
                        position={{
                          lat: selected.latitude,
                          lng: selected.longitude,
                        }}
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
      <DiCompass style={{ width: "30px", height: "30px", cursor: "pointer" }} />
    </Compass>
  );
}
//for the search bar
// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 36.2048, lng: () => 138.2529 },
//       radius: 200 * 1000,
//     },
//   });

//   return (
//     <Combobox
//       onSelect={async (address) => {
//         console.log(address);
//         setValue(address, false);
//         clearSuggestions();
//         try {
//           const results = await getGeocode({ address });
//           const { lat, lng } = await getLatLng(results[0]);
//           panTo({ lat, lng });
//         } catch (err) {
//           console.log("error!");
//         }
//       }}
//     >
//       <ComboboxInput
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder="Enter address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ id, description, index }) => {
//               return <ComboboxOption key={index} value={description} />;
//             })}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// }

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1250px) {
    flex-direction: column-reverse;
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
  div:focus {
    outline: none;
    border: none;
  }

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
  z-index: 200;

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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Map;

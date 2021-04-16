import React, { useContext, useEffect, useState } from "react";
// import { world_map } from "./worldmap";
import { japan_map } from "./japanMap";
import {
  MapsComponent,
  LayerDirective,
  LayersDirective,
  MarkerDirective,
  MarkersDirective,
  Inject,
  Marker,
  MapsTooltip,
  Zoom,
} from "@syncfusion/ej2-react-maps";
import Header from "../header/index";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveMapInfoError,
  requestMapInfo,
  receiveMapInfo,
} from "../../actions";
import MossComponent from "./MossComponent";
import { AppContext } from "../../context";
import { style } from "./template";
import AddNewMoss from "./AddNewMoss";
import { Loading } from "../../decolation/FormItem";
import { useHistory } from "react-router";

const Map = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AppContext);
  const info = useSelector((state) => state.map.info);
  const [clicked, setClicked] = useState(null);
  const [currentMoss, setCurrentMoss] = useState(null);
  const history = useHistory();

  useEffect(() => {
    dispatch(requestMapInfo());
    fetch("/moss")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveMapInfo(data.data));
      })
      .catch((err) => dispatch(receiveMapInfoError()));
  }, [dispatch]);

  const markerClick = (e) => {
    if (e) {
      let res = e.data;
      if (res) {
        setCurrentMoss({ ...res });
        setClicked(true);
      } else {
        history.push("/map");
      }
    } else {
      history.push("/map");
    }
  };

  return (
    <>
      {info ? (
        <>
          <Header />

          <H1>Moss Map</H1>
          <Container>
            {Object.keys(currentUser).length !== 0 && <AddNewMoss />}

            <Wrapper>
              {info !== null ? (
                <MapsComponent
                  id="container"
                  zoomSettings={{ enable: true, enablePanning: true }}
                  markerClick={(e) => markerClick(e)}
                  width={"700"}
                  height={"600"}
                >
                  <Inject services={[Marker, MapsTooltip, Zoom]} />
                  <LayersDirective>
                    <LayerDirective
                      shapeData={japan_map}
                      shapeSettings={{ fill: "#4c7d62" }}
                    >
                      {info && (
                        <MarkersDirective>
                          {info.map((i) => {
                            return (
                              <MarkerDirective
                                key={i._id}
                                visible={true}
                                shape="Image"
                                imageUrl="assets/icons8-map-pin-40.png"
                                tooltipSettings={{
                                  visible: true,
                                  valuePath: "name",
                                  template: style.template,
                                }}
                                colorValuePath={"color"}
                                width={25}
                                height={25}
                                dataSource={[
                                  {
                                    latitude: `${i.latitude}`,
                                    longitude: `${i.longitude}`,
                                    location: `${i.location}`,
                                    name: `${i.name}`,
                                    src: `${i.imgSrc}`,
                                    submit: `${i.submittedBy}`,
                                  },
                                ]}
                              ></MarkerDirective>
                            );
                          })}
                        </MarkersDirective>
                      )}
                    </LayerDirective>
                  </LayersDirective>
                </MapsComponent>
              ) : (
                <Loading>
                  <div>Loading...</div>
                </Loading>
              )}
            </Wrapper>
            {clicked && (
              <>
                {currentMoss ? (
                  <MossWrapper>
                    <MossComponent
                      name={currentMoss.name}
                      location={currentMoss.location}
                      src={currentMoss.src}
                      setClicked={setClicked}
                      submit={currentMoss.submit}
                    />
                  </MossWrapper>
                ) : (
                  <Loading>
                    <div>Loading...</div>
                  </Loading>
                )}
              </>
            )}
          </Container>
        </>
      ) : (
        <Loading>
          <div>Loading...</div>
        </Loading>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const H1 = styled.h1`
  margin-bottom: 20px;
  margin-top: 70px;
  text-align: center;
`;

const MossWrapper = styled.div`
  background-color: var(--soft-gray);
  height: 400px;
  width: 400px;
  border-radius: 5px;
  overflow-y: scroll;

  /* &::-webkit-scrollbar {
    width: 10px;
    border: 0.5px solid white;
  }

  &::-webkit-scrollbar-track {
    background-color: black;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: white;
  } */
`;

export default Map;

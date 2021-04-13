import React, { useEffect, useState } from "react";
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
import "./tooltip.css";


const Map = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.map.info);
  const [clicked, setClicked] = useState(null);
  const [currentMoss, setCurrentMoss] = useState(null);

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
    let res = e.data;
    setCurrentMoss(res);
    setClicked(true);
  };

  return (
    <>
      <Header />

      <Container>
        <Wrapper>
          <H1>Moss Map</H1>
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
                  // layerType="Bing"
                  // bingMapType="AerialWithLabel"
                  // key="ArmPMVT_1cbRuMir9c5AUSYLs7AJ3Tv9bCvriTME7zEi6fZwMDtbzi39kW9tVUBs"
                  shapeData={japan_map}
                  shapeSettings={{ fill: "#4c7d62" }}
                >
                  <MarkersDirective>
                    {info.map((i) => {
                      return (
                        <MarkerDirective
                          key={i._id}
                          visible={true}
                          tooltipSettings={{
                            visible: true,
                            valuePath: "name",
                            fill: "pink",
                          }}
                          shape={"Balloon"}
                          colorValuePath={"color"}
                          width={15}
                          height={15}
                          dataSource={[
                            {
                              latitude: `${i.latitude}`,
                              longitude: `${i.longitude}`,
                              location: `${i.location}`,
                              name: `${i.name}`,
                              color: "pink",
                              src: `${i.imgSrc}`,
                            },
                          ]}
                        ></MarkerDirective>
                      );
                    })}
                  </MarkersDirective>
                </LayerDirective>
              </LayersDirective>
            </MapsComponent>
          ) : (
            <div>Loading...</div>
          )}
        </Wrapper>
        {clicked && (
          <>
            <MossWrapper>
              <MossComponent
                name={currentMoss.name}
                location={currentMoss.location}
                src={currentMoss.src}
              />
            </MossWrapper>
          </>
        )}
      </Container>
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
  margin-bottom: 40px;
`;

const MossWrapper = styled.div``;

export default Map;

import React, { useEffect } from "react";
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

const Map = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.map.info);

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
    console.log(e.data.name);
  };

  return (
    <>
      <Header />

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
                shapeData={japan_map}
                shapeSettings={{ fill: "#4c7d62" }}
              >
                <MarkersDirective>
                  {info.map((i) => {
                    return (
                      <MarkerDirective
                        key={i._id}
                        visible={true}
                        tooltipSettings={{ visible: true, valuePath: "name" }}
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
    </>
  );
};

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

export default Map;

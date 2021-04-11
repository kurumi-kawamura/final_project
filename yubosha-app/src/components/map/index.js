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
} from "@syncfusion/ej2-react-maps";
import Header from "../header/index";
import styled from "styled-components";
let sample = [
  {
    latitude: 34.6937,
    longitude: 135.5023,
    location: "Osaka",
    name: "Moss",
    color: "skyblue",
  },
  {
    latitude: 35.0116,
    longitude: 135.7681,
    location: "Kyoto",
    name: "Moss2",
    color: "skyblue",
  },
];
const Map = () => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let arr = [];
    sample.forEach((elem) => {
      arr.push(elem);
    });

    setSrc(arr);
  }, [setSrc]);
  console.log(src);

  return (
    <>
      <Header />

      <Wrapper>
        <H1>Moss Map</H1>
        {src ? (
          <MapsComponent id="container">
            <Inject services={[Marker, MapsTooltip]} />
            <LayersDirective>
              <LayerDirective
                shapeData={japan_map}
                shapeSettings={{ fill: "#4c7d62" }}
              >
                <MarkersDirective>
                  <MarkerDirective
                    visible={true}
                    tooltipSettings={{ visible: true, valuePath: "name" }}
                    shape={"Balloon"}
                    colorValuePath={"color"}
                    width={13}
                    height={13}
                    dataSource={src}
                  ></MarkerDirective>
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

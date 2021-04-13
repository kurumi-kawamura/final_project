import React from "react";
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
import "./tooltip.css";
import { japan_map } from "./japanMap";

const Demo = () => {
  return (
    <MapsComponent id="element" format={"n"}>
      <Inject services={[Marker, MapsTooltip, Zoom]} />
      <LayersDirective>
        <LayerDirective
          shapeData={japan_map}
          shapePropertyPath="name"
          shapeDataPath="Location"
        >
          <MarkersDirective>
            <MarkerDirective
              visible={true}
              shape={"Balloon"}
              colorValuePath={"color"}
              width={15}
              height={15}
              dataSource={[
                {
                  latitude: 34.5588583,
                  longitude: 135.5426461,
                  location: "location",
                  name: "name",
                  color: "pink",
                },
              ]}
              tooltipSettings={{
                visible: true,
                valuePath: "name",
                // format: '<b>Capital</b> : ${location}<br><b>Country</b> : hello',
                template:
                  '<div id="tooltemplate" style="width: 90px;background: rgba(53, 63, 76, 0.90); opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding-bottom: 10px;padding-top: 10px;padding-left: 10px;padding-right: 10px;border: 1px #abb9c6">' +
                  '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>hello</center></div>' +
                  '<div><span style="font-size:13px;color:#cccccc">Finalist : </span>HI<span style="font-size:13px;color:#ffffff;font-weight: 500;"></span></div>',
              }}
            ></MarkerDirective>
          </MarkersDirective>
        </LayerDirective>
      </LayersDirective>
    </MapsComponent>
  );
};

export const Demo2 = () => {
  return (
    <MapsComponent id="element">
      <LayersDirective>
        <LayerDirective
          layerType="Bing"
          bingMapType="AerialWithLabel"
          key="ArmPMVT_1cbRuMir9c5AUSYLs7AJ3Tv9bCvriTME7zEi6fZwMDtbzi39kW9tVUBs"
        ></LayerDirective>
      </LayersDirective>
    </MapsComponent>
  );
};

export default Demo;

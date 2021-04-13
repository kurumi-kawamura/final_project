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
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { japan_map } from "./japanMap";

const Demo = () => {
  return (
    <TooltipComponent
      className="tooltip-box"
      content="Tooltip arrow customized"
      cssClass="customtip"
    >
      <MapsComponent id="element">
        <Inject services={[Marker, MapsTooltip, Zoom]} />
        <LayersDirective>
          <LayerDirective shapeData={japan_map}>
            <MarkersDirective>
              <MarkerDirective
                visible={true}
                tooltipSettings={{
                  visible: true,
                  valuePath: "name",
                  fill: "pink",
                  id: "target",
                }}
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
              ></MarkerDirective>
            </MarkersDirective>
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </TooltipComponent>
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

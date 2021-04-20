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
import Footer from "../footer/index";
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
        return true;
      } else {
        history.push("/error");
      }
    }
  };

  return (
    <>
      <Header />
      {info ? (
        <>
          <H1>Moss Map</H1>
          <Container>
            {Object.keys(currentUser).length !== 0 && <AddNewMoss />}

            <Wrapper>
              {info !== null ? (
                <>
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
                        shapeSettings={{
                          fill: "#547a6d",
                        }}
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
                </>
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
                      location={currentMoss.location}
                      setClicked={setClicked}
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

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* background-color: skyblue; */

  @media (max-width: 1250px) {
    flex-direction: column;
  }
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
  background-color: rgba(198, 204, 204, 0.5);
  height: 400px;
  width: 400px;
  border-radius: 50%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;

    border: 0.5px solid white;
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
  margin-top: 55px;
`;

export default Map;

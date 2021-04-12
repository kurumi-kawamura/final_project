export const requestMapInfo = () => ({
  type: "REQUEST_MAP_INFO",
});

export const receiveMapInfo = (data) => ({
  type: "RECEIVE_MAP_INFO",
  data,
});

export const receiveMapInfoError = () => ({
  type: "RECEIVE_MAP_INFO_ERROR",
});

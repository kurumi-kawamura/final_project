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
export const addNewMossInfo = (data) => ({
  type: "ADD_NEW_MOSS_INFO",
  data,
});

export const requestItemsData = () => ({
  type: "REQUEST_ITEMS_DATA",
});

export const receiveItemsData = (data) => ({
  type: "RECEIVE_ITEMS_DATA",
  data,
});

export const receiveItemsDataError = () => ({
  type: "RECEIVE_ITEMS_DATA_ERROR",
});

export const receiveSingleItemData = (data) => ({
  type: "RECEIVE_SINGLE_ITEM_DATA",
  data,
});

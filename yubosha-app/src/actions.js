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

export const addNewComment = (data) => ({
  type: "ADD_NEW_COMMENT",
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

export const addItemInCart = (data) => ({
  type: "ADD_ITEM_IN_CART",
  data,
});

export const removeItem = (data) => ({
  type: "REMOVE_ITEM",
  data,
});

export const requestUserInfo = () => ({
  type: "REQUEST_USER_INFO",
});

export const receiveUserInfo = (data) => ({
  type: "RECEIVE_USER_INFO",
  data,
});

export const receiveMapUserError = () => ({
  type: "RECEIVE_USER_INFO_ERROR",
});
export const addNewUserInfo = (data) => ({
  type: "ADD_NEW_USER_INFO",
  data,
});

export const requestRequestInfo = () => ({
  type: "REQUEST_REQUEST_INFO",
});

export const receiveRequestInfo = (data) => ({
  type: "RECEIVE_REQUEST_INFO",
  data,
});

export const receiveRequestError = () => ({
  type: "RECEIVE_REQUEST_ERROR",
});

export const deleteRequest = (data) => ({
  type: "DELETE_REQUEST",
  data,
})
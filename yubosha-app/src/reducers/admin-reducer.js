const initialState = {
  request: null,
  status: "idle",
  error: null,
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_REQUEST_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_REQUEST_INFO": {
      console.log(action);
      return {
        ...state,
        request: action.data,
        status: "idle",
      };
    }

    case "RECEIVE_REQUEST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    case "ADD_NEW_USER_INFO": {
      const newInfo = [...state.info];
      newInfo.push({ ...action.data });
      return {
        ...state,
        info: newInfo,
      };
    }

    case "DELETE_REQUEST": {
      const newReq = [...state.request];
      newReq.splice(action.data, 1);
      return {
        ...state,
        request: newReq,
      };
    }

    default: {
      return state;
    }
  }
}

const initialState = {
  info: null,
  status: "idle",
  error: null,
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_MAP_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_MAP_INFO": {
      return {
        ...state,
        info: action.data,
        status: "idle",
      };
    }

    case "RECEIVE_MAP_INFO_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    default: {
      return state;
    }

  }
}

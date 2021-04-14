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
      console.log(action);
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

    case "ADD_NEW_MOSS_INFO": {
      console.log(action);
      console.log(state);
      return {
        ...state,
        info: [...state.info, action.data],
      };
    }

    default: {
      return state;
    }
  }
}

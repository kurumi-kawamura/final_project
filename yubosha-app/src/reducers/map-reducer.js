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

    case "ADD_NEW_MOSS_INFO": {
      console.log(state);
      const newInfo = [...state.info];
      newInfo.push({ ...action.data });
      return {
        ...state,
        info: newInfo,
      };
    }

    case "ADD_NEW_COMMENT": {
      const newInfo = [...state.info];
      // eslint-disable-next-line
      newInfo.map((i) => {
        if (i._id === action.data._id) {
          i.comments.push({ msg: action.data.msg, by: action.data.by });
        }
      });
      return {
        ...state,
        info: newInfo,
      };
    }

    default: {
      return state;
    }
  }
}

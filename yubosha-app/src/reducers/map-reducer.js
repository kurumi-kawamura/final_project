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
      const newInfo = [...state.info];
      newInfo.push({ ...action.data });
      return {
        ...state,
        info: newInfo,
      };
    }

    case "ADD_NEW_COMMENT": {
      console.log(state);
      console.log(action);
      const find = state.info.find((i) => {
        return action.data._id === i._id;
      });
      const newComment = [...find.comments];
      newComment.push({ msg: action.data.msg, by: action.data.by });
      console.log("***********", state.info);
      return {
        ...state,
        info: [
          ...state.info,
          {
            comments: newComment,
          },
        ],
      };
    }

    default: {
      return state;
    }
  }
}

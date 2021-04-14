const initialState = {
  items: null,
  status: "idle",
  error: null,
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ITEMS_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_ITEMS_DATA": {
      return {
        ...state,
        items: action.data,
        status: "idle",
      };
    }

    case "RECEIVE_ITEMS_DATA_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }

    case "RECEIVE_SINGLE_ITEM_DATA": {
      return {
        ...state,
        item: action.data,
        status: "idle",
      };
    }

    default: {
      return state;
    }
  }
}

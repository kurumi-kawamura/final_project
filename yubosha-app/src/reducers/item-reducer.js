const initialState = {
  items: null,
  status: "idle",
  error: null,
  cart: {},
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

    case "ADD_ITEM_IN_CART": {
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.data.ItemName]: {
            ...action.data,
            stock: state.cart[action.data.ItemName]
              ? state.cart[action.data.ItemName].stock - 1
              : action.data.stock - 1,
            quantity: state.cart[action.data.ItemName]
              ? state.cart[action.data.ItemName].quantity + 1
              : 1,
          },
        },
      };
    }

    case "REMOVE_STOCK": {
      const newItems = [...state.items];
      // eslint-disable-next-line
      newItems.map((item) => {
        if (item._id === action.data._id) {
          item.stock = item.stock - action.data.quantity;
        }
      });
      return {
        ...state,
        items: newItems,
      };
    }

    case "ADD_STOCK": {
      const newItems = [...state.items];
      // eslint-disable-next-line
      newItems.map((item) => {
        if (item._id === action.data._id) {
          item.stock = item.stock + action.data.quantity;
        }
      });
      return {
        ...state,
        items: newItems,
      };
    }

    case "REMOVE_ITEM": {
      const copy = { ...state };
      delete copy.cart[action.data.ItemName];
      return {
        ...copy,
        cart: {
          ...copy.cart,
        },
      };
    }

    default: {
      return state;
    }
  }
}

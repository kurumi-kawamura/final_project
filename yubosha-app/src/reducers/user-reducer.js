const initialState = {
    user: null,
    status: "idle",
    error: null,
  };
  
  export default function mapReducer(state = initialState, action) {
    switch (action.type) {
      case "REQUEST_USER_INFO": {
        return {
          ...state,
          status: "loading",
        };
      }
  
      case "RECEIVE_USER_INFO": {
        console.log(action);
        return {
          ...state,
          info: action.data,
          status: "idle",
        };
      }
  
      case "RECEIVE_MAP_USER_ERROR": {
        return {
          ...state,
          status: "error",
        };
      }
  
      case "ADD_NEW_USER_INFO": {
        console.log(action);
        console.log(state);
        const newInfo = [...state.info];
        newInfo.push({...action.data})
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
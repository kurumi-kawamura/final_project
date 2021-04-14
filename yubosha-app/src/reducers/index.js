import { combineReducers } from "redux";

import map from "./map-reducer";
import item from "./item-reducer";
import user from "./user-reducer";

export default combineReducers({ map, item, user });

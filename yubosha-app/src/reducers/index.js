import { combineReducers } from "redux";

import map from "./map-reducer";
import item from "./item-reducer";

export default combineReducers({ map, item });

import { combineReducers } from "redux";

import map from "./map-reducer";
import item from "./item-reducer";
import admin from "./admin-reducer";

export default combineReducers({ map, item, admin });

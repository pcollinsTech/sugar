import { combineReducers } from "redux";

import auth from "../modules/auth/store/reduer";
import user from "../modules/user/store/reducer";
import jobs from "../modules/job/store/reducer";

export default combineReducers({ auth, user, jobs });

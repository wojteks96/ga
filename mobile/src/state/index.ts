import { combineReducers } from "redux";

import { Actions as ApiActions } from "./api";
import {
  Actions as AuthActions,
  reducer as auth,
  State as AuthState
} from "./auth";
import {
  Actions as FetchActions,
  reducer as fetch,
  State as FetchState
} from "./fetch";

export interface RootState {
  auth: AuthState;
  fetch: FetchState;
}

const reducers = { auth, fetch };

const reducer = combineReducers<RootState>(reducers);

// TODO: Maybe move all actions to an actions module
export type Actions = AuthActions | FetchActions | ApiActions;

export default reducer;

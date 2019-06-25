import Immutable from "immutable";
import { Action } from "redux";

// TODO: Replace with real routes and maybe move elsewhere
enum Routes {
  INDEX = "index",
  AUTH_LOGIN = "auth/login"
}

enum FetchState {
  PREFETCH = "prefetch",
  FETCHING = "fetching",
  ERROR = "error",
  SUCCESS = "success"
}

// TODO: Maybe add error kind
interface FetchInfo {
  readonly state: FetchState;
  readonly errorMsg?: string;
}

enum TypeKeys {
  START = "FETCH/START",
  SUCCESS = "FETCH/SUCCESS",
  ERROR = "FETCH/ERROR"
}

type State = Immutable.Map<Routes, FetchInfo>;

interface BaseFetchAction extends Action {
  readonly type: TypeKeys;
  readonly route: Routes;
}

interface StartAction extends BaseFetchAction {
  readonly type: TypeKeys.START;
}

interface SuccessAction extends BaseFetchAction {
  readonly type: TypeKeys.SUCCESS;
}

interface ErrorAction extends BaseFetchAction {
  readonly type: TypeKeys.ERROR;
  errorMsg: string;
}

type Actions = StartAction | SuccessAction | ErrorAction;

function start(route: Routes): Actions {
  return {
    type: TypeKeys.START,
    route
  };
}

function success(route: Routes): Actions {
  return {
    type: TypeKeys.SUCCESS,
    route
  };
}

function error(route: Routes, errorMsg: string): Actions {
  return {
    type: TypeKeys.ERROR,
    route,
    errorMsg
  };
}

const startState: State = Immutable.Map();

function reducer(state = startState, action: Actions) {
  switch (action.type) {
    case TypeKeys.START:
      return state.set(action.route, { state: FetchState.FETCHING });
    case TypeKeys.SUCCESS:
      return state.set(action.route, { state: FetchState.SUCCESS });
    case TypeKeys.ERROR:
      return state.set(action.route, {
        state: FetchState.ERROR,
        errorMsg: action.errorMsg
      });
    default:
      return state;
  }
}

function getIsFetching(fetch: State, routes: Immutable.Set<Routes>) {
  return routes
    .map(route => fetch.get(route))
    .some(info => !!info && info.state === FetchState.FETCHING);
}

export {
  Actions,
  error,
  getIsFetching,
  reducer,
  Routes,
  start,
  State,
  success
};

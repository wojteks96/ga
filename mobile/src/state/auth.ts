import { Action } from "redux";

import { AuthToken } from "../auth";

enum TypeKeys {
  SET_AUTH_TOKEN = "AUTH/SET_AUTH_TOKEN",
  CLEAR_AUTH_TOKEN = "AUTH/CLEAR_AUTH_TOKEN"
}

interface SetAuthToken extends Action {
  readonly type: TypeKeys.SET_AUTH_TOKEN;
  readonly token: AuthToken;
}

interface ClearAuthToken extends Action {
  readonly type: TypeKeys.CLEAR_AUTH_TOKEN;
}

type Actions = SetAuthToken | ClearAuthToken;

function setAuthToken(token: AuthToken): Actions {
  return {
    type: TypeKeys.SET_AUTH_TOKEN,
    token
  };
}

function clearAuthToken(): Actions {
  return {
    type: TypeKeys.CLEAR_AUTH_TOKEN
  };
}

interface State {
  readonly token: AuthToken | null;
}

const startState: State = { token: null };

function reducer(state = startState, action: Actions) {
  switch (action.type) {
    case TypeKeys.SET_AUTH_TOKEN:
      return { ...state, token: action.token };
    case TypeKeys.CLEAR_AUTH_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
}

export { Actions, clearAuthToken, reducer, setAuthToken, State };

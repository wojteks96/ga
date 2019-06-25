import { Action } from "redux";

import { AuthToken } from "../auth";
import { Routes } from "./fetch";

enum TypeKeys {
  CALL = "API/CALL"
}

enum Method {
  GET = "GET",
  POST = "POST"
}

interface CallAction extends Action {
  readonly type: TypeKeys.CALL;
  readonly route: Routes;
  readonly method: Method;
  readonly token?: AuthToken;
  readonly data?: any;
  onSuccess?(data: any): Action;
}

type Actions = CallAction;

export { Actions, CallAction, Method, TypeKeys };

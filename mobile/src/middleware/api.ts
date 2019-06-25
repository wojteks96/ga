import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import constants from "../config/constants";
import { Actions } from "../state";
import { TypeKeys } from "../state/api";
import { error, Routes, start, success } from "../state/fetch";

function buildPath(route: Routes) {
  return `${constants.BASE_URL}/${route}`;
}

const apiMiddleware: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch
) => async (action: Actions) => {
  next(action);

  if (action.type !== TypeKeys.CALL) {
    return;
  }

  const { data, method, route, token, onSuccess } = action;
  const path = buildPath(route);
  const fetchOptions = { method, headers: new Headers(), body: null };
  if (!!token) {
    fetchOptions.headers.append("Auth-Token", token);
  }
  if (!!data) {
    // NOTE: Currently assume that we are always sending data as body
    // json (not true for GET, DELETE)
    fetchOptions.headers.append("Content-Type", "application/json");
    fetchOptions.body = JSON.stringify(data);
  }

  await dispatch(start(route));
  try {
    const response = await fetch(path, fetchOptions);
    if (response.ok) {
      const resData = await response.json();
      if (!!onSuccess) {
        await dispatch(onSuccess(resData));
      }
      await dispatch(success(route));
    } else {
      // TODO: Actual error
      await dispatch(error(route, "Something went wrong"));
    }
  } catch (e) {
    // TODO: Actual error
    await dispatch(error(route, e));
  }
};

export default apiMiddleware;

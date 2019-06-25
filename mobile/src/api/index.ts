import { saveAuthToken } from "../auth";
import { CallAction, Method, TypeKeys } from "../state/api";
import { setAuthToken } from "../state/auth";
import { Routes } from "../state/fetch";

function callApi({
  route,
  method,
  token = null,
  data = null,
  onSuccess = null
}): CallAction {
  return {
    type: TypeKeys.CALL,
    route,
    method,
    token,
    data,
    onSuccess
  };
}

function callAuthLogin(email: string, password: string) {
  const data = { email, password };
  const onSuccess = resData => {
    saveAuthToken(resData.auth_token);
    setAuthToken(resData.auth_token);
  };
  return callApi({
    route: Routes.AUTH_LOGIN,
    method: Method.POST,
    data,
    onSuccess
  });
}

export { callAuthLogin };

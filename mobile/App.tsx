import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import apiMiddleware from "./src/middleware/api";
import reducer from "./src/state";
import SignIn from "./src/views/SignIn";

const store = createStore(reducer, applyMiddleware(apiMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
}

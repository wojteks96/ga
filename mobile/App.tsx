import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import apiMiddleware from "./src/middleware/api";
import Switch from "./src/routers";
import reducer from "./src/state";

const store = createStore(reducer, applyMiddleware(apiMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <Switch />
    </Provider>
  );
}

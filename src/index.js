import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Item from "./Item";
import Dot from "./Dot";
function App() {
  return (
    <div className="App">
      {/* Effect add item fly to cart */}
      {/* <Item /> */}
      <Dot />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

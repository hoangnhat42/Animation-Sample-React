import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Item from "./Item";
import ParticleCanvas from "./Dot";
import AppTest from './AppTest';
import CanvasDots from './NewDot';

function App() {
  return (
    <div className="App">
      {/* Effect add item fly to cart */}
      {/* <Item /> */}
      <ParticleCanvas />
      <AppTest />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

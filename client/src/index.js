import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

//solves problem with react-scripts dependency
//use in dev only
const intervalID = setInterval(function () {
  const iframe = document.getElementsByTagName("iframe");
  if (iframe.length > 0) {
    iframe[0].remove();
    clearInterval(intervalID);
  }
}, 500);

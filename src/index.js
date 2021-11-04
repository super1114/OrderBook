import React from "react";
import ReactDOM from "react-dom";
import Example1 from "./examples/Example1";

function App() {
  return (
    <div>
      <Example1 />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

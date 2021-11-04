import React from "react";
import ReactDOM from "react-dom";
import OrderBook from "./OrderBook";

function App() {
  return (
    <div>
      <OrderBook />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

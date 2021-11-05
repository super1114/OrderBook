import React from "react";
import ReactDOM from "react-dom";
import OrderBook from "./OrderBook";
import Top from "./Top";
import { ThemeContext } from "./Context";
function App() {
  const [pair, setPair] = React.useState({no:1, name:"BTCUSDT",sym1:"BTC", sym2:"USDT"});
  return (
    
      <ThemeContext.Provider value={{ pair, setPair }}>
        <Top />
        <OrderBook />
      </ThemeContext.Provider>
    
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

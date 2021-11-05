import * as React from 'react';

export interface ThemeInfo {
    pair : { no:number; name: string; sym1: string; sym2: string; };
    setPair : (pair : {no:number; name: string; sym1: string; sym2: string; }) => void;
}

export const ThemeContext = React.createContext<ThemeInfo>({
    pair: {no:0, name:"BTCUSDT", sym1:"BTC", sym2:"USDT"},
    setPair: () => {}
});


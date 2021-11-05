import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Binance from 'binance-api-node';
import { ThemeContext } from "./Context";
import useStyles from './Style';
const client = Binance();

export default function OrderBook() {
  const classes = useStyles();
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const context = React.useContext(ThemeContext);
  const getData = () => {
    client.ws.depth(context.pair.name, depth => {
      let temp_bids:any = depth.bidDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12)
      let temp_asks:any = depth.askDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12).reverse();
      if(temp_bids.length==12&&temp_asks.length==12) {
        setBids(temp_bids)
        setAsks(temp_asks)
      }
    });  
  }
  useEffect(()=> {
    setBids([]);
    getData();
  },[context.pair]);
  if(bids.length==0) return <Box className={classes.container+" "+classes.text_white}>Loading Order Book From Binance</Box>;
  function TopRow() {
    return (
      <Grid container className={classes.top_row} >
        <Grid className={classes.header_text} item xs={4} >
          Price(BUSD)
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          Amount(BTC)
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} classes={{}} item xs={4}>
          Total
        </Grid>
      </Grid>
    );
  }
  function MiddleRow() {
    return (
      <Grid container className={classes.middle_row+" "+classes.items_center}>
        <Grid className={classes.text_lg+" "+classes.flex+" "+classes.items_center} item xs={8} >
          <span>62,264.02</span>
          <ArrowDownwardIcon />
          <span className={classes.text_xs}>$62,264.02</span>
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          More
        </Grid>
      </Grid>
    );
  }
  
  function RowItem({item, color}:{item:any, color:any}) {
    return <Grid container className={classes.row}>
            <Grid item xs={4} className={color}>
              {item.price}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
            {Math.round(item.quantity*100000)/100000}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
              {Math.round(item.price*item.quantity*100000)/100000}
            </Grid>
          </Grid>
  }
  return  (<Box className={classes.container}>
            <TopRow />
            {asks&&asks.map((item, index:number) => (<RowItem item={item} color={classes.text_red} key={index}/>) )}
            <MiddleRow />
            {bids&&bids.map((item, index) => {
              return (<RowItem item={item} color={classes.text_green} key={index}/>)
            } )}
          </Box>)
}
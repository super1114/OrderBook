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
    return client.ws.depth(context.pair.name, depth => {
      let temp_bids:any = depth.bidDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12)
      let temp_asks:any = depth.askDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12).reverse();
      if(temp_bids.length==12&&temp_asks.length==12) {
        setBids(temp_bids)
        setAsks(temp_asks)
      }
    });
  }

  var func:any[]= [];
  useEffect(()=> {
    /** This code is for disconnecting previous websocket and connecting new websocket when pair changed. **/
    func.push(getData());
    if(func.length>1) func[func.length-2]();
  },[context.pair.name]);

  if(bids.length==0) return <Box className={classes.container+" "+classes.text_white}>Loading Order Book From Binance</Box>;
  function TopRow() {
    return (
      <Grid container className={classes.top_row} >
        <Grid className={classes.header_text} item xs={4} >
          Price({context.pair.sym2})
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          Amount({context.pair.sym1})
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
              {parseFloat(item.price).toFixed(2)}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
            {parseFloat(item.quantity).toFixed(5)}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
              {(parseFloat(item.price)*parseFloat(item.quantity)).toFixed(5)}
            </Grid>
          </Grid>
  }
  return  (<Box className={classes.container}>
            <TopRow />
            {asks&&asks.map((item, index) => (<RowItem item={item} color={classes.text_red} key={index}/>) )}
            <MiddleRow />
            {bids&&bids.map((item, index) => {
              return (<RowItem item={item} color={classes.text_green} key={index}/>)
            } )}
          </Box>)
}
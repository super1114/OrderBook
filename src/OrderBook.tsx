import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Binance from 'binance-api-node';
import useStyles from './Style';
const client = Binance();
export default function OrderBook() {
  const pairlist = [{
      no:0,
      name:"BTCUSDT",
      sym1:"BTC",
      sym2:"USDT"
  },{
      no:1,
      name:"BTCBUSD",
      sym1:"BTC",
      sym2:"BUSD"
  },{
      no:2,
      name:"ETHUSDT",
      sym1:"ETH",
      sym2:"USDT"
  },{
      no:3,
      name:"ETHBUSD",
      sym1:"ETH",
      sym2:"BUSD"
  }];
  const classes = useStyles();
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [pair, setPair] = useState(pairlist[0]);
  const handleChange = (event:any) => {
    setPair(pairlist[event.target.value]);
  }
  useEffect(()=> {
    client.ws.depth(pair.name, depth => {
      let temp_bids:any = depth.bidDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12)
      let temp_asks:any = depth.askDepth.filter(function(e) { return parseFloat(e.quantity) !== 0 }).slice(0,12).reverse();
      if(temp_bids.length==12&&temp_asks.length==12) {
        setBids(temp_bids)
        setAsks(temp_asks)
      }
    });
  },[pair]);

  if(bids.length==0) return <Box className={classes.container+" "+classes.text_white}><HeaderTool />Loading Order Book From Binance</Box>;
  function HeaderTool() {
    return (
    <Grid container className={classes.top_row+" "+classes.text_white} style={{display:"flex", alignItems:"center"}} >
        <Grid item xs={8} style={{fontSize:"20px"}}>
        Order Book
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
            <Select
                onChange={handleChange}
            >
                {pairlist.map((item, index)=><MenuItem value={pairlist.indexOf(item)} key={index}><span className={classes.text_white}>{item.name}</span></MenuItem>)}
            </Select>
        </Grid>
    </Grid>
    );
  }
  function TopRow() {
    return (
      <Grid container className={classes.top_row} >
        <Grid className={classes.header_text} item xs={4} >
          Price({pair.sym2})
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          Amount({pair.sym1})
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
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
            <HeaderTool />
            <TopRow />
            {asks && asks.map((item, index) => (<RowItem item={item} color={classes.text_red} key={index}/>) )}
            <MiddleRow />
            {bids && bids.map((item, index) => {
              return (<RowItem item={item} color={classes.text_green} key={index}/>)
            } )}
          </Box>)
}
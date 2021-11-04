import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Binance from 'binance-api-node';
const client = Binance();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
  },
  row: {
    height:"20px",
    alignItems:"center"
  },
  top_row: {
    margin: "8px 0px"
  },
  items_center: {
    alignItems: "center"
  },
  middle_row: {
    height:"35px"
  },
  text_right: {
    textAlign: "right"
  },
  header_text: {
    color: "#868e9b",
    fontSize: "12px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
  },
  text_lg: {
    fontSize:"20px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
    color: "#b5bbc2",
  },
  text_xs: {
    fontSize: "12px"
  },
  container: {
    width: "320px",
    margin:"auto",
    padding: "6px 20px",
    backgroundColor: "#171a1e"
  },
  text_red: {
    color: "#e35561",
    fontSize: "12px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
  },
  text_green: {
    color: "#5dc787",
    fontSize: "12px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
  },
  text_white: {
    color: "#b5bbc2",
    fontSize: "12px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
  }
}));

export default function OrderBook() {
  const classes = useStyles();
  const pairlist = ["BTCUSDT", "BTCBUSD", "ETHUSDT", "ETHBUSD"];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pair, setPair] = useState("BTCUSDT");
  const handleChange = (event) => {
    setPair(event.target.value);
  }
  useEffect(()=> {
    // const interval = setInterval(() => {
      // client.book({ symbol: pair,limit: 20 }).then((res) => {
      //   setData(res);
      //   //console.log(res);
      // }).catch((error)=> {
      //   setError(error);
      // }).finally(()=>{
      //   setLoading(false);
      // })
      // client.avgPrice({ symbol: 'BTCBUSD' }).then((res)=> {
      //   console.log(res);
      // })
      const clean = client.ws.depth('ETHBTC', depth => {
        console.log("XX");
        console.log(depth)
      });
      clean()
    // }, 1000);
    // return () => clearInterval(interval);
  },[pair]);
  if(loading) return <Box className={classes.container+" "+classes.text_white}><HeaderTool />Loading Order Book From Binance</Box>;
  if(error) return <Box className={classes.container+" "+classes.text_white}>Error</Box>;
  function HeaderTool() {
    return (
      <Grid container className={classes.top_row+" "+classes.text_white} style={{display:"flex", alignItems:"center"}} >
        <Grid item xs={8} style={{fontSize:"20px"}}>
          Order Book
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} classes={{}} item xs={4}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="PAIR"
          value={pair}
          onChange={handleChange}
        >
          {pairlist.map((item, index)=><MenuItem value={item} key={index}><span className={classes.text_white}>{item}</span></MenuItem>)}
        </Select>
        </Grid>
      </Grid>
    );
  }
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

  function RowItem({item, color}) {
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
          <HeaderTool />
          <TopRow />
          {data&&data.asks.reverse().map((item, index) => (<RowItem item={item} color={classes.text_red} key={index}/>) )}
          <MiddleRow />
          {data&&data.bids.map((item, index) => (<RowItem item={item} color={classes.text_green} key={index}/>) )}
        </Box>)
}
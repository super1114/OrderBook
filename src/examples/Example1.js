import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Binance from 'binance-api-node';
const client = Binance();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text_right: {
    textAlign: "right"
  },
  header_text: {
    color: "#868e9b",
    fontSize: "12px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
    fontWeight: "bold"
  },
  text_lg: {
    fontSize:"20px",
    fontFamily: "BinancePlex,Arial,sans-serif!important",
    color: "#b5bbc2",
  },
  container: {
    width: "400px",
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(()=> {
    client.book({ symbol: 'BTCUSDT',limit: 20 }).then((res) => {
      setData(res);
      console.log(res);
    }).catch((error)=> {
      setError(error);
    }).finally(()=>{
      setLoading(false);
    })
  },[]);
  if(loading) return "loading";
  if(error) return "error";
  function TopRow() {
    return (
      <Grid container spacing={1}>
        <Grid className={classes.header_text} item xs={4} >
          Price(BUSD)
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          Amount(BTC)
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          Total
        </Grid>
      </Grid>
    );
  }
  function MiddleRow() {
    return (
      <Grid container spacing={1}>
        <Grid className={classes.text_lg} item xs={8} >
          62,264.02
          <span>$62,264.02</span>
        </Grid>
        <Grid className={classes.header_text+" "+classes.text_right} item xs={4}>
          More
        </Grid>
      </Grid>
    );
  }

  function RowItem({item, color}) {
    return <Grid container spacing={1}>
            <Grid item xs={4} className={color}>
              {item.price}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
            {item.quantity}
            </Grid>
            <Grid className={classes.text_right+" "+classes.text_white} item xs={4}>
              xs=8
            </Grid>
          </Grid>
  }
return  (<Box className={classes.container}>
          <TopRow />
          {data&&data.asks.map((item, index) => (<RowItem item={item} color={classes.text_red} key={index}/>) )}
          <MiddleRow />
          {data&&data.bids.map((item, index) => (<RowItem item={item} color={classes.text_green} key={index}/>) )}
        </Box>)
   
}
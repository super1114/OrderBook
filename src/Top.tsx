import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeContext } from "./Context";
import useStyles from './Style';
export default function OrderBook() {
    const classes = useStyles();
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
    const context = React.useContext(ThemeContext);
    const handleChange = (event:any) => {
        context.setPair(pairlist[event.target.value]);
    }
    function HeaderTool() {
        return (
        <Grid container className={classes.top_row+" "+classes.text_white} style={{display:"flex", alignItems:"center"}} >
            <Grid item xs={8} style={{fontSize:"20px"}}>
            Order Book
            </Grid>
            <Grid className={classes.header_text+" "+classes.text_right} classes={{}} item xs={4}>
                <Select
                    onChange={handleChange}
                    value={context.pair.no}
                >
                    {pairlist.map((item, index)=><MenuItem value={pairlist.indexOf(item)} key={index}><span className={classes.text_white}>{item.name}</span></MenuItem>)}
                </Select>
            </Grid>
        </Grid>
        );
    }
    return  ( <Box className={classes.container}>
                <HeaderTool />
            </Box>)
}
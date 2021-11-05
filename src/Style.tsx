import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => createStyles({
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

  export default useStyles;
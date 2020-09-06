import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const LabelFont="'Roboto', sans-serif"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[500],
    },
    action:{
      selected:"rgb(254,239,195)",
    }
  },
  typography: {
    tab:{
      fontFamily:"Roboto",
      fontWeight:700,
      fontSize:10,
      // minWidth:10,
      textTransform:"none"
    },
    labels:{
      fontFamily:LabelFont,
      fontWeight:500,
      textTransform:"none",
      fontSize:13,
      color:"black"
    },  
      addnote:{
      fontFamily:LabelFont,
      fontWeight:500,
      textTransform:"none",
      fontSize:12,
      color:"black"
    },
        // fontFamily: [
        //   '-apple-system',
        //   'BlinkMacSystemFont',
        //   '"Segoe UI"',
        //   'Roboto',
        //   '"Helvetica Neue"',
        //   'Arial',
        //   'sans-serif',
        //   '"Apple Color Emoji"',
        //   '"Segoe UI Emoji"',
        //   '"Segoe UI Symbol"',
        // ].join(','),
      },
});

export default theme; 
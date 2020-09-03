import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

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
      fontFamily:"Raleway",
      fontWeight:700,
      fontSize:"1rem",
      minWidth:10,
      textTransform:"none"
    },
    labels:{
      fontFamily:"Pacifico",
      textTransform:"none",
      fontSize:"1rem",
      color:"white"
    }
  }
});

export default theme; 
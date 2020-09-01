import React,{useContext} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MessageContext from "../components/messagecontext";


function Alert(props) {

    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function SnackBar(props) {
  const messages = useContext(MessageContext);
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));
      
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    console.log(messages)
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      messages.setSnackBar(false)
      // setOpen(false);
    };
    return (
        <Snackbar open={messages.showSnakBar} autoHideDuration={3000} onClose={handleClose} 
        onClick={() => {messages.setSnakBar(false)}}
        > 
        <Alert onClose={handleClose} severity={props.type}>
    {props.message}
        </Alert>
      </Snackbar>
    )
}

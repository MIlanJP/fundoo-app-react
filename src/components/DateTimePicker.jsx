import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {updateReminderById} from '../redux'
import OutsideClickHandler from "react-outside-click-x";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePicker(props) {
  const classes = useStyles();
    const dispatch = useDispatch();
  return (
      <OutsideClickHandler onOutsideClick={()=>{
        if(props.displayDateTimePicker===true){
            props.setDisplayDateTimePicker(false)
        }
      }} >
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Reminder"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        
      />
      <Button 
      onClick={(e)=>{
       const time= e.currentTarget.previousElementSibling.lastElementChild.firstElementChild.value
       props.setDisplayDateTimePicker(false)
      dispatch( updateReminderById(time,props.userData))
      }}
      >Save</Button>
           <Button 
      onClick={(e)=>{
       props.setDisplayDateTimePicker(false)

      }}
      >Cancel</Button>
    </form>
    </OutsideClickHandler>
  );
}

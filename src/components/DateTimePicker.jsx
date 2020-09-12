import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import labelservice from '../services/labelservice'
import {Button } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {updateReminderById} from '../redux'
import OutsideClickHandler from "react-outside-click-x";
import { useState } from 'react';

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
  console.log(props)
    const today=new Date()
    let month=''
    if(today.getMonth()>9){
        month=parseInt( today.getMonth())+1
    }else{
        month=`0${parseInt( today.getMonth())+1}`
    }
    const d=`${today.getFullYear()}-${month}-${today.getDate()}T08:00`
    console.log(d)
    const [date,setDate]=useState(Date.now())
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
        defaultValue={d}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
            setDate(e.currentTarget.value)
            console.log(e.currentTarget.value)
        }}
        
      />
      <Button 
      onClick={(e)=>{
       const time= e.currentTarget.previousElementSibling.lastElementChild.firstElementChild.value
       props.setDisplayDateTimePicker(false)
       const data={
        noteIdList:[props.userData],
        reminder:time
       }
       labelservice.addUpdateReminderNotes(data).then(()=>{
      dispatch( updateReminderById(time,props.userData))
       })
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

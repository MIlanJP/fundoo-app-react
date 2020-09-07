import React from "react";
import { IconButton, Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux'
import {addNoteAfterClick,showListFeature} from '../redux'
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
 function CreateNoteTabBeforeClick(props){
  const dispatch=  useDispatch()
  const useStyles = makeStyles((theme) => ({
    addNotePortion: {
      height: "43px",
      borderRadius:'15px',
      marginRight:"auto",
      position: "relative",
      width:"47%",
      right:'calc( 40% - 200px  )',
      top:"28px",
    },
    paper: {
      display: "flex",
      height:'100%',
      flexDirection: "row",
      borderRadius:'8px',
      boxShadow:'0px 2px 5px 2px rgba(146, 144, 144, 0.54)', 
      paddingRight:'10px',

    },
    iconButton:{
      margin:'0 2px 0 2px'
    },
    
    input: {
      ...theme.typography.addnote,
      width:'100%',
      fontSize:16,
      margin:"2px 0 0 0",
      borderRadius:'15px',
      paddingLeft:"15px",
    },

  }));
  const classes = useStyles();


  return (

      <Paper
        component="form"
        className={` ${classes.paper}  `}
        boxShadow={10}
      >
        <InputBase
        placeholder=' Take a note...'
          fullWidth
          className={classes.input}
          inputProps={{ "aria-label": "search content" }}
          onFocus={() => {
            dispatch(addNoteAfterClick())
          }}

        />
        <IconButton  aria-label="search"
        onClick={()=>{
dispatch(showListFeature())
dispatch(addNoteAfterClick())

        }}
        >
          <CheckBoxOutlinedIcon className={classes.iconButton} />
        </IconButton>
        <IconButton className={classes.iconButton} aria-label="menu">
          <BrushOutlinedIcon />
        </IconButton>{" "}
        <IconButton className={classes.iconButton} aria-label="menu">
          <CropOriginalOutlinedIcon />
        </IconButton>
      </Paper>

  );
}


export default CreateNoteTabBeforeClick;


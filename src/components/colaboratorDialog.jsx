import React from 'react';
import ClearIcon from "@material-ui/icons/Clear";
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {collaboratorsPopUp,toggleCollaboratorSearch} from '../redux'
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { IconButton } from '@material-ui/core';
import SearchBox from './searchCollaborator'

const emails = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = makeStyles({
  avatar: {
    backgroundColor: "rgb(178,178,255)",
    color: "rgb(94,94,252)",
    border:' groove 1px  rgb(87,87,255)'
  },
  root:{
    width:'70vw',
  },
  collaborators:{
    display:'flex',
    flexDirection: 'column'
  },
  title:{
    // borderBottomStyle:'inset',
    borderBottom:'inset 1px'
  },
  collaboratorsName:{
    display:'flex',
    fontSize: '.85rem',
    flexDirection: 'column',
    textTransform:'capitalize',
    marginTop:'0px',
    marginBottom:'0px',
  },
  collaboratorsEmail:{
    display:'flex',
    flexDirection: 'column',
    color:'rgb(134,134,134)',
  },
  textRoot:{
    marginTop:'0px',
    marginBottom:'0px',
  },clearButton:{
    position:'absolute',
    right:"5px",
  },
});

export default function ColaboratorDialogBox() {
const collabData=useSelector((state) => state.notes.collaboratorData)
const searchCollaborator=useSelector((state) => state.notes.searchCollaborator)

const emailId=useSelector((state) => state.labels.emailId)
const firstName=useSelector((state) => state.labels.firstName)
const lastName=useSelector((state) => state.labels.lastName)

    const dispatch=useDispatch();
  const classes = useStyles();

const displayCollabPopUp=useSelector(state=>state.notes.collaboratorDisplay)
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={displayCollabPopUp}
    onBackdropClick={()=>{dispatch(collaboratorsPopUp(false))}}
    classes={{paperScrollPaper: classes.root}}
    >
      <DialogTitle id="simple-dialog-title" className={classes.title}  >Collaborators</DialogTitle>
      <List>
      <ListItem button  key={uuid()}  >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
               {firstName[0]}
              </Avatar>
            </ListItemAvatar>
            <div  className={classes.collaborators}  >
            <ListItemText primary={`${firstName} ${lastName} (Owner) `}  className={classes.collaboratorsName} classes={{root:classes.textRoot}}   />
            <ListItemText primary={emailId}  className={classes.collaboratorsEmail} classes={{root:classes.textRoot}} />
            </div>
          </ListItem>
        {collabData[0].collaborators.map((data) => {
      return    <ListItem button  key={uuid()}  >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
               { data.firstName[0]}
              </Avatar>
            </ListItemAvatar>
            <div  className={classes.collaborators}  >
            <ListItemText primary={`${data.firstName} ${data.lastName}`}  className={classes.collaboratorsName} classes={{root:classes.textRoot}}   />
            <ListItemText primary={data.email}  className={classes.collaboratorsEmail} classes={{root:classes.textRoot}} />

            </div>
            <IconButton className={classes.clearButton}>
                <ClearIcon  />
            </IconButton>
          </ListItem>
})}
      
      {
        !searchCollaborator?         <ListItem autoFocus button
        onClick={()=>{
          dispatch(toggleCollaboratorSearch(!searchCollaborator))
        }}
        >
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add Colaborators" />
      </ListItem>:<SearchBox

      />
      }

      </List>
    </Dialog>
  );
}



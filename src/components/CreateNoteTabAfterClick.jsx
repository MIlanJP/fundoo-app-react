import React, { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  Icon,
  SvgIcon,
  Button,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutsideClickHandler from "react-outside-click-x";
import qs from 'qs'
import { useDispatch } from "react-redux";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AddIcon from '@material-ui/icons/Add';
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import labelService from '../services/labelservice'
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import { useSelector } from "react-redux";
import {
  addNoteBeforeClick,
  fetchAllUserData,
  pinIt,
  unPinIt,
  hideListFeature,
  setDescriptList,
} from "../redux";
function CreateNoteTabAfterClick(props) {
  // const descriptionList = useSelector(
  //   (state) => state.notes.descriptionCheckBoxList
  // );

  const [onFocusText, setOnFocusText] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("");
  const [displayOnHover, setDisplayOnHover] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [pinnedStatus,setPinnedStatus] = useState(false);
  const dispatch = useDispatch();
  const addNote = useSelector((state) => state.addNoteFeature.addNote);
  const displayListFeature = useSelector(
    (state) => state.notes.displayListFeature
  );
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [color,setColor]=useState('#FFFFFF')
  const [checklist,setCheckList]=useState([{itemName:"",status:'open'}],)
  const useStyles = makeStyles((theme) => ({
    addNotePortion: {
      borderRadius: "15px",
      position: "relative",
      display: "flex",
      flexDirection: "row",

      //   left: "-27.25%",
      zIndex: "-2",
    },
    paper: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px 2px rgba(146, 144, 144, 0.54)",
      paddingRight: "10px",
      zIndex: 3,
    },
    iconButton: {
      margin: "0 2px 0 4px",
      padding: "5px 5px 5px px ",
    },
    bottomIcons: {
      height: "17px",
      width: "17px",
      color: "black",
    },
    closeButton: {
      position: "absloute",
      left: "35%",
      outline: "none",
      boxShadow: "none",
      background: "white",
      textTransform: "Capitalize",
    },
    input: {
      ...theme.typography.addnote,
      width: "100%",
      fontSize: 16,
      margin: "2px 0 0 0",
      borderRadius: "15px",
      paddingLeft: "15px",
    },
    iconColumn: {
      marginTop: "10px",
    },
    titleInput: {
      padding: "5px 20px 5px 10px",
      margin: "2px 0 5px 5px",
      width: "80%",
    },
    listItem: {
      width: "100%",
      height: "25px",
      marginLeft: "5px",
      boxShadow: " 0 0 1px 1px",
      //   borderBottomStyle: 'inset',
      //   borderTopStyle: 'groove'
    },

    listInput: {
      width: "90%",
    },
    pinIcon: {
      position: "absolute",
      right: "10px",
      top: "10px",
      width: "45px",
      height: "45px",
      color: "black",
      background: "white",
    },
  }));
  const classes = useStyles();
  const unPinned = (
    <IconButton
      className={classes.pinIcon}
      onClick={() =>setPinnedStatus(!pinnedStatus)}
      onPointerOut={() => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M11 17h2v5l-2 2v-7zm7-2h-12c0-3.128.091-4.744 1.874-7.276.551-.783.915-1.3.915-2.373 0-2.372-1.789-1.695-1.789-5.351h10c0 3.616-1.789 3.005-1.789 5.35 0 1.073.364 1.59.915 2.374 1.785 2.535 1.874 4.154 1.874 7.276zm-9.968-2h7.936c-.298-4.376-2.756-4.142-2.756-7.649-.001-1.605.521-2.351 1.271-3.351h-4.966c.75 1 1.272 1.745 1.272 3.35 0 3.487-2.46 3.29-2.757 7.65z" />
      </svg>
    </IconButton>
  );

  const pinned = (
    <IconButton className={classes.pinIcon} onClick={() => setPinnedStatus(!pinnedStatus)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M11 17h2v5l-2 2v-7zm3.571-12c0-2.903 2.36-3.089 2.429-5h-10c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-6.709-3.429-6.229-3.429-10z" />
      </svg>
    </IconButton>
  );

  const inputsToAddLabel = displayListFeature ? (
    <List>
      {checklist.map((descriptions, index) => {
        return (
          <ListItem className={classes.listItem}
          onMouseOver={(e) => {
            // setDisplayOnHover(true)
            setShowClearIcon(e.currentTarget.firstChild.nextSibling.firstChild.value)

          }}
          onMouseLeave={(e) => {
            // setDisplayOnHover(false)
            setShowClearIcon('')
          }}
          >
            <ListItemIcon>
            {index===checklist.length-1?
            <AddIcon/>    :
            <Checkbox
            edge="start"
              checked={descriptions.status!=='open'}
            tabIndex={-1}
            disableRipple
              inputProps={{ 'aria-labelledby': index }}
              onClick={() =>{
                if(descriptions.status==='open'){
                  const list=checklist.map(data=>{
                    if(data.itemName===descriptions.itemName){
                      data.status='close'
                    }
                    return data
                  })
                  setCheckList([...list])
                }else{
                  const list=checklist.map(data=>{
                    if(data.itemName===descriptions.itemName){
                      data.status='open'
                    }
                    return data
                  })
                  setCheckList([...list])
                }
              }}
          />
        }

            </ListItemIcon>
            <InputBase
              className={classes.listInput}
              placeholder="List Item"
              value={descriptions.itemName}
              onChange={(e) => {
                setOnFocusText(e.currentTarget.value);
                let descriptList = checklist;
                descriptList[index].itemName = e.currentTarget.value;
                if (
                  index === checklist.length - 1 &&
                  e.currentTarget.value !== ""
                ) {
                  descriptList.push({itemName:"",status:"open"});
                  setCheckList([...descriptList]);
                } else if (
                  index === checklist.length - 2 &&
                  e.currentTarget.value === ""
                ) {
                  descriptList.pop();
                  setDescriptList([...descriptList]);
                } else {
                  setDescriptList([...descriptList]);
                }
              }}
              onFocus={(e) => {
                setOnFocusText(e.currentTarget.value);
              }}
            />
            {/* <IconButton className={classes.iconButton} aria-label="menu"> */}

            {onFocusText === descriptions.itemName || showClearIcon===descriptions.itemName ? (
              <ClearIcon
                className={classes.bottomIcons}
                onClick={() => {
                  if (index !== checklist.length - 1) {
                    const list=checklist.filter(data=>data.itemName!==descriptions.itemName)
                    setCheckList([...list])
                  }
                }}
              />
            ) : null}

            {/* </IconButton> */}
          </ListItem>
        );
      })}
    </List>
  ) : (
    <InputBase
      multiline={true}
      rowsMax={20}
      value={description}
      placeholder=" Take a note..."
      fullWidth
      onChange={(e)=>{
        setDescription(e.currentTarget.value)
      }}
      className={classes.input}
      inputProps={{ "aria-label": "search content" }}
    />
  );

  return (
    <OutsideClickHandler
      className={classes.addNotePortion}
      onOutsideClick={() => {
        if (addNote !== false) {
          dispatch(addNoteBeforeClick());
          dispatch(hideListFeature());
        }
      }}
    >
      <Paper component="form" className={` ${classes.paper}  `} boxShadow={10}>
        {pinnedStatus ? pinned : unPinned}
        <InputBase
          placeholder=" Title"
          fullWidth
          value={title}
          onChange={(e) => {
              setTitle(e.currentTarget.value)
          
          }}
          className={classes.titleInput}
          inputProps={{ "aria-label": "search content" }}
        />
        {inputsToAddLabel}

        <div className={classes.iconColumn}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <AddAlertOutlinedIcon className={classes.bottomIcons} />
          </IconButton>

          <IconButton className={classes.iconButton} aria-label="menu">
            <PersonAddOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <PaletteOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <CropOriginalOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu"
          onClick={()=>{
            setIsArchived(!isArchived)
          }}>
            <ArchiveOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MoreVertOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <UndoOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <Button
            variant="contained"
            className={classes.closeButton}
            onClick={() => {
              let data={}
              if(checklist[0].itemName!==''){
                let list=checklist;
                list=list.pop()
                data={
                  title,
                  description,
                  noteCheckLists:qs.stringify( checklist) ,
                  isPined:pinnedStatus,
                  color,
                  isArchived,
  
                }
              }else{
                data={
                  title,
                  description,
                  isPined:pinnedStatus,
                  color,
                  isArchived,
  
                }
              }
              
              if(title!==''|| description!==''||checklist[0].itemName!==''){
                labelService.addNote(data).then(response =>{
                  dispatch(addNoteBeforeClick());
                  dispatch(fetchAllUserData());
                })
              }else{
                dispatch(addNoteBeforeClick());
              }

            }}
          >
            Close
          </Button>
        </div>
      </Paper>
    </OutsideClickHandler>
  );
}

export default CreateNoteTabAfterClick;

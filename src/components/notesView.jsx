import React, { useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  ListItem,
  Checkbox,
  ListItemIcon,
useTheme ,
  List,
  useMediaQuery,
} from "@material-ui/core";
import NotesViewOnClick from './NotesViewOnClick'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core/styles";
// import OutsideClickHandler from "react-outside-click-x";
import { useDispatch,useSelector } from "react-redux";
import {setPinnedStatus,notesViewOnClick} from '../redux'
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AddIcon from '@material-ui/icons/Add';
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
function LabelView(props) {
  const theme = useTheme();
  const matchesExtraSmallSize = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch=useDispatch();
const [tickIcon,setTickIcon]=useState(false)
  const [onFocusText, setOnFocusText] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("");
  const [displayIconOnHover, setDisplayIconOnHover] = useState(true);
  // const [,setNotesViewOnClick] = useState(false)



  const useStyles = makeStyles((theme) => ({
    addNotePortion: {
      borderRadius: "15px",
      position: "relative",
      display: "flex",
      flexDirection: "row",
      padding:"15px 7px 15px 7px ",
      width:matchesExtraSmallSize ? '100%': '225px',
      //   left: "-27.25%",
  
    },
    paper: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      // borderStyle: "inset",
      border:tickIcon? "solid 2px":'none',
      padding:"0 0 35px 0",
      borderRadius: "8px",
      boxShadow: displayIconOnHover? '1px 1px 1px 2px rgba(146, 144, 144, 0.54)': "0px 2px 2px 4px rgba(146, 144, 144, 0.54)",
      paddingRight: "10px",
      minHeight:"100px"
    },
    iconButton: {
      padding: "10px",
 
    },
    bottomIcons: {
      position:"relative",
      top:"-5px",
      height: "17px",
      width: "17px",
      // color: "gray",
    },
    closeButton: {
      position: "relative",
    //   left: "35%",
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
      position:"absolute",
      bottom:"5px",
      padding: "1px",
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
      top: "20px",
      width: "45px",
      height: "45px",
      color: "black",
      background: "white",
    },
    tickIcon:{
      position: "absolute", 
      zIndex:"5",
      top:"1px",
      left:'-5px',
      color:'black',
      cursor:'pointer',
      // pointer:'cursor'
      // background:'white',
    },

  }));
  const classes = useStyles();
  const unPinned = (
    <IconButton
      className={classes.pinIcon}
      onClick={() => {dispatch(setPinnedStatus(true,props.userData.id))}}
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
    <IconButton className={classes.pinIcon}
    onClick={() => {dispatch(setPinnedStatus(false,props.userData.id))}}

    
    >
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

  const inputsToAddLabel = typeof props.userData.noteCheckLists !== 'undefined' &&props.userData.noteCheckLists.length>0 ? (
    <List>
      {props.userData.noteCheckLists.map((description, index) => {
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
            {index===props.userData.noteCheckLists.length-1?
            <AddIcon/>    :
            <Checkbox
            edge="start"
            //   checked={true}
            tabIndex={-1}
            disableRipple
              inputProps={{ 'aria-labelledby': index }}
          />
        }

            </ListItemIcon>
            <InputBase
              className={classes.listInput}
              placeholder="List Item"
              value={description.itemName}
              onClick={(e) =>{
                console.log(props.userData)
                dispatch(notesViewOnClick(true, props.userData))
              }}
              onFocus={(e) => {
                setOnFocusText(e.currentTarget.value);
              }}
            />
            {/* <IconButton className={classes.iconButton} aria-label="menu"> */}

            {onFocusText === description.itemName || showClearIcon===description.itemName ? (
              <ClearIcon
                className={classes.bottomIcons}
                // onClick={() => {
                //   if (index !== descriptionList.length - 1) {
                //     let descriptList = descriptionList.filter(
                //       (list) => list !== description
                //     );
                //   }
                // }}
              />
            ) : null}

          </ListItem>
        );
      })}
    </List>
  ) : (
    <InputBase
        value={props.userData.description}
      multiline={true}
      rowsMax={20}
      placeholder=" Take a note..."
      fullWidth
      className={classes.input}
      inputProps={{ "aria-label": "search content" }}
      onClick={()=>{
        dispatch(notesViewOnClick(true, props.userData))
      }}
    />
  );

  return (
   <div
      className={classes.addNotePortion}
      onMouseOver={(e) => {
        setDisplayIconOnHover(false)
      }}
      onMouseLeave={(e) => {
        setDisplayIconOnHover(true)
      }}
   >
      {!displayIconOnHover|| tickIcon ?    
      < CheckCircleIcon className={classes.tickIcon} onClick={(e) =>{setTickIcon(!tickIcon)}}  />
      : null}

      <Paper component="form" className={` ${classes.paper}  `} boxShadow={10}

      >
        {props.userData.isPined ? !displayIconOnHover&&pinned : !displayIconOnHover&&unPinned}
        <InputBase
          placeholder=" Title"
          fullWidth 
          value={props.userData.title}
          className={classes.titleInput}
          inputProps={{ "aria-label": "search content" }}
          onClick={(e) =>{
            console.log(props.userData)
            dispatch(notesViewOnClick(true, props.userData))
          }}
        />
        {inputsToAddLabel}
      {!displayIconOnHover?    <div className={classes.iconColumn}>
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
          <IconButton className={classes.iconButton} aria-label="menu">
            <ArchiveOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MoreVertOutlinedIcon className={classes.bottomIcons} />
          </IconButton>

        </div>:null}
     
      </Paper>
    </div>

  );
}

export default LabelView;

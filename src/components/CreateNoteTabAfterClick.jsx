import React from "react";
import {
  IconButton,
  Paper,
  InputBase,
  Icon,
  SvgIcon,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutsideClickHandler from "react-outside-click-x";
import { useDispatch } from "react-redux";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import { useSelector } from "react-redux";
import { addNoteBeforeClick, pinIt, unPinIt } from "../redux";
function CreateNoteTabAfterClick(props) {
  const pinnedStatus = useSelector((state) => state.pinFeature.pinNote);
  const dispatch = useDispatch();
  const addNoteFeature = useDispatch();
  const addNote = useSelector((state) => state.addNoteFeature.addNote);
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
      position: "relative",
      left: "35%",
     outline:"none",
     boxShadow:"none",
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
    // background: {
    //   position: "absolute",
    //   height: "200vh",
    //   left:"50vw",
    //   width: "110vw",
    //   color:'transparent',
    //   background:"transparent",
    //   cursor:"pointer"
    // },
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
      onClick={() => dispatch(pinIt())}
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
    <IconButton className={classes.pinIcon} onClick={() => dispatch(unPinIt())}>
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

  return (
    <OutsideClickHandler
      className={classes.addNotePortion}
      onOutsideClick={() => {
        console.log(addNote,"Printing")
          if(addNote!==false){
            addNoteFeature(addNoteBeforeClick());
          }
      }}
    >
      <Paper component="form" className={` ${classes.paper}  `} boxShadow={10}>
        {pinnedStatus ? pinned : unPinned}
        <InputBase
          placeholder=" Title"
          fullWidth
          className={classes.titleInput}
          inputProps={{ "aria-label": "search content" }}
        />
        <InputBase
          multiline={true}
          rowsMax={20}
          placeholder=" Take a note..."
          fullWidth
          className={classes.input}
          inputProps={{ "aria-label": "search content" }}
        />
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
          <IconButton className={classes.iconButton} aria-label="menu">
            <ArchiveOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MoreVertOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <UndoOutlinedIcon className={classes.bottomIcons} />
          </IconButton>
          <Button variant="contained" className={classes.closeButton}
                onClick={() => {
                    addNoteFeature(addNoteBeforeClick());
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

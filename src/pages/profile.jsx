import React, { useState, useContext, useEffect } from "react";
import MessageContext from "../components/messagecontext";
import Header from "../components/header";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Route, useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { fetchUserIdByEmail, fetchAllUserData, fetchLabelList,UpdateLabelonChange,notesViewOnClick } from "../redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Label from "../components/label";
import NotesViewOnClick from '../components/NotesViewOnClick';
import Bin from "../components/bin";
import LabelIcon from "@material-ui/icons/Label";
import { makeStyles } from "@material-ui/core/styles";
import Notes from "../components/notes";
import Reminder from "../components/reminder";
import Archieve from "../components/archieve";
import Drawer from "../components/drawer";
import OutsideClickHandler from "react-outside-click-x";
import styles from "../scss/profile.module.scss";
import { useSelector, useDispatch } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  ListItem,
  List,
  InputBase,
  IconButton,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import labelservice from "../services/labelservice";

export default function Profile() {
  // const messages = useContext(MessageContext);
  const theme = useTheme();
  const matchesExtraSmallSize = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSmallSize = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMediumSize = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLargeSize = useMediaQuery(theme.breakpoints.down("lg"));
  const history = useHistory();
  const dispatch = useDispatch();
  // const loadingStatus = useSelector((state) => state.labels.loading);
  // const loadedUserData = useSelector((state) => state.labels.userData);
  const loadedLabels = useSelector((state) => state.labels.labelList);
  const userId = useSelector((state) => state.labels.userID);
  // const addNoteFeature = useDispatch();
  // const addNote = useSelector((state) => state.addNoteFeature.addNote);

  const [routesPages] = useState([Notes, Reminder, Label, Archieve, Bin]);
  const [routesName] = useState([
    "Notes",
    "Reminder",
    "Label",
    "Archieve",
    "Bin",
  ]);
  const noteViewOnClick=useSelector((state=>state.notes.notesViewOnClick))
  const [labels, setLabels] = useState([]);
  const labelss = useSelector((state) => state.labels.labelList);
  const onlyLabels = useSelector((state) => state.labels.onlyLabelsList);
  const [tabs, setTabs] = useState([
    "Notes",
    "Reminder",
    ...labels,
    "Edit Labels",
    "Archieve",
    "Bin",
  ]);
  const startTabs = ["Notes", "Reminder"];
  const endTabs = ["Edit Labels", "Archieve", "Bin"];

  const [heading, setHeading] = useState("Keep");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editLabelsPopUpDisplay, setEditLabelsPopUpDisplay] = useState(false);
  const [popTargetLabelValue, setpopUpTargetLabelValue] = useState(false);
  const [focusValue, setFocusValue] = useState("");
  const [popUpTargetAutoFocus, setPopUpTargetAutoFocus] = useState(null);
  const [popUpTargetAutoFocusAddNew, setPopUpTargetAutoFocusAddNew] = useState(
    false
  );
  const [
    popUpTargetAutoFocusAddNewValue,
    setPopUpTargetAutoFocusAddNewValue,
  ] = useState("");

  const useStyles = makeStyles((theme) => ({
    PopUpLabel: {
      textAlign: "center",
    },
    dialogBox: {
      zIndex: 25,
    },
    popUpListRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    EditDoneIcon: {},
    popUpBackgorund: {
      width: "100vw",
      height: "100vh",
      background: "rgb(145,145,145)",
      display: editLabelsPopUpDisplay ? "" : "none",
    },
    noteViewOnClick:{
      // position:'absolute'
    },dialogContent:{
      minWidth:"350px",
      width:matchesLargeSize? '40vw': matchesSmallSize? '100vw':matchesExtraSmallSize? '500px':"",
      minHeight:'150px',
    },dialogBlock:{

      width:"75vw",

    },
    dialogWidth:{
      width:'75vw',
      backgroundColor: 'rgb(236,236,236)'
        },
        dialogScrollPaper:{

          background:'rgba(255, 255, 255, 0.65)',
        },
        dialoggScrollPaper:{
          position: "relative",
          top: '-70px',
          borderRadius:'8px',
        },
  }));

  useEffect(() => {
    dispatch(fetchAllUserData());

    dispatch(fetchLabelList());
    dispatch(fetchUserIdByEmail(localStorage.getItem("emailId")));
    console.log(loadedLabels);
    if (localStorage.getItem("labels") !== null) {
      let restoredLabels = [];
      restoredLabels = [...JSON.parse(localStorage.getItem("labels"))];
      let restoreTabs = [];
      restoreTabs.push(...startTabs, ...restoredLabels, ...endTabs);
      setLabels([...restoredLabels]);
      setTabs([...restoreTabs]);
    }
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.Label}>
      <Header
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        heading={heading}
      />
      <div className={styles.drawerLayout}>
        <Drawer
          listOfLabels={tabs}
          showDrawer={showDrawer}
          setHeading={setHeading}
          setShowDrawer={setShowDrawer}
          setEditLabelsPopUpDisplay={setEditLabelsPopUpDisplay}
          editLabelsPopUpDisplay={editLabelsPopUpDisplay}
          labels={labels}
          setLabels={setLabels}
        />
      </div>

      <div className={styles.pageSize}>
        <Route exact path="/profile" component={Notes} />
        {routesPages.map((PageComponent, index) => {
          if (index !== 2 && index !== 0) {
            return (
              <Route
                className="pageRoutes"
                key={routesName[index]}
                exact
                path={`/profile/${routesName[index]}`}
                component={PageComponent}
              />
            );
          } else {
            if (index === 2 && labelss.length > 0) {
              const collectLabel = [];
              labelss.forEach((data) => {
                collectLabel.push(
                  <Route key={uuid()} exact path={`/profile/label/${data}`}>
                    <PageComponent labelName={data} />
                  </Route>
                );
              });
              return collectLabel;
            }
          }
        })}
      </div>
      {editLabelsPopUpDisplay ? (
        <Dialog
        TransitionComponent='Zoom'
          aria-labelledby="simple-dialog-title"
          open={editLabelsPopUpDisplay}
          className={classes.dialogBox}
          onBackdropClick={()=>{
            setEditLabelsPopUpDisplay(false)
           }}
        >
          <DialogTitle id="simple-dialog-title" className={classes.PopUpBox}>
            <Typography variant="button" className={classes.PopUpLabel}>
              Edit Labels!!
            </Typography>
            <IconButton
              onClick={() => {
                setEditLabelsPopUpDisplay(!editLabelsPopUpDisplay);
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </DialogTitle>

          <List>
            <ListItem autoFocus input>
              <IconButton>
                <AddOutlinedIcon />
              </IconButton>
              <InputBase
                placeholder="Create New Labels"
                value={popUpTargetAutoFocusAddNewValue}
                onFocus={() => {
                  setPopUpTargetAutoFocusAddNew(true);
                }}
                onChange={(e) => {
                  setPopUpTargetAutoFocusAddNewValue(e.currentTarget.value);
                }}
                onLoad={(e) => {
                  console.log(
                    e.parentElement.parentElement.parentElement.parentElement
                      .parentElement,
                    "Printing"
                  );
                }}
              />
              {popUpTargetAutoFocusAddNew ? (
                <IconButton
                  onClick={() => {
                    if (
                      popUpTargetAutoFocusAddNewValue !== "" &&
                      !tabs.includes(popUpTargetAutoFocusAddNewValue)
                    ) {
                      const data = {
                        label: popUpTargetAutoFocusAddNewValue,
                        isDeleted: false,
                        userId: userId,
                      };
                      labelservice.addLabel(data);
                      dispatch(fetchLabelList());
                      let items = [...labelss];
                      items.push(popUpTargetAutoFocusAddNewValue);
                      localStorage.setItem(
                        "labels",
                        JSON.stringify(onlyLabels.label)
                      );

                      setLabels([...items]);
                      let totalItems = [];
                      totalItems.push(...startTabs, ...items, ...endTabs);
                      setTabs([...totalItems]);
                      setPopUpTargetAutoFocusAddNewValue("");
                    } else if (popUpTargetAutoFocusAddNewValue === "") {
                    } else {
                    }
                  }}
                >
                  <DoneIcon />
                </IconButton>
              ) : null}
            </ListItem>
            {onlyLabels.map((text, index) => (
              <ListItem
                autoFocus={text.label === popUpTargetAutoFocus}
                button
                className={classes.popUpListRow}
                onMouseOver={(e) => {
                  let name =
                    e.currentTarget.firstElementChild.nextElementSibling
                      .firstElementChild.value;
                  setpopUpTargetLabelValue(name);
                }}
                onMouseLeave={() => {
                  setpopUpTargetLabelValue(null);
                }}
              >
                {popTargetLabelValue === text.label ||
                focusValue === text.label ? (
                  <IconButton
                    onClick={(e) => {
                      labelservice.deleteLabel(text.id)
                      dispatch(fetchLabelList());
                      let name =
                        e.currentTarget.nextElementSibling.firstElementChild
                          .value;
                      let items = [...labels];
                      let itemsPresent = items.filter((item) => {
                        return item !== name;
                      });
                      setLabels([...itemsPresent]);
                      localStorage.setItem(
                        "labels",
                        JSON.stringify(itemsPresent)
                      );
                      let totalItems = [];
                      totalItems.push(
                        ...startTabs,
                        ...itemsPresent,
                        ...endTabs
                      );
                    
                      let location = window.location.pathname;
                      let labelLocation = location.split("/label/")[1];
                      labelLocation = decodeURI(labelLocation);
                      if (
                        location.includes("/label/") &&
                        name === labelLocation
                      ) {
                        setHeading("Keep");
                        history.push("/profile");
                      }
                    }}
                    
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <LabelIcon />
                  </IconButton>
                )}
                <InputBase
                  value={text.label}
                  onChange={(e) => {
                    const items = [...labels];
                    let item = items[index];
                    item = e.currentTarget.value;
                    items[index] = item;
                    setLabels([...items]);
                    setFocusValue(e.currentTarget.value);
                    let totalItems = [];
                    totalItems.push(...startTabs, ...items, ...endTabs);
                    setTabs([...totalItems]);
                    dispatch(UpdateLabelonChange(text.id,e.currentTarget.value))

                  }}
                  onFocus={(e) => {
                    setFocusValue(e.currentTarget.value);
                    if (popUpTargetAutoFocusAddNewValue === "") {
                      setPopUpTargetAutoFocusAddNew(false);
                    }
                  }}
                  onBlur={(e) => {
                    setFocusValue(null);
                    if(text.label!==popUpTargetAutoFocusAddNewValue){
                      const data={
                        label:e.currentTarget.value
                      }
                      labelservice.updateLabel(text.id,data)
                      dispatch(fetchLabelList());
                      setHeading(e.currentTarget.value)
                    }
                  }}
                />
                {focusValue === text.label ? (
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton>
                    <EditIcon
                      className={classes.EditDoneIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        const name = (e.currentTarget.parentElement.parentElement.previousElementSibling.firstChild.autofocus =
                          "true");
                        setPopUpTargetAutoFocus(name);
                        if(text.label!==popUpTargetAutoFocusAddNewValue){
                          labelservice.updateLabel(text.id)
                          dispatch(fetchLabelList());
                        }
                      }}
                    />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Dialog>
      ) : // </div>
      null}
 {noteViewOnClick.condition?

 <Dialog open={noteViewOnClick.condition}
 onBackdropClick={()=>{
  dispatch(notesViewOnClick(false,{}));
 }}
 classes={{ container: classes.dialogScrollPaper,paperScrollPaper:classes.dialoggScrollPaper }}
 maxWidth='md'
 disableBackdropClick={true} className={styles.dialogBlock}   >
  <DialogContent className={classes.dialogContent} >  <NotesViewOnClick userData={noteViewOnClick.data} className={classes.noteViewOnClick}   />
  </DialogContent> </Dialog>
: null

}
    </div>
  );
}

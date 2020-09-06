import React, { useState, useContext, useEffect } from "react";
import MessageContext from "../components/messagecontext";
import Header from "../components/header";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Route ,useHistory} from "react-router-dom";
import uuid from "react-uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Label from "../components/label";
import Bin from "../components/bin";
import LabelIcon from "@material-ui/icons/Label";
import { makeStyles } from "@material-ui/core/styles";
import Notes from "../components/notes";
import Reminder from "../components/reminder";
import Archieve from "../components/archieve";
import Drawer from "../components/drawer";
import {addNoteBeforeClick} from '../redux'

import styles from "../scss/profile.module.scss";
import {useSelector ,useDispatch} from 'react-redux'


import {
  Dialog,
  DialogTitle,
  Typography,
  ListItem,
  List,
  InputBase,
  IconButton,
} from "@material-ui/core";

export default function Profile() {
  const messages = useContext(MessageContext);
  const history=useHistory()
  const addNoteFeature=  useDispatch()
  const addNote=useSelector(state=>state.addNoteFeature.addNote)

  const [routesPages] = useState([Notes, Reminder, Label, Archieve, Bin]);
  const [routesName] = useState([
    "Notes",
    "Reminder",
    "Label",
    "Archieve",
    "Bin",
  ]);
  // const [labels, setLabels] = useState(["Milan", "Milan1", "Milan3"]);
  const [labels, setLabels] = useState([]);
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
      // ...theme.typography.labels,
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
  }));

  useEffect(() => {
    if(localStorage.getItem('labels')!==null){
      let restoredLabels=[];
      restoredLabels=[...JSON.parse(localStorage.getItem('labels'))]
      let restoreTabs=[];
      restoreTabs.push(...startTabs,...restoredLabels,...endTabs)
     setLabels([...restoredLabels])
     setTabs([...restoreTabs])
    }

  }, []);

  const classes = useStyles();
  return (
    <div 
className={classes.Label}

    >
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

<div className={styles.pageSize} 
// onClick={()=>{

//   addNoteFeature(addNoteBeforeClick())
// }}

>
<Route exact path="/profile" component={Notes} />
      {routesPages.map((PageComponent, index) => {
        if (index !== 2 && index !== 0) {
          return (
            <Route
            className='pageRoutes'
              key={routesName[index]}
              exact
              path={`/profile/${routesName[index]}`}
              component={PageComponent}

            />
          );
        } else {
          if (index === 2 && labels.length > 0) {
            const collectLabel = [];
            labels.forEach((data) => {
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
        // <div
        //   className={styles.editPopupBackground}
        //   onClick={() => {
        //     // setEditLabelsPopUpDisplay(false)
        //   }}
        // >
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={editLabelsPopUpDisplay}
          // onClick={() => {
          //   setEditLabelsPopUpDisplay(!editLabelsPopUpDisplay);
          // }}
          className={classes.dialogBox}
          // onBlur={()=>{
          //   setEditLabelsPopUpDisplay(false)
          // }}
          disableBackdropClick={true}
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
              ,
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
                   console.log( e.parentElement.parentElement.parentElement.parentElement.parentElement,"Printing")
                }}
              />
              {popUpTargetAutoFocusAddNew ? (
                <IconButton
                  onClick={() => {
                    if (
                      popUpTargetAutoFocusAddNewValue !== "" &&
                      !tabs.includes(popUpTargetAutoFocusAddNewValue)
                    ) {
                      let items = [...labels];
                      items.push(popUpTargetAutoFocusAddNewValue);
                      localStorage.setItem('labels',JSON.stringify(items))
                      setLabels([...items]);
                      let totalItems = [];
                      totalItems.push(...startTabs,...items,...endTabs);
                      setTabs([...totalItems]);
                      setPopUpTargetAutoFocusAddNewValue("");
                    } else if (popUpTargetAutoFocusAddNewValue === "") {
                      // messages.setMessage("Empty Name cannot be given");
                      // messages.setSnackBar(true);
                    } else {
                      // messages.setMessage("Label Already present");
                      // messages.setSnackBar(true);
                    }
                   
                  }}
                >
                  <DoneIcon />
                </IconButton>
              ) : null}
            </ListItem>
            {labels.map((text, index) => (
              <ListItem
              autoFocus={text === popUpTargetAutoFocus}
                button
                className={classes.popUpListRow}
                onMouseOver={(e) => {
                  let name =
                    e.currentTarget.firstElementChild.nextElementSibling
                      .firstElementChild.value;
                  setpopUpTargetLabelValue(name);
                }}

                onMouseLeave={()=>{
                  setpopUpTargetLabelValue(null);
                }}

              >
                {popTargetLabelValue === text || focusValue === text ? (
                  <IconButton
                    onClick={(e) => {
                      let name =
                        e.currentTarget.nextElementSibling.firstElementChild
                          .value;
                      let items = [...labels];
                      let itemsPresent = items.filter((item) => {
                        return item !== name;
                      });
                      setLabels([...itemsPresent]);
                      localStorage.setItem('labels', JSON.stringify(itemsPresent));
                      let totalItems = [];
                      totalItems.push(...startTabs,...itemsPresent,...endTabs);
                      setTabs([...totalItems]);
    let location=window.location.pathname
   let labelLocation=location.split("/label/")[1]
   labelLocation=decodeURI(labelLocation)
   if( location.includes("/label/")&& name===labelLocation){
    setHeading('Keep')
    history.push('/profile')
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
                  value={text}
                  onChange={(e) => {
                    const items = [...labels];
                    let item = items[index];
                    item = e.currentTarget.value;
                    items[index] = item;
                    setLabels([...items]);
                    setFocusValue(e.currentTarget.value);
                    let totalItems = [];
                    totalItems.push(...startTabs,...items,...endTabs);
                    setTabs([...totalItems]);
                  }}
                  
                 
                  onFocus={(e) => {
                    setFocusValue(e.currentTarget.value);
                    if(popUpTargetAutoFocusAddNewValue==='')
                    {
                      setPopUpTargetAutoFocusAddNew(false)
                    }
                    
                  }}
                  onBlur={() => {
                    setFocusValue(null);
                  }}

                />
                {focusValue === text ? (
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
      {/* <div className={classes.popUpBackgorund}
      onClick={()=>{
        setEditLabelsPopUpDisplay(false)

      }}
      ></div> */}
    </div>
  );
}

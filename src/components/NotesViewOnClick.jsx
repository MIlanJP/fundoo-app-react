import React, { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  useTheme,
  Dialog,
  DialogContent,
  FormControlLabel,
  Button,
  ListItem,
  Checkbox,
  ListItemIcon,
  Card,
  useMediaQuery,
  List,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import _ from "lodash";
import labelservice from "../services/labelservice";
import ColorPallette from "./ColorPallette";

import DateAndTimePicker from "./DateTimePicker";
import { makeStyles } from "@material-ui/core/styles";
import OutsideClickHandler from "react-outside-click-x";
import { useDispatch } from "react-redux";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ClearIcon from "@material-ui/icons/Clear";
// import ColaboratorDialogBox from "./../components/colaboratorDialog";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AddIcon from "@material-ui/icons/Add";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useSelector } from "react-redux";
import { CalculateTime } from "./../util/calculateTime";

import {
  setDescriptList,
  notesViewOnClick,
  updateTitleFromId,
  updateDescriptionById,
  updateArchievedStatusById,
  setPinnedStatus,
  removeReminderById,
  collaboratorsPopUp,
  updateLabelForNote,
  removeLabelFromNote,
} from "../redux";
function NotesViewOnClick(props) {
  const descriptionList = useSelector(
    (state) => state.notes.descriptionCheckBoxList
  );
  const data = useSelector((state) =>
    state.notes.userData.filter((data) => data.id === props.userData.id)
  );
  const [onFocusText, setOnFocusText] = useState("");
  const theme = useTheme();

  const [showClearIcon, setShowClearIcon] = useState("");
  const onlyLabelsList = useSelector((state) => state.labels.onlyLabelsList);
  const [labelLists, setLabelLists] = useState(props.userData.noteLabels);
  const [open, setOpen] = React.useState(false);
  const noteViewOnClick = useSelector((state) => state.notes.notesViewOnClick);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const matchesExtraSmallSize = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSmallSize = useMediaQuery(theme.breakpoints.down("sm"));
  // const matchesMediumSize = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLargeSize = useMediaQuery(theme.breakpoints.down("lg"));
  const [reminderDate] = useState(props.userData.reminder[0]);
  // const [displayOnHover, setDisplayOnHover] = useState(false);
  const [openLabelsList, setOpenLabelsList] = React.useState(false);

  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const [displayColorPallette, setDisplayColorPallette] = useState(false);
  const [
    displayIconOnHoverClearButton,
    setDisplayIconOnHoverClearButton,
  ] = useState("");
  const displayListFeature = useSelector(
    (state) => state.notes.displayListFeature
  );
  const [title, setTitle] = useState(data[0].title);
  const [description, setDescription] = useState(data[0].description);
  const [displayDateTimePicker, setDisplayDateTimePicker] = useState(false);
  // const displayCollabPopUp = useSelector(
  //   (state) => state.notes.collaboratorDisplay
  // );

  let [dateSection] = "";
  let [timeSection] = "";
  let [timeGotOver] = "";

  if (typeof data[0].reminder !== "undefined" && data[0].reminder.length > 0) {
    const [date, time, over] = CalculateTime(reminderDate);
    dateSection = date;
    timeSection = time;
    timeGotOver = over;
  }
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  useEffect(() => {}, [props.data]);

  const useStyles = makeStyles((theme) => ({
    addingNotePortion: {
      borderRadius: "15px",
      position: " relative",
      height: "100%",
      // top: '0px',
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    paper: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      borderRadius: "8px",
      boxShadow: "none",
      background: props.userData.color,
      // paddingRight: "10px",
      paddingBottom: "80px",
    },
    iconButton: {
      margin: "0 2px 0 4px",
      padding: "5px 5px 5px px ",
    },
    clearIcons: {
      position: "relative",
      top: "3px",
    },
    bottomIcons: {
      height: "17px",
      width: "17px",
      color: "black",
    },
    closeButton: {
      position: "absloute",

      bottom: "0px",
      outline: "none",
      boxShadow: "none",
      background: props.userData.color,
      textTransform: "Capitalize",
    },
    input: {
      ...theme.typography.addnote,
      width: "100%",
      fontSize: 16,
      borderRadius: "15px",
    },
    iconColumn: {
      position: "absolute",
      bottom: "0px",
    },
    titleInput: {
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
      right: "15px",
      top: "10px",
      width: "45px",
      height: "45px",
      color: "black",
      background: props.userData.color,
    },

    reminderSection: {
      fontSize: ".75rem",
      background: "rgba(215, 212, 212, 0.8)",
      // height:"20px",
      display: "flex",
      flexDirection: "row",
      borderRadius: "15px",
      border: "groove 1px ",
      marginTop: "30px",
      marginRight: "50px",
      marginLeft: "3px",
      height: "19px",
      width: "150px",
    },
    dialogContent: {
      minWidth: "350px",
      width: matchesLargeSize
        ? "40vw"
        : matchesSmallSize
        ? "100vw"
        : matchesExtraSmallSize
        ? "500px"
        : "",
      minHeight: "150px",
    },
    reminderSectionCutOff: {
      fontSize: ".75rem",
      background: "rgba(215, 212, 212, 0.8)",
      width: "150px",
      display: "flex",
      flexDirection: "row",
      marginTop: "30px",
      borderRadius: "15px",
      border: "groove 1px ",
      marginRight: "50px",
      marginLeft: "3px",
      height: "19px",
      textDecoration: "line-through",
    },
    reminderClearIcon: {
      marginLeft: "1%",
      padding: "8px 3px 8px 0",
      transition: ".25s",
      zIndex: 2,
    },
    reminderClearIconroot: {
      fontSize: ".9rem",
      transition: ".25s",
    },
    reminderTimeIcon: {
      marginLeft: "5px",
      padding: "3px 6px 3px 0px",
    },
    reminderTextSection: {
      textAlign: "center",
      justifyContent: "center",
    },
    labelDisplaySection: {
      fontSize: ".65rem",
      background: "rgba(215, 212, 212, 0.8)",
      // height:"20px",
      marginRight:"3px",

      display: "flex",
      flexDirection: "row",
      borderRadius: "15px",
      border: "groove 1px ",
      alignItems: "center",

      justifyContent: "space-between",
    },
    labelTextSection: {
      textAlign: "center",
      padding: "8px",
      justifyContent: "center",
      lineHeight: ".5rem",
    },
    labelSection: {
      marginTop: "5px",
      display: "flex",
      paddingLeft: "3px",
      flexDirection: "row",
    },
    menuPaper: {
      position: "absolute",
      bottom: "30px",
      right: "0px",
      borderRadius: "7px",
      border: "groove 4px",
      zIndex: 3,
    },
    listOfLabelsContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      border: "groove 1px",
      right: "116px",
      height: "100px",
      overflow: "auto",
      bottom: "0%",
      width: "144px",
      position: "absolute",
      padding: "5px 0 0 5px",
      zIndex: 4,
      borderRadius: "8px",
    },
    listOfLabels: {
      width: "75%",
      overflowWrap: "break-word",
      borderBottom: "groove 1px",
      marginBottom:'10px',
    },
    dialogScrollPaper: {
      background: "rgba(255, 255, 255, 0.65)",
    },
    dialoggScrollPaper: {
      position: "relative",
      top: "-70px",
      borderRadius: "8px",
      background: noteViewOnClick.condition ? noteViewOnClick.data.color : "",
    },
    colorLayout: {
      position: "absolute",
    },
    colorPallette:{
      position: "absolute",
      bottom:'30px'
    },
    reminderLayout:{
      marginTop:'10px',
      // position: "absolute",
      paddingTop:'10px',
    },
  }));
  const classes = useStyles();
  const unPinned = (
    <IconButton
      className={classes.pinIcon}
      onClick={() => dispatch(setPinnedStatus(true, data[0].id))}
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
    <IconButton
      className={classes.pinIcon}
      onClick={() => dispatch(setPinnedStatus(false, data[0].id))}
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

  const inputsToAddLabel = displayListFeature ? (
    <List>
      {descriptionList.map((description, index) => {
        return (
          <ListItem
            className={classes.listItem}
            onMouseOver={(e) => {
              // setDisplayOnHover(true)
              setShowClearIcon(
                e.currentTarget.firstChild.nextSibling.firstChild.value
              );
            }}
            onMouseLeave={(e) => {
              // setDisplayOnHover(false)
              setShowClearIcon("");
            }}
          >
            <ListItemIcon>
              {index === descriptionList.length - 1 ? (
                <AddIcon />
              ) : (
                <Checkbox
                  edge="start"
                  //   checked={true}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": index }}
                />
              )}
            </ListItemIcon>
            <InputBase
              className={classes.listInput}
              placeholder="List Item"
              value={descriptionList[index]}
              onChange={(e) => {
                setOnFocusText(e.currentTarget.value);
                let descriptList = descriptionList;
                descriptList[index] = e.currentTarget.value;
                if (
                  index === descriptionList.length - 1 &&
                  e.currentTarget.value !== ""
                ) {
                  descriptList.push("");
                  dispatch(setDescriptList([...descriptList]));
                } else if (
                  index === descriptionList.length - 2 &&
                  e.currentTarget.value === ""
                ) {
                  descriptList.pop();
                  dispatch(setDescriptList([...descriptList]));
                } else {
                  dispatch(setDescriptList([...descriptList]));
                }
              }}
              onFocus={(e) => {
                setOnFocusText(e.currentTarget.value);
              }}
            />
            {/* <IconButton className={classes.iconButton} aria-label="menu"> */}

            {onFocusText === description || showClearIcon === description ? (
              <ClearIcon
                className={classes.clearIcons}
                onClick={() => {
                  if (index !== descriptionList.length - 1) {
                    let descriptList = descriptionList.filter(
                      (list) => list !== description
                    );
                    dispatch(setDescriptList([...descriptList]));
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
      fullWidth
      value={description}
      rowsMin={4}
      onChange={(e) => {
        setDescription(e.currentTarget.value);
      }}
      onBlur={(e) => {
        const dataToBeUpdated = {
          noteId: data[0].id,
          title: title,
          description: description,
        };
        labelservice.updateNote(dataToBeUpdated).then((response) => {
          dispatch(updateDescriptionById(description, data[0].id));
        });
      }}
      className={classes.input}
      inputProps={{ "aria-label": "search content" }}
    />
  );

  const labelSearchBar = openLabelsList ? (
    <div className={classes.listOfLabelsContainer}>
      <Button
        onClick={() => {
          setOpenLabelsList(!openLabelsList);
        }}
      >
        go back
      </Button>
      <InputBase
        // className={classes.labelSearchBox}
        value={filter}
        placeholder="Search for Labels"
        onChange={(e) => {
          setFilter(e.currentTarget.value);
        }}
      />

      {onlyLabelsList.map((data, index) => {
        if (data.label.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <FormControlLabel
              classes={{ label: classes.listOfLabels }}
              control={
                <Checkbox
                  name={data.label}
                  checked={_.some(props.userData.noteLabels, { id: data.id })}
                  onClick={(e) => {
                    console.log(
                      e.currentTarget.firstElementChild.firstElementChild.name
                    );
                    const labelName =
                      e.currentTarget.firstElementChild.firstElementChild.name;
                    const addLabel = onlyLabelsList.filter(
                      (data) => data.label === labelName
                    )[0];
                    console.log(addLabel);
                    console.log(labelLists);

                    if (!_.some(props.userData.noteLabels, { id: data.id })) {
                      const dataTobeSent = {
                        noteId: props.userData.id,
                        labelId: addLabel.id,
                      };
                      labelservice.addLabelToNote(dataTobeSent).then(() => {
                        dispatch(
                          updateLabelForNote(props.userData.id, addLabel)
                        );
                        let list = labelLists;
                        list = [...list, addLabel];
                        setLabelLists(list);
                      });
                    } else if (
                      _.some(props.userData.noteLabels, { id: data.id })
                    ) {
                      const updatedList = _.filter(
                        labelLists,
                        (n) => n.label !== addLabel.label
                      );
                      const dataTobeSent = {
                        noteId: props.userData.id,
                        labelId: addLabel.id,
                      };
                      labelservice
                        .removeLabelFromNote(dataTobeSent)
                        .then(() => {
                          dispatch(
                            removeLabelFromNote(
                              props.userData.id,
                              addLabel.label
                            )
                          );
                          setLabelLists(updatedList);
                        });
                    }
                  }}
                />
              }
              label={data.label}
            />
          );
        }
      })}
    </div>
  ) : null;

  return (
    <div>
      <Dialog
        disableEnforceFocus
        open={noteViewOnClick.condition}
        onBackdropClick={() => {
          dispatch(notesViewOnClick(false, {}));
        }}
        classes={{
          container: classes.dialogScrollPaper,
          paperScrollPaper: classes.dialoggScrollPaper,
        }}
        maxWidth="md"
        disableBackdropClick={true}
        className={classes.dialogBlock}
      >
        {" "}
        {data[0].isPined ? pinned : unPinned}
        <DialogContent className={`${classes.dialogContent}  `}>
          {/* <div
      className={classes.addingNotePortion}
      onOutsideClick={() => {
        if (addNote !== false) {
          dispatch(addNoteBeforeClick());
          dispatch(hideListFeature());
        }
      }}
    > */}

          <Paper component="form" className={` ${classes.paper}  `}>
            <InputBase
              placeholder=" Title"
              fullWidth
              value={title}
              className={classes.titleInput}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              inputProps={{ "aria-label": "search content" }}
              onBlur={(e) => {
                const dataToBeUpdated = {
                  noteId: data[0].id,
                  title: title,
                  description: description,
                };
                labelservice.updateNote(dataToBeUpdated).then((response) => {
                  dispatch(updateTitleFromId(title, data[0].id));
                  // setTitle(title)
                });
              }}
            />
            {inputsToAddLabel}

            {typeof data[0].T !== "undefined" &&
            data[0].reminder.length > 0 ? (
              <label
                className={
                  !timeGotOver
                    ? classes.reminderSection
                    : classes.reminderSectionCutOff
                }
                onMouseOver={(e) => {
                  setDisplayIconOnHoverClearButton(true);
                }}
                onMouseLeave={(e) => {
                  setDisplayIconOnHoverClearButton(false);
                }}
              >
                <AccessTimeIcon
                  className={classes.reminderTimeIcon}
                  classes={{ root: classes.reminderClearIconroot }}
                />{" "}
                <div className={classes.reminderTextSection}>
                  {dateSection} {timeSection}{" "}
                </div>
                {displayIconOnHoverClearButton ? (
                  <IconButton
                    className={classes.reminderClearIcon}
                    onClick={() => {
                      const removeReminder = {
                        noteIdList: [data[0].id],
                      };
                      labelservice
                        .removeReminderNotes(removeReminder)
                        .then(() => {
                          dispatch(removeReminderById(data[0].id));
                        });
                    }}
                  >
                    <ClearIcon
                      classes={{ root: classes.reminderClearIconroot }}
                    />{" "}
                  </IconButton>
                ) : null}
              </label>
            ) : null}

            {typeof data[0].noteLabels !== "undefined" &&
            data[0].noteLabels.length > 0 ? (
              <div className={classes.labelSection}>
                {" "}
                {data[0].noteLabels.map((data) => {
                  return (
                    <div
                      className={classes.labelDisplaySection}
                      onMouseOver={(e) => {
                        setDisplayIconOnHoverClearButton(
                          e.currentTarget.firstElementChild.innerText
                        );
                      }}
                      onMouseLeave={(e) => {
                        setDisplayIconOnHoverClearButton("");
                      }}
                    >
                      {" "}
                      <div className={classes.labelTextSection}>
                        {data.label}{" "}
                      </div>
                      {displayIconOnHoverClearButton === data.label ? (
                        <IconButton
                          className={classes.reminderClearIcon}
                          onClick={(e) => {
                            const labelData = {
                              noteId: props.userData.id,
                              labelId: data.id,
                            };
                            labelservice
                              .removeLabelFromNote(labelData)
                              .then(
                                dispatch(
                                  removeLabelFromNote(
                                    props.userData.id,
                                    e.currentTarget.previousElementSibling
                                      .innerText
                                  )
                                )
                              );
                          }}
                        >
                          <ClearIcon
                            classes={{ root: classes.reminderClearIconroot }}
                          />{" "}
                        </IconButton>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
             {displayDateTimePicker ? (
               <div className={classes.reminderLayout}>
            <DateAndTimePicker 
              displayDateTimePicker={displayDateTimePicker}
              setDisplayDateTimePicker={setDisplayDateTimePicker}
              userData={data[0].id}
            /></div>
          ) : null}

            <div className={classes.iconColumn}>
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={() => {
                  setDisplayDateTimePicker(!displayDateTimePicker);
                }}
              >
                  
                <AddAlertOutlinedIcon className={classes.bottomIcons} />
              </IconButton>

              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={() => dispatch(collaboratorsPopUp(true, data[0].id))}
              >
                <PersonAddOutlinedIcon className={classes.bottomIcons} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={() => {
                  setDisplayColorPallette(!displayColorPallette);
                }}
              >
                {/* {displayCollabPopUp ?  <ColaboratorDialogBox  />:null} */}
                {displayColorPallette ? (
            <OutsideClickHandler
              className={classes.colorLayout}
              onOutsideClick={() => {
                setDisplayColorPallette(false);
                setOpenLabelsList(false);
              }}
            >
              <div className={classes.colorPallette}>
                {" "}
                <Card >
                  <ColorPallette
                    id={props.userData.id}
                    setDisplayColorPallette={setDisplayColorPallette}
                  />
                </Card>
              </div>
            </OutsideClickHandler>
          ) : null}
                <PaletteOutlinedIcon className={classes.bottomIcons} />
              </IconButton>
              <IconButton className={classes.iconButton} aria-label="menu">
                <CropOriginalOutlinedIcon className={classes.bottomIcons} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={() => {
                  dispatch(
                    updateArchievedStatusById(data[0].id, !data[0].isArchived)
                  );
                }}
              >
                <ArchiveOutlinedIcon className={classes.bottomIcons} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                // ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {open ? (
                  <OutsideClickHandler
                  // onOutsideClick={() => {
                  //   setOpen(false);
                  // }}
                  >
                    <div transition disablePortal className={classes.menuPaper}>
                      <Paper>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>DeleteNote</MenuItem>
                          <MenuItem
                            onClick={() => {
                              setOpenLabelsList(!openLabelsList);
                            }}
                          >
                            Adds Label{" "}
                          </MenuItem>
                        </MenuList>
                      </Paper>
                      {labelSearchBar}
                    </div>{" "}
                  </OutsideClickHandler>
                ) : null}
                <MoreVertOutlinedIcon className={classes.bottomIcons} />
              </IconButton>

              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  dispatch(notesViewOnClick(false, {}));
                }}
              >
                Close
              </Button>
            </div>
          </Paper>
       

          {/* FROM HERE */}

         

          {/* </div> */}
        </DialogContent>
        {/* <Dialog
         open={displayColorPallette}
         classes={{
          container: classes.ContainerClrPallete,
          paperScrollPaper: classes.dialoggScrollPaperClrPallete,
        }}
         onBackdropClick={() => {
          setDisplayColorPallette(false)
         }}
         >
             <Card className={classes.colorPallette}><ColorPallette  id={noteViewOnClick.data.id} setDisplayColorPallette={setDisplayColorPallette} fromProfile={true}   /></Card>
         </Dialog> */}
      </Dialog>
    </div>
  );
}

export default NotesViewOnClick;

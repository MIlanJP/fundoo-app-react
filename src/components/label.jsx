import React from "react";
import styles from "../scss/profile.module.scss";
import CreateNoteTabBeforeClick from "./CreateNoteTabBeforeClick";
import { addNoteBeforeClick } from "../redux";
import CreateNoteTabAfterClick from "./CreateNoteTabAfterClick";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

export default function Label() {
  const addNoteFeature = useDispatch();

  const addFeature = useSelector((state) => state.addNoteFeature.addNote);

  const useStyles = makeStyles((theme) => ({
    AddNoteLabels: {
      position: "relative",
      top: "30px",
      width: "49%",
      display: "flex",
      flexDirection: "column",
      zIndex: 0,
      height: '40px',
    },
    PopUp: {
      zIndex: 2,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.AddNoteLabels}>
      {addFeature ? (
        <CreateNoteTabAfterClick className={classes.PopUp} />
      ) : (
        <CreateNoteTabBeforeClick className={classes.PopUp} />
      )}
    </div>
  );
}

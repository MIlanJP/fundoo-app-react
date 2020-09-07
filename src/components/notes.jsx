import React,{useEffect} from "react";
import styles from "../scss/profile.module.scss";
import CreateNoteTabBeforeClick from "./CreateNoteTabBeforeClick";
import CreateNoteTabAfterClick from "./CreateNoteTabAfterClick";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";


export default function Notes() {

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

  useEffect(() => {
   
  },)



  return (<>
    <div className={classes.AddNoteLabels}>
      {addFeature ? (
        <CreateNoteTabAfterClick className={classes.PopUp} />
      ) : (
        <CreateNoteTabBeforeClick className={classes.PopUp} />
      )}
    </div>

    </>
  );
}

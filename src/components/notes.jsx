import React,{useEffect} from "react";
import styles from "../scss/profile.module.scss";
import CreateNoteTabBeforeClick from "./CreateNoteTabBeforeClick";
import { addNoteBeforeClick ,fetchAllUserData} from "../redux";
import CreateNoteTabAfterClick from "./CreateNoteTabAfterClick";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import service from '../services/userservices'
import Auth from "../services/Auth";

export default function Notes() {
  const dispatch = useDispatch();
const loadingStatus= useSelector((state) => state.labels.loading)
const loadedLabels= useSelector((state) => state.labels.userData)
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
    dispatch(fetchAllUserData())
   console.log(loadedLabels)
  }, [])

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

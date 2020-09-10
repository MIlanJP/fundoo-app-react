import React, { useEffect } from "react";
import styles from "../scss/profile.module.scss";
import CreateNoteTabBeforeClick from "./CreateNoteTabBeforeClick";
import CreateNoteTabAfterClick from "./CreateNoteTabAfterClick";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {  useTheme } from "@material-ui/core";
import NotesView from "./notesView";

export default function Notes(props) {
  const theme = useTheme();
  const matchesExtraSmallSize = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSmallSize = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMediumSize = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLargeSize = useMediaQuery(theme.breakpoints.down("(max-width:1150px)"));
  


  const addFeature = useSelector((state) => state.addNoteFeature.addNote);
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes);
  const unPinnedNotes = useSelector((state) => state.notes.unPinnedNotes);
  const userData = useSelector((state) => state.notes.userData);

  const unPinnedSmallerColumn2 = [];
  const unPinnedSmallerColumn1 = [];

  const unPinnedMediumColumn1 = [];
  const unPinnedMediumColumn2 = [];
  const unPinnedMediumColumn3 = [];

  const unPinnedLargeColumn1 = [];
  const unPinnedLargeColumn2 = [];
  const unPinnedLargeColumn3 = [];
  const unPinnedLargeColumn4 = [];
  const unPinnedLargeColumn5 = [];

  const pinnedSmallerColumn1 = [];
  const pinnedSmallerColumn2 = [];

  const pinnedMediumColumn1 = [];
  const pinnedMediumColumn2 = [];
  const pinnedMediumColumn3 = [];

  const pinnedLargeColumn1 = [];
  const pinnedLargeColumn2 = [];
  const pinnedLargeColumn3 = [];
  const pinnedLargeColumn4 = [];
  const pinnedLargeColumn5 = [];


  const calculateColumn=()=> {
    let mediumCount = 2;
    let largeCount = 4;
    userData.map((data, index) => {
      if(!data.isPined && !data.isDeleted){
        if (index % 2 === 0) {
          unPinnedSmallerColumn1.push(<NotesView userData={data} />);
        } else {
          unPinnedSmallerColumn2.push(<NotesView userData={data} />);
        }
  
        if (mediumCount === 0) {
          unPinnedMediumColumn1.push(<NotesView userData={data} />);
          mediumCount = 2;
        } else if (mediumCount === 1) {
          unPinnedMediumColumn2.push(<NotesView userData={data} />);
        } else {
          unPinnedMediumColumn3.push(<NotesView userData={data} />);
         
        }
  
        if (largeCount === 0) {
          unPinnedLargeColumn1.push(<NotesView userData={data} />);
          largeCount = 5;
  
        } else if (largeCount === 1) {
          unPinnedLargeColumn2.push(<NotesView userData={data} />);
        } else if (largeCount === 2) {
          unPinnedLargeColumn3.push(<NotesView userData={data} />);
        } else if (largeCount === 3) {
          unPinnedLargeColumn4.push(<NotesView userData={data} />);
        } else if(largeCount === 4) {
          unPinnedLargeColumn5.push(<NotesView userData={data} />);
        }
        mediumCount--;
        largeCount--;
      }
     
return null
    });

    userData.map((data, index) => {
      if(data.isPined  && !data.isDeleted){
        if (index % 2 === 0) {
          pinnedSmallerColumn1.push(<NotesView userData={data} />);
        } else {
          pinnedSmallerColumn2.push(<NotesView userData={data} />);
        }
  
        if (mediumCount === 0) {
          mediumCount = 3;
          pinnedMediumColumn1.push(<NotesView userData={data} />);
        } else if (mediumCount === 1) {
          pinnedMediumColumn2.push(<NotesView userData={data} />);
        } else {
          pinnedMediumColumn3.push(<NotesView userData={data} />);
        }
  
        if (largeCount === 0) {
          pinnedLargeColumn1.push(<NotesView userData={data} />);
          largeCount = 5;
        } else if (largeCount === 1) {
          pinnedLargeColumn2.push(<NotesView userData={data} />);
        } else if (largeCount === 2) {
          pinnedLargeColumn3.push(<NotesView userData={data} />);
        } else if (largeCount === 3) {
          pinnedLargeColumn4.push(<NotesView userData={data} />);
        } else if(largeCount === 4) {
          pinnedLargeColumn5.push(<NotesView userData={data} />);
        }
        mediumCount--;
    largeCount--;
      }
       
return null
    });
  }

    
  calculateColumn()


  const useStyles = makeStyles((theme) => ({
    AddNoteLabels: {
      position: "relative",
      alignSelf:'center',
      minWidth: "300px",
      width:matchesExtraSmallSize? '100%': "49%",
      display: "flex",
      flexDirection: "column",
      zIndex: 0,
      //   height: '40px',
      margin: "30px 0 80px 0",
    },
    PopUp: {
      zIndex: 2,
    },
    mainSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      height: "100%",
    },
    smallRow: {
      display: "flex",
      flexDirection: "column",
      padding: "0 15px 0 15px",
    },
    smallNotes: {
      margin: "3px 3px 3px 3px",
    },
    pinnedSmallRow: {
      display: "flex",
      flexDirection: "row",
    },
    unPinnedSmallRow: {
      display: "flex",
      flexDirection: "row",
    },
    mediumRow:{
        padding:"0 10px 0 10px",
        display: "flex",
        flexDirection: "column",
    },
    pinnedMediumRow:{
        display: "flex",
        flexDirection: "row", 
    },
    unPinnedMediumRow:{
        display: "flex",
        flexDirection: "row", 
    },
    largeRow:{
        // padding:"0 0px 0 50px",
        display: "flex",
        flexDirection: "column",
    },
    pinnedLargeRow:{
        display: "flex",
        flexDirection: "row", 
    },
    unPinnedLargeRow:{
        display: "flex",
        flexDirection: "row", 
    },

  }));

  const classes = useStyles();


  
  const noOfColumnsOnExtraSmallColumn = (
    <div className={classes.extraSmallRow}>
      {pinnedNotes.length > 0
        ? pinnedNotes.map((data) => {
            return <NotesView className={classes.smallNotes} userData={data} />;
          })
        : null}
      {unPinnedNotes.length > 0
        ? unPinnedNotes.map((data) => {
            return <NotesView userData={data} />;
          })
        : null}
    </div>
  );

  const noOfColumnsOnSmallRow = (
    <div className={classes.smallRow}>
      {pinnedNotes.length > 0 ? <div>Pinned</div> : null}
      {pinnedNotes.length > 0 ? (
        <div className={classes.pinnedSmallRow}>
          <div>{pinnedSmallerColumn1}</div>
          <div>{pinnedSmallerColumn2}</div>
        </div>
      ) : null}
      {pinnedNotes.length > 0 ? <div>Others</div> : null}
      {unPinnedNotes.length > 0 ? (
        <div className={classes.unPinnedSmallRow}>
          <div>{unPinnedSmallerColumn1}</div>
          <div>{unPinnedSmallerColumn2}</div>
        </div>
      ) : null}
    </div>
  );
  const noOfColumnsOnMediumColumn = ( <div className={classes.mediumRow}>
            {pinnedNotes.length > 0 ? <div>Pinned</div> : null}
      {pinnedNotes.length > 0 ? (
        <div className={classes.pinnedMediumRow}>
          <div>{pinnedMediumColumn1}</div>
          <div>{pinnedMediumColumn2}</div>
          <div>{pinnedMediumColumn3}</div>
        </div>
      ) : null}
      {pinnedNotes.length > 0 ? <div>Others</div> : null}
      {unPinnedNotes.length > 0 ? (
        <div className={classes.unPinnedMediumRow}>
          <div>{unPinnedMediumColumn1}</div>
          <div>{unPinnedMediumColumn2}</div>
          <div>{unPinnedMediumColumn3}</div>
        </div>
      ) :null}
  </div>
  );

  const noOfColumnsOnLargeColumn = <div className={classes.largeRow}>
                  {pinnedNotes.length > 0 ? <div>Pinned</div> : null}
      {pinnedNotes.length > 0 ? (
        <div className={classes.pinnedLargeRow}>
          <div>{pinnedLargeColumn1}</div>
          <div>{pinnedLargeColumn2}</div>
          <div>{pinnedLargeColumn3}</div>
          <div>{pinnedLargeColumn4}</div>
          <div>{pinnedLargeColumn5}</div>
        </div>
      ) : null}
      {pinnedNotes.length > 0 ? <div>Others</div> : null}
      {unPinnedNotes.length > 0 ? (
        <div className={classes.unPinnedLargeRow}>
          <div>{unPinnedLargeColumn1}</div>
          <div>{unPinnedLargeColumn2}</div>
          <div>{unPinnedLargeColumn3}</div>
          <div>{unPinnedLargeColumn4}</div>
          <div>{unPinnedLargeColumn5}</div>
        </div>
      ) :null}
  </div>;
  const noOfColumnsOnExtraLargeColumn = (
    <div className={classes.extraLargeRow}></div>
  );

  return (
    <div className={classes.mainSection}>
      <div className={classes.AddNoteLabels}>
        {addFeature ? (
          <CreateNoteTabAfterClick className={classes.PopUp} />
        ) : (
          <CreateNoteTabBeforeClick className={classes.PopUp} />
        )}
      </div>

      {matchesExtraSmallSize
        ? noOfColumnsOnExtraSmallColumn
        : matchesSmallSize
        ? noOfColumnsOnSmallRow
        : matchesMediumSize
        ? noOfColumnsOnMediumColumn
        :`(max-width:1150px) matches: ${matchesLargeSize}`  
        ? noOfColumnsOnLargeColumn 
        :null}
    </div>
  );
}

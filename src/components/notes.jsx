import React,{useEffect} from "react";
import styles from "../scss/profile.module.scss";
import CreateNoteTabBeforeClick from "./CreateNoteTabBeforeClick";
import CreateNoteTabAfterClick from "./CreateNoteTabAfterClick";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Grid , useTheme } from "@material-ui/core";
import NotesView from './notesView'


export default function Notes() {

    const theme=useTheme()
const matchesExtraSmallSize=useMediaQuery(theme.breakpoints.down('xs'))
const matchesSmallSize=useMediaQuery(theme.breakpoints.down('sm'))
const matchesMediumSize=useMediaQuery(theme.breakpoints.down('md'))
const matchesLargeSize=useMediaQuery(theme.breakpoints.down('xl'))


    const addFeature = useSelector((state) => state.addNoteFeature.addNote);
    const pinnedNotes = useSelector((state) => state.notes.pinnedNotes);
    const unPinnedNotes = useSelector((state) => state.notes.unPinnedNotes);
    const userData = useSelector((state) => state.notes.userData);


  const useStyles = makeStyles((theme) => ({
    AddNoteLabels: {
      position: "relative",
    //   top: "30px",
    minWidth:'300px',
      width: "49%",
      display: "flex",
      flexDirection: "column",
      zIndex: 0,
    //   height: '40px',
    margin:'30px 0 80px 0'
    },
    PopUp: {
      zIndex: 2,
    },
    mainSection:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
      height:'100%'

    },
    notesContainer:{
    //    width: "300px",
    // gridTemplateColumns:matchesExtraSmallSize ? "": matchesSmallSize? "1fr 1fr 1fr 1fr 1fr ":  matchesMediumSize? "1fr 1fr 1fr 1fr": matchesLargeSize? "1fr 1fr 1fr 1fr 1fr":'',
    // gridAutoColumns:"minmax(70px,auto)",
    // gridColumns:'1/2',
    gridColumn:'auto',
    rowGap:'1em',
    width:matchesExtraSmallSize?'100%' : matchesSmallSize? "50%": matchesMediumSize?"30.3%": '20%',
    },
    // gridSection:{
    //     width:'100%',
    //     alignItems:'top'
    // },
  }));

  const classes = useStyles();

  useEffect(() => {
   
  },)



  return (<div className={classes.mainSection}>
    <div className={classes.AddNoteLabels}>
      {addFeature ? (
        <CreateNoteTabAfterClick className={classes.PopUp} />
      ) : (
        <CreateNoteTabBeforeClick className={classes.PopUp} />
      )}
    </div>
    {/* PINNED SECTION */}
    <div className={classes.gridColumn}  >
    <Grid container 
    // direction="column"
    spacing={2}
    className={classes.gridSection}
    >
        {pinnedNotes.length>0 ?
        <>
    <div>Pinned Notes</div> 
   {pinnedNotes.map(data=>{
       return <Grid item
       className={classes.notesContainer}
       >
           <NotesView userData={data}  />
       </Grid>
   })}
    </>

    
    :null 
    }



    </Grid>
{/* UNPINNED SECTION */}
<Grid
container 
// direction="column"
spacing={2}
>
{unPinnedNotes.length>0 ?
        <>
    <div>Others</div> 
   {unPinnedNotes.map(data=>{
       return <Grid item 
       className={classes.notesContainer}
       >
           <NotesView userData={data}  />
       </Grid>
   })}
    </> 
    :null 
    }
</Grid>
</div>

    </div>
  );
}

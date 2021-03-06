import React from "react";
import {
  List,
  Drawer,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { useState ,useEffect} from "react";
import {useSelector,useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Link } from "react-router-dom";
import { IconButton,Typography } from "@material-ui/core";


export default function Drawers(props) {
const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState("Notes");
// const listoFlabels=useSelector((state) => state.labels.labelList)
  const listoFlabels=useSelector((state) => state.labels.labelList)
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "250px",
    },
    paper: {
     
      top: "65px",
      width:"250px",
      transition:'1s',

    },

    labelIcons: {
      position: "relative",
      top:"2px",
      display: "flex",
      height:'10%',
      flexDirection: "column",
      alignItems: "flex-start",
      paddingLeft:'13px',


    },
    sideBarLabel:{
      ...theme.typography.labels,
      opacity:props.showDrawer ? '1' : '0',
      transition:"opacity .5s"

    },
    mainDrawerLayout: {
      zIndex:'25',  
      position:"fixed",
      width:props.showDrawer ? 'auto':"50px",
      "& a":{
        textDecoration: "none",
        fontFamily:"'Syne', sans-serif !important",
      },

    },
    label:{
      ...theme.typography.labels,
      zIndex:'10',
      color:'black',
      paddingTop:"10px",
      paddingBottom:"10px",
      borderTopRightRadius:'20px',
      borderBottomRightRadius:'20px',
      opacity:props.showDrawer ? '1' : '0',
      transition:"opacity .5s"
    },
    ListIcon:{
      paddingLeft:"15px",
      opacity:props.showDrawer?'1':'0',
      transition: "1s",
    },
    selectedLabel:{
      ...theme.action,
      paddingTop:"10px",
      paddingBottom:"10px",
      borderTopRightRadius:'20px',
      borderBottomRightRadius:'20px',
      color:'red',
    },
    selectedIcon:{
      borderRadius:'50%',
      marginLeft:"10px",
      background:'rgb(254,239,195)',
      padding:"14px 2px 16px 2px",
      color:"black"
    },
  }));

  const classes = useStyles();
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    
 
    let location=window.location.pathname
 if(location.includes("/label/")){
  location=location.split("/label/")[1]
 location=decodeURI(location)
 let restoredLabels=[];
 restoredLabels=[...JSON.parse(localStorage.getItem('labels'))]
 if(restoredLabels.includes(location)){
  setSelectedLabel(location)
  props.setHeading(location)
 }else{
  setSelectedLabel("Notes")
  props.setHeading("Keep")
 }

 }else if(location.includes("/profile/")){
  location=location.split("/profile/")[1]
 setSelectedLabel(location)
 props.setHeading(location)
 }
  }, [])

  return (
    <div className={classes.mainDrawerLayout}
    onMouseLeave={() => {
      if (showLabel) {
        props.setShowDrawer(false);
     
        setShowLabel(false);
      }
    }}
    >
      {listoFlabels.map((text, index) => {
        return (
          <Link
            className={selectedLabel===text ? classes.selectedIcon :classes.labelIcons}
            to={
              index === 0
                ? "/profile"
                : index === listoFlabels.length - 3
                ? "#"
                : index > listoFlabels.length - 3
                ? `/profile/${text}`
                : index > 1
                ? `/profile/label/${text}`
                : `/profile/${text}`
            }
            onMouseEnter={() => {
              if (!showLabel && !props.showDrawer) {
                setShowLabel(true);      
                    props.setShowDrawer(true);           
              }
            }}
            onClick={() => {
              if (text !== "Edit Labels" && index !== 0) {
                props.setHeading(`  ${text}`);
              }
              if (index === 0) {
                props.setHeading("Keep");
              }
              props.setShowDrawer(true)
              props.setHeading(text)
              if(text!=="Edit Labels"){
                setSelectedLabel(text)
              }
            }}
          >
            {" "}
            <IconButton>
              {index === 0 ? (
                <EmojiObjectsOutlinedIcon />
              ) : index === 1 ? (
                <NotificationsNoneOutlinedIcon />
              ) : index === listoFlabels.length - 1 ? (
                <DeleteOutlinedIcon />
              ) : index === listoFlabels.length - 2 ? (
                <ArchiveOutlinedIcon />
              ) : index === listoFlabels.length - 3 ? (
                <EditOutlinedIcon />
              ) : (
                <LabelOutlinedIcon />
              )}
            </IconButton>
          </Link>
        );
      })}

      <Drawer
        anchor="left"
        variant="persistent"
        open={props.showDrawer}
        classes={{
          docked: classes.root,
          paperAnchorLeft: classes.paper,
        }}
        className={classes.root}
      >
        <List

        >
          {listoFlabels.map((text, index) => {
            return (
              <Link
              to={
                index === 0
                  ? "/profile"
                  : index === listoFlabels.length - 3
                  ? "#"
                  : index > listoFlabels.length - 3
                  ? `/profile/${text}`
                  : index > 1
                  ? `/profile/label/${text}`
                  : `/profile/${text}`  
              }
                onClick={() => {
                  if(text==="Edit Labels"){
                   props.setEditLabelsPopUpDisplay(!props.editLabelsPopUpDisplay)
                   props.setShowDrawer(false)
                  }
                }}
              >
              <ListItem
                button
                key={text}
                selected={text===selectedLabel}
                onClick={() => {
                  if (text !== "Edit Labels" && index !== 0) {
                    props.setHeading(`  ${text}`);
                  }
                  if (index === 0) {
                    props.setHeading("Keep");
                  }

                  if(text!=="Edit Labels"){
                    setSelectedLabel(text)
                  }
                }}

                className={text===selectedLabel ? classes.selectedLabel: classes.label}
              ><ListItemIcon
              className={classes.ListIcon}
              onClick={() => {
                if (text !== "Edit Labels" && index !== 0) {
                  props.setHeading(`  ${text}`);
                }
                if (index === 0) {
                  props.setHeading("Keep");
                }
              }}
              >
                  {index === 0 ? (
                <EmojiObjectsOutlinedIcon />
              ) : index === 1 ? (
                <NotificationsNoneOutlinedIcon />
              ) : index === listoFlabels.length - 1 ? (
                <DeleteOutlinedIcon />
              ) : index === listoFlabels.length - 2 ? (
                <ArchiveOutlinedIcon />
              ) : index === listoFlabels.length - 3 ? (
                <EditOutlinedIcon />
              ) : (
                <LabelOutlinedIcon />
              )}
              </ListItemIcon>               <ListItemText
                  // primary={text}
                ><Typography  className={classes.sideBarLabel}>
                  {text}
                  </Typography> </ListItemText>

              </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

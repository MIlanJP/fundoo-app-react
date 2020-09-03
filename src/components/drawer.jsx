import React from "react";
import {
  List,
  Drawer,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

export default function Drawers(props) {

  const [selectedLabel, setSelectedLabel] = useState("Notes");
  // const[restore]=useState({
  //   "/profile":"Notes",
    
  // })

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "250px",
    },
    paper: {
      top: "65px",
      // zIndex: -1,
      // paddingLeft: "80px",
      transition:'1s',

    },

    labelIcons: {
      position: "relative",
      top:"2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingLeft:'13px',


    },
    sideBarLabel:{
      fontFamily:"'Syne', sans-serif !important",
      fontSize:".8rem",
      opacity:props.showDrawer ? '1' : '0',
      transition:"opacity .5s"

    },
    mainDrawerLayout: {
      "& a":{
        textDecoration: "none",
        fontFamily:"'Syne', sans-serif !important",
      },

    },
    label:{
      zIndex:'10',
      color:'black',
      '& $selected': {
        backgroundColor: 'blue',
      },
      opacity:props.showDrawer ? '1' : '0',
      transition:"opacity .5s"
    },
    ListIcon:{
      paddingLeft:"15px",
      opacity:props.showDrawer?'1':'0',
      transition: "1s",
    },
    selectedLabel:{
      backgroundColor:'rgb(254,239,195)',
    },
  }));

  const classes = useStyles();
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    let location=window.location.pathname
 if(location.includes("/label/")){
  location=location.split("/label/")[1]
 location=location.charAt(0).toUpperCase()+location.slice(1)
 setSelectedLabel(location)
 props.setHeading(location)
 }else if(location.includes("/profile/")){
  location=location.split("/profile/")[1]
 location=location.charAt(0).toUpperCase()+location.slice(1)
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
      {props.listOfLabels.map((text, index) => {
        return (
          <Link
            className={classes.labelIcons}
            to={
              index === 0
                ? "/profile"
                : index === props.listOfLabels.length - 3
                ? "#"
                : index > props.listOfLabels.length - 3
                ? `/profile/${text.toLowerCase()}`
                : index > 1
                ? `/profile/label/${text.toLowerCase()}`
                : `/profile/${text.toLowerCase()}`
            }
            onMouseOver={() => {
              if (!showLabel && !props.showDrawer) {
                props.setShowDrawer(true);
                setShowLabel(true);
                // setOnMouseOverHoverLabel(true)
              }
            }}

            onClick={() => {
              if (text !== "Edit Labels" && index !== 0) {
                props.setHeading(`  ${text}`);
              }
              if (index === 0) {
                props.setHeading("Keep");
              }
            }}
          >
            {" "}
            <IconButton>
              {index === 0 ? (
                <EmojiObjectsOutlinedIcon />
              ) : index === 1 ? (
                <NotificationsNoneOutlinedIcon />
              ) : index === props.listOfLabels.length - 1 ? (
                <DeleteOutlinedIcon />
              ) : index === props.listOfLabels.length - 2 ? (
                <ArchiveOutlinedIcon />
              ) : index === props.listOfLabels.length - 3 ? (
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
          modal: classes.root1,
          paperAnchorLeft: classes.paper,
        }}
        className={classes.root}
      >
        <List

        >
          {props.listOfLabels.map((text, index) => {
            return (
              <Link
              to={
                index === 0
                  ? "/profile"
                  : index === props.listOfLabels.length - 3
                  ? "#"
                  : index > props.listOfLabels.length - 3
                  ? `/profile/${text.toLowerCase()}`
                  : index > 1
                  ? `/profile/label/${text.toLowerCase()}`
                  : `/profile/${text.toLowerCase()}`  
              }

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
                  setSelectedLabel(text)
                }}

                className={text===selectedLabel? classes.selectedLabel: classes.label}
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
              ) : index === props.listOfLabels.length - 1 ? (
                <DeleteOutlinedIcon />
              ) : index === props.listOfLabels.length - 2 ? (
                <ArchiveOutlinedIcon />
              ) : index === props.listOfLabels.length - 3 ? (
                <EditOutlinedIcon />
              ) : (
                <LabelOutlinedIcon />
              )}
              </ListItemIcon>
                <ListItemText
                className={classes.sideBarLabel}
                  primary={text}
                />
              </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

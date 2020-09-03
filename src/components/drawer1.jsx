import React, { useState, useEffect } from "react";
import drawerStyles from "../scss/drawer.module.scss";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { IconButton, Paper, InputBase, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

export default function Drawer1(props) {
  const [hideDrawerStyle] = useState([
    "-50%",
    "0",
    "-10",
    "none",
    "relative",
    "none",
  ]);
  const [drawerStyle] = useState(["0%", "1", "1", "auto", "relative", "flex"]);

  const [showLabel, setShowLabel] = useState(false);

  const [selectedLabel, setSelectedIcon] = useState("Notes");

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      width: props.showDrawer ? "auto" : "200px",
    },
    label: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
      paddingLeft: "10px",
      textDecoration: "none",
      "&:hover": {
        background: "rgb(241,243,244)",
        width: "200px",
        borderTopRightRadius: "15px",
        borderTopLefttRadius: "15px",
      },
    },

    selectedLabel: {},

    drawerIcon: {
      zIndex: "10",
      "&:hover": {
        background: "rgb(227, 226, 226)",
      },
    },
    drawerLabel: {
      // position:'absolute',
      top: "15px",
      left: props.showDrawer ? drawerStyle[0] : hideDrawerStyle[0],
      position: props.showDrawer ? drawerStyle[4] : hideDrawerStyle[4],
      opacity: props.showDrawer ? drawerStyle[1] : hideDrawerStyle[1],
      zIndex: props.showDrawer ? drawerStyle[2] : hideDrawerStyle[2],
      pointerEvents: props.showDrawer ? drawerStyle[3] : hideDrawerStyle[3],
      transition: "opacity .5s , left .2s  ",
      transitionDelay: ":hover 1s ",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.listOfLabels.map((text, index) => {
        return (
          <Link
            className={classes.label}
            onMouseOver={() => {
              if (!showLabel && !props.showDrawer) {
                props.setShowDrawer(true);
                setShowLabel(true);
              }
            }}
            onMouseLeave={() => {
              if (showLabel) {
                props.setShowDrawer(false);
                setShowLabel(false);
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
            <IconButton className={classes.drawerIcon}>
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
            <div className={classes.drawerLabel}>{text}</div>
          </Link>
        );
      })}
    </div>
  );
}

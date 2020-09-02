import React, { useState } from "react";
import Bars from "../Assets/menu.svg";
import bulb from "../Assets/bulb.png";
import styles from "../scss/icons.module.scss";
import headerStyles from "../scss/header.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, InputBase, SvgIcon } from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import RefreshSharpIcon from "@material-ui/icons/RefreshSharp";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MoreVertIcon from "@material-ui/icons/AppsRounded";
import ViewStreamRoundedIcon from "@material-ui/icons/ViewStreamRounded";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
export default function Header() {
  const [searchStyles, setSearchstyles] = useState([
    "0",
    "rgb(241,243,244)",
    "none",
    "none",
  ]);

  const useStyles = makeStyles((theme) => ({
    // Main Layout
    root: {
      display: "flex",
      float: "right",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100vw",
      height: "65px",
      flexGrow: "3",
      borderBottomStyle: "inset",
    },

    leftPortion: {
      display: "flex",
      flexDirection: "row",
      minWidth: "250px",
      height: "100%",
    },
    middlePortion: {
      paddingTop: "8px",
      width: "57vw",
      height: "60px",
      position: "relative",
    },

    search: {
      marginRight: "10px",
      borderRadius: "8px",
      paddingLeft: "5px",
      height: "80%",
      display: "flex",
      width: "98%",
      flexDirection: "row",
      background: searchStyles[1],
      transition: "background 1s",
      boxShadow: searchStyles[3],
    },

    rightPortion: {
      flex: "grow",
      position: "relative",
      top:'-8px',
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: "10px",
      alignSelf: "flex-end",
      width: "30%",
    },

    appIconBar: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      left: "-6.5%",
    },
    appIconList: {
      display: "flex",
      flexDirection: "row",
      paddingRight: "10px",
    },
    menuIconButton: {
      margin: "10px 0 0 15px",
      padding: "9px",
      height: "80%",
    },
    menuIcon: {
      fontSize: "1.5rem",
    },

    clearSearch: {
      opacity: searchStyles[0],
      transition: "opacity .25s",
      pointerEvents: searchStyles[2],
    },
  }));

  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.leftPortion}>
        <IconButton className={classes.menuIconButton} aria-label="menu">
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <img src={bulb} alt="" />
        <Link>Keep</Link>
      </div>

      <div className={classes.middlePortion}>
        <Paper
          component="form"
          className={`${classes.search} ${classes.paper}  `}
        >
          <IconButton className={classes.iconButton} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            fullWidth
            className={classes.input}
            classes={{ placeholder: classes.searchBarPlaceHolder }}
            placeholder=" Search"
            onFocus={() => {
              setSearchstyles(["1", "white", "auto", ""]);
            }}
            onBlur={() => {
              setSearchstyles(["0", "rgb(241,243,244)", "none", "none"]);
            }}
            inputProps={{ "aria-label": "search content" }}
          />
          <IconButton
            type="submit"
            className={`${classes.iconButtonMenu} ${classes.clearSearch}`}
            aria-label="search"
          >
            <ClearSharpIcon className={classes.searchIcon} />
          </IconButton>
        </Paper>
      </div>

      <div className={classes.rightPortion}>
        <div className={classes.appIconBar}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <RefreshSharpIcon className={classes.appsIcon} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <ViewStreamRoundedIcon className={classes.appsIcon} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="menu">
            <SettingsOutlinedIcon className={classes.appsIcon} />
          </IconButton>{" "}
        </div>
        <div className={classes.appIconList}>
          <IconButton className={`${classes.iconAppButton}`} aria-label="menu">
            <MoreVertIcon className={classes.appsIconGrid} />
          </IconButton>
          <IconButton className={`${classes.iconAppButton}`} aria-label="menu">
            <PersonSharpIcon className={classes.appsIconGrid} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

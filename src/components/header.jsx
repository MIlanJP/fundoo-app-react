import React, { useState ,useContext} from "react";
import Bars from "../Assets/menu.svg";
import bulb from "../Assets/bulb.png";
// import styles from "../scss/icons.module.scss";
// import headerStyles from "../scss/header.module.scss";
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Auth from "../services/Auth";
import { useHistory } from "react-router-dom";
import MessageContext from "../components/messagecontext";
export default function Header(props) {
    const history = useHistory();
  const messages = useContext(MessageContext);

  const [searchStyles, setSearchstyles] = useState([
    "0",
    "rgb(241,243,244)",
    "none",
    "none",
  ]);

  const [logoutPopUpStyle, setLogoutPopUpStyle] = useState([
    "0",
    "-10",
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

    keepTitle:{
        textDecoration: "none",
        margin:'9px 0 0 0',
        position:'relative',
        top:'10px',
        left:"-20px",
        marginRight:'auto',
        fontSize:"1.4rem",
        fontFamily:"Roboto, RobotoDraft, Arial, sans-serif",
        color:"black"
    },

    GoogleKeepImage:{
        height:'70%',
        margin:'9px 0 0 0',
        position:'relative',
        left:'-15px'
    },

    googleKeepBulbImage:{
        height:'40px',
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
      top:'-9px',
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignSelf: "flex-end",
      width: "30%",
    },

    appIconBar: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      left: "-6.75%",
    },
    appIconList: {
      display: "flex",
      flexDirection: "row",
      paddingRight: "10px",
    },
    menuIconButton: {
      margin: "9px 10px 0 15px",
      padding: "9px",
      height: "70%",
      background:props.showDrawer ? 'rgb(241,243,244)' :''
    },
    menuIcon: {
      fontSize: "1.5rem",
    },

    clearSearch: {
      opacity: searchStyles[0],
      transition: "opacity .25s",
      pointerEvents: searchStyles[2],
    },
    otherTitle:{
       
        textDecoration: "none",
        margin:'9px 0 0 30px',
        position:'relative',
        top:'10px',
        left:"-20px",
        marginRight:'auto',
        fontSize:"1.4rem",
        fontFamily:"Roboto, RobotoDraft, Arial, sans-serif",
        color:"black"
    },
    logOutPopUp:{
        position: "absolute",
        right:"10px",
        transition: "opacity .5s",
        opacity:logoutPopUpStyle[0],
        zIndex:logoutPopUpStyle[1],
        pointerEvents:logoutPopUpStyle[2],
        top:"70px",
        padding:"0 10px 0 10px",
        border:'none',
        boxShadow: "0 0 1px 1px black",
        background:"rgb(241,243,244)",
    },
  }));

  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.leftPortion}>{
          props.heading==="Keep" ?
          <>
          <IconButton className={classes.menuIconButton} aria-label="menu"
          onClick={()=>{props.setShowDrawer(!props.showDrawer)
          }}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <IconButton disabled={true}  disableFocusRipple={true} disableRipple={true}  className={classes.GoogleKeepImage}>
          <img className={classes.googleKeepBulbImage}  src={bulb} alt="Google Keep" />
          </IconButton>
          <Link className={classes.keepTitle}  >Keep</Link>
           </>:
            <>
            <IconButton className={classes.menuIconButton} aria-label="menu"
            onClick={()=>{props.setShowDrawer(!props.showDrawer)
            }}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Link className={classes.otherTitle} >{props.heading}</Link>
          </>

      }
       
       
       
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
          <IconButton className={classes.iconButton} aria-label="menu"
          >
            <SettingsOutlinedIcon className={classes.appsIcon} />
          </IconButton>{" "}
        </div>
        <div className={classes.appIconList}>
          <IconButton className={`${classes.iconAppButton}`} aria-label="menu"
          >
            <MoreVertIcon className={classes.appsIconGrid} />
          </IconButton>
          <IconButton className={`${classes.iconAppButton}`}
          onClick={()=>{
              if(logoutPopUpStyle[0]==='0'){
                setLogoutPopUpStyle(['1','10','auto'])
              }else{
                setLogoutPopUpStyle(['0','-10','none'])
              }
          }}
          onBlur={()=>{
            setLogoutPopUpStyle(['0','-10','none'])
         }}
          aria-label="menu"
          >
            <PersonSharpIcon className={classes.appsIconGrid} />
          </IconButton>
          <div className={classes.logOutPopUp}
                  onClick={() => {
                    Auth.logout(() => {
                      history.push("/login");
                      localStorage.removeItem('token')
                      messages.setMessage("you Have successfully logged out");
                      messages.setSnackBar(true);
                    });
                  }}
                  onFocus={()=>{
                    setLogoutPopUpStyle(['1','10','auto'])
                 }}
          >
          Logout 
          <IconButton className={`${classes.iconAppButton}`} aria-label="menu">
            <ExitToAppIcon className={classes.logOutPopUpIcon} />
          </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
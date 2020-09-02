import React from 'react'
import { List, Drawer, ListItem, ListItemText,ListItemIcon } from '@material-ui/core'
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Link } from 'react-router-dom';

export default function Drawers(props) {
//   const [labels]=useState(["Milan","Milan1"])
//   const [tabs]=useState(["Notes","Reminder",...labels,"Edit Labels","Archieve","Bin"])
  const useStyles=makeStyles(theme=>({
    root:{
  width:'250px',

    },  
     paper:{
        width:'250px',


    },
  }))

  const classes=useStyles();

    return (
     <Drawer
     anchor="right"
     variant='persistent'
     open={props.showDrawer}
     classes={{docked:classes.root,modal:classes.root1,paperAnchorLeft:classes.paper}}
     className={classes.root}
     
   
     >
      <List>
        {props.listOfLabels.map((text, index) => {
        return     <ListItem button key={text}
                onClick={()=>{
                    if(text!=="Edit Labels"&&index!==0){
                            props.setHeading(`  ${text}`)
                    }
                    if(index===0){
                        props.setHeading("Keep")

                    }
                }}
            component={Link} to={index===0? "/profile":
            index=== props.listOfLabels.length-3?"#":
            index > props.listOfLabels.length-3? 
            `/profile/${text.toLowerCase()}`:
            index > 1 ? `/profile/label/${text.toLowerCase()}`:
            `/profile/${text.toLowerCase()}`
        }
        >
          <ListItemIcon>{
          index===0 ? <EmojiObjectsOutlinedIcon/>:
          index === 1 ? <NotificationsNoneOutlinedIcon/> :
          index === props.listOfLabels.length-1 ? <DeleteOutlinedIcon/> :
          index ===  props.listOfLabels.length-2 ? <ArchiveOutlinedIcon/> :
          index === props.listOfLabels.length-3 ? <EditOutlinedIcon/> :
           <LabelOutlinedIcon/> 
}
</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
        }

        
        )
        }
      </List>
     </Drawer>
    )
}

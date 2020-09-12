import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {updateColorOfNote} from '../redux'
import { Card } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import labelService from '../services/labelservice'
import {useDispatch} from 'react-redux'
export default function ColorPallette(props) {
    const dispatch = useDispatch()
const useStyles = makeStyles((theme) => ({
    colorBox:{
        width:"160px",
        height:"120px",
        zIndex:3,
        display:"flex",
        flexDirection:'row',
        flexWrap: "wrap",
    },
    colorOption:{
        width:'35px',
        height:'35px',
        borderRadius: '50%',
        border:'groove 2px',
    },
}))
const classes = useStyles();
const colors=['#FFFFFF', '#FA8072','#FD823B','#FFFF64','#66FF66','#5BB4B4','#0606F8','#00FFFF','#9B2C9B','#FFC0CB','#D10303','#808080']
    return (
        <Card className={classes.colorBox} >
         
              {colors.map((data)=>{
                return <IconButton className={classes.colorOption} style={{backgroundColor:data}}  
                onClick={()=>{
                    const idData={
                        color:data,
                        noteIdList:[props.id]
                    }
                    labelService.updateColorOfNote(idData).then(()=>{   
                        dispatch(updateColorOfNote(data,props.id))
                            props.setDisplayColorPallette(false)

                    })
                }}
                ></IconButton>
              })}
             
        </Card>
    )
}


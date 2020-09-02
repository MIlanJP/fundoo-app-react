import React, { useState } from "react";
import MessageContext from "../components/messagecontext";
import Header from '../components/header'
import { Route } from 'react-router-dom';
import Label from '../components/label'
import Bin from '../components/bin'
import Notes from '../components/notes'
import Reminder from '../components/reminder'
import Archieve from '../components/archieve'

export default function Profile() {
  const [routesPages]=useState([Notes,Reminder,Label,Archieve,Bin])
  const [routesName]=useState(["Notes","Reminder","Label","Archieve","Bin"])
  const [labels]=useState(["Milan","Milan1"])
  return (
    <>
     <Header/>
     <Route  exact path="/profile" component={Notes}/>
     {routesPages.map((PageComponent,index)=>{
      console.log( routesName[index].toLowerCase(),"Prinig index",index)
       if(index!==2&&index!==0){
         return <Route key={ routesName[index].toLowerCase()}  exact path={`/profile/${routesName[index].toLowerCase()}`} 
         component={PageComponent}
         />
       }else{
         if(index===2&&labels.length>0){
           const collectLabel=[];
            labels.forEach((data)=>{
              collectLabel.push(
                <Route key={ routesName[index].toLowerCase()}  exact path={`/profile/label/${data.toLowerCase()}`} 
                  >
                  <PageComponent labelName={data}/>
                </Route>
              )
            })
            return collectLabel;
         }
       }
     })}

    </>
  );
}

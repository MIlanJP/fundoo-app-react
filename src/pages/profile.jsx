import React, { useState } from "react";
import MessageContext from "../components/messagecontext";
import Header from '../components/header'
import { Route } from 'react-router-dom';
import uuid from 'react-uuid'
import Label from '../components/label'
import Bin from '../components/bin'
import Notes from '../components/notes'
import Reminder from '../components/reminder'
import Archieve from '../components/archieve'
import Drawer from '../components/drawer'
import styles from "../scss/profile.module.scss"

export default function Profile() {
  const [routesPages]=useState([Notes,Reminder,Label,Archieve,Bin])
  const [routesName]=useState(["Notes","Reminder","Label","Archieve","Bin"])
  const [labels]=useState(["Milan","Milan1"])
  const [tabs]=useState(["Notes","Reminder",...labels,"Edit Labels","Archieve","Bin"])
  const [heading,setHeading]=useState('Keep')
  const [showDrawer,setShowDrawer]=useState(false);
  return (
    <>
     <Header setShowDrawer={setShowDrawer} showDrawer={showDrawer} heading={heading}  />
     <div className={styles.DrawerLayout}  >
     <Drawer listOfLabels={tabs} showDrawer={showDrawer} setHeading={setHeading}  setShowDrawer={setShowDrawer}  />
     </div>
     <Route  exact path="/profile" component={Notes}/>
     {routesPages.map((PageComponent,index)=>{
       if(index!==2&&index!==0){
         return <Route key={ routesName[index].toLowerCase()}  exact path={`/profile/${routesName[index].toLowerCase()}`} 
         component={PageComponent}
         />
       }else{
         if(index===2&&labels.length>0){
           const collectLabel=[];
            labels.forEach((data)=>{
              collectLabel.push(
                <Route key={uuid()}  exact path={`/profile/label/${data.toLowerCase()}`} 
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

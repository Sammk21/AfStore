import React, { useState } from 'react'
import Login from './Login'
import Profile from './Profile'
import { useUserAuth } from '../Utils/AuthContext'

const CommonPage = () => {

    const {user} = useUserAuth();

    console.log("user" ,user)

   

    let loggedIn = true;

    if(user == null){
       loggedIn=false;
    }

   
    
  return (
    <div>
        {loggedIn? <Profile/> : <Login/>}
      
    </div>
  )
}

export default CommonPage

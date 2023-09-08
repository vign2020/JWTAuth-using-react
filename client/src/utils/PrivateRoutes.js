import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'

import { useCookies } from 'react-cookie';


export default function PrivateRoutes() {
    let auth=false;
    const [cookies] = useCookies(['AuthToken']);
    // const [ cookies ] = useCookies(['zxc'])
    
    // alert(cookies.AuthToken)
    if(cookies.AuthToken) auth = true;
    


    return(
       auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

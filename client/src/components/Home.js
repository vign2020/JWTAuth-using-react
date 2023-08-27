import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import {  Redirect, useLocation  } from "react-router-dom";


export default function Home(props) {
 
  return(
    <>
    <h1>Home page {props.token}</h1>
   </>
  )
 
}

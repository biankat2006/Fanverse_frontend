import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, } from 'react-router-dom'

// import { mainPage } from "../api";

import Navbar from "../components/NavBar";
import Images from "../components/Images";
import { logout, whoami } from "../api";


export default function MainPage() {
    const [user , setUser] = useState(null)
    const [errorUser , setErrorUser] = useState('')
    const navigate = useNavigate()



useEffect(()=>{
    async function load(){
        const data = await whoami()
        if(data.error){
            return setErrorUser(data.error)
        }
        return setUser(data)
    }
    load()
},[])

    async function onLogout(){
        const data = await logout()
        if(data.error){
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    } 



    return (
        <div>
            <div>
                <Navbar user={user} onLogout={onLogout}/>
                {errorUser &&  <div className="alert alert-danger text-center my-2">{errorUser}</div>}
            </div>
            <div className="" style={{height: 2000,backgroundColor: '#452458'}}>
                
                <div className="rounded-5 mx-5" style={{backgroundColor: '#652f80', height:200}}>

                </div>
            </div>
        </div>
    )
}
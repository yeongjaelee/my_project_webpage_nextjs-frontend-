import React, {useEffect, useState} from 'react';
import type { NextPage } from "next";
import {Router, useRouter} from "next/router";
import LandingPage from "./LandingPage";
import {router} from "next/client";
import {getCookie} from "./components/token/Cookie";


const Home = () => {
    const router = useRouter();
    const [message, setMessage] = useState('')
    //const data = router.query
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const identification = localStorage.getItem('identification')
        if (token){
            setMessage('welcome'+' '+identification)
        }
        else{
            setMessage('')
        }
    },[])

    return (
        <div className="flex flex-col items-center h-screen justify-center text-3xl">
            Here is the homepage<br/>
            {message}
        </div>
    )

};
export default Home;
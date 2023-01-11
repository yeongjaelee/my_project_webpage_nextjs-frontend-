import React from 'react';
import type { NextPage } from "next";
import {Router, useRouter} from "next/router";
import LandingPage from "./LandingPage";

const Home = () => {
    const router = useRouter()
    const handleClick = (path: string) => {
        if (path === "LandingPage") {
            console.log(1);
            router.push('/LandingPage')
        }
        else if(path === "Home"){
            console.log('home')
            router.push('/')
        }
    };
    return (
        <div className="flex flex-col items-center h-screen justify-center text-3xl">
            Here is the homepage
        </div>
    )

};
export default Home;
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
        <div>
            <div className="flex flex-col text-center text-3xl my-10">
                <button type="button" onClick={() => handleClick("Home")}>
                    yeongjae's project
                </button>
            </div>

        <button className="text-2xl" type="button" onClick={() => handleClick("LandingPage")}>
            Landing Page <br/>
            at the work
        </button>
        </div>
    )

};
export default Home;
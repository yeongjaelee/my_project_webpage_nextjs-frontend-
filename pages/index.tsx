import React from 'react';
import type { NextPage } from "next";
import {Router, useRouter} from "next/router";
import LandingPage from "./components/LandingPage/LandingPage";

const Home = () => {
    const router = useRouter()
    const handleClick = (path: string) => {
        console.log(path);
        if (path === "LandingPage") {
            console.log(1);
            router.push('components/LandingPage/LandingPage')
        }
    };
    return (
        <div>
            <div className="flex flex-col text-center text-3xl my-10">
                yeongjae's project
            </div>

        <button className="text-2xl" type="button" onClick={() => handleClick("LandingPage")}>
            Landing Page <br/>
            at the work
        </button>
        </div>
    )

};
export default Home;
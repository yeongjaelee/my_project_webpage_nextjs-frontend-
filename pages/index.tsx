import React from 'react';
import type { NextPage } from "next";
import {Router, useRouter} from "next/router";
import LandingPage from "./LandingPage";

const Home = () => {
    return (
        <div className="flex flex-col items-center h-screen justify-center text-3xl">
            Here is the homepage
        </div>
    )

};
export default Home;
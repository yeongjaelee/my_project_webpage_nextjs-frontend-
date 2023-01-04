import React from 'react';
import {ReactDOM} from "react";
import type { NextPage } from "next";
import FirstPage from "../components/FirstPage";
import SecondPage from "../components/SecondPage";
import ThirdPage from "../components/ThirdPage";
import FourthPage from "../components/FourthPage";
import FifthPage from "../components/FifthPage";
import SixthPage from "../components/SixthPage";
import SeventhPage from "../components/SeventhPage";
import EigthPage from "../components/EigthPage";
import NinthPage from "../components/NinthPage";
import ThirdPointPage from "../components/ThirdPointPage";
import TenthPage from "../components/TenthPage";
import {useEffect, useState} from "react";


const Home: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scrollYPosition, setScrollYPosition] = useState(0);
    const handleWheel = (event:WheelEvent) =>{

        if (event.deltaY>30 && currentPage < 10){
            removeEventListener('wheel', handleWheel)
            setCurrentPage(currentPage+1)
        }
        else if (event.deltaY<-30 && currentPage>0){
            removeEventListener('wheel', handleWheel)
            setCurrentPage(currentPage-1)
        }
    }
    useEffect(()=>{
        setScrollYPosition(currentPage * window.innerHeight)
        setTimeout(()=>{
            addEventListener("wheel", handleWheel);
        }, 500)
    },[currentPage])

    useEffect(()=>{
            addEventListener("wheel", (event)=>{
                event.preventDefault()
            },{
                passive:false
            });
        addEventListener("wheel", handleWheel);
        addEventListener('scroll', (event)=>{
            event.preventDefault()
        },{passive:false})
    },
        [])
    return (
        <div className="max-h-screen transition-all duration-500" style={{transform: `translateY(-${scrollYPosition}px)`}}>
            <TenthPage />
            <FirstPage />
            <SecondPage/>
            <ThirdPage />
            <ThirdPointPage />
            <FourthPage />
            <FifthPage />
            <SixthPage />
            <SeventhPage />
            <EigthPage />
            <NinthPage />

        </div>
    );
};

export default Home;
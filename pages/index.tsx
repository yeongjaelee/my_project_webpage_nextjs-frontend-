
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
        event.preventDefault()
        if (event.deltaY>30){
            setCurrentPage(currentPage+1)
            setScrollYPosition(window.innerHeight*currentPage)
            console.log(scrollYPosition)
            removeEventListener('wheel', handleWheel)

        }}

    useEffect(()=>{
        addEventListener("wheel", handleWheel,{
            passive:false
        });
        addEventListener('scroll', (event)=>{
            event.preventDefault()
        },{passive:false})

    },
        [])
    return (
        <div className="max-h-screen" style={{transform: `translateY(-${scrollYPosition}px)`}}>
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
            <TenthPage />
        </div>
    );
};

export default Home;
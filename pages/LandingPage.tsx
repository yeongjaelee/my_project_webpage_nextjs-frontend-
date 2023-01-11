import React from 'react';
import type { NextPage } from "next";
import {useEffect, useState} from "react";
import FirstPage from "./components/LandingPage/FirstPage";
import SecondPage from "./components/LandingPage/SecondPage";
import ThirdPage from "./components/LandingPage/ThirdPage";
import ThirdPointPage from "./components/LandingPage/ThirdPointPage";
import FourthPage from "./components/LandingPage/FourthPage";
import FifthPage from "./components/LandingPage/FifthPage";
import SixthPage from "./components/LandingPage/SixthPage";
import SeventhPage from "./components/LandingPage/SeventhPage";
import NinthPage from "./components/LandingPage/NinthPage";
import TenthPage from "./components/LandingPage/TenthPage";
import EigthPage from "./components/LandingPage/EigthPage";


const LandingPage: NextPage = () => {
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

    const pages = [
        <FirstPage key={1}/>,
        <SecondPage key={2}/>,
        <ThirdPage key={3}/>,
        <ThirdPointPage key={3.5}/>,
        <FourthPage key={4}/>,
        <FifthPage key={5}/>,
        <SixthPage key={6}/>,
        <SeventhPage key={7}/>,
        <EigthPage key={8}/>,
        <NinthPage key={9}/>,
        <TenthPage key={10}/>,
    ]

    const [prevTouchY, setPrevTouchY] = useState(0);
    const [currentTouchY, setCurrentTouchY] = useState(0);
    const [isPageMoved, setIsPageMoved] = useState(false)



    const touchStartHandler = (e: TouchEvent) => {
        console.log(e.touches[0].clientY)
        e.preventDefault()
        setPrevTouchY(e.touches[0].clientY);
    };


    const touchHandler = (e: TouchEvent) => {
        e.preventDefault()
        setCurrentTouchY(e.changedTouches[0].clientY)
    };
    useEffect(()=>{
        if (currentTouchY > prevTouchY + 20) {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        }
        if (currentTouchY < prevTouchY - 20) {
            if (currentPage < 10) {
                setCurrentPage(currentPage + 1);
            }
        }

    }, [currentTouchY])


    useEffect(()=>{
        let page = document.getElementById('first')!
        switch (currentPage){
            case 0:
                page = document.getElementById('first')!
                break
            case 1:
                page = document.getElementById('second')!
                break
            case 2:
                page = document.getElementById('third')!
                break
            case 3:
                page = document.getElementById('forth')!
                break
            case 3.5:
                page = document.getElementById('third_point_forth')!
                break
            case 4:
                page = document.getElementById('fifth')!
                break
            case 5:
                page = document.getElementById('sixth')!
                break
            case 6:
                page = document.getElementById('seventh')!
                break
            case 7:
                page = document.getElementById('eighth')!
                break
            case 8:
                page = document.getElementById('ninth')!
                break
            case 9:
                page = document.getElementById('tenth')!
                break
        }
        setScrollYPosition(currentPage * page.getBoundingClientRect().height)

        setTimeout(()=>{
            addEventListener("wheel", handleWheel);
        }, 500)
    },[currentPage])

    useEffect(()=>{
            setTimeout(()=>window.scrollTo(0,1),0)
            addEventListener("wheel", (event)=>{
                event.preventDefault()
            },{
                passive:false
            });
            addEventListener("wheel", handleWheel);
            addEventListener('scroll', (event)=>{
                event.preventDefault()
            },{passive:false})
            addEventListener('touchstart', touchStartHandler,{passive:false});
            addEventListener('touchend', touchHandler,{passive:false});

        },
        [])
    return (
        <div className="max-h-screen transition-all duration-500" style={{transform: `translateY(-${scrollYPosition}px)`}}
             onTouchStart={(_)=>{
                 const inputs = document.querySelectorAll('input')
                 inputs.forEach((i)=>{
                     i.blur()
                 })
             }}
        >
            {pages}
        </div>
    );
};

export default LandingPage;
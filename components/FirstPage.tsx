import React from 'react';
import {useMediaQuery} from "react-responsive";

const FirstPage = () => {
    const isDesktopOrLaptop = useMediaQuery(
        { minDeviceWidth: 1224 },
        { deviceWidth: 1600 } // `device` prop
    )
    return (
        <div className="flex items-center justify-center min-h-screen" id="first">
                <div className="flex items-center lg:flex-row flex-col">
                    <div className="flex px-4 ">
                        <div className="text-4xl lg:text-5xl lg:mr-6 mr-0 lg:mb-0 mb-10 ">
                            여행 계획 짜기 킹받으시죠?
                        </div>
                    </div>
                    <img
                        src={
                            'https://media2.giphy.com/media/GDXJa3iRpInFC/giphy.gif?cid=790b7611lik64q7edw3pgf0082uovt7lc4nxm9xdkj3cq7ig&rid=giphy.gif&ct=g'
                        }
                        alt=""
                        className="w-[500px] lg:w-[500px] lg:mt-10 mt-0"
                    />
                </div>
        </div>
    );
};

export default FirstPage;
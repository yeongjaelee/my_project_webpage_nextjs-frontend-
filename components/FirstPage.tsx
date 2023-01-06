import React from 'react';
import {useMediaQuery} from "react-responsive";

const FirstPage = () => {
    const isDesktopOrLaptop = useMediaQuery(
        { minDeviceWidth: 1224 },
        { deviceWidth: 1600 } // `device` prop
    )
    return (
        <div className="flex items-center justify-center min-h-screen">
            {isDesktopOrLaptop &&
                <div className="flex items-center space-x-20">
                    <div className="flex flex-col px-4">
                        <div className="text-xl lg:text-5xl mb-2 lg:mb-5">
                            여행 계획 짜기 킹받으시죠?
                        </div>
                    </div>
                    <img
                        src={
                            'https://media2.giphy.com/media/GDXJa3iRpInFC/giphy.gif?cid=790b7611lik64q7edw3pgf0082uovt7lc4nxm9xdkj3cq7ig&rid=giphy.gif&ct=g'
                        }
                        alt=""
                        height="500"
                        width="500"
                    />
                </div>
            }
        </div>
    );
};

export default FirstPage;
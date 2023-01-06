import React from 'react';
import Image from "next/image";
import jeju_island from "../public/images/jeju_island.png";
const FifthPage = () => {
    return (
        <div>
            <div className="flex space-x-24 items-center justify-center min-h-screen">
                <Image src={jeju_island}
                       alt="image test"
                       width="400"
                       height="400"
                />
                <div className="flex flex-col space-y-8 text-4xl lg:text-5xl mb-2 lg:mb-5 text-center">
                    <div className="font-light ">인터넷 망령 멈춰!</div>
                    <div>로컬 사람에게</div>
                    <div>물어보세요!</div>
                </div>
            </div>
        </div>
    );
};

export default FifthPage;
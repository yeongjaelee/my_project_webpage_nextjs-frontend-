import React from 'react';
import Image from "next/image";
import jeju_island from "../public/images/jeju_island.png";
const FifthPage = () => {
    return (
        <div id="fifth">
            <div className="flex items-center justify-center min-h-screen lg:flex-row flex-col">
                <Image src={jeju_island}
                       alt="image test"
                       className="w-[300px] lg:w-[500px] lg:object-cover lg:mr-20 mr-0"
                />
                <div className="flex flex-col text-4xl lg:text-5xl text-center lg:mt-0 mt-10">
                    <div className="font-light text-2xl lg:text-3xl mb-1 lg:mb-2">인터넷 망령 멈춰!</div>
                    <div className="mb-1 lg:mb-2">로컬 사람에게</div>
                    <div>물어보세요!</div>
                </div>
            </div>
        </div>
    );
};

export default FifthPage;
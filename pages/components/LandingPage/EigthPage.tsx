import React from 'react';
import Image from "next/image";
import plan from "../../../public/images/plan.png";

const EigthPage = () => {

    return (
        <div id="eighth">
            <div className="flex flex-col items-center justify-center min-h-screen align-top">
                <div className="text-xl lg:text-4xl font-light">
                    상담 받은 내용을 토대로
                </div>
                <div className="text-2xl lg:text-6xl font-medium mb-4 lg:mb-4">
                    플래너가 짜주는 여행계획!
                </div>
                <Image src={plan}
                       alt="image test"
                       className="w-[300px] lg:w-[500px]"
                />
            </div>
        </div>
    );
};

export default EigthPage;
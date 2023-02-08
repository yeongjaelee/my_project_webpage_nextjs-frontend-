import React from 'react';
import Image from "next/image";
import trippy_app from "../../../publics/images/trippy_app.png";
const FourthPage = () => {
    return (
        <div id="forth">
            <div className="flex items-center justify-center min-h-screen lg:flex-row flex-col-reverse">
                <img
                    src={
                        'https://media1.giphy.com/media/JqDeI2yjpSRgdh35oe/giphy.gif?cid=790b7611ib12s4axtun0id8cn9fuprnti6218foin7bvu5mg&rid=giphy.gif&ct=g'
                    }
                    alt=""
                    className="w-[150px] lg:w-[300px] lg:object-cover"
                />
                <Image src={trippy_app}
                       alt="image test"
                       className="w-[200px] lg:w-[300px] ml-3 lg:ml-20"
                />
            </div>

        </div>
    );
};

export default FourthPage;
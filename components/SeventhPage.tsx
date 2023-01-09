import React from 'react';
import Image from "next/image";
import chatting_3 from "../public/images/chatting_3.png";
import chatting_4 from "../public/images/chatting_4.png";


const SeventhPage = () => {
    return (
        <div id="seventh">
            <div className="flex flex-col items-center justify-center min-h-screen align-top">
                <Image src={chatting_3}
                       alt="image test"
                       width="800"
                       height="600"
                />
                <Image src={chatting_4}
                       alt="image test"
                       width="800"
                       height="600"
                /><br/>
            </div>
        </div>
    );
};

export default SeventhPage;
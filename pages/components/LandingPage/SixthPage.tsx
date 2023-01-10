import React from 'react';
import Image from "next/image";
import chatting_1 from "../../../public/images/chatting_1.png";
import chatting_2 from "../../../public/images/chatting_2.png";
import chatting_3 from "../../../public/images/chatting_3.png";
import chatting_4 from "../../../public/images/chatting_4.png";


const sixthPage = () => {
    return (
        <div id="sixth">
            <div className="flex flex-col items-center justify-center min-h-screen align-top">
                <Image src={chatting_1}
                       alt="image test"
                       width="800"
                       height="600"
                />
                <Image src={chatting_2}
                       alt="image test"
                       width="800"
                       height="600"
                /><br/>
            </div>
        </div>
    );
};

export default sixthPage;
import React from 'react';


const ThirdPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen lg:flex-row flex-col" id="third">
            <div className="flex flex-col text-3xl lg:text-5xl lg:mb-10 mb-5 text-center">
                <div className="mb-1 lg:mb-3 text-2xl lg:text-4xl">언제까지 인터넷만</div>
                <div>뒤져 보시려구요?</div>
            </div>
            <img
                src={
                    'https://media2.giphy.com/media/kKefeMw8rbMVq/giphy.gif?cid=790b7611trfeb87lznzcmgxffgf5k56nlmxis67jdjll9dgy&rid=giphy.gif&ct=g'
                }
                alt=""
                className="w-[250px] lg:w-[400px] md:object-cover lg:ml-20 ml-0"
            />

        </div>
);
};

export default ThirdPage;
import React from 'react';


const ThirdPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen lg:flex-row flex-col" id="third">
            <img
                src={
                    'https://media2.giphy.com/media/kKefeMw8rbMVq/giphy.gif?cid=790b7611trfeb87lznzcmgxffgf5k56nlmxis67jdjll9dgy&rid=giphy.gif&ct=g'
                }
                alt=""
                className="w-[400px] lg:w-[500px] md:object-cover lg:mr-20 mr-0"
            />
            <div className="flex flex-col space-y-8 text-4xl lg:text-5xl lg:mt-0 mt-10 text-center">
                언제까지 인터넷만 <br/>
                뒤져 보시려구요??
            </div>
        </div>
);
};

export default ThirdPage;
import React from 'react';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="h-60 flex flex-col items-center justify-center">
                <div className="text-2xl">
                    identification
                </div>
                <div>
                    <input className="outline outline-1 w-60"/>
                </div>
            </div>
            <div className="h-24 flex flex-col items-center">
                <div className="text-2xl">
                    password
                </div>
                <div>
                    <input className="outline outline-1 w-60"/>
                </div>
            </div>
            <button className="outline outline-1 p-1">login</button>
            <button className="outline outline-1 mt-1 p-1">make a account</button>
        </div>
    )
};

export default Login;
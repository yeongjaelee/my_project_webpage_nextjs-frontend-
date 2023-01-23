import React, {FormEventHandler, useEffect, useState} from 'react';
import client from "../apollo-client";
import {gql} from "@apollo/client";
import {router} from "next/client";

const USER_REGISTER = gql`
mutation UserRegister($identification: String!, $password: String!, $username: String!) {
    userRegister(identification: $identification, password: $password, username: $username) {
        success
    }
}
`;
const user_register = () => {
    const [identification, setIdentification] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const register: FormEventHandler = async (e) => {
        e.preventDefault()
        await client.mutate({mutation: USER_REGISTER, variables: {identification, password, username}});
        router.push('/Login');
    }
    return (
        <div className='flex flex-col h-screen items-center '>
            <form onSubmit={register}>
                <div className='p-3'>
                    identifcation<br/>
                    <input className="outline outline-1 w-60"
                           onChange={e => setIdentification(e.target.value)}
                           value={identification}
                    />
                </div>
                <div className='p-3'>
                    username<br/>
                    <input className="outline outline-1 w-60"
                           onChange={e => setUsername(e.target.value)}
                           value={username}
                    />
                </div>
                <div className='p-3'>
                    password<br/>
                    <input className="outline outline-1 w-60"
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                </div>
                <div className='p-3'>
                    <button className="outline outline-1 p-1">register</button>
                </div>
            </form>
        </div>
    )
};

export default user_register;
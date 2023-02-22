import React, {FormEventHandler, useEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {useRouter} from "next/router";
import client from "../login-apollo-client";

const GET_USER = gql`
    query User($token:String!){
      user(token:$token) {
        id
        identification
        password
        username
      }
    }
`;
const GET_TOKEN = gql`
mutation TokenAuth($identification: String!, $password: String!) {
    tokenAuth(identification: $identification, password: $password) {
        token
        payload
        refreshExpiresIn
    }
}
`;
const SET_TOKEN = gql`
mutation SetToken($identification: String!, $token:String!){
    setToken(identification: $identification, token:$token){
        success
    }
}
`
const Login = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState<string|null>(null)
    //const [cookies, setCookie] = useCookies(['token']);
    const userhandle: FormEventHandler = async (e) => {
        e.preventDefault()
        if (!identification) {
            return alert("put the id.");
        }
        else if (!password) {
            return alert("put the password.");
        }
        const {data:token_data} = await client.mutate({mutation: GET_TOKEN, variables: {identification, password}});
        const token = token_data.tokenAuth.token
        const {data:set_token} = await client.mutate({mutation: SET_TOKEN, variables:{identification, token}})
        if (set_token.setToken.success){
            console.log(11111)
            console.log(token)
            const {data} = await client.query({
                query: GET_USER, variables: {
                    token
                }
            })
            alert('welcome');

            localStorage.setItem('token', token)
            setToken(token)
            await router.push(
                { pathname:'/',
                    query:{
                        identification: data.user.identification
                    }});
        }
    };
    useEffect(()=>{
        console.log('login page')
        setToken(localStorage.getItem('token'))
    },[token])

    // @ts-ignore
    return (
        <>
            {token?
                <div className="flex flex-col items-center justify-center text-4xl h-screen">
                    you are already in log in
                </div>
                : <div className="flex flex-col items-center justify-center ">
                    <form className="h-60 flex flex-col items-center justify-center" onSubmit={userhandle}>
                        <div className="text-2xl">
                            identification
                        </div>
                        <div>
                            <input className="outline outline-1 w-60"
                                   onChange={e => setIdentification(e.target.value)}
                                   value={identification}/>
                        </div>
                        <div className="text-2xl">
                            password
                        </div>
                        <div>
                            <input className="outline outline-1 w-60 "
                                   onChange={e => setPassword(e.target.value)}
                                   value={password}/>
                        </div>
                        <button className="outline outline-1 p-1">login</button>
                    </form>
                    <button className="outline outline-1" onClick={()=>router.push('/components/FindUserInfo')}>find password</button>
                    <button className="outline outline-1" onClick={()=>router.push('/user_register')}>make a account</button>
                </div>
            }

        </>
    )
};

export default Login;
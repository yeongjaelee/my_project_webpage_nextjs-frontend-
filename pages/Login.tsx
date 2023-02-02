import React, {FormEventHandler, useEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "../apollo-client";
import {useRouter} from "next/router";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";
import {setCookie} from "./components/token/Cookie";
import {useCookies} from "react-cookie";
import {set} from "react-hook-form";

const GET_USER = gql`
    query User($identification:String!){
      user(identification:$identification) {
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
const Login = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [password, setPassword] = useState('')
    const token = localStorage.getItem('token')
    //const [cookies, setCookie] = useCookies(['token']);
    const userhandle: FormEventHandler = async (e) => {
        e.preventDefault()
         const {data} = await client.query({
             query: GET_USER, variables: {
                 identification
             }
         })
        // @ts-ignore
        const {data:token_data} = await client.mutate({mutation: GET_TOKEN, variables: {identification, password}});
         if (!identification) {
             return alert("put the id.");
         }
         else if (!password) {
             return alert("put the password.");
         }

        if(data.user.identification==""){
            return alert("try again")
        }
        else if(data.user.identification=="hello"){
            console.log('here is remove token')
            localStorage.removeItem('token')
        }
        else{
            //console.log(token_data.tokenAuth.token)
            //setCookie('token', token_data.tokenAuth.token)
            alert('welcome');
            localStorage.setItem('token', token_data.tokenAuth.token)
            localStorage.setItem('identification', identification)
            await router.push(
                { pathname:'/',
                    query:{
                    identification: data.user.identification
                    }});
        }
    };
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
                    <button className="outline outline-1" onClick={()=>router.push('/user_register')}>make a account</button>
                </div>
            }

        </>
    )
};

export default Login;
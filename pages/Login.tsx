import React, {FormEventHandler, useEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "../apollo-client";
import {useRouter} from "next/router";

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

const Login = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [password, setPassword] = useState('')
    const userhandle: FormEventHandler = async (e) => {
        e.preventDefault()
        try {
            if (!identification) {
                return alert("ID를 입력하세요.");
            }
            else if (!password) {
                return alert("Password를 입력하세요.");
            }
            const {loading, error, data} = await client.query({
                query: GET_USER, variables: {
                    identification
                }
            })
            alert('welcome');
            router.push({pathname:'/', query:{data:data.user.identification}})
            }
        catch {
                alert('set the id, password again')
              }
    };


    // @ts-ignore
    return (
        <div className="flex flex-col items-center justify-center ">
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
                    <input className="outline outline-1 w-60"
                           onChange={e => setPassword(e.target.value)}
                           value={password}/>
                </div>
                <button className="outline outline-1 p-1">login</button>
                <button className="outline outline-1 mt-1 p-1">make a account</button>
            </form>
        </div>
    )
};

export default Login;
import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "../apollo-client";
import {useRouter} from "next/router";

const GET_USER = gql`
    query User($identification:String!){
      user(identification:$identification) {
        id
        identification
        username
      }
    }
`;

const myPage = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [username, setUsername] = useState('')
    const myFunction = async () =>{
        const identification = localStorage.getItem('identification')
        try {
            const {data} = await client.query({
                query: GET_USER, variables: {
                    identification
                }
            })
            setIdentification(data.user.identification)
            setUsername(data.user.username)
        }
        catch{
            alert('log in first !!')
            router.push('/Login')
        }

    }
    //@ts-ignore
    useEffect(() => {
        myFunction()
    }, [])
    const log_out = () => {
        localStorage.clear()
        router.push('/Login')
    }
    return (
        <div className="flex flex-col items-center h-screen content-center">
            <div className="text-center m-16">
                <div className="p-3 text-2xl">identification</div>
                <div className="p-2 text-3xl text-blue-900">{identification}</div>
            </div>
            <div className="text-center">
                <div className="p-3 text-2xl">username</div>
                <div className="p-2 text-3xl text-blue-900">{username}</div>
            </div>
            <button className="outline outline-1 m-10" onClick={log_out}>log out</button>
        </div>
    )
};

export default myPage;
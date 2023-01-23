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
        username
      }
    }
`;

const myPage = () => {
    const [identification, setIdentification] = useState('')
    const [username, setUsername] = useState('')
    const myFunction = async () =>{
        const identification = localStorage.getItem('identification')
        const {data} = await client.query({
            query: GET_USER, variables: {
                identification
            }
        })
        setIdentification(data.user.identification)
        setUsername(data.user.username)
        console.log(data.user.identification)
    }
    //@ts-ignore
    useEffect(() => {
        myFunction()
    }, [])
    return (
        <>
            <div>
                {identification}
            </div>
            <div>
                {username}
            </div>
        </>
    )
};

export default myPage;
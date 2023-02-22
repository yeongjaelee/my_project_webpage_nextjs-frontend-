import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "../apollo-client";
import {useRouter} from "next/router";

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
const DELETE_ACCOUNT = gql`
mutation DeleteUser($identification: String!) {
    deleteUser(identification: $identification) {
        success
    }
}
`;
const UPDATE_USER_INFO = gql`
mutation UpdateUserInfo($userId: Int!, $identification: String!, $username: String!){
    updateUserInfo(userId: $userId, identification:$identification, username:$username){
    success
    }
}
`;
const DELETE_TOKEN = gql`
mutation DeleteToken($token:String!){
    deleteToken(token:$token){
        success
    }
}
`

const myPage = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState(0)
    const [password, setPassword] = useState('')
    const [token, setToken] = useState<string|null>('')
    const myFunction = async () =>{
        const user_token = localStorage.getItem('token')
        setToken(localStorage.getItem('token'))
        try {
            const {data} = await client.query({
                query: GET_USER, variables: {
                    'token':user_token
                }
            })
            setIdentification(data.user.identification)
            setUsername(data.user.username)
            setPassword(data.user.password)
            setUserId(data.user.id)
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
    const log_out = async () => {
        localStorage.clear()
        await client.mutate({mutation: DELETE_TOKEN, variables: {'token': token}})
        router.push('/Login')
    }
    const delete_account = async () => {
        const {data} = await client.mutate({mutation: DELETE_ACCOUNT, variables: {identification}})
        if (data){
            localStorage.clear()
            await client.mutate({mutation:DELETE_TOKEN})
            router.push('/Login')
        }
    }
    const updateInfo = async () => {
        await client.mutate({mutation: UPDATE_USER_INFO, variables: {userId, identification, username}})
        localStorage.removeItem('token')
        router.push('/Login')
    }
    return (
        <div className="flex flex-col items-center h-screen content-center">
            <div className="text-center m-16">
                <div className="p-3 text-2xl">identification</div>
                <input className="p-2 text-3xl text-blue-900 text-center" type="text" value={identification} onChange={(e)=>setIdentification(e.target.value)} />
            </div>
            <div className="text-center">
                <div className="p-3 text-2xl">username</div>
                <input className="p-2 text-3xl text-blue-900 text-center" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <button className="outline outline-1 m-10" onClick={log_out}>log out</button>
            <button className="outline outline-1" onClick={updateInfo}>update</button>
            <button className="outline outline-1" onClick={delete_account}>delete account</button>
        </div>
    )
};
export default myPage;
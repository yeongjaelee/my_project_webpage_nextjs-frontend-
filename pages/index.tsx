import React, {useEffect, useState} from 'react';
import {Router, useRouter} from "next/router";
import {gql} from "@apollo/client";
import client from "../apollo-client";

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
const Home = () => {
    const router = useRouter();
    const [message, setMessage] = useState('')
    //const data = router.query
    const check_user = async () => {
        const token = localStorage.getItem("token");
        console.log(token)
        console.log(1)
        const {data} = await client.query({query: GET_USER, variables: {'token': token}})
        // if (data) {
        //     console.log(1)
        //     console.log(data.user.identification)
        //     console.log(3)
        //     setMessage('welcome' + ' ' + data.user.identification)
        // } else {
        //     console.log(2)
        //     console.log(data.user.identification)
        //     setMessage('')
        // }
    }
    useEffect(()=>{
        check_user()
    },[])

    return (
        <div className="flex flex-col items-center h-screen justify-center text-3xl">
            Here is the homepage<br/>
            {message}
        </div>
    )

};
export default Home;
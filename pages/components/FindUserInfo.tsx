import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../../apollo-client";
import {router} from "next/client";
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
const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($identification:String!, $password:String!){
        updatePassword(identification:$identification, password:$password){
            success
        }
    }
`;
const FindUserInfo = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [checkId, setCheckId] = useState(false)
    const [password, setPassword] = useState('')
    const checkIdentification = async () => {
        console.log(2)
        const {data} = await client.query({
            query: GET_USER, variables: {
                identification
            }
        })
        if (data !=null) {
            setCheckId(true)
        } else {
            alert('no id !')
        }

    }
    const changePassword = async () => {
        const {data} = await client.mutate({
            mutation: UPDATE_PASSWORD, variables: {
                'identification': identification,
                'password': password
            }
        })
        if(data.updatePassword.success === true){
            alert('update_password success!')
            router.push('/Login')
        }
    }

    return (
        <>
            <div className="flex flex-col items-center p-10">
            <input className="border-2 border-black"
                   placeholder="input your id"
                   onChange={(e)=>setIdentification(e.target.value)}
                   value={identification}
            />
            <button className="outline outline-1 m-5" onClick={checkIdentification}>submit</button>
            </div>
            {checkId?
                <div className="flex flex-col items-center">
                    update your password
                    <input className="border-2 border-black"
                           placeholder="input your new password"
                           onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button className="outline outline-1 m-5" onClick={changePassword}>change</button>
                </div>
                :
                <div className="flex flex-col items-center">check your id again</div>}

        </>
    )
};

export default React.memo(FindUserInfo);
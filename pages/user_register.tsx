import React, {FormEventHandler, useEffect, useState} from 'react';
import client from "../apollo-client";
import {gql} from "@apollo/client";
import {useRouter} from "next/dist/client/router";
import DaumPostcode from 'react-daum-postcode';

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
    const [isOpenPost, setIsOpenPost] = useState(true);
    const register: FormEventHandler = async (e) => {
        const router = useRouter()
        e.preventDefault()
        await client.mutate({mutation: USER_REGISTER, variables: {identification, password, username}});
        router.push('/Login');
    }

    const onChangeOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data: { address: any; addressType: string; bname: string; buildingName: string; }) => {
        console.log(11)
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setIsOpenPost(false);
    };
    useEffect(()=>{
    },[isOpenPost])
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
                    {isOpenPost  ? (
                        <DaumPostcode autoClose onComplete={onCompletePost} />
                    ) : null}
                    {/*{isOpenPost  ? (*/}
                    {/*    <div>hello</div>*/}
                    {/*) : null}*/}
                </div>
                <div className='p-3'>
                    password<br/>
                    <input className="outline outline-1 w-60"
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                </div>
                <div className='p-3'>
                    address<br/>
                    <input className="outline outline-1 w-60" id="address_id"
                    />
                    <button onClick={()=>setIsOpenPost(true)}>검색</button>
                </div>
                <div className='p-3'>
                    <button className="outline outline-1 p-1">register</button>
                </div>
            </form>
        </div>
    )
};


export default user_register;
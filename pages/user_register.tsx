import React, {FormEventHandler, useEffect, useState} from 'react';
import client from "../apollo-client";
import {gql} from "@apollo/client";
import {useRouter} from "next/router";
import DaumPostcode from 'react-daum-postcode';

const USER_REGISTER = gql`
mutation UserRegister($identification: String!, $password: String!, $username: String!, $address:String!) {
    userRegister(identification: $identification, password: $password, username: $username, address:$address) {
        success
    }
}
`;
const user_register = () => {
    const router = useRouter()
    const [identification, setIdentification] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [address, setAddress] = useState('')
    const [addressDetail, setAddressDetail] = useState('')
    const register: FormEventHandler = async (e) => {
        console.log(222)
        e.preventDefault()
        await client.mutate({mutation: USER_REGISTER, variables: {identification, password, username, 'address':address+addressDetail}});
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
            setAddress(fullAddr)
            console.log(fullAddr)
        }
        console.log(22)
        setIsOpenPost(false);
        console.log(33)
    };
    return (
        <div className='flex flex-col h-screen items-center '>
            {isOpenPost ? (
                <i>
                <DaumPostcode autoClose onComplete={onCompletePost} />
                </i>
            ) : (
                <>
                    <div className='p-3'>
                        identifcation<br/>
                        <input className="outline outline-1 w-60"
                               onChange={e => setIdentification(e.target.value)}
                               value={identification}/>
                    </div>
                    <div className='p-3'>
                        username<br/>
                        <input className="outline outline-1 w-60"
                               onChange={e => setUsername(e.target.value)}
                               value={username}/>

                    </div>
                    <div className='p-3'>
                        password<br/>
                        <input className="outline outline-1 w-60"
                               onChange={e => setPassword(e.target.value)}
                               value={password}/>
                    </div>
                    <div className='p-3'>
                        address<br/>
                        <input className="outline outline-1 w-60" id="address_id" value={address} onChange={e=>setAddress(e.target.value)}/>
                        <button onClick={() => setIsOpenPost(!isOpenPost)}>검색</button>
                        <div>
                            <input className="outline outline-1 w-60" id="address_id" value={addressDetail} onChange={e=>setAddressDetail(e.target.value)} placeholder="상세주소를 입력해주세요"/>
                        </div>

                    </div>
                    <div className='p-3'>
                        <button className="outline outline-1 p-1" onClick={register}>register</button>
                    </div>
                </>
            )}

        </div>
    )
};


export default user_register;
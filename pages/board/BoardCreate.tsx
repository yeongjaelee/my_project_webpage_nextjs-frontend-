import React, {FormEventHandler, useEffect, useState} from 'react';
import {Router} from "next/router";
import client from "../../apollo-client";
import {gql} from "@apollo/client";
import {useRouter} from "next/dist/client/router";

const CREATE_BOARD = gql`
mutation BoardCreate($title: String!, $content: String!, $identification:String!) {
    boardCreate(title: $title, content: $content, identification:$identification) {
        success
    }
}
`;
const BoardCreate = () => {
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const board_create_handle: FormEventHandler = async (e) => {
        e.preventDefault()
        const identification = localStorage.getItem('identification')
        await client.mutate({mutation:CREATE_BOARD, variables:{identification, title, content}})
        setTitle('')
        setContent('')
        router.reload()
        await router.push('/Board')
    };
    return (
        <div>
            <form className="h-96 flex flex-col items-center justify-center " onSubmit={board_create_handle}>
                <div className="text-2xl">
                    title
                </div>
                <div>
                    <input className="outline outline-1 w-96"
                           onChange={e => setTitle(e.target.value)}
                           value={title}/>
                </div>
                <div className="text-2xl">
                    content
                </div>
                <div>
                    <textarea className="outline outline-1 w-96"
                           onChange={e => setContent(e.target.value)}
                           value={content}/>
                </div>
                <button className="outline outline-1 m-5">create</button>
            </form>
        </div>
    )

};
export default BoardCreate;
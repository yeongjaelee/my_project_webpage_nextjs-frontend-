import React, {FormEventHandler, useEffect, useState} from 'react';
import {Router} from "next/router";
import client from "../../apollo-client";
import {gql} from "@apollo/client";
import {useRouter} from "next/dist/client/router";

const CREATE_BOARD = gql`
mutation BoardCreate($image:Upload, $file:Upload, $title: String!, $content: String!, $identification:String!, $isHided:Boolean!) {
    boardCreate(image:$image, file:$file, title: $title, content: $content, identification:$identification, isHided:$isHided) {
        success
    }
}
`;
const BoardCreate = () => {
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isHided, setIsHided] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const identification = localStorage.getItem('identification')
    const board_create_handle: FormEventHandler = async (e) => {
        e.preventDefault()
        await client.mutate({mutation:CREATE_BOARD, variables:{identification, title, content, isHided, image, file}})
        setTitle('')
        setContent('')
        setImage(null)
        await router.push('/Board').then(()=>router.reload())
    };
    const hideController = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsHided(e.target.checked)
    }
    const imageController = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !=null){
            setImage(e.target.files[0])
        }
    }
    const fileController = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !=null){
            setFile(e.target.files[0])
        }
    }
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
                <div>
                    <label>hide</label><input type="checkbox" checked={isHided} onChange={(e)=>hideController(e)}/>
                </div>
                <div>
                    image : <input type="file" name="file" onChange={imageController}/>
                </div>
                {/*<div>*/}
                {/*    file : <input type="file" name="file" onChange={fileController}/>*/}
                {/*</div>*/}
                <button className="outline outline-1 m-5">create</button>
            </form>
        </div>
    )
};
export default BoardCreate;
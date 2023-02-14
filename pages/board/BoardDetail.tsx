import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {useRouter} from "next/router";
import client from "../../apollo-client";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";
import {set} from "react-hook-form";
import ModalAlert from "../components/ModalAlert";
import {Dialog} from "@mui/material";



const GET_BOARD_DETAIL = gql`
    query BoardDetail($boardId:Int!){
      boardDetail(boardId:$boardId) {
        title
        content
        isHided
        image
        user{
          identification
        }
      }
    }
`;
const DELETE_BOARD = gql`
mutation BoardDelete($boardId: Int!) {
    boardDelete(boardId: $boardId) {
        success
    }
}
`;
const UPDATE_BOARD = gql`
mutation BoardUpdate($boardId: Int!, $title: String!, $content: String!){
    boardUpdate(boardId: $boardId, title: $title, content: $content){
        success
    }
}
`;
// @ts-ignore
const BoardDetail = () => {
    //modal
    const [openAlert, setOpenAlert] = useState(false)
    const router = useRouter()
    const boardId = router.query.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [checkId, setCheckId] = useState(true)
    const [image, setImage] = useState('')
    const deleteBoard = async () =>{
        await client.mutate({mutation:DELETE_BOARD, variables:{boardId}})
        setOpenAlert(false)
        router.push('/Board').then(()=> router.reload())
    }
    const notDeleteBoard = () =>{
        setOpenAlert(false)
    }
    const myFunction = async ()=>{
        const myIdentification = localStorage.getItem('identification')
        const {data} = await client.query({
            query: GET_BOARD_DETAIL, variables: {
                boardId
            }
        })
        if(data.boardDetail.user.identification != myIdentification){
            setCheckId(false)
        }
        console.log(data.boardDetail.image)
        setTitle(data.boardDetail.title)
        setContent(data.boardDetail.content)
        setImage(data.boardDetail.image)

    }
    const boardUpdate = async () => {
        await client.mutate({mutation:UPDATE_BOARD, variables:{boardId, title, content}})
        router.push('/board/MyBoard').then(() => router.reload())
    }
    //@ts-ignore
    useEffect(() => {
        myFunction()

    }, [])
    return (
        <div>
            <div className="flex justify-center items-center p-1 my-2">
                <input className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3 text-center"
                       onChange={(e)=>setTitle(e.target.value)}
                       type="text"
                       value={title}
                />
            </div>
            <div className="flex justify-center items-center p-1 my-2">
                <input className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3 text-center"
                       type="text"
                       value={content}
                       onChange={(e)=>setContent(e.target.value)} />
            </div>
            <div className="flex justify-center items-center p-1 my-2">
                <img src={image} />
            </div>
            {checkId?
                <>
                    <div className="flex justify-center items-center p-1 my-2">
                        <button onClick={boardUpdate}> update</button>
                    </div>
                    <div className="flex justify-center items-center p-1 my-2">
                        <button onClick={() => setOpenAlert(!openAlert)}> delete board</button>
                    </div>
                    <Dialog open={openAlert} fullWidth={true} className="border-solid border-b-black">
                        <div className="flex flex-col items-center">
                            Do you really want to delete your board?
                        </div>
                        <button onClick={notDeleteBoard}>
                            no
                        </button>
                        <button onClick={deleteBoard}>
                            yes
                        </button>
                    </Dialog></>
                :''
            }
        </div>
    )
};

export default BoardDetail;
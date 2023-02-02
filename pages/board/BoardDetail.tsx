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
// @ts-ignore
const BoardDetail = () => {
    //modal
    const [openAlert, setOpenAlert] = useState(false)
    const router = useRouter()
    const boardId = router.query.id
    const myIdentification = localStorage.getItem('identification')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [checkId, setCheckId] = useState(true)
    const deleteBoard = async () =>{
        await client.mutate({mutation:DELETE_BOARD, variables:{boardId}})
        setOpenAlert(false)
        router.push('/Board').then(()=> router.reload())
    }
    const notDeleteBoard = () =>{
        setOpenAlert(false)
    }
    const myFunction = async ()=>{
        const {data} = await client.query({
            query: GET_BOARD_DETAIL, variables: {
                boardId
            }
        })
        if(data.boardDetail.user.identification != myIdentification){
            setCheckId(false)
        }
        setTitle(data.boardDetail.title)
        setContent(data.boardDetail.content)
    }
    //@ts-ignore
    useEffect(() => {
        myFunction()
    }, )
    return (
        <>
            <div className="flex justify-center items-center p-1 my-2">
                <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3">
                    {title}
                </div>
            </div>
            <div className="flex justify-center items-center p-1 my-2">
                <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3">
                    {content}
                </div>
            </div>
            {checkId?
                <>
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
        </>
    )
};

export default BoardDetail;
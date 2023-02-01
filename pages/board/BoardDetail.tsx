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
      }
    }
`;

// @ts-ignore
const BoardDetail = () => {
    //modal
    const [openAlert, setOpenAlert] = useState(false)
    const onModalAlert = () => {
        console.log(2)

    }
    const router = useRouter()
    const boardId = router.query.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    function deleteBoard() {
        setOpenAlert(!openAlert);
    }
    const myFunction = async ()=>{
        console.log(boardId)
        const {data} = await client.query({
            query: GET_BOARD_DETAIL, variables: {
                boardId
            }
        })
        console.log(data)
        setTitle(data.boardDetail.title)
        setContent(data.boardDetail.content)
    }
    //@ts-ignore
    useEffect(() => {
        myFunction()
    }, [])
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
            <div className="flex justify-center items-center p-1 my-2">
            <button onClick={()=>setOpenAlert(!openAlert)}> delete board </button>
            </div>
            {openAlert ?
            <Dialog open={openAlert}>
                <button onClick={deleteBoard}>
                    yes
                </button>
            </Dialog>
                :null}
        </>
    )
};

export default BoardDetail;
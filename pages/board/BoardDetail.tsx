import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {useRouter} from "next/router";
import client from "../../apollo-client";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";
import {set} from "react-hook-form";

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
    const router = useRouter()
    const boardId = router.query.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const myFunction = async ()=>{
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
            <div>
                {title}
            </div>
            <div>
                {content}
            </div>
        </>
    )
};

export default BoardDetail;
import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {useRouter} from "next/router";
import client from "../../apollo-client";

const GET_MY_BOARD = gql`
    query myBoard($identification:String!){
  myBoard(identification:$identification){
    edges {
      node {
        id
        title
        totalCount
        content
      }
    }
  }
}

`;

const MyBoard = () => {
    const router = useRouter()
    const [boards, setBoards] = useState<any[]>([])
    const myFunction = async ()=>{
        const identification = localStorage.getItem('identification')
        const {data} = await client.query({
            query: GET_MY_BOARD, variables: {
                identification
            }
        })
        const boards = data.myBoard.edges.map((e:any)=>e.node)
        setBoards(boards)
    }
    //@ts-ignore
    useEffect(() => {
        myFunction()
    }, [])

    return (
        <>
            <div className="m-5"></div>
            {boards.map((board)=>
                <div className="flex justify-center items-center p-1 my-2">
                    <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3">
                        {board.title}
                    </div>
                </div>)}
        </>
    )
};

export default MyBoard;
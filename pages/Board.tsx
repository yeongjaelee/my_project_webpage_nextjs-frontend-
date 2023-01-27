import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {List} from "@material-ui/icons";
import {router} from "next/client";

const GET_BOARD = gql`
    query Board{
  board{
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
const Board = () => {
    const [boards, setBoards] = useState<any[]>([])
    const my_function = async ()=>{
        const {data} = await client.query({
            query: GET_BOARD
        })
        const boards = data.board.edges.map((e:any)=>e.node)
        setBoards(boards)
    }
    // @ts-ignore
    useEffect(() => {
        my_function()
    })


    // @ts-ignore
    return (
        <>
            <div className="m-5"></div>
            {boards.map((board)=>
            <div className="flex justify-center items-center p-1 my-2">
                <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3">
                {board.title}
                </div>
            </div>)}
            <div className="flex justify-center" >
            <button className="flex flex-col items-center justify-center border-solid border-2 border-black"
                    onClick={(e)=>{e.preventDefault(); router.push('/board/BoardCreate')}}>create</button>
            </div>
        </>
    )
};

export default Board;
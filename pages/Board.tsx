import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {List} from "@material-ui/icons";
import {router} from "next/client";
import Link from 'next/link'
import {useRouter} from "next/router";

const GET_BOARD = gql`
    query Board{
  board{
    edges {
      node {
        boardId
        title
        totalCount
        content
        isHided
      }
    }
  }
}

`;
const Board = () => {
    const router = useRouter()
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
    const check_user = (element: boolean, boardId: any) => () => {
        console.log(element)
        if (element){
            alert("it's hided")
            router.push('/Board')
        }
        else{
            console.log(boardId)
            router.push({pathname: 'board/BoardDetail', query:{id:boardId}})
        }
    }

    // @ts-ignore
    return (
        <>
            <div className="m-5"></div>
            {boards.map((board)=>
            <div className="flex justify-center items-center p-1 my-2">
                <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3" >
                    <a onClick={check_user(board.isHided, board.boardId)}>
                        {board.title}</a>
                </div>

            </div>)}
            <div className="flex justify-center" >
            <button className="flex flex-col items-center justify-center border-solid border-2 border-black"
                    onClick={(e)=>{e.preventDefault(); router.push('/board/BoardCreate')}}>create</button>
            <button className="flex flex-col items-center justify-center border-solid border-2 border-black pl-1"
                    onClick={(e)=>{e.preventDefault(); router.push('/board/MyBoard')}}>my board</button>
            </div>
        </>
    )
};

export default Board;
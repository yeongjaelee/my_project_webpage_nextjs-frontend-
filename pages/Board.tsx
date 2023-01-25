import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {List} from "@material-ui/icons";

const GET_BOARD = gql`
    query Board{
      board{
        title
        content
      }
    }
`;
const Board = () => {
    const [boards, setBoards] = useState([])
    const my_function = async ()=>{
        const {data} = await client.query({
            query: GET_BOARD
        })
        const boards = data.board.slice(0,4)
        setBoards(boards)
    }
    // @ts-ignore
    useEffect(() => {
        my_function()
    })


    // @ts-ignore
    return (
        <>
            post page
            {boards.map((board)=>
            <div>
                {board.title}
            </div>)}
        </>
    )
};

export default Board;
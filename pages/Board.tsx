import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {List} from "@material-ui/icons";

const GET_BOARD = gql`
    query Board{
  board{
    edges {
      node {
        id
        title
        totalCount
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
            post page
            {boards.map((board)=>
            <div>
                {board.title}
            </div>)}
        </>
    )
};

export default Board;
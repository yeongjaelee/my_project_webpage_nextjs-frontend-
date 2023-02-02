import React, {FormEventHandler, useEffect, useState} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {useRouter} from "next/router";

const GET_BOARD = gql`
    query Board(\$offset: Int = 1){
  board(offset: \$offset first: 5){
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
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [paginations, setPaginations] = useState(<div></div>)
    const [maxPage, setMaxPage] = useState(1)
    const COUNT_PER_PAGE = 5
    let totalCount = 0

    const router = useRouter()
    const [boards, setBoards] = useState<any[]>([])
    const my_function = async ()=>{
        const {data} = await client.query({
            query: GET_BOARD, variables: {
                offset: (currentPage-1) * 5,
            }
        })
        totalCount = data.board.edges[0].node.totalCount
        let _maxPage = Math.ceil( totalCount/COUNT_PER_PAGE)
        let _pages = []
        for(let i = 0; i < _maxPage; i++){
            _pages.push(i+1)
        }
        setPages(_pages)
        const boards = data.board.edges.map((e:any)=>e.node)
        setBoards(boards)
        setMaxPage(_maxPage)
    }
    // @ts-ignore
    useEffect(() => {
        my_function()
    },[pages])

    useEffect(()=>{
        let pageEls = pages.map((p)=><div key={p}
                                          onClick={()=>{
                                              setCurrentPage(p)
                                          }}
                                          className={`px-2 lg:px-3 lg:py-1 lg:mx-1 hover:bg-blue-100 cursor-pointer rounded text-sm lg:text-md
                                          ${p===currentPage? 'bg-blue-100':''}
                                          `}>{p}</div>)

        if(currentPage>1){
            pageEls = [
                <div
                    onClick={()=>{
                        setCurrentPage(currentPage-1)
                    }}
                    key={'<'} className={`px-1 lg:px-3 lg:py-1 lg:mx-1 hover:bg-blue-100 cursor-pointer rounded`}>{'<'}</div>
            ].concat(pageEls)
        }else {
            pageEls = [
                <div
                    key={'<'} className={`px-1 lg:px-3 lg:py-1 lg:mx-1 `}>{'  '}</div>
            ].concat(pageEls)
        }
        if(currentPage < maxPage){
            pageEls.push(
                <div
                    onClick={()=>{
                        setCurrentPage(currentPage+1)
                    }}
                    key={'>'} className={`px-1 lg:px-3 lg:py-1 lg:mx-1 hover:bg-blue-100 cursor-pointer rounded`}>{'>'}</div>
            )
        }
        setPaginations(
            <div className='flex items-center'>
                {pageEls}
            </div>
        )
    }, [pages])


    const check_user = (isHided: boolean, boardId: any) => () => {
        console.log(isHided)
        if (isHided){
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
            <div className='mt-5 flex justify-center'>
                {paginations}
            </div>
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
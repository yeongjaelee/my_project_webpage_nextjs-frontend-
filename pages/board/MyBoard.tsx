import React, {FormEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {useRouter} from "next/router";
import client from "../../apollo-client";
import Link from "next/link";

const GET_MY_BOARD = gql`
    query myBoard(\$offset: Int = 1, $identification:String!){
  myBoard(offset: \$offset first: 5, identification:$identification){
    edges {
      node {
        boardId
        title
        totalCount
        content
      }
    }
  }
}

`;


const MyBoard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [paginations, setPaginations] = useState(<div></div>)
    const [maxPage, setMaxPage] = useState(1)
    const COUNT_PER_PAGE = 5
    let totalCount = 0

    const router = useRouter()
    const [boards, setBoards] = useState<any[]>([])
    const myFunction = async ()=>{
        const identification = localStorage.getItem('identification')
        const {data} = await client.query({
            query: GET_MY_BOARD, variables: {
                offset: (currentPage-1) * 5, identification
            }
        })
        totalCount = data.myBoard.edges[0].node.totalCount
        let _maxPage = Math.ceil( totalCount/COUNT_PER_PAGE)
        let _pages = []
        for(let i = 0; i < _maxPage; i++){
            _pages.push(i+1)
        }
        setPages(_pages)
        const boards = data.myBoard.edges.map((e:any)=>e.node)
        setBoards(boards)
        setMaxPage(_maxPage)
    }

    //@ts-ignore
    useEffect(() => {

        myFunction()
    }, [pages])
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

    return (
        <>
            <div className="m-5"></div>
            {boards.map((board)=>
                <div className="flex justify-center items-center p-1 my-2">
                    <div className="flex justify-center items-center border-solid border-2 border-black text-xl w-1/3">
                        <Link href={{
                            pathname:"../board/BoardDetail",
                            query:{id: board.boardId}}}>
                            {board.title}</Link>
                    </div>
                </div>)}
            <div className='mt-5 flex justify-center'>
                {paginations}
            </div>
        </>
    )
};

export default MyBoard;
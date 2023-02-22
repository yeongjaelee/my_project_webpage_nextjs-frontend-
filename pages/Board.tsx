import React, {FormEventHandler, useEffect, useState, MouseEvent} from 'react';
import {gql} from "@apollo/client";
import client from "../apollo-client";
import {useRouter} from "next/router";
import internal from "stream";

const GET_BOARD = gql`
    query Board(\$offset: Int = 1){
  board(offset: \$offset first: 5){
    totalCount
    edges {
      node {
        boardId
        title
        content
        isHided
      }
    }
  }
}
`;
const GET_USER = gql`
    query User($token:String!){
      user(token:$token) {
        id
        identification
        username
        isAdmin
      }
    }
`;
const DELETE_BOARDS = gql`
    mutation DeleteBoards($boardIds:[Int!]){
        deleteBoards(boardIds:$boardIds){
            success
        }
    }
`;

const Board = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [paginations, setPaginations] = useState(<div></div>)
    const [maxPage, setMaxPage] = useState(1)
    const [isAdmin, setIsAdmin] = useState(false)
    const [totalCount, setTotalCount] = useState(1)
    const [checkedList, setCheckedList] = useState<Array<number>>([]);
    const [isChecked, setIsChecked] = useState(false)
    const COUNT_PER_PAGE = 5
    const router = useRouter()
    const [boards, setBoards] = useState<any[]>([])
    const my_function = async ()=>{
        const token = localStorage.getItem('token')
        const {data} = await client.query({
            query: GET_BOARD, variables: {
                offset: (currentPage-1) * 5,
            }
        })
        // @ts-ignore
        const {data:user_data} = await client.query({query:GET_USER, variables:{
            'token': token
            }})
        //setIsAdmin(user_data)
        setIsAdmin(user_data.user.isAdmin)
        setTotalCount(data.board.totalCount)
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


    const check_user = (isHided: boolean, boardId: number) => () => {
        if (isHided && !isAdmin){
            alert("it's hided")
            router.push('/Board')
        }
        else{
            router.push({pathname: 'board/BoardDetail', query:{id:boardId}})
        }
    }
    function check_delete(checked: boolean, item: number) {
        if (checked) {
            setCheckedList([...checkedList,item])
        } else if (!checked) {
            setCheckedList(checkedList.filter((x)=>x !== item))
        }
    }
    const boards_delete = async () => {
        console.log(checkedList)
        await client.mutate({mutation: DELETE_BOARDS, variables: {boardIds:checkedList}})
        window.location.reload()
    }
    const current_page_boards_delete = () => {
        if(isChecked){
            boards.map(board=>checkedList.push(board.boardId))

        }
        else{
            setCheckedList([])
        }
        setIsChecked(!isChecked)

    }

    // @ts-ignore
    return (
        <>
            <div className="m-5"></div>
            <div className="flex justify-center items-center px-2">
                delete current page boards <input type="checkbox" checked={checkedList.length > 0} onChange={current_page_boards_delete}/>
            </div>
            {boards.map((board, index)=>
            <div className="flex justify-center items-center p-1 my-2" key={board.boardId}>
                <div className="px-2">
                <input type="checkbox" id={board.id} checked={checkedList.includes(board.boardId)}
                       onChange={(e)=>check_delete(e.target.checked, board.boardId)}/>
                </div>
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
            <button className="flex flex-col items-center justify-center border-solid border-2 border-black pl-1"
                    onClick={boards_delete}>delete</button>
            </div>
        </>
    )
};

export default Board;
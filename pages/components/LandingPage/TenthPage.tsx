import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
import React, {FormEventHandler, useEffect, useState} from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from '../../../apollo-client'
import {useForm} from "react-hook-form";
import ReactTimeAgo from "react-time-ago";
import {max} from "rxjs";
const GET_QUESTIONS = gql`
  query questions(\$offset: Int = 1) {
  questions(offset: \$offset first: 3){
      totalCount
      edges{
        node{
            id
            email
            contents
            dateCreated
            replies{
                id
                contents
                dateCreated
            }
        }
      }
}
  }
`;

const WRITE_QUESTION = gql`
    mutation writeQuestion($contents: String!, $email: String!){
        writeQuestion(contents: $contents, email: $email){
            success
        }
    }
`;



const TenthPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [email, setEmail] = useState<string>('')
    const [contents, setContents] = useState<string>('')
    const [questions, setQuestions] = useState([])
    const [paginations, setPaginations] = useState(<div></div>)

    const COUNT_PER_PAGE = 3
    let totalCount = 0
    const [maxPage, setMaxPage] = useState(1)

    async function getQuestions (){
        const { loading, error, data } = await client.query({query: GET_QUESTIONS, variables: {
                offset: (currentPage-1) * 3,
            }}, );
        totalCount = data.questions.totalCount
        let _maxPage = Math.ceil( totalCount/COUNT_PER_PAGE)
        setMaxPage(_maxPage)
        let _pages = []
        for(let i = 0; i < _maxPage; i++){
            _pages.push(i+1)
        }
        setPages(_pages)

        const questions = data.questions.edges.map((e: any) => e.node)
        setQuestions([])
        setQuestions(
            questions.map((q:any)=>{
                const replies = q.replies
                console.log(replies)
                const repliesEl = replies.map((r: any)=>{
                    return <div key={r.id} className='ml-5'>
                        <div className='flex flex-col'>
                            <div className='lg:text-xl'>
                                ㄴ {r.contents}
                            </div>
                            <div className='text-[10px] text-gray-400 ml-5'>
                                <ReactTimeAgo date={new Date(r.dateCreated)}></ReactTimeAgo>
                            </div>
                        </div>
                    </div>
                })

                return <div className='flex flex-col mt-5' key={q.id}>
                    <div className='text-xs lg:text-md text-gray-500'>
                        {q.email}
                    </div>
                    <div className='lg:text-xl'>
                        {q.contents}
                    </div>
                    <div className='text-xs text-gray-400'>
                        <ReactTimeAgo date={new Date(q.dateCreated)}></ReactTimeAgo>
                    </div>
                    {repliesEl}
                </div>;
            }))
    }

    const handleSubmit: FormEventHandler = async (e) =>{
        e.preventDefault()
        if (email.length < 1) { return alert("이메일을 입력해주세요")}
        if (contents.length < 1) { return alert("질문을 입력해주세요")}
        await client.mutate({mutation: WRITE_QUESTION, variables: {email, contents}})
        setCurrentPage(1)
        setEmail('')
        setContents('')
    }
    useEffect(()=>{
        getQuestions().then(_ => {

        })
    }, [currentPage])

    useEffect(()=>{
        console.log(pages)
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
        console.log(pages)
    }, [pages])

    // @ts-ignore
    return (
        <div className="flex flex-col justify-center min-h-screen md:container lg:container ml-auto mr-auto pl-6" id="tenth">
            <div className='mr-auto'>
                <div className="text-2xl lg:text-4xl">
                    무엇이든 물어보세요
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll lg:mt-5">
                {questions}
            </div>
            <div className='mt-5 flex justify-center'>
                {paginations}
            </div>

            <form className="items-center justify-center" onSubmit={handleSubmit}>
                <div className='flex mt-10'>
                    <div>
                        email
                    </div>
                    <div className="ml-3">
                        <input className='outline-0'
                               onChange={e=>setEmail(e.target.value)}
                               value={email}
                               placeholder="note@google.com"
                               type="email"
                        />
                    </div>
                </div>
                <div className="lg:mt-5 mt-1">
                    <input className="outline-0"
                           onChange={e=>setContents(e.target.value)}
                           placeholder="질문을 입력하세요"
                           value={contents}
                           type="contents"/>
                </div>
                <input type="submit" hidden/>
            </form>
        </div>
    );
};

export default TenthPage;
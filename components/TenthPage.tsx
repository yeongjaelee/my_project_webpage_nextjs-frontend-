
import React, {useEffect, useState} from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from '../apollo-client'
import {useMutation, useQuery} from "react-apollo";
import {useForm} from "react-hook-form";
import {register} from "tsconfig-paths";
import {async} from "rxjs";
const GET_QUESTIONS = gql`
  query questions {
  questions{
      edges{
        node{
            id
            email
            contents
        }
      }
}
  }
`;

async function getQuestions (){
    const { loading, error, data } = await client.query({query: GET_QUESTIONS});
    console.log(data.questions.edges)
    const questions = data.questions.edges.map((e: any)=> e.node)
    return questions
}
export const WRITE_QUESTION = gql`
    mutation writeQuestion($contents: String!, $email: String!){
        writeQuestion(contents: $contents, email: $email){
            success
        }
    }
`;



const TenthPage = () => {
    interface HookFormTypes{
        email: string;
        contents: string;
    }
    const {register, handleSubmit} = useForm<HookFormTypes>();
    const onValid = async (data: HookFormTypes) =>{
        console.log(1)
        if (!data.email) { return alert("이메일을 입력해주세요")}
        else if (!data.contents) { return alert("질문을 입력해주세요")}
        else{
            console.log(data)
            await client.mutate({mutation: WRITE_QUESTION, variables: data})
            getQuestions().then((questions)=>setQuestions(questions.map((q:any)=>
                <div className="flex flex-col bg-amber-100 mt-5 w-full px-2" key={q.id}>{q.contents}<br/>{q.email}</div>)))
        }
    }
    const [questions, setQuestions] = useState([])
    useEffect(()=>{getQuestions().then((questions)=>setQuestions(questions.map((q:any)=>
        <div className="flex flex-col bg-white mt-5 w-full px-2" key={q.id}>{q.contents}<br/>{q.email}</div>)))}, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-4xl">
                무엇이든 물어보세요!
            </div>
            <div className="flex flex-col-reverse overflow-y-scroll bg-amber-100 w-9/12 h-[350px] mt-10 p-5">
                {questions}
            </div>
            <div className="bg-amber-100 w-9/12 h-[130px] mt-5 p-3">
                <form className="h-10 items-center justify-center" onSubmit={handleSubmit(onValid)} >
                    <div className="px-2 py-2"><input {...register("email")} className="w-full h-4 p-5" placeholder="이메일을 입력하세요" type="email"
                                                      /></div>
                    <div className="px-2 py-2"><input {...register("contents")} className="w-full h-4 p-5" placeholder="질문을 입력하세요" type="contents"
                                                      /></div>
                </form>
            </div>
        </div>
    );
};

export default TenthPage;
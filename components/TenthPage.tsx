
import React, {useEffect, useState} from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from '../apollo-client'
import {useQuery} from "react-apollo";
import {useForm} from "react-hook-form";
import {register} from "tsconfig-paths";

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


const TenthPage = () => {
    interface HookFormTypes{
        email: string;
        contents: string;
    }
    const {register, handleSubmit} = useForm<HookFormTypes>();
    const onValid = (data: HookFormTypes) =>{
        console.log(1)
        console.log(data)
    }
    const [questions, setQuestions] = useState([])
    useEffect(()=>{getQuestions().then((questions)=>setQuestions(questions.map((q:any)=><div key={q.id}>{q.contents}{q.email}</div>)))}, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-4xl">
                무엇이든 물어보세요!
            </div>
            <div className="bg-amber-500 w-9/12 h-[350px] mt-10">
                {questions}
            </div>
            <div className="bg-amber-200 w-9/12 h-[130px] mt-5 p-3">
                <form className="h-10 items-center justify-center" >
                    <input {...register("email")} className="w-full h-full p-6" placeholder="이메일을 입력하세요" type="email"/>
                    <input {...register("contents")} className="w-full h-full p-5" placeholder="질문을 입력하세요" type="contents"/>
                    <button type="button" value="입력" onClick={handleSubmit(onValid)}>제 출</button>
                </form>
            </div>
        </div>
    );
};

export default TenthPage;
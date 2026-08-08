"use client";
import type { Memo } from "@/types/types";
import React, { useEffect, useState } from "react";
export default function useLocalStorage(
    memos: Memo[],
    setMemos: React.Dispatch<React.SetStateAction<Memo[]>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
){
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect (() => {
        try{
            const data = localStorage.getItem("memos");
            if(data){
                setMemos(JSON.parse(data))
            }
        }catch(error){
            if(error instanceof Error){
                setErrorMessage("メモの取得に失敗しました");
            }else{
                setErrorMessage("予期せぬエラーが発生しました")
            }
        }finally{
            setIsLoaded(true);
        }
    },[]);


    useEffect (() => {
        if(!isLoaded) return;

        localStorage.setItem("memos",JSON.stringify(memos));

    },[memos,isLoaded]);
};
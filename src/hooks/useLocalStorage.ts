"use client";
import type { Memo } from "@/types/types";
import React, { useEffect } from "react";
export default function useLocalStorage(
    memos: Memo[],
    setMemos: React.Dispatch<React.SetStateAction<Memo[]>>
){
    useEffect (() => {
        const data = localStorage.getItem("memos");
        if(data){
            setMemos(JSON.parse(data))
        }
    },[]);

    useEffect (() => {
        localStorage.setItem("memos",JSON.stringify(memos));

    },[memos]);
};
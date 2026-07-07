"use client";
import { useState,useEffect } from "react";
import type { Memo } from "@/types/types";
export default function useMemos(){
    const [ memos,setMemos ] = useState<Memo[]>([]);
    const [ editingMemo,setEditingMemo ] = useState<Memo|null>(null) 

    useEffect (() => {
        const data = localStorage.getItem("memos");
        if(data){
            setMemos(JSON.parse(data))
        }
    },[]);

    useEffect (() => {
        localStorage.setItem("memos",JSON.stringify(memos));

    },[memos]);

    const addMemo = (title: string, memoText:string) => {
        const newMemo = {
            id: crypto.randomUUID(),
            title: title,
            memoText: memoText
        };
        setMemos(prev => [...prev, newMemo]);
    }

    return{
        memos,
        editingMemo,
        setEditingMemo,
        addMemo
    };
}
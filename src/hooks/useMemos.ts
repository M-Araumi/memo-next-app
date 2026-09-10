"use client";
import { useState,useEffect } from "react";
import { validateDelete,validateUpdate } from "@/validators/memoValidator";
import type { Memo, ApiMemo } from "@/types/types";


export default function useMemos(){
    const [ memos,setMemos ] = useState<Memo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const fetchMemos = async () => {
        setIsLoading(true);
        try{
            const response = await fetch("http://localhost:3000/memos");
            const data: ApiMemo[] = await response.json();
            const memos: Memo[] = data.map(memo => ({
                id: memo.id,
                title: memo.title,
                memoText: memo.memo_text
            }));
            setMemos(memos);
        }finally{
            setIsLoading(false);
        }
    };
    fetchMemos();
    }, []);

    const [ editingMemo,setEditingMemo ] = useState<Memo|null>(null) 

    const addMemo = async(title: string, memoText:string) => {
        setIsLoading(true);
        try{
            const response = await fetch("http://localhost:3000/memos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    memoText,
                }),
            });
            const data: ApiMemo = await response.json();
            const newMemo = {
                id: data.id,
                title:data.title,
                memoText: data.memo_text
            };
            setMemos(prev => [...prev, newMemo]);
        }finally{
            setIsLoading(false);
        }
    }

    const updateMemo =async(updatedMemo:Memo) => {
        setIsLoading(true);
        try{
            const response = await fetch(`http://localhost:3000/memos/${updatedMemo.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedMemo.title,
                    memoText: updatedMemo.memoText,
                }),
            });
                const data: ApiMemo = await response.json();
                const updateMemo = {
                id: data.id,
                title:data.title,
                memoText: data.memo_text
            };
            setMemos(prev => prev.map(memo => memo.id === updateMemo.id ? updateMemo:memo))
            setEditingMemo(null)
        }finally{
            setIsLoading(false);
        }
    }

    const deleteMemo = async(id:string) => {
        setIsLoading(true);
        try{
            const response = await fetch(`http://localhost:3000/memos/${id}`,{
                method: "DELETE"
            });
            setMemos(prev => prev.filter(memo => memo.id !== id))
        }finally{
            setIsLoading(false);
        }
    }

    return{
        memos,
        editingMemo,
        isLoading,
        setEditingMemo,
        addMemo,
        deleteMemo,
        updateMemo
    };
}
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
        const response = await fetch("http://localhost:3000/memos");
        const data: ApiMemo[] = await response.json();
        const memos: Memo[] = data.map(memo => ({
            id: memo.id,
            title: memo.title,
            memoText: memo.memo_text
        }));
        setMemos(memos);
        setIsLoading(false);
    };
    fetchMemos();
    }, []);

    const [ editingMemo,setEditingMemo ] = useState<Memo|null>(null) 

    const addMemo = async(title: string, memoText:string) => {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    const updateMemo =async(updatedMemo:Memo) => {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    const deleteMemo = async(id:string) => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/memos/${id}`,{
            method: "DELETE"
        });
        setMemos(prev => prev.filter(memo => memo.id !== id))
        setIsLoading(false);
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
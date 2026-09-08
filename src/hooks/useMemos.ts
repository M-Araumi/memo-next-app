"use client";
import { useState,useEffect } from "react";
import { validateDelete,validateUpdate } from "@/validators/memoValidator";
import type { Memo, ApiMemo } from "@/types/types";


export default function useMemos(){
    const [ memos,setMemos ] = useState<Memo[]>([]);

    useEffect(() => {
    const fetchMemos = async () => {
        const response = await fetch("http://localhost:3000/memos");
        const data: ApiMemo[] = await response.json();

        const memos: Memo[] = data.map(memo => ({
            id: memo.id,
            title: memo.title,
            memoText: memo.memo_text
        }));

        setMemos(memos);
    };
    fetchMemos();
    }, []);

    const [ editingMemo,setEditingMemo ] = useState<Memo|null>(null) 

    const addMemo = async(title: string, memoText:string) => {
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
    }

    const updateMemo =async(updatedMemo:Memo) => {
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
    }

    const deleteMemo = (id:string) => {
        validateDelete(memos,id);
        setMemos(prev => prev.filter(memo => memo.id !== id))
    }

    return{
        memos,
        editingMemo,
        setEditingMemo,
        addMemo,
        deleteMemo,
        updateMemo
    };
}
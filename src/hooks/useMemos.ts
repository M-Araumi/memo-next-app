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

    const addMemo = (title: string, memoText:string) => {
        const newMemo = {
            id: crypto.randomUUID(),
            title: title,
            memoText: memoText
        };
        setMemos(prev => [...prev, newMemo]);
    }
    const deleteMemo = (id:string) => {
        validateDelete(memos,id);
        setMemos(prev => prev.filter(memo => memo.id !== id))
    }

    const updateMemo =(updatedMemo:Memo) => {
        validateUpdate(memos,updatedMemo.id)
        setMemos(prev => prev.map(memo => memo.id === updatedMemo.id ? updatedMemo:memo))
        setEditingMemo(null)
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
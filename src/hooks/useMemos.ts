"use client";
import { useState } from "react";
import { validateDelete,validateUpdate } from "@/validators/memoValidator";
import type { Memo } from "@/types/types";
import useLocalStorage from "./useLocalStorage";
export default function useMemos(){
    const [ memos,setMemos ] = useState<Memo[]>([]);
    const [errorMessage,setErrorMessage] = useState("")        
    useLocalStorage(memos,setMemos);
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
        try{
            validateDelete(memos,id);
            setMemos(prev => prev.filter(memo => memo.id !== id));
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }else{
                setErrorMessage("予期せぬエラーが発生しました");
            }
        }
    }

    const updateMemo =(updatedMemo:Memo) => {
        try{
            validateUpdate(memos,updatedMemo.id)
            setMemos(prev => prev.map(memo => memo.id === updatedMemo.id ? updatedMemo:memo))
            setEditingMemo(null)
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }else{
                setErrorMessage("予期せぬエラーが発生しました");
            }
        }
    }
    return{
        memos,
        editingMemo,
        errorMessage,
        setEditingMemo,
        addMemo,
        deleteMemo,
        updateMemo
    };
}
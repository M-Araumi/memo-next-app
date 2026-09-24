"use client";
import { useState,useEffect } from "react";
import { validateDelete,validateUpdate } from "@/validators/memoValidator";
import { getMemos,createMemo } from "@/api/memos";
import type { Memo, ApiMemo } from "@/types/types";


export default function useMemos(){
    const [ memos,setMemos ] = useState<Memo[]>([]);
    const [ isLoading,setIsLoading ] = useState(false);
    const [ errorMessage,setErrorMessage ] = useState("");

    useEffect(() => {
    const fetchMemos = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try{
            const data = await getMemos();
            const memos: Memo[] = data.map(memo => ({
                id: memo.id,
                title: memo.title,
                memoText: memo.memo_text
            }));
            setMemos(memos);
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }
        }finally{
            setIsLoading(false);
        }
    };
    fetchMemos();
    }, []);

    const [ editingMemo,setEditingMemo ] = useState<Memo|null>(null) 

    const addMemo = async(title: string, memoText:string) => {
        setIsLoading(true);
        setErrorMessage("");
        try{
            const data = await createMemo(title,memoText);
            const newMemo = {
                id: data.id,
                title:data.title,
                memoText: data.memo_text
            };
            setMemos(prev => [...prev, newMemo]);
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const updateMemo =async(updatedMemo:Memo) => {
        setIsLoading(true);
        setErrorMessage("");
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memos/${updatedMemo.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedMemo.title,
                    memoText: updatedMemo.memoText,
                }),
            });
            if(!response.ok){
                throw new Error("メモの更新に失敗しました")
            }
                const data: ApiMemo = await response.json();
                const updateMemo = {
                id: data.id,
                title:data.title,
                memoText: data.memo_text
            };
            setMemos(prev => prev.map(memo => memo.id === updateMemo.id ? updateMemo:memo))
            setEditingMemo(null)
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const deleteMemo = async(id:string) => {
        setIsLoading(true);
        setErrorMessage("");
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memos/${id}`,{
                method: "DELETE"
            });
            if(!response.ok){
                throw new Error("メモの削除に失敗しました")
            }
            setMemos(prev => prev.filter(memo => memo.id !== id))
        }catch(error){
            if(error instanceof Error){
                setErrorMessage(error.message)
            }
        }finally{
            setIsLoading(false);
        }
    }

    return{
        memos,
        editingMemo,
        isLoading,
        errorMessage,
        setEditingMemo,
        addMemo,
        deleteMemo,
        updateMemo
    };
}
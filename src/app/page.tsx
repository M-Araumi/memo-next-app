"use client";
import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import EditMemoForm from "@/components/EditMemoForm";
import MemoCard from "@/components/MemoCard";
import { useState, useEffect } from "react";
import type { Memo } from "@/types/types";
export default function Home() {
  const [memos,setMemos] = useState<Memo[]>([]);
  const [editingMemo,setEditingMemo] = useState<Memo | null>(null);

  useEffect (() => {
    const data = localStorage.getItem("memos");
    if(data){
      setMemos(JSON.parse(data))
    }
  },[]);

  useEffect (() => {
    localStorage.setItem("memos",JSON.stringify(memos));
  },[memos]);

  function handleAddMemo(title:string,memoText:string){
    const newMemo = {
      id: crypto.randomUUID(),
      title: title,
      memoText: memoText
    }
    const updateMemos = [...memos,newMemo]
    setMemos(updateMemos);
  }
  function handleEditMemo(id:string){
    const targetMemo = memos.find(memo => memo.id === id);
    if(!targetMemo){return;}
    setEditingMemo(targetMemo)
  }
  function handleDelMemo(id:string){
    const deletedMemos = memos.filter(memo => memo.id !== id);
    setMemos(deletedMemos)
  }
  function handleUpdateMemo(updatedMemo:Memo){
    const updatedMemos = memos.map((memo) =>
      memo.id === updatedMemo.id ? updatedMemo:memo);
    setMemos(updatedMemos);
    setEditingMemo(null);
  }
  return (
    <div className={styles.page}>
      <Header />
      <MemoForm handleAddMemo={handleAddMemo} />
      {memos.map((memo) => (
        <MemoCard
        key={memo.id}
        id={memo.id}
        title={memo.title}
        memoText={memo.memoText}
        handleEditMemo={handleEditMemo}
        handleDelMemo={handleDelMemo}
        />
      )
      )}
      {editingMemo && (
        <EditMemoForm
        editingMemo={editingMemo}
        handleUpdateMemo={handleUpdateMemo}
        cancelEditMemo={() => setEditingMemo(null)}
        />
      )}
    </div>
  );
}
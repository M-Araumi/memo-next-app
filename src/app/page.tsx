"use client";
import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import MemoCard from "@/components/MemoCard";
import { useState, useEffect } from "react";
export default function Home() {
  type Memo = {
    id: number;
    title: string;
    memoText: string;
  }
  const [memos , setMemos] = useState<Memo[]>([])

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
      id: memos.length + 1,
      title: title,
      memoText: memoText
    }
    const updateMemos = [...memos,newMemo]
    setMemos(updateMemos);
  }
  function handleEditMemo(id:number){
    const targetMemo = memos.find(memo => memo.id === id);
    if(!targetMemo){return;}
    const newTitle = prompt("タイトルを編集")
    if(!newTitle){return;}
    const updateMemos = memos.map(memo => {
      if(memo.id !== id){
        return memo;
      }
      return{
        ...memo,
        title:newTitle
      }
    })
    console.log("updateMemos", updateMemos);
    setMemos(updateMemos)
  }
  function handleDelMemo(id:number){
    const deletedMemos = memos.filter(memo => memo.id !== id);
    setMemos(deletedMemos)
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
    </div>
  );
}
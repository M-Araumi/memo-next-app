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
  function handleDelMemo(id:number){
    const deletedMemos = memos.filter(memo => memo.id !== id)
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
        handleDelMemo={handleDelMemo}
        />
      )
    )}
    </div>
  );
}
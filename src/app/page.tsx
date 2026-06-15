"use client";
import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import MemoCard from "@/components/MemoCard";
import { memo, useState } from "react";
import { title } from "process";
export default function Home() {
  type Memo = {
    id: number;
    title: string;
    memoText: string;
  }
  function handleAddMemo(title:string,memoText:string){
    const newMemo = {
      id: memos.length + 1,
      title: title,
      memoText: memoText
    }
    setMemos([
      ...memos,
      newMemo
    ]);
  }
  function handleDelMemo(id:number){
    setMemos(
      memos.filter(memo => memo.id !== id)
    )
  }
  const [memos , setMemos] = useState<Memo[]>([])
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
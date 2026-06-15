"use client";
import { useState } from "react"
import styles from "./MemoForm.module.css"
type MemoFormProps = {
  hello: (
    title: string,
    memoText: string
  ) => void
}
export default function MemoForm({hello}: MemoFormProps){
    const [title,setTitle] = useState("")
    const [memoText,setMemoText] = useState("")
    return(
    <div className={styles.form}>
        <input
          value={title}
          onChange={(event)=>setTitle(event.target.value)}
          placeholder="タイトルを入力" />
        <textarea
          value={memoText}
          onChange={(event)=>setMemoText(event.target.value)} 
          placeholder="本文を入力" />
        <button
            onClick={() => {
              hello(title,memoText),
              setTitle(""),
              setMemoText("")
            }
          }>
            追加
        </button>
    </div>
    )
}
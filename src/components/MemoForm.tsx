"use client";
import { useState } from "react"
import styles from "./MemoForm.module.css"
export default function MemoForm(){
    const [title,setTitle] = useState("")
    const [memoText,setMemoText] = useState("")
    return(
    <div className={styles.form}>
        <input
          value={title}
          onChange={(event)=>setTitle(event.target.value)}
          placeholder="タイトルを入力" />
        <p>{title}</p>
        <textarea
          value={memoText}
          onChange={(event)=>setMemoText(event.target.value)} 
          placeholder="本文を入力" />
        <p>{memoText}</p>
        <button>追加</button>
    </div>
    )
}
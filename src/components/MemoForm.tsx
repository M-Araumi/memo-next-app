"use client";
import { useState } from "react"
import { validateAdd } from "@/validators/memoValidator";
import styles from "./MemoForm.module.css"
type MemoFormProps = {
  handleAddMemo: (
    title: string,
    memoText: string
  ) => void
}
export default function MemoForm({handleAddMemo}: MemoFormProps){
    const [title,setTitle] = useState("")
    const [memoText,setMemoText] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
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
              try{
                validateAdd(title,memoText);
                setErrorMessage("");
                handleAddMemo(title,memoText);
                setTitle("");
                setMemoText("");
              }catch(error){
                if(error instanceof Error){
                  setErrorMessage(error.message)
                }
              }
            }
          }>
            追加
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
    )
}
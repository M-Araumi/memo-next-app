"use client";
import { useState } from "react";
import type { Memo } from "@/types/types";
import { validateMemo } from "@/validators/memoValidator";
import styles from "./EditMemoForm.module.css";
type EditMemoFormProps = {
    editingMemo: Memo;
    handleUpdateMemo: (memo:Memo) => void;
    cancelEditMemo: () => void;
}
export default function EditMemoForm({editingMemo,handleUpdateMemo,cancelEditMemo}:EditMemoFormProps){
    const [title,setTitle] = useState(editingMemo.title);
    const [memoText,setMemoText] = useState(editingMemo.memoText);
    const [errorMessage,setErrorMessage] = useState("")
    return(
    <div>
        <input
          value={title}
          onChange={(event)=>setTitle(event.target.value)}
          placeholder="タイトル" />
        <textarea
          value={memoText}
          onChange={(event)=>setMemoText(event.target.value)} 
          placeholder="本文" />
        <button
            onClick={() => {
              try{
                validateMemo(title,memoText);
                setErrorMessage("");
                handleUpdateMemo({
                id: editingMemo.id,
                title,
                memoText
               });
              }catch(error){
                if(error instanceof Error){
                  setErrorMessage(error.message)
                }
              }
            }
          }>
            更新
        </button>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button
            onClick={() => {
                cancelEditMemo();
            }
          }>
            キャンセル
         </button>
    </div>
    )
}
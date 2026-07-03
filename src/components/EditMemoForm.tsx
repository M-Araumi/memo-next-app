"use client";
import { useState } from "react";
import type { Memo } from "@/types/types";
type EditMemoFormProps = {
    editingMemo: Memo;
    handleUpdateMemo: (memo:Memo) => void;
    cancelEditMemo: () => void;
}
export default function EditMemoForm({editingMemo,handleUpdateMemo,cancelEditMemo}:EditMemoFormProps){
    const [title,setTitle] = useState(editingMemo.title);
    const [memoText,setMemoText] = useState(editingMemo.memoText);
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
              handleUpdateMemo({
                id: editingMemo.id,
                title,
                memoText
              });
            }
          }>
            更新
        </button>
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
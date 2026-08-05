import type { Memo } from "@/types/types"

export function validateMemo(title:string,memoText:string){
    if(title.trim() === ""){
        throw new Error("タイトルを入力してください")
    }
    if(title.length > 40){
        throw new Error("タイトルは４０文字以内にしてください")
    }
    
    if(memoText.trim() === ""){
        throw new Error("本文を入力してください")
    }
    if(memoText.length > 250){
        throw new Error("本文は２５０文字以内にしてください")
    }
}
export function validateDelete(memos:Memo[],id:string){
    const exists = memos.some(memo => (memo.id === id))
    if(!exists){
        throw new Error("削除するメモが見つかりません")
    }
}
export function validateUpdate(memos:Memo[],id:string){
    const exists = memos.some(memo => memo.id === id)
    if(!exists){
        throw new Error("更新するメモが見つかりません")
    }
}
export function validateAdd(title:string,memoText:string){
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
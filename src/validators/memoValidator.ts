export function validateAdd(title:string,memoText:string){
    if(title.trim() === ""){
        throw new Error("タイトルを入力してください")
    }    
    if(memoText.trim() === ""){
        throw new Error("本文を入力してください")
    }
}
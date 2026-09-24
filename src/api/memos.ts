import type { Memo,ApiMemo } from "@/types/types";

export async function getMemosApi(): Promise<ApiMemo[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memos`
    );
    if (!response.ok) {
        throw new Error("メモの取得に失敗しました");
    }
    const data: ApiMemo[] = await response.json();
    return data;
}

export async function createMemoApi( title:string, memoText:string): Promise<ApiMemo> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memos`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            memoText,
        }),
    });
    if(!response.ok){
        throw new Error("メモの追加に失敗しました")
    }
    const data: ApiMemo = await response.json();
    return data;
}

export async function updateMemoApi( memo:Memo): Promise<ApiMemo> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memos/${memo.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: memo.title,
            memoText: memo.memoText,
        }),
    });
    if(!response.ok){
    throw new Error("メモの更新に失敗しました")
    }
    const data: ApiMemo = await response.json();
    return data;
}

export async function deleteMemoApi(id: string): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memos/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("メモの削除に失敗しました");
    }
}
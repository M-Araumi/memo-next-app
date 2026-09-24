import type { ApiMemo } from "@/types/types";

export async function getMemos(): Promise<ApiMemo[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memos`
    );
    if (!response.ok) {
        throw new Error("メモの取得に失敗しました");
    }
    const data: ApiMemo[] = await response.json();
    return data;
}

export async function createMemo( title:string, memoText:string): Promise<ApiMemo> {
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
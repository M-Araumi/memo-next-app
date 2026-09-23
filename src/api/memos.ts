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
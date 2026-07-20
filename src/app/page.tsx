"use client";
import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import EditMemoForm from "@/components/EditMemoForm";
import MemoCard from "@/components/MemoCard";
import useMemos from "@/hooks/useMemos";
import type { Memo } from "@/types/types";
export default function Home() {
  const {
    memos,
    editingMemo,
    setEditingMemo,
    addMemo,
    deleteMemo,
    updateMemo
  } = useMemos();

  function handleEditMemo(id:string){
    const targetMemo = memos.find(memo => memo.id === id);
    if(!targetMemo){return;}
    setEditingMemo(targetMemo)
  }
  function handleDelMemo(id:string){
    deleteMemo(id)
  }
  function handleUpdateMemo(updatedMemo:Memo){
    updateMemo(updatedMemo)
  }
  return (
    <div className={styles.page}>
      <Header />
      <MemoForm handleAddMemo={addMemo} />
      {memos.map((memo) => (
        <MemoCard
        key={memo.id}
        id={memo.id}
        title={memo.title}
        memoText={memo.memoText}
        handleEditMemo={handleEditMemo}
        handleDelMemo={handleDelMemo}
        />
      )
      )}
      {editingMemo && (
        <EditMemoForm
        editingMemo={editingMemo}
        handleUpdateMemo={handleUpdateMemo}
        cancelEditMemo={() => setEditingMemo(null)}
        />
      )}
    </div>
  );
}
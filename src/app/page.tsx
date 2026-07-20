"use client";
import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import EditMemoForm from "@/components/EditMemoForm";
import MemoCard from "@/components/MemoCard";
import useMemos from "@/hooks/useMemos";

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
        handleDelMemo={deleteMemo}
        />
      )
      )}
      {editingMemo && (
        <EditMemoForm
        editingMemo={editingMemo}
        handleUpdateMemo={updateMemo}
        cancelEditMemo={() => setEditingMemo(null)}
        />
      )}
    </div>
  );
}
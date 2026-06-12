import styles from "./page.module.css"
import Header from "@/components/Header";
import MemoForm from "@/components/MemoForm";
import MemoCard from "@/components/MemoCard";
export default function Home() {
  const memos = [
    {
      id: 1,
      title:"買い物",
      memoText:"牛乳を買う"
    },
    {
      id: 2,
      title:"仕事",
      memoText:"週次報告をする"
    },
    {
      id: 3,
      title:"勉強",
      memoText:"Reactを学ぶ"
    }
  ]
  return (
    <div className={styles.page}>
      <Header />
      <MemoForm />
      {memos.map((memo) => (
        <MemoCard
        key={memo.id}
        title={memo.title}
        memoText={memo.memoText}
        />
      )
    )}
    </div>
  );
}
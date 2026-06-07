import Header from "@/components/Header";
import MemoCard from "@/components/MemoCard";
export default function Home() {
  return (
    <div>
      <Header />
      <MemoCard
        title="買い物"
        memoText="牛乳を買う"
      />
      <MemoCard
        title="仕事"
        memoText="週次報告をする"
      />
      <MemoCard
        title="勉強"
        memoText="Reactを学ぶ"
      />
    </div>
  );
}
"use client";
import styles from "./MemoCard.module.css";
type MemoCardProps = {
    title: string;
    memoText: string;
    id: string;
    handleEditMemo: (id: string) => void;
    handleDelMemo: (id: string) => void;

}
    export default function MemoCard(props: MemoCardProps){
    return(
        <div className={styles.card}>
            <h2>{props.title}</h2>
            <p>{props.memoText}</p>
            <button onClick={() => {
                props.handleEditMemo(props.id)
            }}
            >
                編集
            </button>
            <button
                onClick={() => {
                    props.handleDelMemo(props.id);
                }}
            >
                削除
            </button>
        </div>

    );
}
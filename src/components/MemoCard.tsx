import style from "./MemoCard.module.css"
type MemoCardProps = {
    title: string;
    memoText: string;
    id: number;
    handleDelMemo: (id: number) => void

}
    export default function MemoCard(props: MemoCardProps){
    return(
        <div className={style.card}>
            <h2>{props.title}</h2>
            <p>{props.memoText}</p>
            <button onClick={()=>props.handleDelMemo(props.id)}>
                削除
            </button>
        </div>

    );
}
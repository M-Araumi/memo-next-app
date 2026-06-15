import style from "./MemoCard.module.css"
type MemoCardProps = {
    title: string;
    memoText: string;
}
    export default function MemoCard(props: MemoCardProps){
    return(
        <div className={style.card}>
            <h2>{props.title}</h2>
            <p>{props.memoText}</p>
        </div>

    );
}
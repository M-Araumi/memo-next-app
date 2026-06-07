type MemoCardProps = {
    title: string;
    memoText: string;
}
    export default function MemoCard(props: MemoCardProps){
    return(
        <div>
            <h2>{props.title}</h2>
            <p>{props.memoText}</p>
        </div>

    );
}
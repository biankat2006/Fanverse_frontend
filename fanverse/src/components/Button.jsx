export default function Button({ szin, onClick, text }){
    return(
        <button className={szin} onClick={onClick}>
            {text}
        </button>
    )
}
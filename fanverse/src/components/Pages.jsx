export default function Pages({number, color}) {
    return (
        <div style={{backgroundColor: color}}>
            <p>{number}</p>
        </div>
    )
}
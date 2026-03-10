export default function Images({ Class,src, altszov, height }){
    return(
        <img className={Class} src={src} alt={altszov} height={height}/>
    )
}
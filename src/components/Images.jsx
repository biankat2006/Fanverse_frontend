export default function Images({ Class, src, altszov, height, width }) {
    return (
        <img
            className={Class}
            src={src}
            alt={altszov}
            height={height}
            width={width}
        />
    );
}
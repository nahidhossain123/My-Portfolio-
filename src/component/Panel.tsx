const images =
    [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    ]


export const Panel = ({ title, images, side }) => {
    return (
        <div style={{ height: "100%", position: "relative" }}>

            {/* Title */}
            <h1 style={{ position: "absolute", top: 20, left: 20, color: "white", zIndex: 10 }}>
                {title}
            </h1>

            {/* Images */}
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    data-side={side}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: i === 0 ? 1 : 0,
                        transform: "scale(1.1)",
                    }}
                />
            ))}
        </div>
    );
}
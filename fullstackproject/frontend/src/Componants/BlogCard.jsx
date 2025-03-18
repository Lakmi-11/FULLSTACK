

export function BlogCard({post}) {
    return(
        <>
            <h1>{post.date}</h1>
            <h2>{post.Weight}</h2>
            <p>{post.Materials}</p>
        </>
    )
}
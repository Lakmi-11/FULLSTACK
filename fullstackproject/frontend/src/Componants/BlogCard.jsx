import { Link } from "react-router-dom"

export function BlogCard({post}) {

let date = new Date(post.date)
let stringDate = date.toString()

    return(
        <Link to={`/readblog/${post._id}`} className="post">
            <h1>{stringDate.slice(4, 15)}</h1>
            <h2>{post.Weight}</h2>
            <p>{post.Materials}</p>
        </Link>
    )
}
import { getPosts} from "../api"
import {useState, useEffect } from "react"
import { BlogCard } from "../Componants/BlogCard"

export function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadAllPosts() {
            const data = await getPosts()
            data.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime())
            setPosts(data)
        }
        loadAllPosts()
    }, [])

    return (
     <div className="posts">
         {posts.map((post) => {
            return (
             <BlogCard post={post}/>
            )
         })}
     </div>
    )
}
import { getPost } from "../api"
import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";


export function ReadBlog() {
    const [post, setPost] = useState({})

    let params = useParams()
    const navigate  = useNavigate()
    let id = params.id

    useEffect(() => {
        async function loadPost() {
        let data = await getPost(id) ;
        setPost(data);
        }
        loadPost();
    }, [])
    return (
      <>
       { <button onClick={() => navigate(-1)}>Back</button> }
       <h1>{post.date ? new Date(post.date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
        </h1>
       <h2>{post.Weight}</h2>
       <h3>{post.inventoryManagerName}</h3>
       <h3>{post.CustomerName}</h3>
      </>

    )
    
}

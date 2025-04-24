import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import WhatsAppPopup from "../components/WhatsAppPopup";

 // ✅ Add this line

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      data.sort(
        (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
      );
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  return (
    <div className="posts">
      {posts.map((post, index) => (
        <BlogCard key={index} post={post} />
      ))}
      <WhatsAppPopup /> {/* ✅ Add this here to show floating chat button */}
    </div>
  );
}

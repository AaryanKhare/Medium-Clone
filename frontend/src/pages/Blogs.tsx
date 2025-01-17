import axios from "axios";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { BACKEND_URL } from "./config";
export const Blogs = () => {
    const { loading, blogs, setBlogs } = useBlogs();

    const handleDeleteBlog = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            alert("Blog deleted");

            const newBlogs = blogs.filter((blog) => blog.id !== id);
            setBlogs(newBlogs);

        } catch (error) {
            alert("an error")
        }
    }


    if (loading) {
        return <div>
            <Appbar /> <div className="flex justfiy-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.length > 0 ? blogs.map(blog =>
                    <BlogCard
                        handleDeleteBlog={handleDeleteBlog}
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        // publishedDate={new Date(blog.created_at).toISOString()}
                        publishedDate={new Date(blog.created_at || "1970").toLocaleDateString()}
                    />) : <h1>No Blogs yet.</h1>}
            </div>
        </div>
    </div>
}
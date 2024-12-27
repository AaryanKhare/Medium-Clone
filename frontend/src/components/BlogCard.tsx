import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../pages/config";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number,
    handleDeleteBlog: (event: React.MouseEvent<HTMLButtonElement>, id: number) => Promise<void>
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {

    const handleDeleteBlog = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            alert("Blog deleted");

        } catch (error) {
            alert("an error")
        }
    }

return  <div className="p-4 border-b border-blue-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar name={authorName} size={"small"} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        {authorName}
                    </div>
                    <div className="flex jsutify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm">{publishedDate}</div>
                </div>
                <div className="actions">
                    <button type="button" onClick={handleDeleteBlog}>
                        Delete
                    </button>
                </div>
            </div>
            <Link to={`/blog/${id}`} className="text-xl font-semibold pt-2">
                {title}
            </Link>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length / 100)}minute(s)
            read`}
            </div>
        </div>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div>

        <div className={`relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"}font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>

    </div>
}
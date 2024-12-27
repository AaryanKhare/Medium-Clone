// atomfamilies/ selectorfamilies
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || "",
    });
    if(loading){
        return <div>
            <Appbar/>
            <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner/>
            </div>
            </div>
            </div>
    }
    if (!blog) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <p className="text-red-500">Blog not found.</p>
                </div>
            </div>
        );
    }

    return <div>
        <Appbar/>
            <FullBlog blog={blog}/>
        </div>
}


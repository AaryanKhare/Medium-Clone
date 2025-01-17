
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
export const FullBlog = ({blog}:{blog: Blog}) => {
    let createdAt = new Date(blog.created_at || "1970-01-01");
    let formattedDate = new Intl.DateTimeFormat('en-GB').format(createdAt); 
    return <div>
          
            <div className="justfiy-center flex">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                    {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                    posted on posted {formattedDate}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="cols-span-4">
                    <div className="text-slate-600 text-lg">
                        Auhtor
                    </div>
                    <div className="flex-w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size = "big" name = {blog.author.name || "anonymous"} ></Avatar>
                        </div>
                        <div className="text-xl font-bold">
                    {blog.author.name || "anonymous"}
                </div>
                    </div>
                </div>
               
                <div>

                </div>
            </div>
        </div>
        </div>
}
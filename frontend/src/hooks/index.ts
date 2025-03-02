import { useEffect, useState } from "react"
import axios from 'axios';
import { BACKEND_URL } from "../pages/config";

export interface Blog {
    "content": string,
    "created_at":string,
    "title" : string,
    "id" : number,
    "author" : {
        "name" : string
    } 
}

export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

            .then(response => {
                setBlog(response.data);
                console.log(response.data);
                setLoading(false);
            })
    }, [id])

    return{
        loading,
        blog
    }
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const token = localStorage.getItem("token");
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/${token ? "userBlogs":"blogs"}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

            .then(response => {
                setBlogs(response.data);
                console.log(response.data);
                setLoading(false);
            })
    }, [])

    return{
        loading,
        blogs,
        setBlogs
    }
}
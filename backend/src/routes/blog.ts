import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {createBlogInput, updateBlogInput} from "@100xdevs/medium-common";
import {sign, verify} from "hono/jwt"
import { string } from "zod";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c,next) => {
    const authHeader = c.req.header("authorization") || "";
    console.log(authHeader)
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);

            if (user) {
                //@ts-ignore
                c.set("userId", user.id);
                await next();
            }else{
                c.status(403);
                return c.json({
                    message: "you are not logged in"
        })
    }
}
    catch (e){
        console.error(e);
        c.status(403);
        return c.json({
            message: "you are not logged in"
        })
    }
    
})

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"inputs are not correct",
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: String(authorId),

        }
    })
    return c.json({
        id: post.id,
    })
})

blogRouter.put("/", async(c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,

        }
    }) 
    return c.json({
        id: post.id
    })
})

//todo: add pagination
blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const post = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            created_at: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json(
        post
    )
})

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const post = await prisma.post.findFirst({
            where: {
                id: String(id)
            },
            include:{
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(
            post
        )
    }catch(e){
        c.status(411);
        return c.json({
            message: "err while fetching blog post"
        })
    }
})

blogRouter.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const post = await prisma.post.delete({
            where: {
                id: String(id),
            },
        })
       
        return c.json({
            success: true,
            message: "Blog has been deleted"
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "err while deleting a blog post"
        })
    }
})

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const post = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            created_at: true,
            author: {
                select:{
                    name: true
                }
            }
        }
    })

    return c.json(
        post
    )
})
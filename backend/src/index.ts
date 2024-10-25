import { Hono } from 'hono'
import { userRouter } from './routes/user';
import {blogRouter} from './routes/blog';
import {cors} from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>()

app.use("/*", cors());
app.get("api/v1", async(c)=>{
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));

  return c.text("hello hono !");
})
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
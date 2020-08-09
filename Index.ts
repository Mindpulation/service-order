import {Application} from "https://deno.land/x/oak/mod.ts";

import r from "./api/order.ts";

const app = new Application();

app.use( async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`Time : ${rt}`);
});

app.use( async (ctx, next)=>{
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
})

app.use(r.routes());
app.use(r.allowedMethods());

await app.listen({port:3040});

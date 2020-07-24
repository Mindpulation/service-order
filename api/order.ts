import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

import Controller from '../controller/index.ts';
import { Order } from "../model/order.ts";

const r = new Router();
const c = new Controller();

r.get('/api/v1/getIdToko/:id', async (ctx:RouterContext) => {
  let id = ctx.params.id;  
  let res = await c.idToko(id);  
  ctx.response.status = 200;
  ctx.response.body = res;
});

r.get('/api/v1/getAll', async (ctx:RouterContext) => {  
  let res = await c.getAll();  
  ctx.response.status = 200;
  ctx.response.body = res;
});

r.post('/api/v1/insert', async (ctx:RouterContext) => {
  let e:Order = await ctx.request.body().value;  
  let res = await c.insertOne(e);  
  ctx.response.status = 200;
  ctx.response.body = {result:res};
});

r.put('/api/v1/update/:id', async (ctx:RouterContext) => {
  let e = await ctx.request.body().value;    
  let t:OrderSet = {id: ctx.params.id as string, set:e};      
  let res = await c.update(t)
  ctx.response.status = 200;
  ctx.response.body = {result:res};
});

export default r;
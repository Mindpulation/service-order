import { Collection } from "https://deno.land/x/mongo@v0.9.1/ts/collection.ts";

import Model from "../model/index.ts";
import { Order } from '../model/order.ts';

const m = new Model("mongodb://127.0.0.1:27017", "OrderDB", "Order");

export default class Controller {

  private con:Collection<any>;

  constructor(){
    this.con = m.getter();
  }

  public async getAll(){
    return await this.con.find();
  }

  public async idToko(id:any){    
    return await this.con.find({idToko:id});
  }

  public async insertOne(param:Order){
    let e = param.data;    
    await this.con.insertOne(e);
    return true;
  }

  public async update(param:OrderSet){            
    let t = param.set;    
    let res = await this.con.updateOne( { _id: { $oid: param.id }  } ,{ $set : t} );    
    return true;
  }

}
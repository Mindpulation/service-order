import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

const client = new MongoClient();

export default class Model{

  private connection:Collection<any>;

  constructor(url:string, database:string, collections:string){
    client.connectWithUri(url);
    this.connection = client.database(database).collection(collections);
  }

  public getter(){    
    return this.connection;
  }

}


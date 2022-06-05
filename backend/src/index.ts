import { startApp } from "./language-leaderboard";
import { MongoMemoryServer } from "mongodb-memory-server";

async function start() {
  const mongod = await MongoMemoryServer.create();
  const app = await startApp(mongod);
  app.listen("3000");

  console.log(`
        go to http://localhost:3000
        
        to vote for cobol:          
        PUT http://localhost:3000/vote/cobol
        
        to get all votes: 
        GET http://localhost:3000
        
        `);
}

start().catch((e) => console.error(e));

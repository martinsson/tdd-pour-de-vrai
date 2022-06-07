import { MongoClient } from "mongodb";

export async function getCollection(uri: string, collectionName: string) {
  const client = new MongoClient(uri);
  const connection = await client.connect();
  return connection.db("language-leaderboard").collection(collectionName);
}

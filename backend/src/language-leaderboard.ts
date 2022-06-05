import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoDB from "mongodb";
import { MongoClient } from "mongodb";
import cors from "cors";

class LanguageVote {
  constructor(public readonly name: string, public readonly votes: number) {}
}

let client: MongoClient;

export async function startApp(mongod: MongoMemoryServer) {
  const app = express();

  app.use(express.json());
  app.use(cors());
  client = new mongoDB.MongoClient(mongod.getUri());
  await client.connect();
  const db = client.db("real-world-tdd");
  const votesCollection = db.collection("votes");

  app.put("/admin/configureVotes", async (req, res) => {
    try {
      await votesCollection.drop();
    } catch (e) {
      console.warn("here");
    }

    await votesCollection.insertMany(req.body);

    res.send({});
  });

  app.get("/", async (req, res) => {
    const languagesAndVotes = (await votesCollection.find().toArray()).map(
      ({ name, votes }) => new LanguageVote(name, votes)
    );
    console.log(languagesAndVotes);
    res.send({
      languages: languagesAndVotes,
    });
  });

  app.put("/vote/:langName", async (req, res) => {
    const languagename = req.params["langName"];
    await votesCollection.updateOne(
      { name: languagename },
      { $inc: { votes: 1 } }
    );
    res.send({ message: "a voté pour " + languagename });
  });

  app.post("/add/:langName", async (req, res) => {
    const languagename = req.params["langName"];
    await votesCollection.insertOne({ name: languagename, votes: 0 });
    console.log("ajouté " + languagename);
    res.send({ message: "langage ajouté : " + languagename });
  });

  return app;
}

export async function stopApp() {
  await client.close();
}

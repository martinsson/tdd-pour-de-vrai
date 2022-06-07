import cors from "cors";
import express from "express";
import { VotesRepo } from "./votes.repo";

export async function configureApp(uri: string) {
  const app = express();
  app.use(cors());

  const votesRepo = new VotesRepo(uri);
  app.get("/votes", async (req, res) => {
    const result = await votesRepo.getAllVotes();
    res.send({
      votes: result,
    });
  });

  app.put("/vote/:language", async (req, res) => {
    const language = req.params["language"];

    const newVotesNumber = await votesRepo.voteFor(language);
    res.send({ votes: newVotesNumber, language });
  });
  return app;
}

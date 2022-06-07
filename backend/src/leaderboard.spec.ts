import supertest from "supertest";
import { configureApp } from "./leaderboard";
import { Express } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("LeaderBoard", () => {
  let app: Express;
  beforeEach(async () => {
    const server = await MongoMemoryServer.create();
    app = await configureApp(server.getUri());
  });

  describe("/votes - lists all votes", () => {
    it("with no votes", async () => {
      const response = await supertest(app).get("/votes").expect(200);
      expect(response.body).toEqual({ votes: [] });
    });

    it("with votes", async () => {
      await voteFor("java");
      await voteFor("java");
      await voteFor("java");
      await voteFor("java");
      await voteFor("cobol");
      await voteFor("cobol");
      const response = await supertest(app).get("/votes").expect(200);
      expect(response.body).toEqual({
        votes: [
          {
            language: "java",
            votes: 4,
          },
          {
            language: "cobol",
            votes: 2,
          },
        ],
      });
    });
  });

  describe("/vote/<language>", () => {
    it("vote for rust", async () => {
      const result = await voteFor("rust");
      expect(result).toEqual({ votes: 1, language: "rust" });
    });
    it("vote for typescript", async () => {
      const result = await voteFor("typescript");
      expect(result).toEqual({ votes: 1, language: "typescript" });
    });
    it("vote several times", async () => {
      await voteFor("typescript");
      await voteFor("typescript");
      const result = await voteFor("typescript");
      expect(result).toEqual({ votes: 3, language: "typescript" });
    });
  });
  async function voteFor(language: string) {
    const response = await supertest(app)
      .put("/vote/" + language)
      .expect(200);
    return response.body;
  }
});

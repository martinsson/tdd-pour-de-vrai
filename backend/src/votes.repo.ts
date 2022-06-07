import { getCollection } from "./mongo-utils";

export class VotesRepo {
  constructor(private uri: string) {}

  async voteFor(language: string) {
    const collection = await getCollection(this.uri, "votes");

    await collection.updateOne(
      { language: language },
      { $inc: { votes: 1 } },
      { upsert: true }
    );
    const voteResult = await collection.findOne({ language });

    return voteResult?.votes;
  }

  async getAllVotes() {
    const collection = await getCollection(this.uri, "votes");
    const entries = await collection.find().toArray();

    // TODO Real Type
    const result = entries.map((entry) => ({
      votes: entry.votes,
      language: entry.language,
    }));
    return result;
  }
}

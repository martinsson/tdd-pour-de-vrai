import * as mongoDB from "mongodb"
import {VoteResult} from "./vote-result"

async function getVotesCollectionAt(uri: string) {
    const client = new mongoDB.MongoClient(uri)
    await client.connect()
    const db = client.db('real-world-tdd')
    return db.collection('votes')
}

export class MongoVotesRepository {
    constructor(private uri: string) {
    }

    async getAllVotes() {
        const votesCollection = await getVotesCollectionAt(this.uri)
        const entries = await votesCollection.find().toArray()
        return entries.map((e) => new VoteResult(e.name, e.votes))
    }

    async voteFor(language: string) {
        const votesCollection = await getVotesCollectionAt(this.uri)
        await votesCollection.updateOne({name: language}, {$inc: {votes: 1}}, {upsert: true})
        const result = await votesCollection.findOne({name: language})

        return new VoteResult(result?.name, result?.votes)

    }

    async clearAll() {
        const votesCollection = await getVotesCollectionAt(this.uri)
        return votesCollection.drop()
            .catch(console.log)
    }
}

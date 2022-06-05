import express from "express"
import {MongoClient} from "mongodb"

class VotesRepository {
    constructor(private mongodbUri: string) {

    }
    async getAllVotes() {
        const collection = await this.getCollection()
        const entries = await collection.find().toArray()
        return entries.map((e) => new VoteResult(e.language, e.votes));
    }

    private async getCollection() {
        const client = await MongoClient.connect(this.mongodbUri)
        return client.db('real-world-tdd').collection('votes')
    }

    async voteFor(language: string) {
        const collection = await this.getCollection()
        await collection.updateOne({language}, {$inc: {votes: 1}}, {upsert: true})
        const votesForLanguage = (await collection.findOne({language}))
        // @ts-ignore
        return new VoteResult(votesForLanguage.language, votesForLanguage.votes);
    }
}

export function configureApp(mongodbUri: string) {
    const app = express()

    const votesRepository = new VotesRepository(mongodbUri)
    app.get('/votes', async (req, res) => {

        res.send(await votesRepository.getAllVotes())
    })

    app.put('/vote/:language', async (req, res) => {
        const language = req.params['language']

        res.send(await votesRepository.voteFor(language))
    })
    return app
}

export class VoteResult {
    constructor(public readonly language: string, public readonly votes: number) {

    }

}

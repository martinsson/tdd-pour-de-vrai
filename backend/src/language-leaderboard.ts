import express, {json} from "express"
import {MongoMemoryServer} from "mongodb-memory-server"
import * as mongoDB from "mongodb";

export async function configureApp() {
    const app = express()

    const mongod = await MongoMemoryServer.create()

    const client = new mongoDB.MongoClient(mongod.getUri())
    await client.connect()
    const db = client.db('real-world-tdd')
    const votesCollection = db.collection('votes')


    app.put('/reset', async (req, res) => {
        votesCollection.drop()
            .catch(console.log)
            .finally(() => res.send())
    })
    app.get('/votes', async (req, res) => {
        const entries = await votesCollection.find().toArray()
        const votes = entries.map((e) => new VoteResult(e.name, e.votes))
        res.send(votes)
    })

    app.put('/votes/:language', async (req, res) => {
        const language = req.params['language'] //?

        const updateresult = await votesCollection.updateOne({name: language}, {$inc: {votes: 1}}, {upsert: true}) //?
        const result = await votesCollection.findOne({name: language})

        res.send(new VoteResult(result?.name, result?.votes))
    })

    return app
}

export class VoteResult {
    constructor(public readonly language: string, public readonly votes: number) {

    }

}

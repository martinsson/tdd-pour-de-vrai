import express from "express"
import mysql from "mysql2/promise"
import {MongoMemoryServer} from "mongodb-memory-server"
import * as mongoDB from "mongodb";

class LanguageVote {
    constructor(public readonly name: string, public readonly votes: number) {

    }


}
export async function startApp(mongod: MongoMemoryServer) {
    const app = express()

    const client = new mongoDB.MongoClient(mongod.getUri())
    await client.connect()
    const db = client.db('real-world-tdd')
    const votesCollection = db.collection('votes')

    try {
        await votesCollection.drop()
    } catch (e) {

    }
    await votesCollection.insertOne({name: "java", votes: 3})
    await votesCollection.insertOne({name: "js", votes: 15})

    app.get('/', async (req, res) => {
        const languagesAndVotes = (await votesCollection.find().toArray())
            .map(({name, votes}) => new LanguageVote(name, votes))
        console.log(languagesAndVotes)
        res.send({
            languages: languagesAndVotes
        })
    })

    app.put('/vote/:langName', async (req, res) => {
        const languagename = req.params['langName']
        await votesCollection.updateOne({name: languagename}, {$inc: {votes: 1}})
            res.send({message: "a voté pour " + languagename})
    })

    return app

}

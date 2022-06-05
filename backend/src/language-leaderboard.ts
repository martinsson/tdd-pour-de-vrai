import express from "express"
import {MongoVotesRepository} from "./mongo-votes-repository"

export async function configureApp(uri: string) {
    const votesRepository = new MongoVotesRepository(uri)

    const app = express()
    app.put('/reset', async (req, res) => {
        votesRepository.clearAll()
            .then(() => res.send())
    })
    app.get('/votes', async (req, res) => {
        res.send(await votesRepository.getAllVotes())
    })

    app.put('/votes/:language', async (req, res) => {
        const language = req.params['language']
        const result = await votesRepository.voteFor(language)
        res.send(result)
    })

    return app
}


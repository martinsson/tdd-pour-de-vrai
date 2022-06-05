import express from "express"

export function configureApp() {
    const app = express()
    app.get('/votes', (req, res) => {
        const result = Object.entries(votesDB)
        // @ts-ignore
            .map(([key, value]) => new VoteResult(key, value))
        res.send(result)
    })

    const votesDB: any = {}
    let totalvotes = 0
    app.put('/vote/:language', (req, res) => {
        const language = req.params['language']
        if (votesDB[language]) {
            votesDB[language]++
        } else {
            votesDB[language] = 1
        }
        res.send(new VoteResult(language, votesDB[language]))
    })
    return app
}

export class VoteResult {
    constructor(public readonly language: string, public readonly votes: number) {

    }

}

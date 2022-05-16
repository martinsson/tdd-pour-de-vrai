import express from "express"

export function startApp() {
    const app = express()
    app.get('/', (req, res) => {
        res.send({
            languages: [{name: "java", votes: 3}, {name: "js", votes: 15}]
        })
    })
    app.put('/vote/:langName', (req, res) => {
        res.send({message: "a voté pour " + req.params['langName']})
    })

    return app

}

import express from "express"
import mysql from "mysql2/promise"

export async function startApp() {
    const app = express()

    let connectionOptions = {host: '127.0.0.1', user: 'root', database: 'real_world_tdd', password: 'mysql'}
    const connection = await mysql.createConnection(connectionOptions)

    const languagesAndVotes = [{name: "java", votes: 3}, {name: "js", votes: 15}]
    await connection.execute('TRUNCATE TABLE votes')
    await connection.execute('INSERT INTO votes VALUES ("java", 3)')
    await connection.execute('INSERT INTO votes VALUES ("js", 15)')

    app.get('/', async (req, res) => {
        const [languagesAndVotes, fields] = await connection.query('SELECT * FROM votes')
        console.log(languagesAndVotes)
        res.send({
            languages: languagesAndVotes
        })
    })

    app.put('/vote/:langName', async (req, res) => {
        const languagename = req.params['langName']
        languagesAndVotes.find(l => l.name === languagename)!.votes++
        // await connetion.execute('')
            res.send({message: "a voté pour " + languagename})
    })

    return app

}

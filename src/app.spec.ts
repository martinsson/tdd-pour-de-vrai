import express, {Express} from "express";
import mysql from "mysql2/promise"
import request from 'supertest'

async function createApp() {
    const app = express()

    app.put('/toto', async (req, res) => {
        res.send('hello')
    })
    let connectionOptions = {host: '127.0.0.1', user: 'root', database: 'real_world_tdd', password: 'mysql'}
    const connection = await mysql.createConnection(connectionOptions)
    return {app, connection};
}

describe('app', () => {
    let app: Express
    let  connection: mysql.Connection

    beforeEach(async () => {
        ({connection, app} = await createApp())
    })

    it('should ', async () => {
        await request(app).put('/toto?myArg=333').expect(200)
    });

    afterEach(async () => {
        await connection.destroy()
    });


});

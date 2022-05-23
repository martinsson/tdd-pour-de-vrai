import request from "supertest"
import {expect} from "chai"
import { MongoMemoryServer } from 'mongodb-memory-server';
import {startApp} from "./language-leaderboard"

describe('LanguageLeaderBoard', () => {


    let mongod: MongoMemoryServer
    beforeEach(async () => {
        mongod = await MongoMemoryServer.create()



    });

    afterEach(async () => {
        await mongod.stop();
    });

    it('returns existing languages with votes', async () => {
        const app = await startApp(mongod)
        await request(app).put('/admin/configureVotes')
            .send([{name: "java", votes: 3}, {name: "js", votes:15}])
            .expect(200)
        const result = await request(app).get('/').expect(200)
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3}, {name: "js", votes:15}]
        })
    });

    it('should accept votes', async () => {
        const app = await startApp(mongod)

        const voteResult = await request(app).put('/vote/java').expect(200)
        expect(voteResult.body).to.deep.equal({message: "a voté pour java"})

        const result = await request(app).get('/')
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3+1}, {name: "js", votes:15}]
        })
    });

    it('should persist votes', async () => {
        const app1 = await startApp(mongod)

        const voteResult = await request(app1).put('/vote/java').expect(200)
        expect(voteResult.body).to.deep.equal({message: "a voté pour java"})

        const app2 = await startApp(mongod)
        const result = await request(app2).get('/')
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3+1}, {name: "js", votes:15}]
        })

    });

    it('fails when voting for non existing language')
});

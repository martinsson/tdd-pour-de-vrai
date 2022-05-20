import request from "supertest"
import {expect} from "chai"
import {startApp} from "./language-leaderboard"

describe('LanguageLeaderBoard', () => {



    it('returns existing langauges with votes', async () => {
        const app = await startApp()
        const result = await request(app).get('/').expect(200)
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3}, {name: "js", votes:15}]
        })
    });

    it('should accept votes', async () => {
        const app = await startApp()

        const voteResult = await request(app).put('/vote/java').expect(200)
        expect(voteResult.body).to.deep.equal({message: "a voté pour java"})

        const result = await request(app).get('/')
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3+1}, {name: "js", votes:15}]
        })
    });

    it('should persist votes', async () => {
        const app1 = await startApp()

        const voteResult = await request(app1).put('/vote/java').expect(200)
        expect(voteResult.body).to.deep.equal({message: "a voté pour java"})

        const app2 = await startApp()
        const result = await request(app2).get('/')
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3+1}, {name: "js", votes:15}]
        })

    });

    it('fails when voting for non existing language')
});

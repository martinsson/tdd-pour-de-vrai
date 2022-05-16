import request from "supertest"
import {expect} from "chai"
import {startApp} from "./app"

describe('LanguageLeaderBoard', () => {



    it('returns existing langauges with votes', async () => {
        const app = startApp()
        const result = await request(app).get('/').expect(200)
        expect(result.body).to.deep.equal({
            languages: [{name: "java", votes: 3}, {name: "js", votes:15}]
        })
    });

    it('should accept votes', async () => {
        const app = startApp()


        const result = await request(app).put('/vote/java').expect(200)
        expect(result.body).to.deep.equal({message: "a voté pour java"})


    });
});

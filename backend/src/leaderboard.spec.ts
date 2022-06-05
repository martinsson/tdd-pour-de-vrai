import {Express} from "express";
import supertest from "supertest"
import {configureApp, VoteResult} from "./leaderboard"
import {MongoMemoryServer} from "mongodb-memory-server"

describe('LeaderBoard', () => {



    let app: Express
    beforeEach(async () => {

        const mongod = await MongoMemoryServer.create()

        app = configureApp(mongod.getUri())

    });

    async function getAllVotes() {
        const response = await supertest(app).get('/votes').expect(200)
        return response.body
    }

    describe('/votes - lists languages', () => {

        it('no votes yet', async () => {
            const languages = await getAllVotes()
            expect(languages).toEqual([])
        });

        it('lists all votes', async () => {
            await voteFor('java')
            await voteFor('java')
            await voteFor('java')
            await voteFor('java')
            await voteFor('typescript')
            await voteFor('typescript')
            expect(await getAllVotes()).toContainEqual(new VoteResult('java', 4))

        });
    });

    async function voteFor(language: string) {
        const response = await supertest(app).put('/vote/' + language).expect(200)
        return response.body
    }

    describe('/vote/:language - vote for a language', () => {

        it('can vote for rust', async () => {
            const voteResult = await voteFor('rust')
            expect(voteResult).toEqual(new VoteResult('rust', 1))
        });

        it('can vote for haskell', async () => {
            const voteResult = await voteFor('haskell')
            expect(voteResult).toEqual(new VoteResult('haskell', 1))
        });

        it('is possible to vote more than once', async () => {
            await voteFor('haskell')
            const voteResult = await voteFor('haskell')
            expect(voteResult).toEqual(new VoteResult('haskell', 2))
        });

    });
});

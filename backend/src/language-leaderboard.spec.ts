import {Express} from "express";
import supertest from "supertest"
import {configureApp, VoteResult} from "./language-leaderboard"
import {MongoMemoryServer} from "mongodb-memory-server"

describe('LanguageLeaderBoard', () => {

    let app: Express
    beforeEach(async () => {
        app = await configureApp()
        await supertest(app).put('/reset').expect(200)
    });

    describe('/votes/:language - to vote for any language', () => {

        it('haskell', async () => {
            const result = await voteFor('haskell')
            expect(result).toEqual(new VoteResult('haskell', 1))
        });

        it('rust', async () => {
            const result = await voteFor('rust')
            expect(result).toEqual(new VoteResult('rust', 1))
        });

        it('accumulates votes', async () => {
            await voteFor('rust')
            const secondVotesResult = await voteFor('rust')
            expect(secondVotesResult).toEqual(new VoteResult('rust', 2))
        });
    });

    describe('/votes - lists existing votes', () => {
        it('when there are no votes', async () => {
            const result = await getAllVotes()
            expect(result).toEqual([])

        });

        it('with a single vote', async () => {
            await voteFor('java')
            const votes = await getAllVotes()
            expect(votes).toEqual([new VoteResult('java', 1)])
        });

        it('with several votes for several languages', async () => {
            await voteFor('java')
            await voteFor('java')
            await voteFor('java')
            await voteFor('java')
            await voteFor('js')
            await voteFor('js')
            const votes = await getAllVotes()
            expect(votes).toContainEqual(new VoteResult('java', 4))
            expect(votes).toContainEqual(new VoteResult('js', 2))
        });

    });


    async function voteFor(language: string) {
        const result = await supertest(app).put('/votes/' + language).expect(200)
        return result.body
    }

    async function getAllVotes() {
        const result = await supertest(app).get('/votes').expect(200)
        return result.body
    }

});

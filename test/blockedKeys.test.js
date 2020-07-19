const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

const testUser = {
    user: "saurabh"
}

beforeEach(async() => {
    await request(app).get('/api/generate-key');
})

test('testing /blocked endpoint', async (done) => {
    await request(app).post('/api/get-key')
    .send(testUser)
    .expect(HttpStatus.OK)

    const response = await request(app).get('/api/blocked')
    .expect(HttpStatus.OK)

    expect(response.body).toEqual(expect.objectContaining({
        blockedKeys: expect.any(Array)
    }))
    expect(response.body.blockedKeys.length).not.toBe(0);
    
    done()
})

const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

const testUser = {
    user: "saurabh"
}

beforeEach(async() => {
    await request(app).get('/api/generate-key');
})

test('testing /get-key endpoint - should be able return a new key', async (done) => {
    const response = await request(app).post('/api/get-key')
    .send(testUser)
    .expect(HttpStatus.OK)

    expect(response.body).toEqual(expect.objectContaining({
        apiKey: expect.any(String)
    }))
    expect(response.body.apiKey.length).toBe(64);
    
    done()
})
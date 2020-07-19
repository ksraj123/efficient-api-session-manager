const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

const testUser = {
    user: "saurabh"
}

beforeEach(async() => {
    await request(app).get('/api/generate-key');
})

test('testing /unblock endpoint - should be able to unblock a key', async (done) => {

    const responseGetKey = await request(app).post('/api/get-key')
    .send(testUser)
    .expect(HttpStatus.OK)

    const key = responseGetKey.body.apiKey;

    const responseCheckBlocked = await request(app).get('/api/blocked')
    .expect(HttpStatus.OK)
    expect(responseCheckBlocked.body.blockedKeys.length).not.toBe(0);

    const response = await request(app).put(`/api/unblock/${key}`)
    .send(testUser)
    .expect(HttpStatus.OK)

    expect(response.body).toEqual(expect.objectContaining({
        apiKey: expect.any(String)
    }))
    expect(response.body.apiKey).toBe(key);

    const expected = [key];

    const responseCheckAvailable = await request(app).get('/api/available')
    .expect(HttpStatus.OK)
    expect(responseCheckAvailable.body.availableKeys).toEqual(expect.arrayContaining(expected));
    
    done()
})
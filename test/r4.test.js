const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

const testUser = {
    user: "saurabh"
}

beforeEach(async() => {
    await request(app).get('/api/generate-key');
})

test('testing /delete endpoint - should be able to delete a key', async (done) => {

    const responseGetKey = await request(app).post('/api/get-key')
    .send(testUser)
    .expect(HttpStatus.OK)

    const key = responseGetKey.body.apiKey;

    const response = await request(app).delete(`/api/delete/${key}`)
    .expect(HttpStatus.OK)

    expect(response.body).toEqual(expect.objectContaining({
        apiKey: expect.any(String)
    }))
    expect(response.body.apiKey).toBe(key);

    const expected = [key];

    const responseCheckBlocked = await request(app).get('/api/blocked')
    .expect(HttpStatus.OK)
    expect(responseCheckBlocked.body.blockedKeys).toEqual(expect.not.arrayContaining(expected));

    const responseCheckAvailable = await request(app).get('/api/available')
    .expect(HttpStatus.OK)
    expect(responseCheckAvailable.body.availableKeys).toEqual(expect.not.arrayContaining(expected));
    
    done()
})
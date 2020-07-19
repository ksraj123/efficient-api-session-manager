const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

beforeEach(async() => {
    await request(app).get('/api/generate-key');
})

test('testing /available endpoint', async (done) => {
    const response = await request(app).get('/api/available')
    .expect(HttpStatus.OK)

    expect(response.body).toEqual(expect.objectContaining({
        availableKeys: expect.any(Array)
    }))
    expect(response.body.availableKeys.length).not.toBe(0);
    
    done()
})

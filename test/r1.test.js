const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

test('testing /generate-key endpoint - should be able to create a new key', async (done) => {
    await request(app).get('/api/generate-key')
    .expect(HttpStatus.OK)
    done()
})
const HttpStatus = require("http-status-codes");
const request = require('supertest');
const app = require('../app');

const testUser = {
    user: "saurabh"
}

beforeEach(async()=>{
    jest.useFakeTimers();
    jest.clearAllTimers();
    await request(app).get('/api/generate-key');
})

test('testing /keep-alive endpoint - keys should persist after five minutes if renewed', async (done) => {

    const responseGetKey = await request(app).post('/api/get-key')
    .send(testUser)
    .expect(HttpStatus.OK)

    const key = responseGetKey.body.apiKey;
    const expected = [key];

    jest.advanceTimersByTime(1000 * 60 * 3);
    expect(setTimeout).toBeCalled()

    const responseKeepAlive = await request(app).put(`/api/keep-alive/${key}`)
    .send(testUser)
    .expect(HttpStatus.OK)
    expect(responseKeepAlive.body.apiKey).toBe(key);

    const responseCheckBlocked = await request(app).get('/api/blocked')
    .expect(HttpStatus.OK)
    expect(responseCheckBlocked.body.blockedKeys).toEqual(expect.arrayContaining(expected));
    
    jest.advanceTimersByTime(1000 * 60 * 4);
    expect(setTimeout).toBeCalled()
    
    const responseCheckAvailable = await request(app).get('/api/available')
    .expect(HttpStatus.OK)
    expect(responseCheckAvailable.body.availableKeys).toEqual(expect.arrayContaining(expected));

    done()
})

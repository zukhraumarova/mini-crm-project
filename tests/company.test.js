const request = require('supertest');

const app = require('../src/app');


describe('Companies API', () => {


    test('GET /companies without token should return 401', async () => {


        const response = await request(app)
            .get('/companies');


        expect(response.statusCode)
            .toBe(401);


    });


});
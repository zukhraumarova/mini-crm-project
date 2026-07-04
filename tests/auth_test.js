const request = require('supertest');

const app = require('../src/app');

describe('Auth API', ()=>{

    test('login success', async()=> 
    { 
        const response = await request(app).post('/auth/login').send({

            email:'manager2@test.com',

            password:'123456'

        });


    expect(response.statusCode).toBe(200);

    expect(response.body.accessToken).toBeDefined();


    });
});
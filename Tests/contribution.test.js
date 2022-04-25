import supertest from 'supertest';
import app from '../src/app';
import request from 'supertest';
describe('POST /Contr', () => {
	describe('given a username and fields', () => {
        test('should respond with a 200 status code', async () => {
            
			const response = await request(app).post('/Contr').send({
			userID: 100,
            projectID:100,
            amount: {number: 1000000},
            type: 'investment',
			});
			expect(response.statusCode).toBe(200);
		});

        test('should specify json in the content type header', async () => {
			const response = await request(app).post('/Contr').send({
			userID: 100,
            projectID:100,
            amount: {number: 1000000},
            type: 'investment',
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});

        test('response has contributionID', async () => {
			const response = await request(app).post('/Contr').send({
			userID: 100,
            projectID:100,
            amount: {number: 1000000},
            type: 'investment',
			});
			expect(response.body.id).toBeDefined();
		});
			
		});
    });

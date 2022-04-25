import supertest from 'supertest';
import app from '../src/app';
import request from 'supertest';
describe('POST /User', () => {
	describe('given a username and fields', () => {
		//should save user
		//respond with a jso object containing user id
		test('should respond with a 200 status code', async () => {
			const response = await request(app).post('/User').send({
				name: 'name',
				surname: 'surname',
				password: 'password',
				verifyPassword: 'password',
				mail: 'mail@gmail.com',
				phone: '3208273682',
				postalCode: '111111',
				city: 'city',
			});
			expect(response.statusCode).toBe(200);
		});
		test('should specify json in the content type header', async () => {
			const response = await request(app).post('/User').send({
				name: 'name',
				surname: 'surname',
				password: 'password',
				verifyPassword: 'password',
				mail: 'mail@gmail.com',
				phone: '3208273682',
				postalCode: '111111',
				city: 'city',
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});
		test('response has userID', async () => {
			const response = await request(app).post('/User').send({
				name: 'name',
				surname: 'surname',
				password: 'password',
				verifyPassword: 'password',
				mail: 'mail@gmail.com',
				phone: '3208273682',
				postalCode: '111111',
				city: 'city',
			});
			expect(response.body.userID).toBeDefined();
		});
		//should specify json in the content type header
	});
	

	describe('when any field is in blank', () => {
		test('should respond with a status code 400', async () => {
			const bodyData = [
				{
					name: '',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: '',
					password: 'password',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: '',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: '',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'password',
					mail: '',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'password',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: '',
				},
				{
					name: 'name',
					surname: 'surname',
					password: 'password',
					verifyPassword: 'Notpassword',
					mail: 'mail@gmail.com',
					phone: '3208273682',
					postalCode: '111111',
					city: 'city',
				},
			];

			for (const body of bodyData) {
				const response = await request(app).post('/User').send({ body });
				expect(response.statusCode).toBe(400);
			}
		});
	});
});

const APIAuthentication = "/User/authenticate/";
describe('GET /User/authenticate/', () => {
describe('user authentication with username(mail) and password', () => {
	const body = {
			mail: 'mail@gmail.com',
			password: 'password',
		}
	test('should respond with a 200 status code', async () => {
		
			const response = await request(app).get(APIAuthentication+body.mail+"/" + body.password)
			expect(response.statusCode).toBe(200);
	});
	test('should specify json in the content type header', async () => {
			const response = await request(app).get(APIAuthentication+body.mail+"/" + body.password)
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});
	test('response has userID', async () => {
			const response = await request(app).get(APIAuthentication+body.mail+"/" + body.password)
			expect(response.body.res.id).toBeDefined();
		});
	
	describe('when any field is in blank', () => {
	let noMailBody = {
			mail: '',
			password: 'password',
	}	
		test('should respond with a status code 404', async () => {
			const response = await request(app).get(APIAuthentication+noMailBody.mail+"/" + noMailBody.password)
			expect(response.statusCode).toBe(404);
		});
	let noPasswordBody = {
			mail: 'mail@gmail.com',
			password: '',
	}	
		test('should respond with a status code 404', async () => {
			const response = await request(app).get(APIAuthentication+noPasswordBody.mail+"/" + noPasswordBody.password)
			expect(response.statusCode).toBe(404);
		})

	describe('when username or password are do not match', () => {
		let body = {
			mail: 'mail@gmail.com',
			password: 'notPassword',
		}
		test('should respond with a status code 400', async () => {
			const response = await request(app).get(APIAuthentication+body.mail+"/" + body.password)
			expect(response.statusCode).toBe(400);
		})
		let body2 = {
			mail: 'mail@gmail.co',
			password: 'Password',
		}

		test('should respond with a status code 400', async () => {
			const response = await request(app).get(APIAuthentication+body2.mail+"/" + body2.password)
			expect(response.statusCode).toBe(400);
		})
		
	})
	})
	});
	describe('when getting user by a user id', () => {
		let id = 50;
		test('should respond with a 200 status code', async () => {
		
			const response = await request(app).get("/User/" + id)
			expect(response.statusCode).toBe(200);
	});
	test('should specify json in the content type header', async () => {
			const response = await request(app).get("/User/" + id)
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});
	
	

	})
})
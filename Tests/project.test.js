
import supertest from 'supertest';
import app from '../src/app';
import request from 'supertest';

describe('POST /Project', () => {
    describe('given userID, name, description, scope, tentative date, type, state, rate, total mount and  pay frecuency', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 9,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
			});
			expect(response.statusCode).toBe(200);
        })

        test('should specify json in the content type header', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 9,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
        test('response has projectID', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 9,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
			});
			expect(response.body.id).toBeDefined();
        })
        describe('when any field is in blank', () => {
		test('should respond with a status code 400', async () => {
            const body = {
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 9,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
            }

            for (let index = 0; index < body.length; index++) {
                let newBody = body;
                if (isInt(newBody[index])){
                    newBody[index] = null;
                } else{
                    newBody[index] = "";
                }
                const response = await request(app).post('/Project').send(newBody);
                expect(response.statusCode).toBe(400);
            }

        });
    });

    describe('rate is not between 9 and 20', () => {
        
		test('should respond with a status code 400', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 8,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
			});
			expect(response.statusCode).toBe(400);
            

        });

        test('should respond with a status code 400', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 21,
				totalMount: 50000000,
                payFrecuency: 'quarterly'
			});
			expect(response.statusCode).toBe(400);
            

        });
    });

     describe('total mount is not between 50000000 and 3000000000 ', () => {
        
		test('should respond with a status code 400', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 8,
				totalMount: 49999999,
                payFrecuency: 'quarterly'
			});
			expect(response.statusCode).toBe(400);
            

        });

        test('should respond with a status code 400', async () => {
            const response = await request(app).post('/Project').send({
                userID: 100,
				name: 'project',
				description: 'this is a proyect created for unit testing and backend database testing.',
				scope: 'this is a proyect created for unit testing and backend database testing.',
				tentativeDate: '2022-12-30',
				type: 'any type',
				state: 'any progress',
				rate: 21,
				totalMount: 3000000001,
                payFrecuency: 'quarterly'
			});
			expect(response.statusCode).toBe(400);
            

        });
    });
    });
});

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}




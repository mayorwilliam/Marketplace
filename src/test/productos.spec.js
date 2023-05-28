const request = require('supertest');
const { dbConnection , dbDisconnection } = require('../database/config');
const Server = require('./models/server');

const server = new Server();

describe('Pruebas de las rutas de productos' , () => {

    beforeAll(async () =>{
        await dbConnection();
    });

    afterAll(async () => {
        await dbDisconnection();
    })
    
    
    describe('GET productos vendedor' , () =>{
        let response;
        beforeEach(async () => {
            response = await request(server).get('/').send();
        });
        it('la ruta funciona' , async () =>{
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
    });

    describe('POST productos vendedor' , () =>{
        let response;
        beforeEach(async () => {
            response = await request(server).post('/').send();
        });
        it('la ruta funciona' , async () =>{
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
    });

});
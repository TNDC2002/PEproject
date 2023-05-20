import request from 'supertest';
import express from 'express';
import { initWebRoutes } from '../routes/WebRoutes.js';
import * as movieAPI from "../controller/movieAPI.js";
// const { configureMockAdapter } = require('./mock_TMDB.js');

const app = express();
app.use(express.urlencoded({ extended: false }));
initWebRoutes(app);

// beforeAll(() => {
//     // Configure the mock adapter for TMDB API
//     configureMockAdapter();
//   });

describe('Test routes responses', () => {

    test('1 GET /movie/detail/:movieID responds with 200 status', async () => {
        const response = await request(app).get('/movie/detail/502356}');
        expect(response.status).toBe(200);
    });

    test('2 GET /movie/detail/:movieID responds with 500 status if movie is not found', async () => {
        const response = await request(app).get('/movie/detail/00001');
        expect(response.status).toBe(500);
    });

    test('3 GET /movie/trailer/:movieID responds with 200 status', async () => {
        const response = await request(app).get('/movie/trailer/502356');
        expect(response.status).toBe(200);
    });

    test('4 GET /movie/trailer/:movieID responds with 500 status if movie is not found', async () => {
        const response = await request(app).get('/movie/trailer/00001');
        expect(response.status).toBe(500);
    });

    test('5 GET /movie/recommendations/:movieID responds with 200 status', async () => {
        const response = await request(app).get('/movie/recommendations/502356');
        expect(response.status).toBe(200);
    });

    test('6 GET /movie/recommendations/:movieID responds with 500 status if movie is not found', async () => {
        const response = await request(app).get('/movie/recommendations/00001');
        expect(response.status).toBe(500);
    });

    test('7 GET /movie/credits/:movieID responds with 200 status', async () => {
        const response = await request(app).get('/movie/credits/502356');
        expect(response.status).toBe(200);
    });

    test('8 GET /movie/credits/:movieID responds with 500 status if movie is not found', async () => {
        const response = await request(app).get('/movie/credits/00001');
        expect(response.status).toBe(500);
    });

    test('9 GET /movie/tvDetail/:showID responds with 200 status', async () => {
        const response = await request(app).get('/movie/tvDetail/215103');
        expect(response.status).toBe(200);
    });

    test('10 GET /movie/tvDetail/:showID responds with 500 status if show is not found', async () => {
        const response = await request(app).get('/movie/tvDetail/000000000');
        expect(response.status).toBe(500);
    });

    test('11 GET /movie/tvTrailer/:showID responds with 200 status', async () => {
        const response = await request(app).get('/movie/tvTrailer/215103');
        expect(response.status).toBe(200);
    });

    test('12 GET /movie/tvTrailer/:showID responds with 500 status if show is not found', async () => {
        const response = await request(app).get('/movie/tvTrailer/000000000');
        expect(response.status).toBe(500);
    });

    // test('13 GET /movie/showTrailer/:showID responds with 200 status', async () => {
    //     const response = await request(app).get('/movie/showTrailer/215103');
    //     expect(response.status).toBe(200);
    // });

    // test('14 GET /movie/showTrailer/:showID responds with 500 status if show is not found', async () => {
    //     const response = await request(app).get('/movie/showTrailer/000000000');
    //     expect(response.status).toBe(500);
    // });

    test('15 GET /movie/tvRecommendations/:showID responds with 200 status', async () => {
        const response = await request(app).get('/movie/tvRecommendations/215103');
        expect(response.status).toBe(200);
    });

    test('16 GET /movie/tvRecommendations/:showID responds with 500 status if show is not found', async () => {
        const response = await request(app).get('/movie/tvRecommendations/000000000');
        expect(response.status).toBe(500);
    });

    test('17 GET /movie/credits/:showID responds with 200 status', async () => {
        const response = await request(app).get('/movie/credits/215103');
        expect(response.status).toBe(200);
    });

    test('18 GET /movie/credits/:showID responds with 500 status if show is not found', async () => {
        const response = await request(app).get('/movie/credits/000000000');
        expect(response.status).toBe(500);
    });

    test('19 GET /movie/discovery/:page responds with 200 status', async () => {
        const response = await request(app).get('/movie/discovery/1');
        expect(response.status).toBe(200);
    });

    test('20 GET /movie/discovery/:page responds with 500 status if page is not found', async () => {
        const response = await request(app).get('/movie/discovery/1000000');
        expect(response.status).toBe(500);
    });

    test('21 GET /movie/showDiscovery/:page responds with 200 status', async () => {
        const response = await request(app).get('/movie/showDiscovery/1');
        expect(response.status).toBe(200);
    });

    test('22 GET /movie/showDiscovery/:page responds with 500 status if page is not found', async () => {
        const response = await request(app).get('/movie/showDiscovery/1000000');
        expect(response.status).toBe(500);
    });

    test('23 GET /search responds with 200 status', async () => {
        const response = await request(app).get('/search/?query=breaking&page=1');
        expect(response.status).toBe(200);
    });

    test('24 GET /movie/featureImage responds with 200 status', async () => {
        const response = await request(app).get('/movie/featureImage');
        expect(response.status).toBe(200);
    });
});
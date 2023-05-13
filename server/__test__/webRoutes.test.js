import request from 'supertest';
import express from 'express';
import { initWebRoutes } from '../routes/WebRoutes.js';
import * as movieAPI from "../controller/movieAPI.js";

const UserFavouriteMovie = require('../models/UserFavouriteMovie');


const app = express();
app.use(express.urlencoded({ extended: false }));
initWebRoutes(app);

describe('GET /movie/detail/:movieID', () => {

    test('responds with 200 status and movie details', done => {
        // Mock the movieAPI.getDetail function
        const mockDetail = {
            "homepage": "https://www.thesupermariobros.movie",
            "id": 502356,
            "release_date": "2023-04-05",
            "title": "The Super Mario Bros. Movie",
        };

        movieAPI.default.getDetail = jest.fn().mockResolvedValue(mockDetail);
        // Make a GET request to the endpoint
        request(app).get('/movie/detail/502356')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect(response => {
                expect(response.body).toMatchObject(mockDetail);
            })
            .end(done);
    });


    test('responds with 500 status if movie is not found', async () => {
        // Mock the movieAPI.getDetail function to return null
        movieAPI.default.getDetail = jest.fn().mockResolvedValue(null);
        // Make a GET request to the endpoint
        const response = await request(app).get('/movie/detail/00001');

        // Check that the response is valid
        expect(response.status).toBe(500);
    });
});
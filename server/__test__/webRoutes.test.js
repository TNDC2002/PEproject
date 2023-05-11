import request from 'supertest';
import express from 'express';
import { initWebRoutes } from '../routes/WebRoutes.js';
import * as movieAPI from "../controller/movieAPI.js";

const app = express();
initWebRoutes(app);

describe('GET /movie/detail/:movieID', () => {

    test('responds with 200 status and movie details', async () => {
        // Mock the movieAPI.getDetail function
        const mockDetail = {
            "adult": false,
            "backdrop_path": "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
            "belongs_to_collection": null,
            "budget": 100000000,
            "genres": [
                {
                    "id": 16,
                    "name": "Animation"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                },
                {
                    "id": 10751,
                    "name": "Family"
                },
                {
                    "id": 14,
                    "name": "Fantasy"
                },
                {
                    "id": 35,
                    "name": "Comedy"
                }
            ],
            "homepage": "https://www.thesupermariobros.movie",
            "id": 502356,
            "imdb_id": "tt6718170",
            "original_language": "en",
            "original_title": "The Super Mario Bros. Movie",
            "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
            "popularity": 3066.538,
            "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "production_companies": [
                {
                    "id": 33,
                    "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
                    "name": "Universal Pictures",
                    "origin_country": "US"
                },
                {
                    "id": 6704,
                    "logo_path": "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
                    "name": "Illumination",
                    "origin_country": "US"
                },
                {
                    "id": 12288,
                    "logo_path": "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
                    "name": "Nintendo",
                    "origin_country": "JP"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "JP",
                    "name": "Japan"
                },
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "release_date": "2023-04-05",
            "revenue": 1162684440,
            "runtime": 92,
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                }
            ],
            "status": "Released",
            "tagline": "",
            "title": "The Super Mario Bros. Movie",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 1897
        };
        movieAPI.default.getDetail = jest.fn().mockResolvedValue(mockDetail);

        // Make a GET request to the endpoint
        const response = await request(app).get('/movie/detail/502356');

        // Check that the response is valid
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDetail);
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
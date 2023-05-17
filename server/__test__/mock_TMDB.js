const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

/**
 * Configure the mock adapter to intercept TMDB API requests and return mock responses
 */
function configureMockAdapter() {
  // Mock the GET /movie/detail/:movieID endpoint
  mock.onGet(/\/movie\/detail\/\d+/).reply(200, {
    // Mock response for a successful request
    id: 123456,
    title: 'Mock Movie',
    // Add other properties as needed
  });

  // Mock the GET /movie/trailer/:movieID endpoint
  mock.onGet(/\/movie\/trailer\/\d+/).reply(200, {
    // Mock response for a successful request
    id: 502356,
    title: 'Mock Movie',
    // Add other properties as needed
  });

  // Mock the error response for a movie not found
  mock.onGet(/\/movie\/detail\/00001/).reply(500);

  // Mock the error response for a trailer not found
  mock.onGet(/\/movie\/trailer\/00001/).reply(500);
}

module.exports = {
  configureMockAdapter,
};

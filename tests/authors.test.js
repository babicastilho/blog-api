const request = require("supertest");
const http = require("http");
const server = require("../server"); // Import your json-server configuration

describe("GET /authors", () => {
  let testServer; // Define the test server instance

  beforeAll((done) => {
    // Wrap the json-server instance with http.createServer
    testServer = http.createServer(server);

    // Start the test server on a specific port
    testServer.listen(4000, () => done());
  });

  afterAll((done) => {
    // Close the server after tests
    testServer.close(done);
  });

  it("should return the list of authors", async () => {
    const res = await request(testServer).get("/authors");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Validates the response is an array
    expect(res.body.length).toBeGreaterThan(0); // Ensures there is at least one author
  });

  it("should return an empty list if the authors file is empty", async () => {
    jest.mock("../data/authors.json", () => [], { virtual: true }); // Mock empty list

    const res = await request(testServer).get("/authors");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]); // Validates the response is an empty array
  });
});

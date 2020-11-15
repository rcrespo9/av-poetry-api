import supertest from "supertest";
import { app } from "../src/app"

const request = supertest(app);

it('Gets the main end point with welcome message', async done => {
  const response = await request.get('/');

  expect(response.status).toBe(200);
  expect(response.text).toBe("Welcome to the Voems API!");
  done();
})

it('Gets the API endpoint with correct response', async done => {
  const poemWithPhoto = await request.get('/api');

  expect(poemWithPhoto.status).toBe(200);
  expect(poemWithPhoto).toBeDefined();

  expect(poemWithPhoto.body).toHaveProperty("poem");
  expect(poemWithPhoto.body).toHaveProperty("poem_analysis");
  expect(poemWithPhoto.body).toHaveProperty("poem_photo");
  done();
});



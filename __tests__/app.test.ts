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
  expect(poemWithPhoto.body.poem).toHaveProperty("title");
  expect(poemWithPhoto.body.poem).toHaveProperty("author");
  expect(poemWithPhoto.body.poem).toHaveProperty("lines");
  expect(poemWithPhoto.body.poem).toHaveProperty("linecount");

  expect(poemWithPhoto.body).toHaveProperty("poem_analysis");
  expect(poemWithPhoto.body.poem_analysis).toHaveProperty("keyword");
  expect(poemWithPhoto.body.poem_analysis).toHaveProperty("emotion");

  expect(poemWithPhoto.body).toHaveProperty("poem_photo");
  expect(poemWithPhoto.body.poem_photo).toHaveProperty("description");
  expect(poemWithPhoto.body.poem_photo).toHaveProperty("alt_description");
  expect(poemWithPhoto.body.poem_photo).toHaveProperty("urls");
  expect(poemWithPhoto.body.poem_photo.urls).toHaveProperty("raw");
  expect(poemWithPhoto.body.poem_photo.urls).toHaveProperty("full");
  expect(poemWithPhoto.body.poem_photo.urls).toHaveProperty("regular");
  expect(poemWithPhoto.body.poem_photo.urls).toHaveProperty("small");
  expect(poemWithPhoto.body.poem_photo.urls).toHaveProperty("thumb");
  done();
});



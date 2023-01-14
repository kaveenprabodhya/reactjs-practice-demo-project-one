const mongoose = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;
// jest.setTimeout(30000);

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET/:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
    it("should return 404 if no genre with the given id", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      /* const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" }); */
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      // const token = new User().generateAuthToken();
      /* const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "ge1" }); */
      name = "ge1";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      // const token = new User().generateAuthToken();
      // const name = Array(52).join("a");
      /* const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name }); */
      name = Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      // const token = new User().generateAuthToken();
      /* const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "genre1" }); */
      const res = await exec();
      const genre = await Genre.find({ name });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      // const token = new User().generateAuthToken();
      const res = await exec();
      const genre = await Genre.find({ name });
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});

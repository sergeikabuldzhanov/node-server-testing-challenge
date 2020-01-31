const server = require("./server");
const request = require("supertest");
const seed = require("../data/seeds/01-users").seed;
const db = require("../data/db-config");

beforeEach(async () => {
  await seed(db);
});

describe("server.js module", () => {
  it("has the right enviroment for DB_ENV", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("GET /users endpoint", () => {
    it("returns 200OK", () => {
      return request(server)
        .get("/users")
        .expect(200);
    });
    it("returns an array of users", () => {
      return request(server)
        .get("/users")
        .expect([
          { id: 1, username: "Gandalf", password: "You shall not pass!" },
          {
            id: 2,
            username: "Aragorn",
            password: "Strange place for a hobbit!"
          },
          { id: 3, username: "Gimli", password: "And my axe!" }
        ]);
    });
    describe("POST /users endpoint", () => {
      it("returns 201 on valid request", () => {
        return request(server)
          .post("/users")
          .send({
            username: "Saruman",
            password: "It's too late!"
          })
          .expect(201);
      });
      it("returns new user object on valid request", () => {
        return request(server)
          .post("/users")
          .send({
            username: "Saruman",
            password: "It's too late!"
          })
          .expect({
            username: "Saruman",
            password: "It's too late!",
            id: 4
          });
      });
    });
    describe("DELETE /users endpoint", () => {
      it("returns 200 on valid request", () => {
        request(server)
          .delete("/user/1")
          .expect(200);
      });
      it("returns 400 on invalid request", () => {
        request(server)
          .delete("/user/asda")
          .expect(400);
      });
    });
  });
});

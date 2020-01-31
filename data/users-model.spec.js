const db = require("./db-config");
const users = require("./users-model");
const seed = require("./seeds/01-users").seed;

beforeEach(async () => {
  await seed(db);
});

describe("Users model", () => {
  describe("getAll()", () => {
    it("returns all users", async () => {
      const allUsers = await users.getAll();
      expect(allUsers.length).toBe(3);
    });
  });
  describe("getById", () => {
    it("returns valid user with id", async () => {
      const gandalf = await db("users")
        .where("id", 1)
        .first();
      const gandalfById = await users.getById(1);
      const aragorn = await db("users")
        .where("id", 2)
        .first();
      const aragornById = await users.getById(2);
      expect(aragorn).toMatchObject(aragornById);
      expect(gandalf).toMatchObject(gandalfById);
    });
    it("returns undefined on invalid id", async () => {
      const nonExistentUserById = await users.getById("asdaf");
      expect(nonExistentUserById).toBe(undefined);
    });
  });
  describe("insert()", () => {
    it("adds a new user", async () => {
      const allUsers = await db("users");
      expect(allUsers.length).toBe(3);
      const newUser = await users.insert({
        username: "Saruman",
        password: "It's too late!"
      });
      expect((await db("users")).length).toBe(4);
    });
    it("returns the new user object", async () => {
      const newUser = await users.insert({
        username: "Saruman",
        password: "It's too late!"
      });
      expect(newUser).toMatchObject({
        id: 4,
        username: "Saruman",
        password: "It's too late!"
      });
    });
  });
});

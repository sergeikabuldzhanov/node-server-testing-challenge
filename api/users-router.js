const router = require("express").Router();
const usersDb = require("../data/users-model");

router.get("/", async (req, res, next) => {
  try {
    const users = await usersDb.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const userData = req.body;
  try {
    const newUser = await usersDb.insert(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const removed = await usersDb.remove(id);
    if (removed) {
      res.status(200).send(removed);
    } else {
      res.status(400).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

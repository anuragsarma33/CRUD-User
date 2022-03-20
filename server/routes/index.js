const express = require("express");
const User = require("../model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers.map((user) => user).sort().reverse());
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    if (user) {
      await user.save();
      res
        .status(201)
        .json({ type: "Success", message: "User created successfully" });
    }
  } catch (error) {
    res.status(400).json({ type: "Failure",message: "The email is already in use" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const getUserById = await User.findById(req.params.userId);
    res.status(200).json(getUserById);
  } catch (error) {
    res
      .status(400)
      .json({ type: "Failure", message: `The user doesn't exist` });
  }
});

router.patch("/:userId", async (req, res) => {
  const _id = req.params.userId;
  try {
    await User.findByIdAndUpdate(
      _id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(200)
      .json({ type: "Success", message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ type: "Failure", message: error });
  }
});

router.delete("/:userId", async (req, res) => {
  const _id = req.params.userId;
  try {
    const removeUser = await User.findByIdAndDelete(_id);
    res.status(200).json(removeUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

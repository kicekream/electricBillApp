const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.get("/", (req, res) => {
  res.send("welcome here");
});

router.get('/one', async(req, res)=>{
    const user = await User.find()
    res.send(user);
})

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, email, phone } = req.body;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email});
  if (user) return res.status(400).send("email already exists");

  user = new User({ first_name, last_name, username, email, phone });
  await user.save();
  console.log(user);
  res.send(`${user} details have been successfully saved`);
});

module.exports = router;

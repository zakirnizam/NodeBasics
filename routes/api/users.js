var express = require("express");
var router = express.Router();
var uuid = require("uuid");
let users = require("../../users");

router.get("/", function (req, res) {
  res.json(users);
});

router.get("/:id", function (req, res) {
  const found = users.some((u) => u.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((u) => u.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `User with id ${req.params.id} not found` });
  }
});

//add a new user
router.post("/", function (req, res) {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  users.push(newUser);
  res.json(users);
});     

//update a user 
router.put("/:id", function (req, res) {
  const found = users.some((u) => u.id === parseInt(req.params.id));
  if (found) {
    const updUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name;
        user.email = updUser.email ? updUser.email : user.email;
        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `User with id ${req.params.id} not found` });
  }
});

//delete a user

router.delete("/:id", function (req, res) {
  const found = users.some((u) => u.id === parseInt(req.params.id));
if (found) {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({ msg: "User deleted", users });
  } else {
    res.sendS(400).json({ msg: `User with id ${req.params.id} not found` });
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');

// POST: CREATE A NEW USER
router.post("/", async (req, res) => {
    const { userName, userEmail, userPassword, userContact } = req.body;

    const error = await validateUser(req.body);
    if(error.message) res.status(400).send(error.message);

    user = new User({
        name: userName,
        email: userEmail,
        password: userPassword,
        contact: userContact
    });

    user.save()
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.status(500).send("User was not added successfully.")
        })
});

// GET ALL USERS
router.get("/", (req, res) => {
    User.find()
        .then((user) => res.send(user))
        .catch((error) => {
            res.status(500).send(`Something went wrong: ${error}`);
        })
});

// GET THE USER BY ID
router.get("/:userId", async (req, res) => {
    const id = req.params.userId;
    const user = await User.findById(id);
    if(!user) res.status(404).send("User not found");
    res.send(user);
});

// UPDATE USER BY ID
router.put("/:userId", async (req, res) => {
    const id = req.params.userId;
    const { userName, userEmail, userPassword, userContact } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
        name: userName,
        email: userEmail,
        password: userPassword,
        contact: userContact
    }, {new:true, useFindAndModify: false});
    
    if (!updatedUser) res.status(404).send("User not found");
    res.send(updatedUser);
});

// DELETE USER BASED ON ID
router.delete('/:userId', async (req, res) => {
    const id = req.params.userId;
    const user = await User.findByIdAndRemove(id);
    if(!user) res.status(404).send("User not found");
    res.send(user);
});

module.exports = router;
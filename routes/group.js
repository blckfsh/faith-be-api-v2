const express = require('express');
const router = express.Router();
const { Group, validateGroup } = require('../models/group');

// POST: CREATE A NEW GROUP
router.post("/", async (req, res) => {
    const { groupName, groupDescription } = req.body;

    const error = await validateGroup(req.body);
    if(error.message) res.status(400).send(error.message);

    group = new Group({
        name: groupName,
        description: groupDescription
    });

    group.save()
        .then(group => {
            res.send(group);
        })
        .catch(error => {
            res.status(500).send("Group was not added successfully.")
        })
});

// GET ALL GROUP
router.get("/", (req, res) => {
    Group.find()
        .then((group) => res.send(group))
        .catch((error) => {
            res.status(500).send(`Something went wrong: ${error}`);
        })
});

// GET THE GROUP BY ID
router.get("/:groupId", async (req, res) => {
    const id = req.params.groupId;
    const group = await Group.findById(id);
    if(!group) res.status(404).send("Group not found");
    res.send(group);
});

// UPDATE GROUP BY ID
router.put("/:groupId", async (req, res) => {
    const id = req.params.groupId;
    const { groupName, groupDescription } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(id, {
        name: groupName,
        description: groupDescription
    }, {new:true, useFindAndModify: false});
    
    if (!updatedGroup) res.status(404).send("Group not found");
    res.send(updatedGroup);
});

// DELETE GROUP BASED ON ID
router.delete('/:groupId', async (req, res) => {
    const id = req.params.groupId;
    const group = await Group.findByIdAndRemove(id);
    if(!group) res.status(404).send("Group not found");
    res.send(group);
});

module.exports = router;
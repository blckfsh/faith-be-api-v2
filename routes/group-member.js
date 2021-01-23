const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { GroupMember, validateGroupMember } = require('../models/group-member');
const { isValidObjectId } = require('mongoose');

// POST: ADD A USER TO A GROUP
router.post("/", async (req, res) => {
    const { gmGroup_id, gmUser_id } = req.body;

    const error = await validateGroupMember(req.body);
    if(error.message) res.status(400).send(error.message);

    groupMember = new GroupMember({
        group_id: gmGroup_id,
        user_id: gmUser_id
    });

    groupMember.save()
        .then(groupMember => {
            res.send(groupMember);
        })
        .catch(error => {
            res.status(500).send("User was not added to group successfully.")
        })
});

// GET ALL USERS FROM GROUP
router.get("/", (req, res) => {
    GroupMember.find()
        .then((groupMember) => res.send(groupMember))
        .catch((error) => {
            res.status(500).send(`Something went wrong: ${error}`);
        })
});

// GET THE USERS BY GROUP_ID
router.get("/:groupId", async (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.groupId);
    const groupMembers = await GroupMember.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "members"
            }
        },
        { $match: { group_id: id } },
        { $project: { members: { name: 1 } } }
    ])
    
    if(!groupMembers) res.status(404).send("Users not found");
    res.send(groupMembers);
});

// UPDATE USER MEMBERSHIP BY ID
router.put("/:memberId", async (req, res) => {
    const id = req.params.memberId;
    const { gmGroup_id, gmUser_id } = req.body;

    const updatedGroupMember = await GroupMember.findByIdAndUpdate(id, {
        group_id: gmGroup_id,
        user_id: gmUser_id,
        dateJoined: Date.now
    }, {new:true, useFindAndModify: false});
    
    if (!updatedGroupMember) res.status(404).send("User membership not found");
    res.send(updatedGroupMember);
});

// DELETE USER MEMBERSHIP BASED ON ID
router.delete('/:memberId', async (req, res) => {
    const id = req.params.memberId;
    const groupMember = await GroupMember.findByIdAndRemove(id);
    if(!groupMember) res.status(404).send("User membership not found");
    res.send(groupMember);
});

module.exports = router;
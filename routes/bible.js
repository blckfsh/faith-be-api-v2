const express = require('express');
const router = express.Router();
const { Bible, validateBible } = require('../models/bible');

// POST: CREATE A NEW BIBLE VERSE
router.post('/', async (req, res) => {
    const { title, message, version, testament, status } = req.body;

    const error = await validateBible(req.body);
    if(error.message) res.status(400).send(error.message);

    bible = new Bible({
        title,
        message,
        version,
        testament,
        status
    });

    bible.save()
        .then(bible => {
            res.send(bible);
        })
        .catch(error => {
            res.status(500).send("Verse was not added successfully.")
        })
});

// GET ALL BIBLE VERSES
router.get("/", (req, res) => {
    Bible.find()
        .then((bible) => res.send(bible))
        .catch((error) => {
            res.status(500).send(`Something went wrong: ${error}`);
        })
});

// GET THE BIBLE VERSE BY ID
router.get("/:bibleId", async (req, res) => {
    const id = req.params.bibleId;
    const bible = await Bible.findById(id);
    if(!bible) res.status(404).send("Bible verse not found");
    res.send(bible);
});

// UPDATE BIBLE VERSE BY ID
router.put("/:bibleId", async (req, res) => {
    const id = req.params.bibleId;
    const { title, message, version, testament, status } = req.body;

    const updatedBible = await Bible.findOneAndUpdate(id, {
        title,
        message,
        version,
        testament,
        status
    }, {new:true, useFindAndModify: false});
    
    if (!updatedBible) res.status(404).send("Bible verse not found");
    res.send(updatedBible);
});

// DELETE BIBLE VERSE BASED ON ID
router.delete('/:bibleId', async (req, res) => {
    const id = req.params.bibleId;
    const bible = await Bible.findByIdAndRemove(id);
    if(!bible) res.status(404).send("Bible verse not found");
    res.send(bible);
});

module.exports = router;
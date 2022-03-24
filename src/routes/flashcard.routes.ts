import express from "express";
import Flashcard from "../models/flashcard";

// create router
const router = express.Router();
// CRUD routes

router.get('/', async (req, res) => {
    const flashcard = await Flashcard.find({});
    try {
        res.send(flashcard);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    const flashcard = new Flashcard(req.body);
    try {
        Flashcard.findOne(req.body, function (_error, dbFlashcard) {
            if (dbFlashcard) {
                res.status(409).end();
            } else {
                flashcard.save();
                res.send(flashcard);
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        await flashcard.save();
        res.send(flashcard);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
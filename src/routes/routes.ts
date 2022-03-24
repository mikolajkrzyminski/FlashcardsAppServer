import express from "express";
import { getLanguages, getDictsData, getTranslation } from "../communication/communication";
import Flashcard from '../models/flashcard'
// create router
const router = express.Router();

// routes
router.get('/pageLangs', (req, res) => {
    res.json({ langs: getLanguages() });
});

router.get('/dictionaryData', async (req, res) => {
    // set site language
    let language = req.query.lang as string;

    // get available dictionaries in given language
    const dicts = await getDictsData(language);
    res.json(dicts);
});

router.get('/search', async (req, res) => {
    // get search phrase
    let phrase = req.query.phrase as string;

    // get source lang
    let sourceLang = req.query.source_language as string;

    // get target lang
    let targetLang = req.query.target_language as string;
    res.json({ results: (await getTranslation(phrase, sourceLang, targetLang)), source_lang: sourceLang, target_lang: targetLang });
});

// CRUD routes

router.get('/flashcards', async (req, res) => {
    const flashcard = await Flashcard.find({});
    try {
        res.send(flashcard);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/flashcards', async (req, res) => {
    const flashcard = new Flashcard(req.body);
    try {
        Flashcard.findOne(req.body, function (_error, dbFlashcard) {
            if (dbFlashcard) {
                console.log(dbFlashcard);
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

router.patch('/flashcards/:id', async (req, res) => {
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

router.delete("/flashcards/:id", async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);

        if (!flashcard) res.status(404).send("No item found");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
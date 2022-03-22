import express from "express";
import { getLanguages, getDictsData, getTranslation } from "./communication/communication";

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

export default router;
import express from "express";
import { getLanguages, getDictArray, getTranslation } from "./communication/communication";

// create router
const router = express.Router();

// routes

router.get('/', (req, res) => {
    res.json({ langs: getLanguages() });
});

router.get('/dictionaries', async (req, res) => {
    // set site language
    let language = req.query.language_id as string;

    // get available dictionaries in given language
    const dicts = await getDictArray(language);

    // console.log(dicts)
    res.json({ dicts: dicts });
});

router.get('/search', async (req, res) => {
    // get search phrase
    let phrase = req.query.phrase as string;

    // get dictionary key
    let dict = req.query.dictionary as string;

    // get source language
    let srcLng = req.query.source_language as string;
    res.json({ result: (await getTranslation(phrase, dict, srcLng)) });
});

export default router;
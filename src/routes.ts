import express from "express";

// create router
const router = express.Router();

// routes
router.get('/', (req, res) => {
    res.send('hello from express and typescript')
});

export default router;
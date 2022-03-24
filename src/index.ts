import 'dotenv/config'
import express from "express";
// create expresss aplication
const app = express();

import connectDB from './utils/connect';
import routerPageData from './routes/page_data.routes'
import routerFlashcards from './routes/flashcard.routes'

const port = process.env.PORT;
// avoid compilation error
let mongo_uri: string = process.env.MONGO_URI || "";

app.listen(port, async () => {
    console.log(`App listen on PORT ${port}`);

    // connect to db
    await connectDB(mongo_uri);

    app.use(express.json());

    app.use("/", routerPageData);
    app.use("/flashcards", routerFlashcards);

});
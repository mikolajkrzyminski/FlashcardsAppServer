import express from "express";
// create expresss aplication
const app = express();

import router from "./routes";

app.use("/", router);

const port = 8000;

app.listen(port, () => console.log(`App listen on PORT ${port}`));
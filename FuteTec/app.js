import express from "express";

const app = express();



app.get("/", (req, res) => {
    res.send("Eita mundo bão!")
})

export default app;

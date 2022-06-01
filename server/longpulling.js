const express = require("express");
const cors = require("cors");
const events = require("events");
const { EventEmitter } = require("stream");

const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-message", ((req, res) => {
    emitter.once("newMessage", (message) => {
        res.json(message);
    })
}));

app.post("/new-message", ((req, res) => {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200);
}));

app.listen(5000, () => console.log(`Server started on port ${PORT}`));
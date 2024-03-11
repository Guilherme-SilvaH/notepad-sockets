import express from 'express'
import cors from 'cors'
import { getRedisInstance } from "./redis";


const app = express();


app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

app.listen(3002, () => {
    console.log("server listening in port 3002");
})



app.post("/api/update-notepad", async (req,res) => {
    const { noteName, noteContent } = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
    }

    const expiry = 60000 * 60 * 24 //24hours

    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expiry)
    return res.status(200).send(noteObj)
});


app.get("/api/get-notepad/:noteName", async(req, res) => {
    const { noteName } = req.params;

    const redisInstance = getRedisInstance();

    try {
        const note = await redisInstance.get(noteName);

        if (note) {
            return res.status(200).send(JSON.parse(note));
        }

        return res.status(404).send();
    } catch (error) {
        console.error("Error retrieving note from Redis:", error);
        return res.status(500).send("Internal Server Error");
    }
});
import express from 'express';
import cors from 'cors';
import { getRedisInstance } from './redis';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(5500, () => {
    console.log('server listening in port 5500');
});

app.post('/api/update-notepad', async (req, res) => {
    const { noteName, noteContent } = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
    };

    const expiry = 60000 * 60 * 24; // 24 hours

    redisInstance.set(noteName, JSON.stringify(noteObj), 'PX', expiry);
    return res.status(200).send(noteObj);
});

app.get('/api/get-notepad/:noteName', async (req, res) => {
    const { noteName } = req.params;

    const redisInstance = getRedisInstance();

    if (typeof noteName === 'string') {
        try {
            const note = await redisInstance.get(noteName);

            if (note !== null) {
                const parsedNote = JSON.parse(note);
                return res.status(200).send(parsedNote);
            }

            return res.status(404).send();
        } catch (error) {
            console.error('Error retrieving or parsing note:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    return res.status(404).send();
});

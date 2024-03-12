import express from 'express'
import cors from 'cors';
import { getRedisInstance } from './redis';
import pusher from './pusher';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(5500, () => {
    console.log('server listening in port 5500');
});

app.post('/api/update-notepad', async (req, res) => {
    const { noteName, noteContent, userId } = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent,
        userId,
    };

    const expiry = 60000 * 60 * 24; // 24 hours

    pusher.trigger(noteName, "updated-note", noteObj)

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


interface UserChannelData {
    id: string;
    name: string;
    // Add any other necessary properties here
}


app.post("/pusher/authorize", async(req,res) => {
    const socketId = req.body.socket_id;
    const user_Id = req.body.user_id;
    const username = req.body.username;
    const channelName = req.body.channel_name;

    const data = {
        user_Id: user_Id,
        user_info: {
            id: user_Id,
            username,
        }


    }


    const authorizedUser = pusher.authorizeChannel(socketId, channelName, )
    res.status(200).send(authorizedUser)
})


app.post("/pusher/authenticate", async(req, res) => {
    const socketId = req.body.socket_id;
    const user_Id = req.body.user_id;
    const username = req.body.username;

    const user: UserChannelData = {
        id: user_Id,
        name: username
    };

    const pusherUser = pusher.authenticateUser(socketId, user);
    return res.status(200).send(pusherUser)
});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("./redis");
const pusher_1 = __importDefault(require("./pusher"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(5500, () => {
    console.log('server listening in port 5500');
});
app.post('/api/update-notepad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteName, noteContent, userId } = req.body;
    const redisInstance = (0, redis_1.getRedisInstance)();
    const noteObj = {
        content: noteContent,
        userId,
    };
    const expiry = 60000 * 60 * 24; // 24 hours
    pusher_1.default.trigger(noteName, "updated-note", noteObj);
    redisInstance.set(noteName, JSON.stringify(noteObj), 'PX', expiry);
    return res.status(200).send(noteObj);
}));
app.get('/api/get-notepad/:noteName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteName } = req.params;
    const redisInstance = (0, redis_1.getRedisInstance)();
    if (typeof noteName === 'string') {
        try {
            const note = yield redisInstance.get(noteName);
            if (note !== null) {
                const parsedNote = JSON.parse(note);
                return res.status(200).send(parsedNote);
            }
            return res.status(404).send();
        }
        catch (error) {
            console.error('Error retrieving or parsing note:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
    return res.status(404).send();
}));
app.post("/pusher/authorize", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    const authorizedUser = pusher_1.default.authorizeChannel(socketId, channelName);
    res.status(200).send(authorizedUser);
}));
app.post("/pusher/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const socketId = req.body.socket_id;
    const user_Id = req.body.user_id;
    const username = req.body.username;
    const user = {
        id: user_Id,
        name: username
    };
    const pusherUser = pusher_1.default.authenticateUser(socketId, user);
    return res.status(200).send(pusherUser);
}));

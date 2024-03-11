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
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log('server listening in port 3003');
});
app.post('/api/update-notepad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteName, noteContent } = req.body;
    const redisInstance = (0, redis_1.getRedisInstance)();
    const noteObj = {
        content: noteContent,
    };
    const expiry = 60000 * 60 * 24; // 24 hours
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

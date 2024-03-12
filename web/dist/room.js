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
const roomNameLabel = document.getElementById("roomNameLabel");
const roomContentTextarea = document.getElementById("notepadContent");
const params = new URLSearchParams(window.location.search);
const roomName = params.get("name");
roomNameLabel.innerText = roomName !== null ? roomName : "Nome da Sala Não Fornecido";
// @ts-ignore
Pusher.logToConsole = true;
roomContentTextarea.addEventListener("keyup", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("change");
    const target = event.target;
    const value = target.value;
    yield fetch(`http://localhost:5500/api/update-notepad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ noteName: roomName, noteContent: value, userId: pusher.sessionID })
    });
}));
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:5500/api/get-notepad/${roomName}`).then(res => res.json());
    roomContentTextarea.value = data.content;
}));
// @ts-ignore
const pusher = new Pusher('1e584492a40c7b198231', {
    cluster: 'us2'
});
if (roomName) {
    const channel = pusher.subscribe(roomName);
    // @ts-ignore
    channel.bind("updated-note", data => {
        console.log({ data });
        if (data.content && data.userId !== pusher.sessionID) {
            roomContentTextarea.value = data.content;
        }
    });
}

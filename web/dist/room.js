"use strict";
const roomNameLabel = document.getElementById("roomNameLabel");
const roomContentTextarea = document.getElementById("notepadContent");
if (roomNameLabel) {
    const params = new URLSearchParams(window.location.search);
    const roomName = params.get("name");
    roomNameLabel.innerText = roomName || '';
}

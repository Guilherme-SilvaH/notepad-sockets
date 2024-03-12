"use strict";
const roomNameInput = document.getElementById("roomName");
const joinRoomButton = document.getElementById("joinRoomButton");
joinRoomButton === null || joinRoomButton === void 0 ? void 0 : joinRoomButton.addEventListener("click", () => {
    if (!roomNameInput.value) {
        console.log("deu erro");
        return;
    }
    window.location.href = `/web/room.html?name=${roomNameInput.value}`;
});

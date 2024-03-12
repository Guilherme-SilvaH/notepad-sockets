"use strict";
const roomNameInput = document.getElementById("roomName");
const joinRoomButton = document.getElementById("joinRoomButton");
;
const usernameImput = document.getElementById("username");
joinRoomButton === null || joinRoomButton === void 0 ? void 0 : joinRoomButton.addEventListener("click", () => {
    if (!roomNameInput.value || !usernameImput.value) {
        console.log("deu erro");
        return;
    }
    const randomNumber = Math.floor(Math.random() * 1000);
    localStorage.setItem("username", usernameImput.value);
    localStorage.setItem("user_id", `${usernameImput.value}-${randomNumber}`);
    window.location.href = `/web/room.html?name=${roomNameInput.value}`;
});

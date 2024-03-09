const roomNameInput = document.getElementById("roomName") as HTMLInputElement;
const joinRoomButton = document.getElementById("joinRoomButton");

joinRoomButton?.addEventListener("click", () => {
    if(!roomNameInput.value){
        console.log("deu erro");
        return;
        
    }

    window.location.href = `/web/room.html?name=${roomNameInput?.value}`;
});
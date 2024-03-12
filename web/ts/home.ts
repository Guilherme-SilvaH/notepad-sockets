const roomNameInput = document.getElementById("roomName") as HTMLInputElement;
const joinRoomButton = document.getElementById("joinRoomButton") as HTMLInputElement;;
const usernameImput = document.getElementById("username")as HTMLInputElement;



joinRoomButton?.addEventListener("click", () => {
    if(!roomNameInput.value || !usernameImput.value){
        console.log("deu erro");
        return;
    }


    const randomNumber = Math.floor(Math.random() * 1000);
    localStorage.setItem("username", usernameImput.value);
    localStorage.setItem("user_id", `${usernameImput.value}-${randomNumber}`)
    window.location.href = `/web/room.html?name=${roomNameInput.value}`;
});
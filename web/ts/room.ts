const roomNameLabel = document.getElementById("roomNameLabel") as HTMLInputElement | null;
const roomContentTextarea = document.getElementById("notepadContent") as HTMLInputElement | null;

if (roomNameLabel) {
    const params = new URLSearchParams(window.location.search);
    const roomName = params.get("name");
    roomNameLabel.innerText = roomName || ''

    roomContentTextarea?.addEventListener("keyup", () => {
       
        
    })
}


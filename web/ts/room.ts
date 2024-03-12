const roomNameLabel = document.getElementById("roomNameLabel") as HTMLAnchorElement;
const roomContentTextarea = document.getElementById("notepadContent") as HTMLTextAreaElement;

const params = new URLSearchParams(window.location.search);
const roomName = params.get("name");
roomNameLabel.innerText = roomName !== null ? roomName : "Nome da Sala Não Fornecido";

roomContentTextarea.addEventListener("keyup", async (event) => {
    console.log("change");
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;

    await fetch(`http://localhost:5500/api/update-notepad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ noteName: roomName, noteContent: value })

    });
});

window.addEventListener("load", async () => {
    const data = await fetch(`http://localhost:5500/api/get-notepad/${roomName}`).then(res => res.json());

    roomContentTextarea.value = data.content;
});

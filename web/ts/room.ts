const roomNameLabel = document.getElementById("roomNameLabel") as HTMLInputElement | null;
const roomContentTextarea = document.getElementById("notepadContent") as HTMLInputElement | null;

if (roomNameLabel) {
    const params = new URLSearchParams(window.location.search);
    const roomName = params.get("name");
    roomNameLabel.innerText = roomName || '';

    roomContentTextarea?.addEventListener("keyup", async (event: Event) => {
        console.log("change");

        if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;

            await fetch(`http://localhost:3001/api/update-notepad`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ noteName: roomName, noteContent: value }),
            });
        }
    });

    window.addEventListener("load", async () => {
        const data = await fetch(`http://localhost:3001/api/get-notepad/${roomName}`);
   
    });
}
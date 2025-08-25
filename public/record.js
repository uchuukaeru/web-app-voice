const audio = document.getElementById("audio");

let mediaRecorder; 
let url;
document.getElementById("rec_start").onclick = async () => {
    digUpButton.disabled = "disabled";
    roastedButton.disabled = "disabled";

    const stream = await navigator.mediaDevices.getUserMedia({audio: true,video: false})
        .then((stream) => {
            return stream;
        })
        .catch((error) => {
            console.error(`error : ${error}`)
            return "error";
        });

    if (stream === "error"){
        return;
    }

    mediaRecorder = new MediaRecorder(stream);
    const chanks = [];

    mediaRecorder.ondataavailable = e => chanks.push(e.data);

    mediaRecorder.onstop = async () => {
        const blob = new Blob(chanks, {type: "audio/webm"});
        const arrayBuffer = await blob.arrayBuffer();
        console.log("recording success!");

        url = URL.createObjectURL(blob);
        audio.src = url;
        digUpButton.disabled = null
    }

    mediaRecorder.onstart = async () => {
        try {
            URL.revokeObjectURL(url);
        } catch (ignored) {}
    }

    mediaRecorder.start();
    console.log("recording start")

    setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }
    }, 30*1000);
}

document.getElementById("rec_stop").onclick = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
}

document.getElementById("rec_delete").onclick = () => {
    try {
        URL.revokeObjectURL(url);
    } catch (ignored) {}
}

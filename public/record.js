const audio = document.getElementById("audio");

let mediaRecorder; 
let objectUrl;
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

    mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm; codecs=opus" });
    const chanks = [];

    mediaRecorder.ondataavailable = e => chanks.push(e.data);

    mediaRecorder.onstop = () => {
        const blob = new Blob(chanks, {type: "audio/webm"});
        console.log("recording success!");

        objectUrl = URL.createObjectURL(blob);
        audio.setAttribute("src", objectUrl);
        digUpButton.disabled = null
    }

    mediaRecorder.onstart = () => {
        try {
            URL.revokeObjectURL(objectUrl);
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

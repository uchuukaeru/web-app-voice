const audio = document.getElementById("audio");
const startButton = document.getElementById("rec_start");
const stopButton = document.getElementById("rec_stop");

let mediaRecorder; 
let objectUrl;
startButton.onclick = async () => {
    digUpButton.disabled = "disabled";
    roastedButton.disabled = "disabled";
    startButton.disabled = "disabled";
    stopButton.disabled = null;
    startButton.innerHTML = "録音中";

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

const waitCanPlay = () => {
    console.log("wait")
    return new Promise(resolve => {
        audio.addEventListener("canplaythrough", () => resolve(), { once: true });
    });
}

stopButton.onclick = async () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
    await waitCanPlay();
    audio.play();
    audio.currentTime = 0;
    digUpButton.disabled = null
    startButton.disabled = null;
    stopButton.disabled = "disabled";
    startButton.innerHTML = "録音開始";
}

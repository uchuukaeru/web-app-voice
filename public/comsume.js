import { postJson } from "./callApi.js";
import { setQrValue } from "./qr.js";

const deletePoteto = () => {
    sellPotetoButton.disabled = "disabled"
    eatPotetoButton.disabled = "disabled"
    try {
        URL.revokeObjectURL(objectUrl);
    } catch (ignored) {}
    audio.removeAttribute("src");
    poteto.value = null;
    poteto.isRoasted = false;
    setQrValue("");
}

sellPotetoButton.onclick = () => {
    const potetoHash = poteto.getAttribute("value")
    deletePoteto();
    const data = {
        "poteto": potetoHash,
    };

    postJson(data, "/api/sell-poteto");
}

eatPotetoButton.onclick = () => {
    deletePoteto();
}
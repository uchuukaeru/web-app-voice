const deletePoteto = () => {
    sellPotetoButton.disabled = "disabled"
    eatPotetoButton.disabled = "disabled"
    try {
        URL.revokeObjectURL(objectUrl);
    } catch (ignored) {}
    audio.removeAttribute("src");
    poteto.value = null;
    poteto.isRoasted = false;
}

sellPotetoButton.onclick = () => {
    const potetoHash = poteto.getAttribute("value")
    deletePoteto();
}

eatPotetoButton.onclick = () => {
    deletePoteto();
}
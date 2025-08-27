import { getJson } from "./callApi.js";
import { qrData } from "./qr.js";

const shelf = document.getElementById("shelf");
const result = await getJson("/api/selling-poteto");
console.log(result)
result.forEach((potetoHash, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "poteto-card");
    div.innerHTML = `
    <div><poteto-hash id="poteto-${index}" value=${potetoHash}></poteto-hash></div>
    <div><qr-code value=${qrData(potetoHash)}></qr-code></div>
    `;

    shelf.appendChild(div);
});

for (let i = 0; i < result.length; i++){
    const poteto = document.getElementById(`poteto-${i}`);
    poteto.isRoasted = true;
}
export const setQrValue = (data) => {
    const qr = document.getElementById("qr-code");
    qr.value = qrData(data);
}

export const qrData = (data) => {
    return JSON.stringify(
        {
            poteto: data,
            url: location.href,
        }
    )
}
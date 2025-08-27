export const setQrValue = (data) => {
    const qr = document.getElementById("qr-code");
    const qrData = {
        potato: data,
        url: location.href,
    };
    qr.value = JSON.stringify(qrData);
}
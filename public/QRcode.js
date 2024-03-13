const qrContentInput = document.getElementById("linkToQRInput");
const QR_CodeForm = document.getElementById("QR_CodeForm");
const QR_Code = document.getElementById("qrcode");

function generateQrCode(qrContent) {
  return new QRCode("qrcode", {
    text: qrContent,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

// Event listener for form submit event
QR_CodeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let qrContent = qrContentInput.value;
  QR_CodeForm.reset();
  QR_Code.innerHTML = "";
  QR_Code = generateQrCode(qrContent);
});

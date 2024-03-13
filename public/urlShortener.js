// Adding Shortening Links To DB -->
const URL_ShortnerForm = document.getElementById("URL_ShortnerForm");
URL_ShortnerForm.addEventListener("submit", longToShortLinks);
const longToShortLinkInput = document.getElementById("longToShortLinkInput");
const linkSuffixInput = document.getElementById("linkSuffixInput");
const URL_ErrorTag = document.getElementById("reportErrTag");
const shortenerQRCode = document.getElementById("shortenerQRCode");

function longToShortLinks(event) {
  event.preventDefault();
  let inputValue = longToShortLinkInput.value.trim();
  let suffixValue = linkSuffixInput.value.trim();
  if (inputValue === "" && suffixValue === "") {
    return;
  }
  let key =
    suffixValue !== "" ? suffixValue : Math.random().toString(36).substring(2);
  let encodedKey = encodeURIComponent(key); // Encode the key
  let docRef = firestore.collection("AnonymousShortenLinks").doc(encodedKey);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        URL_ErrorTag.textContent =
          "This Suffix is already taken; please choose another";
      } else {
        let shortenDocument = {
          Link: encodeURIComponent(inputValue),
          TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        let finalLink = "https://blink-shrink.web.app/?key=" + encodedKey;
        docRef
          .set(shortenDocument)
          .then(function () {
            alert("Success✅ Scroll Down⬇️ For The Link"); // Successful 😮‍💨
          })
          .catch(function (error) {
            alert(
              "Error adding document:",
              error,
              "If this error continues please contact this email: python.aarav@gmail.com"
            );
          });
        document.getElementById("redirectingResultLink").innerHTML = finalLink;
        document
          .getElementById("copyBTN")
          .addEventListener("click", () => copyToClipboard(finalLink));
        document.getElementById("redirectingResultLink").href = finalLink;
        URL_ShortnerForm.reset();
        document
          .getElementById("URL_ShortnerFormResult")
          .classList.add("is-active");
        document.getElementById("scrollToFormResultWhenClicked").click();
        shortenerQRCode.innerHTML = "";
        shortenerQRCode = generateQRCode(finalLink);
        // dont move this line of code or its gonna "return"↩️ and end the code
      }
    })
    .catch((error) => {
      console.debug("Error getting document:", error);
    });
}

function copyToClipboard(varToCopy) {
  navigator.clipboard.writeText(varToCopy);
}

function generateQRCode(qrContent) {
  return new QRCode("shortenerQRCode", {
    text: qrContent,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

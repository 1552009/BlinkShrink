let CheckAgeURL_Form = document.getElementById("CheckAgeURL_Form");
CheckAgeURL_Form.addEventListener("submit", CheckAgeOfTheURL);

function CheckAgeOfTheURL(event) {
  event.preventDefault();
  let URL_ToCheck = document.getElementById("CheckAgeURL_FormInput").value;
  if (URL_ToCheck.includes("?key=")) {
    let index = URL_ToCheck.indexOf("?key=");
    let key = URL_ToCheck.substring(index + 5);
    let docRef = firestore.collection("AnonymousShortenLinks").doc(key);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let fieldValue = doc.data().TimeStamp;
          let timestamp = fieldValue;
          let date = timestamp.toDate();
          // Format the date to your desired format (e.g., "May 15, 2009, at 3:18:51 PM UTC+5:30")
          let formattedDate = date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });

          document.getElementById("urlCreationDate").innerHTML = formattedDate;
          // Update the current URL🌐 with the field value
          document
            .getElementById("CheckAgeFormResult")
            .classList.add("is-active");
        } else {
          document.getElementById("CheckAgeURL_FormErrTag").innerHTML =
            "Invalid Slug";
        }
      })
      .catch(function (error) {
        document.getElementById("CheckAgeURL_FormErrTag").innerHTML =
          "Error getting document:," + error;
      });
  } else {
    document.getElementById("CheckAgeURL_FormErrTag").innerHTML = "Invalid URL";
  }
  CheckAgeURL_Form.reset();
}

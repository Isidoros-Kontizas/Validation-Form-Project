//All Variables
const form = document.querySelector("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const message = document.getElementById("message");

// Listeners with input
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
address.addEventListener("input", validateAddress);
message.addEventListener("input", validateMessage);

// Listeners from blur
username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
address.addEventListener("blur", validateAddress);
message.addEventListener("blur", validateMessage);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkInputs();

  if (
    !username.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !address.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    console.log(
      `
        Username: ${username.value},
        Email-Address: ${email.value},
        Phone-Number: ${phone.value},
        Address: ${address.value},
        Message: ${message.value}
      `
    );
    alert("Thank you for contacting us!");
  }
});

function checkInputs() {
  validateUsername();
  validateEmail();
  validatePhone();
  validateAddress();
  validateMessage();
}

// Function Validate Email
function validateEmail() {
  const emailValue = email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errorTxtEmail = document.querySelector(".error_txt.checkemail");

  if (!emailValue.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (emailValue !== "") {
      errorTxtEmail.innerText = "Enter a valid email";
    } else {
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
    errorTxtEmail.innerText = "";
  }
}

// Function Validate Username
function validateUsername() {
  const usernameValue = username.value.trim();
  const errorTxtUsername = document.querySelector(".error_txt.checkusername");

  if (usernameValue === "") {
    errorTxtUsername.innerText = "Username can't be blank";
    username.classList.add("error");
    username.parentElement.classList.add("error");
  } else if (usernameValue.length < 5) {
    errorTxtUsername.innerText = "Username must be at least 5 characters long";
    username.classList.add("error");
    username.parentElement.classList.add("error");
  } else if (usernameValue.length > 10) {
    errorTxtUsername.innerText = "Username must be at most 10 characters long";
    username.classList.add("error");
    username.parentElement.classList.add("error");
  } else {
    username.classList.remove("error");
    username.parentElement.classList.remove("error");
  }
}

//Function Validate Phone
function validatePhone() {
  const phoneValue = phone.value.trim();
  const errorTxtPhone = document.querySelector(".error_txt.checkphone");

  // Allowing both 0030 and +30 as country code
  const phoneRegex = /^(?:0030|\+30)?\d{10}$/;

  if (phoneValue === "") {
    errorTxtPhone.innerText = "Phone number can't be blank";
    phone.classList.add("error");
    phone.parentElement.classList.add("error");
  } else if (!phoneValue.match(phoneRegex)) {
    errorTxtPhone.innerText =
      "Phone number is not correct. It should start with '0030' or '+30' and be followed by 10 digits.";
    phone.classList.add("error");
    phone.parentElement.classList.add("error");
  } else {
    phone.classList.remove("error");
    phone.parentElement.classList.remove("error");
    errorTxtPhone.innerText = "";
  }
}

//Remove symbols
phone.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // only numbers
  if (value.startsWith("30") && value.length > 2) {
    e.target.value = "+30" + value.slice(2); // makes 30 to +30
  } else {
    e.target.value = value;
  }
});

//Function Validate Address

function validateAddress() {
  const addressValue = address.value.trim();
  const errorTxtAddress = document.querySelector(".error_txt.checkaddress");

  if (!errorTxtAddress) {
    console.error("Error message element for address not found!");
    return;
  }

  const addressRegex = /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ0-9\s,.-]+(\s\d{5})?$/;

  if (addressValue === "") {
    errorTxtAddress.innerText = "Address can't be blank";
    address.classList.add("error");
    address.parentElement.classList.add("error");
  } else if (!addressValue.match(addressRegex)) {
    errorTxtAddress.innerText =
      "Address is not valid. 12 Agiou Dimitriou, 54623";
    address.classList.add("error");
    address.parentElement.classList.add("error");
  } else {
    address.classList.remove("error");
    address.parentElement.classList.remove("error");
    errorTxtAddress.innerText = "";
  }
}

address.addEventListener("keyup", validateAddress);

// Function Validate Message (textarea)
function validateMessage() {
  const messageValue = message.value.trim();
  const errorTxtMessage = document.querySelector(".error_txt.checkmessage");

  if (!errorTxtMessage) {
    console.error("Error message element for message not found!");
    return;
  }

  if (messageValue === "") {
    errorTxtMessage.innerText = "Message can't be blank";
    message.classList.add("error");
    message.parentElement.classList.add("error");
  } else if (messageValue.length < 1 || messageValue.length > 200) {
    errorTxtMessage.innerText =
      "Message should be from 1 to 200 characters length";
    message.classList.add("error");
    message.parentElement.classList.add("error");
  } else {
    message.classList.remove("error");
    message.parentElement.classList.remove("error");
    errorTxtMessage.innerText = "";
  }
}

// Reset errors on blur if field is empty
function resetErrorOnBlur(field, errorSelector) {
  field.addEventListener("blur", function () {
    if (field.value.trim() === "") {
      field.classList.remove("error");
      field.parentElement.classList.remove("error");
      const errorText = document.querySelector(errorSelector);
      if (errorText) errorText.innerText = "";
    } else {
      field.classList.remove("error");
      field.parentElement.classList.remove("error");
    }
  });
}

// Apply reset function to all input fields
resetErrorOnBlur(username, ".error_txt.checkusername");
resetErrorOnBlur(email, ".error_txt.checkemail");
resetErrorOnBlur(phone, ".error_txt.checkphone");
resetErrorOnBlur(address, ".error_txt.checkaddress");
resetErrorOnBlur(message, ".error_txt.checkmessage");

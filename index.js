const submitBtn = document.getElementById("submit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("repeat-password");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal-code");
const modal = document.querySelector("dialog");
const modalOkBtn = document.querySelector("dialog > button");

submitBtn.addEventListener("click", e => {
	e.preventDefault();
	const form = document.querySelector("form");
	const modalText = document.querySelector("dialog > p");

	if (form.checkValidity()) {
		modalText.style.color = "black";
		modalText.textContent = "Congrats! You filled the form correctly!";
		clearForm();
	} else {
		modalText.style.color = "hsl(9, 100%, 64%)";
		modalText.textContent = "Some field(s) are not filled correctly!";
	}
	modal.showModal();
});

modalOkBtn.addEventListener("click", e => {
	modal.close();
});

email.addEventListener("input", e => {
	handleEmail();
});

password.addEventListener("input", e => {
	handlePassword();
});

passwordRepeat.addEventListener("input", e => {
	handlePasswordRepeat();
});

country.addEventListener("input", e => {
	const errorSpan = document.querySelector("#postal-code + span.error");
	postalCode.value = "";
	errorSpan.textContent = "";
});

postalCode.addEventListener("input", e => {
	handlePostalCode();
});

function handleEmail() {
	const errorSpan = document.querySelector("#email + span.error");
	if (email.validity.typeMismatch) {
		email.setCustomValidity("You need to enter the valid e-mail");
		errorSpan.textContent = "You need to enter the valid e-mail";
	} else {
		email.setCustomValidity("");
		errorSpan.textContent = "";
	}
}

function handlePassword() {
	const errorSpan = document.querySelector("#password + span.error");
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\/\[\];'~`+=]).{8,}$/;

	if (password.value.trim() === "") {
		password.setCustomValidity("Invalid value!");
		errorSpan.textContent = "";
		passwordRepeat.setAttribute("disabled", "");
		return false;
	}

	if (!regex.test(password.value)) {
		password.setCustomValidity("Invalid value!");
		errorSpan.textContent =
			"Password needs to be at least 8 characters long, contain 1 small letter, 1 capital letter, 1 digit and 1 special sign";
		passwordRepeat.setAttribute("disabled", "");
		return false;
	} else {
		password.setCustomValidity("");
		errorSpan.textContent = "";
		passwordRepeat.removeAttribute("disabled");
		return true;
	}
}

function handlePasswordRepeat() {
	const errorSpan = document.querySelector("#repeat-password + span.error");

	if (passwordRepeat.value.trim() === "") {
		passwordRepeat.setCustomValidity("Invalid value!");
		errorSpan.textContent = "";
		return false;
	}

	if (passwordRepeat.value !== password.value) {
		passwordRepeat.setCustomValidity("Passwords doesn't match!");
		errorSpan.textContent = "Passwords doesn't match!";
		return false;
	} else {
		passwordRepeat.setCustomValidity("");
		errorSpan.textContent = "";
		return true;
	}
}

function handlePostalCode() {
	const constraints = {
		cz: [/^\d{3}\s\d{2}$/, "Czech postal code pattern is: 123 45"],
		de: [/^\d{5}$/, "German postal code pattern is: 12345"],
		pl: [/^\d{2}-\d{3}$/, "Polish postal code pattern is: 12-345"],
	};
	const errorSpan = document.querySelector("#postal-code + span.error");

	const constraint = constraints[country.value];

	if (!constraint) return false;

	if (postalCode.value.trim() === "") {
		postalCode.setCustomValidity("Invalid value!");
		errorSpan.textContent = "";
		return false;
	}

	const [regex, message] = constraint;

	if (!regex.test(postalCode.value)) {
		postalCode.setCustomValidity("Invalid value!");
		errorSpan.textContent = message;
		return false;
	} else {
		postalCode.setCustomValidity("");
		errorSpan.textContent = "";
		return true;
	}
}

function clearForm() {
	email.value = "";
	country.value = "cz"
	postalCode.value = "";
	password.value = "";
	passwordRepeat.value = "";
}

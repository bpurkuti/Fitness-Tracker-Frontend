const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const age = document.getElementById("age");
const female = document.getElementById("female");
const male = document.getElementById("male");
const custom = document.getElementById("custom");
const customGender = document.getElementById("customgender");
let genderVal;
const submitMsg = document.getElementById("submitmsg");

function signup() {
	if (password.value === confirmPassword.value) {
		if (female.checked) {
			genderVal = female.value;
		} else if (male.checked) {
			genderVal = male.value;
		} else {
			genderVal = customGender.value;
		}
		console.log(genderVal);

		data = {
			firstName: firstName.value,
			lastName: lastName.value,
			username: username.value,
			password: password.value,
			height: height.value,
			weight: weight.value,
			age: age.value,
			gender: genderVal,
		};

		console.log(data);
		submitMsg.innerHTML = JSON.stringify(data);

		// Redirect to login page when we work with endpoints
		// window.location.assign("login.html");
		console.log("Password Match");
	} else {
		submitMsg.innerHTML = "Password Don't Match";
		console.log("Password Don't Match");
	}
}

// Hides and unhidies custom gender option depending on if the checkmark is checked
function showCustom() {
	if (male.checked || female.checked) {
		customGender.classList.add("hide");
	}

	if (custom.checked) {
		customGender.classList.remove("hide");
	}

	console.log(customGender.classList);
}

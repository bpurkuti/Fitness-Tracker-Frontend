const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const age = document.getElementById("age");
const female = document.getElementById("female");
const male = document.getElementById("male");
const custom = document.getElementById("custom");
const customgender = document.getElementById("customgender");
let genderVal;
const submitmsg = document.getElementById("submitmsg");

function signup() {
	if (password.value === confirmpassword.value) {
		if (female.checked) {
			genderVal = female.value;
		} else if (male.checked) {
			genderVal = male.value;
		} else {
			genderVal = customgender.value;
		}
		console.log(genderVal);

		data = {
			firstName: firstname.value,
			lastName: lastname.value,
			username: username.value,
			password: password.value,
			height: height.value,
			weight: weight.value,
			age: age.value,
			gender: genderVal,
		};

		console.log(data);
		submitmsg.innerHTML = JSON.stringify(data);
		// window.location.assign("login.html");
		console.log("Password Match");
	} else {
		submitmsg.innerHTML = "Password Don't Match";
		console.log("Password Don't Match");
	}
}

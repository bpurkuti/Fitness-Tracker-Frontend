const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginbtn");
const loginError = document.getElementById("loginerror");
const radioCheckmark = document.getElementsByName("user");
let userStatus;
let serverUrl = "http://127.0.0.1:5000/";

function dummyLogin() {
	for (let i = 0; i < radioCheckmark.length; i++) {
		if (radioCheckmark[i].checked) {
			userStatus = "Admin";
		} else {
			userStatus = "User";
		}
	}
	console.log(userStatus);
	loginError.innerHTML = userStatus;

	if (userStatus === "Admin") {
		window.location.assign("create_exercise.html");
	} else {
		window.location.assign("dashboard.html");
	}
}

function signUp() {
	window.location.assign("signup.html");
}

function login() {}

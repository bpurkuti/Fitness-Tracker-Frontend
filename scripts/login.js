const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginbtn");
const loginError = document.getElementById("loginerror");
const radioCheckmark = document.getElementsByName("user");
let userStatus;

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
		window.location.assign("view_routine.html");
	}
}

function signup() {
	window.location.assign("signup.html");
}

// function login() {
// 	//Implement session management with token later
// 	//This entire function could be scrapped later

// 	const data = {
// 		username: username.value,
// 		password: password.value,
// 		// if admin is checked, pass Admin, otherwise User
// 		status: adminCheckmark.value ? "Admin" : "User",
// 	};
// 	const config = {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(data),
// 	};

// 	// fetch login endpoint here
// 	const response = await fetch(`http://localhost:5000/employee/login`, config);
// 	console.log(response);
// 	if (response.status === 200) {
// 		//Get user body if response is successful
// 		const body = await response.json();
// 		//Setting localStorage variable to values we need throughout app
// 		localStorage.setItem("currentUser", JSON.stringify(body.username));
// 		//Change page to the landing page for respective user
// 		window.location.assign("landingpage.html");
// 		loginError.innerHTML = "Logged In!";
// 	} else {
// 		loginError.innerHTML = "Password is incorrect!";
// 		pass.value = "";
// 	}
// }

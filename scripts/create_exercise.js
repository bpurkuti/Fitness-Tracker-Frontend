const exerciseName = document.getElementById("exercisename");
const exerciseType = document.getElementById("exercisetype");
const videoLink = document.getElementById("videolink");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const errorMsg = document.getElementById("errormsg");
const successMsg = document.getElementById("successmsg");
const pageTitle = document.getElementById("pagetitle");
let serverUrl = "http://localhost:7000/";

async function createExercise() {
	errorMsg.innerHTML = "";
	successMsg.innerHTML = "";
	const data = {
		session: sessionStorage.getItem("session"),
		exerciseName: exerciseName.value,
		description: description.value,
		type: exerciseType.value,
		videoLink: videoLink.value,
	};

	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	const response = await fetch(`${serverUrl}createExercise`, config);
	if (response.status == 201) {
		successMsg.innerHTML = `Exercise created successfully`;
		exerciseName.value = "";
		videoLink.value = "";
		description.value = "";
	} else {
		let error = await response.text();
		errorMsg.innerHTML = error;
	}
}

async function welcomeTitle() {
	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ session: sessionStorage.getItem("session") }),
	};
	const response = await fetch(`${serverUrl}getAccount`, config);
	const body = await response.json();
	pageTitle.innerHTML = `Welcome ${body["firstName"]} ${body["lastName"]}`;
}

description.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		submitBtn.click();
	}
});
welcomeTitle();

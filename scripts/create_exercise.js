const exerciseName = document.getElementById("exercisename");
const exerciseType = document.getElementById("exercisetype");
const videoLink = document.getElementById("videolink");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const submitMsg = document.getElementById("submitmsg");
let serverUrl = "http://localhost:7000/";

async function createExercise() {
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
		submitMsg.innerHTML = `Exercise created successfully`;
	} else {
		let error = await response.text();
		submitMsg.innerHTML = error;
	}
	exerciseName.value = "";
	videoLink.value = "";
	description.value = "";
}

description.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		submitBtn.click();
	}
});

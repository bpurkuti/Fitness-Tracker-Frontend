const exerciseName = document.getElementById("exercisename");
const exerciseType = document.getElementById("exercisetype");
const videoLink = document.getElementById("videolink");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const submitMsg = document.getElementById("submitmsg");

function createExercise() {
	data = {
		exerciseName: exerciseName.value,
		exerciseType: exerciseType.value,
		videoLink: videoLink.value,
		description: description.value,
	};
	console.log(data);
	submitMsg.innerHTML = JSON.stringify(data);
	exerciseName.value = "";
	videoLink.value = "";
	description.value = "";
}

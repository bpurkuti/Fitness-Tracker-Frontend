const exercisename = document.getElementById("exercisename");
const exercisetype = document.getElementById("exercisetype");
const videolink = document.getElementById("videolink");
const description = document.getElementById("description");
const submitbtn = document.getElementById("submitbtn");
const submitmsg = document.getElementById("submitmsg");

function createExercise() {
	data = {
		exerciseName: exercisename.value,
		exercisetype: exercisetype.value,
		videolink: videolink.value,
		description: description.value,
	};
	console.log(data);
	submitmsg.innerHTML = JSON.stringify(data);
	exercisename.value = "";
	videolink.value = "";
	description.value = "";
}

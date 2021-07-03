const routineName = document.getElementById("routinename");
const inputExcercise = document.getElementById("inputexercise");
const searchExcercise = document.getElementById("searchexercise");
const addExcerciseBtn = document.getElementById("addexercisebtn");
const addedExcerciseList = document.getElementById("addedexerciselist");
const filterByType = document.getElementById("filterbytype");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const submitMsg = document.getElementById("submitmsg");
//Initial List from fetch request
const exerciseList = [];
//Filtereted exerciseList based on Type
let filteredExcerciseList = [];
//Exercises added for the current Routine
let addedExcercises = [];
//Html to be added on the searchbar/dropdown
let exerciseOptions;
let serverUrl = "http://localhost:7000/";

//Only called once per page load
//Calls endpoint GET ALL EXERCISES and puts them into list
async function setExcerciseList() {
	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ session: sessionStorage.getItem("session") }),
	};
	const response = await fetch(`${serverUrl}getAllExercises`, config);
	const exercises = await response.json();

	for (let exercise of exercises) {
		let r = {
			exerciseName: exercise["exerciseName"],
			type: exercise["type"],
		};
		exerciseList.push(r);
	}
	//Calling to set initial exercises in dropdown
	filterExercises("all");
}

function filterExercises(filtertype) {
	//Filters through all exercises based on type: all, strength, cardio, stretch
	if (filtertype === "all") {
		filteredExcerciseList = exerciseList;
	} else if (filtertype === "strength") {
		filteredExcerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "strength"
		);
	} else if (filtertype === "cardio") {
		filteredExcerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "cardio"
		);
	} else if (filtertype === "stretch") {
		filteredExcerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "stretch"
		);
	}
	//Resets the exercises from dropdown list and pushes them with a new filtered list
	exerciseOptions = "";
	for (let i = 0; i < filteredExcerciseList.length; i++) {
		exerciseOptions += `<option value="${filteredExcerciseList[i]["exerciseName"]}">`;
	}
	searchExcercise.innerHTML = exerciseOptions;
}

function createRoutine() {
	data = {
		routineName: routineName.value,
		exercises: addedExcercises,
		description: description.value,
	};

	submitMsg.innerHTML = JSON.stringify(data);
	routineName.value = "";
	description.value = "";
}

function addExcerciseToList() {
	addedExcercises.push(inputExcercise.value);
	inputExcercise.value = "";
	let exercises = "";
	for (let i = 0; i < addedExcercises.length; i++) {
		exercises += `<li>${addedExcercises[i]}</li>`;
	}
	addedExcerciseList.innerHTML = exercises;
	console.log(addedExcercises);
}

filterByType.onchange = () => {
	filterExercises(filterByType.value);
};
setExcerciseList();

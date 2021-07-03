const routineName = document.getElementById("routinename");
const inputExercise = document.getElementById("inputexercise");
const searchExercise = document.getElementById("searchexercise");
const addExerciseBtn = document.getElementById("addexercisebtn");
const addedExerciseList = document.getElementById("addedexerciselist");
const filterDropDown = document.getElementById("filterdropdown");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const submitMsg = document.getElementById("submitmsg");
//Initial List from fetch request
const exerciseList = [];
//Filtereted exerciseList based on Type
let filteredExerciseList = [];
//Exercises added for the current Routine
let addedExercises = [];
//Html to be added on the searchbar/dropdown
let exerciseOptions;
let serverUrl = "http://localhost:7000/";

//Only called once per page load
//Calls endpoint GET ALL EXERCISES and puts them into list
async function setExerciseList() {
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
		filteredExerciseList = exerciseList;
	} else if (filtertype === "strength") {
		filteredExerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "strength"
		);
	} else if (filtertype === "cardio") {
		filteredExerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "cardio"
		);
	} else if (filtertype === "stretch") {
		filteredExerciseList = exerciseList.filter(
			(exercise) => exercise["type"] === "stretch"
		);
	}
	//Resets the exercises from dropdown list and pushes them with a new filtered list
	exerciseOptions = "";
	for (let i = 0; i < filteredExerciseList.length; i++) {
		exerciseOptions += `<option value="${filteredExerciseList[i]["exerciseName"]}">`;
	}
	searchExercise.innerHTML = exerciseOptions;
}

function createRoutine() {
	data = {
		routineName: routineName.value,
		exercises: addedExercises,
		description: description.value,
	};

	submitMsg.innerHTML = JSON.stringify(data);
	routineName.value = "";
	description.value = "";
}

//Function allows user to add selected exercise to their list
//Checks validity of the exercise input by user to the original exercise list
//Allows users to delete exercise they added if they changed their mind
function addExerciseToList() {
	let validExercise = exerciseList.filter(
		(e) => e["exerciseName"] === inputExercise.value
	);
	if (validExercise.length > 0) {
		addedExercises.push(inputExercise.value);

		let exercises = "";
		for (let i = 0; i < addedExercises.length; i++) {
			console.log(`${addedExercises[i]}exercise`, `${addedExercises[i]}btn`);
			exercises += `<div id="${addedExercises[i]}exercise" >${addedExercises[i]}<button id="${addedExercises[i]}btn" onclick="remove('${addedExercises[i]}')">Del</button></div>`;
		}
		addedExerciseList.innerHTML = exercises;
		console.log(addedExercises);
	} else {
		alert("Choose a valid exercise");
	}
	inputExercise.value = "";
}

//Removes the exercise from routine list
//Deletes the element too
function remove(exercise) {
	document.getElementById(`${exercise}btn`).remove();
	document.getElementById(`${exercise}exercise`).remove();
	addedExercises = addedExercises.filter((item) => item !== exercise);
	console.log(addedExercises);
}

//Makes call to filter as wel change the Exercise type from the dropdown
filterDropDown.onchange = () => {
	filterExercises(filterDropDown.value);
};
setExerciseList();

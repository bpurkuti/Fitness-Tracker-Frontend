const routineName = document.getElementById("routinename");
const inputExercise = document.getElementById("inputexercise");
const searchExercise = document.getElementById("searchexercise");
const addExerciseBtn = document.getElementById("addexercisebtn");
const addedExerciseList = document.getElementById("addedexerciselist");
const filterDropDown = document.getElementById("filterdropdown");
const dateScheduled = document.getElementById("datescheduled");
const submitBtn = document.getElementById("submitbtn");
const successMsg = document.getElementById("successmsg");
const errorMsg = document.getElementById("errormsg");

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
			exercises += `<div id="${addedExercises[i]}exercise" >${addedExercises[i]}<button id="${addedExercises[i]}btn" onclick="remove('${addedExercises[i]}')">Del</button></div>`;
		}
		addedExerciseList.innerHTML = exercises;
	} else {
		errorMsg.innerHTML = "Choose a valid exercise";
		successMsg.innerHTML = "";
	}
	inputExercise.value = "";
}

//Creates Routine when we fill out Routine name and add at least 1 exercise to the list
//If routine was successfully created, calls another function to create exercise routines
async function createRoutine() {
	if (addedExercises.length > 0) {
		const date = new Date(dateScheduled.value).getTime() / 1000;
		const data = {
			session: sessionStorage.getItem("session"),
			routineName: routineName.value,
			dateScheduled: date,
		};
		const config = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const response = await fetch(`${serverUrl}createRoutine`, config);
		if (response.status == 201) {
			const body = await response.json();
			sessionStorage.setItem("currRoutineId", body["routineId"]);
			createExerciseRoutine();
		} else {
			let error = await response.text();
			errorMsg.innerHTML = error;
			successMsg.innerHTML = "";
		}
		routineName.value = "";
	} else {
		errorMsg.innerHTML = "Add some exercises to your routine first.";
		successMsg.innerHTML = "";
	}
}

//Creating ExcerciseRoutines here
//Only starts if routine was created first as we need routineId from it
//Loops through each entry in addedExercises and fetches the endpoint to create individual routineExercises
async function createExerciseRoutine() {
	for (let exercise of addedExercises) {
		const data = {
			session: sessionStorage.getItem("session"),
			exerciseName: exercise,
			routineId: sessionStorage.getItem("currRoutineId"),
		};
		const config = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const response = await fetch(`${serverUrl}createRoutineExercise`, config);
		if (response.status == 201) {
			successMsg.innerHTML = "Created Routines and its exercises successfully!";
			errorMsg.innerHTML = "";
		} else {
			errorMsg.innerHTML = "Something went wrong";
			successMsg.innerHTML = "";
		}
		//Removing exercise from list and view
		remove(exercise);
	}
}

//Removes the exercise from routine list
//Deletes the element too
function remove(exercise) {
	document.getElementById(`${exercise}btn`).remove();
	document.getElementById(`${exercise}exercise`).remove();
	addedExercises = addedExercises.filter((item) => item !== exercise);
}

function setDate() {
	//Set the default scheduledDate to current date
	//Setting the minimum date we can select to the current date
	//And max to one year from now
	const currDate = new Date().toDateInputValue();
	dateScheduled.value = currDate;
	dateScheduled.min = currDate;
	dateScheduled.max = new Date(
		new Date().getFullYear() + 1,
		new Date().getMonth(),
		new Date().getDate()
	).toDateInputValue();
}

//Helper function to stripdown date to this format: "07-02-2021". The frontend date selector only takes this format
Date.prototype.toDateInputValue = function () {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
};

//Makes call to filter as wel change the Exercise type from the dropdown
filterDropDown.onchange = () => {
	filterExercises(filterDropDown.value);
};
//Runs onload to setup page
setDate();
setExerciseList();

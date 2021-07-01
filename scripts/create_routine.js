const routineName = document.getElementById("routinename");
const inputExcercise = document.getElementById("inputexcercise");
const searchExcercise = document.getElementById("searchexcercise");
const addExcerciseBtn = document.getElementById("addexcercisebtn");
const addedExcerciseList = document.getElementById("addedexcerciselist");
const filterByType = document.getElementById("filterbytype");
const description = document.getElementById("description");
const submitBtn = document.getElementById("submitbtn");
const submitMsg = document.getElementById("submitmsg");

let excerciseOptions;
const excerciseList = [
	{ name: "Preacher Curls", type: "strength" },
	{ name: "Treadmill", type: "cardio" },
	{ name: "Pullups", type: "strength" },
	{ name: "calf", type: "stretch" },
	{ name: "Benchpress", type: "strength" },
	{ name: "Pushups", type: "strength" },
	{ name: "Ladder", type: "cardio" },
	{ name: "Bike", type: "cardio" },
	{ name: "Leg curls", type: "strength" },
	{ name: "Leg press", type: "strength" },
	{ name: "hamstring", type: "stretch" },
];
let filteredExcerciseList = [];
let addedExcercises = [];

//Theres some filterning going on here atm. Need to change it up depending on how we store excercises
function setExcerciseList(filtertype) {
	excerciseOptions = "";

	if (filtertype === "strength") {
		filteredExcerciseList = excerciseList.filter(
			(excercise) => excercise["type"] === "strength"
		);
	} else if (filtertype === "cardio") {
		filteredExcerciseList = excerciseList.filter(
			(excercise) => excercise["type"] === "cardio"
		);
	} else if (filtertype === "stretch") {
		filteredExcerciseList = excerciseList.filter(
			(excercise) => excercise["type"] === "stretch"
		);
	} else {
		filteredExcerciseList = excerciseList;
	}

	for (let i = 0; i < filteredExcerciseList.length; i++) {
		excerciseOptions += `<option value="${filteredExcerciseList[i]["name"]}">`;
	}

	searchExcercise.innerHTML = excerciseOptions;
}

function createRoutine() {
	data = {
		routineName: routineName.value,
		excercises: addedExcercises,
		description: description.value,
	};

	submitMsg.innerHTML = JSON.stringify(data);
	routineName.value = "";
	description.value = "";
}

function addExcerciseToList() {
	addedExcercises.push(inputExcercise.value);
	inputExcercise.value = "";
	let excercises = "";
	for (let i = 0; i < addedExcercises.length; i++) {
		excercises += `<li>${addedExcercises[i]}</li>`;
	}
	addedExcerciseList.innerHTML = excercises;
	console.log(addedExcercises);
}

filterByType.onchange = () => {
	setExcerciseList(filterByType.value);
};
setExcerciseList(filterByType.value);

const routinename = document.getElementById("routinename");
const inputexcercise = document.getElementById("inputexcercise");
const searchexcercise = document.getElementById("searchexcercise");
const addexcercisebtn = document.getElementById("addexcercisebtn");
const addedexcerciselist = document.getElementById("addedexcerciselist");
const filterbytype = document.getElementById("filterbytype");
const description = document.getElementById("description");
const submitbtn = document.getElementById("submitbtn");
const submitmsg = document.getElementById("submitmsg");

let excerciseoptions;
const excerciselist = [
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
let filteredexcerciselist = [];
let addedexcercises = [];

//Theres some filterning going on here atm. Need to change it up depending on how we store excercises
function setExcerciseList(filtertype) {
	excerciseoptions = "";

	if (filtertype === "strength") {
		filteredexcerciselist = excerciselist.filter(
			(excercise) => excercise["type"] === "strength"
		);
	} else if (filtertype === "cardio") {
		filteredexcerciselist = excerciselist.filter(
			(excercise) => excercise["type"] === "cardio"
		);
	} else if (filtertype === "stretch") {
		filteredexcerciselist = excerciselist.filter(
			(excercise) => excercise["type"] === "stretch"
		);
	} else {
		filteredexcerciselist = excerciselist;
	}

	for (let i = 0; i < filteredexcerciselist.length; i++) {
		excerciseoptions += `<option value="${filteredexcerciselist[i]["name"]}">`;
	}

	searchexcercise.innerHTML = excerciseoptions;
}

function createRoutine() {
	data = {
		routineName: routinename.value,
		excercises: addedexcercises,
		description: description.value,
	};

	submitmsg.innerHTML = JSON.stringify(data);
	routinename.value = "";
	description.value = "";
}

function addExcerciseToList() {
	addedexcercises.push(inputexcercise.value);
	inputexcercise.value = "";
	let excercises = "";
	for (let i = 0; i < addedexcercises.length; i++) {
		excercises += `<li>${addedexcercises[i]}</li>`;
	}
	addedexcerciselist.innerHTML = excercises;
	console.log(addedexcercises);
}

filterbytype.onchange = () => {
	setExcerciseList(filterbytype.value);
};
setExcerciseList(filterbytype.value);

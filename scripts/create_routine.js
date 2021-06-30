const routinename = document.getElementById("routinename");
const inputexcercise = document.getElementById("inputexcercise");
const searchexcercise = document.getElementById("searchexcercise");
const addexcercisebtn = document.getElementById("addexcercisebtn");
const addedexcerciselist = document.getElementById("addedexcerciselist");
const description = document.getElementById("description");
const submitbtn = document.getElementById("submitbtn");
const submitmsg = document.getElementById("submitmsg");

let excerciseoptions = "";
const excerciselist = [
	"Squats",
	"Preacher Curls",
	"Treadmill",
	"Pullups",
	"Benchpress",
	"Pushups",
	"Ladder",
	"Bike",
	"Leg curls",
	"Leg press",
];
let addedexcercises = [];
function onLoad() {
	for (let i = 0; i < excerciselist.length; i++) {
		excerciseoptions += `<option value="${excerciselist[i]}">`;
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
onLoad();

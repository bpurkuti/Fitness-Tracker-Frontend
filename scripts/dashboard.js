const submitMsg = document.getElementById("submitmsg");
const pageTitle = document.getElementById("pagetitle");
const routineList = document.getElementById("routinelist");
let routines = "";
function listRoutines() {
	//Load All Routines
	//run this function on every page reload
	for (let i = 1; i <= 5; i++) {
		routines += `<button class = "rbtn" id = "routine${i}" value = ${i} onclick = "viewRoutine(this.value)">Routine${i}</button>`;
	}
	routineList.innerHTML = routines;
}

//Update current routineId and view_routine page
function viewRoutine(rId) {
	sessionStorage.setItem("currRId", rId);
	window.location.assign("view_routine.html");
}

function welcomeTitle() {
	const fName = "Wolf";
	const lName = "Ryan";
	pageTitle.innerHTML = `Welcome ${fName} ${lName}`;
}

function addRoutine() {
	window.location.assign("create_routine.html");
}
welcomeTitle();
listRoutines();

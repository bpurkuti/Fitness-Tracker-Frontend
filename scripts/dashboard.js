const submitmsg = document.getElementById("submitmsg");
const pageTitle = document.getElementById("pagetitle");
const routinelist = document.getElementById("routinelist");
let routines = "";
function listRoutines() {
	//Load All Routines
	//run this function on every page reload
	for (let i = 1; i <= 5; i++) {
		routines += `<button class = "rbtn" id = "routine${i}" value = ${i} onclick = "viewRoutine(this.value)">Routine${i}</button>`;
	}
	routinelist.innerHTML = routines;
}

//Update current routineId and view_routine page
function viewRoutine(rId) {
	sessionStorage.setItem("currRId", rId);
	window.location.assign("view_routine.html");
}

function welcomeTitle() {
	const fname = "Wolf";
	const lname = "Ryan";
	pageTitle.innerHTML = `Welcome ${fname} ${lname}`;
}

function addRoutine() {
	window.location.assign("create_routine.html");
}
welcomeTitle();
listRoutines();

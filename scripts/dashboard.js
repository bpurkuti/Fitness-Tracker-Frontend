const submitMsg = document.getElementById("submitmsg");
const pageTitle = document.getElementById("pagetitle");
const routineList = document.getElementById("routinelist");
let routines = "";
let routinesList = [];
let serverUrl = "http://localhost:7000/";

async function listRoutines() {
	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ session: sessionStorage.getItem("session") }),
	};
	const response = await fetch(`${serverUrl}getRoutinesForUser`, config);
	const routines = await response.json();

	//I am putting every data in list in case we want to present them with more detail in future
	for (let routine of routines) {
		let r = {
			routineId: routine["routineId"],
			username: routine["username"],
			routineName: routine["routineName"],
			dateScheduled: routine["dateScheduled"],
			dateCompleted: routine["dateCompleted"]
		};
		routinesList.push(r);
	}

	let routineBtns = "";
	for (let i = 0; i < routinesList.length; i++) {
		console.log(routinesList[i].dateCompleted);
		if (routinesList[i].dateCompleted === 0)
			routineBtns += `<button class="routineItem" id="routine${routinesList[i]["routineId"]}" value="${routinesList[i]["routineId"]}" onclick="view_routine(this.value)">${routinesList[i]["routineName"]}</button>`;
	}
	routineBtns += '<button class="newRoutine" id="addroutinebtn" onclick ="addRoutine()">&#10010 <br><br> New Routine</button>';
	routineList.innerHTML = routineBtns;
}

async function welcomeTitle() {
	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ session: sessionStorage.getItem("session") }),
	};
	const response = await fetch(`${serverUrl}getAccount`, config);
	const body = await response.json();
	pageTitle.innerHTML = `Welcome ${body["firstName"]} ${body["lastName"]}`;
}

function view_routine(val) {
	sessionStorage.setItem("currRoutineId", val);
	window.location.assign("view_routine.html");
}

function addRoutine() {
	window.location.assign("create_routine.html");
}
welcomeTitle();
listRoutines();

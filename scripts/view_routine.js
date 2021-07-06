let serverUrl = "http://3.91.177.58:7000/";
let routineExercises = [];
let routineBlock = document.getElementById("routine");
let routineName = document.getElementById("routinename");

function closeActiveExercise(id, routineExercise) {
	let exerciseBlock = document.getElementById(id);
	let html = `<h5 class="blocktitle">${routineExercise.exerciseName}</h5>`;
	html += `<h5 class="status">Complete</h5>`;
	exerciseBlock.innerHTML = html;
}

async function setActiveExercise(id, routineExercise) {
	let config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ exerciseName: routineExercise.exerciseName }),
	};
	let response = await fetch(`${serverUrl}getExercise`, config);
	let exercise = await response.json();
	let exerciseBlock = document.getElementById(id);
	exerciseBlock.innerHTML = `<h5 class="blocktitle">${exercise.exerciseName}</h5>`;
	exerciseBlock.innerHTML += `<h5 class="status">In Progress</h5>`;
	exerciseBlock.innerHTML += `<div>${exercise.description}</div>`;
	exerciseBlock.innerHTML += `<br>`;
	if (exercise.videoLink != 0) {
		exerciseBlock.innerHTML += `<a href=${exercise.videoLink} target="_blank">${exercise.videoLink}</a>`;
		exerciseBlock.innerHTML += `<br>`;
		exerciseBlock.innerHTML += `<br>`;
	}
	if (exercise.type === "cardio" || exercise.type === "stretch") {
		exerciseBlock.innerHTML += `<div><input type="number" id="duration" class="inputfield" placeholder="Duration (seconds)"/><div>`;
		exerciseBlock.innerHTML += `<br>`;
	}
	if (exercise.type === "strength" || exercise.type === "stretch") {
		exerciseBlock.innerHTML += `<div><input type="number" id="reps" class="inputfield" placeholder="Reps"/><div>`;
		exerciseBlock.innerHTML += `<br>`;
	}
	if (exercise.type === "strength") {
		exerciseBlock.innerHTML += `<div><input type="number" id="weight" class="inputfield" placeholder="Weight (lb)"/><div>`;
		exerciseBlock.innerHTML += `<br>`;
	}
	exerciseBlock.innerHTML += `<button id="completeexercisebtn" class="submitbtn">Complete Exercise</button>`;
	exerciseBlock.innerHTML += `<br>`;
	exerciseBlock.innerHTML += `<br>`;
	exerciseBlock.innerHTML += `<div id="errormsg" class="errorfield"></div>`;
	let completeExerciseBtn = document.getElementById("completeexercisebtn");
	completeExerciseBtn.addEventListener("click", async function () {
		let durationInput = document.getElementById("duration");
		let repsInput = document.getElementById("reps");
		let weightInput = document.getElementById("weight");
		if (durationInput !== null) {
			routineExercise.duration = Number(durationInput.value);
		}
		if (repsInput !== null) {
			routineExercise.reps = Number(repsInput.value);
		}
		if (weightInput !== null) {
			routineExercise.weightInput = Number(weightInput.value);
		}
		let erMsg = "";
		if (
			(exercise.type === "cardio" || exercise.type === "stretch") &&
			routineExercise.duration <= 0
		) {
			erMsg += "You must set a valid duration time\n";
		}
		if (
			(exercise.type === "strength" || exercise.type === "stretch") &&
			routineExercise.reps <= 0
		) {
			erMsg += "You must set a valid number of reps\n";
		}
		if (exercise.type === "strength" && routineExercise.weightInput <= 0) {
			erMsg += "You must set a valid weight\n";
		}
		if (erMsg.length > 0) {
			document.getElementById("errormsg").innerHTML = erMsg;
		} else {
			config = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					session: sessionStorage.getItem("session"),
					routineExerciseId: routineExercise.routineExerciseId,
					exerciseName: routineExercise.exerciseName,
					routineId: routineExercise.routineId,
					duration: routineExercise.duration,
					reps: routineExercise.reps,
					weight: routineExercise.weight,
				}),
			};
			const response = await fetch(`${serverUrl}updateRoutineExercise`, config);
			if (response.status === 200) {
				closeActiveExercise(Number(exerciseBlock.id), routineExercise);
				if (Number(exerciseBlock.id) < routineExercises.length - 1)
					setActiveExercise(
						Number(exerciseBlock.id) + 1,
						routineExercises[Number(exerciseBlock.id) + 1]
					);
			} else {
				document.getElementById("errormsg").innerHTML = await response.text();
			}
		}
	});
}

async function getRoutineExercises() {
	let config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			session: sessionStorage.getItem("session"),
			routineId: sessionStorage.getItem("currRoutineId"),
		}),
	};
	let response = await fetch(`${serverUrl}getRoutineById`, config);
	let routine = await response.json();
	routineName.innerHTML = `Start: ${routine.routineName}`;
	response = await fetch(`${serverUrl}getAllExercisesInRoutine`, config);
	let count = 0;
	let newList = [];
	if (response.status === 200) {
		routineExercises = await response.json();
		let activeExerciseSet = -1;
		for (let i = 0; i < routineExercises.length; i++) {
			let routineExercise = routineExercises[i];
			if (
				routineExercise.duration !== 0 ||
				routineExercise.weight !== 0 ||
				routineExercise.reps !== 0
			) {
				let html = `<div class="vforminner" id="${count}" value=${routineExercise.routineExerciseId}>`;
				html += `<h5 class="blocktitle">${routineExercise.exerciseName}</h5>`;
				html += `<h5 class="status">Complete</h5>`;
				html += "</div>";
				routineBlock.innerHTML += html;
				count++;
				newList.push(routineExercise);
			}
		}
		for (let i = 0; i < routineExercises.length; i++) {
			let routineExercise = routineExercises[i];
			if (
				routineExercise.duration === 0 &&
				routineExercise.weight === 0 &&
				routineExercise.reps === 0 &&
				activeExerciseSet === -1
			) {
				routineBlock.innerHTML += `<div class="vforminner" id="${count}" value=${routineExercise.routineExerciseId}></div>`;
				setActiveExercise(String(count), routineExercise);
				activeExerciseSet = i;
				count++;
				newList.push(routineExercise);
				break;
			}
		}
		for (let i = 0; i < routineExercises.length; i++) {
			let routineExercise = routineExercises[i];
			if (
				routineExercise.duration === 0 &&
				routineExercise.weight === 0 &&
				routineExercise.reps === 0 &&
				activeExerciseSet !== i
			) {
				let html = `<div class="vforminner" id="${count}" value=${routineExercise.routineExerciseId}>`;
				html += `<h5 class="blocktitle">${routineExercise.exerciseName}</h5>`;
				html += `<h5 class="status">Upcoming</h5>`;
				html += "</div>";
				routineBlock.innerHTML += html;
				newList.push(routineExercise);
				count++;
			}
		}
		routineExercises = newList;
		routineBlock.innerHTML += `<br>`;
		routineBlock.innerHTML += `<button id="completeroutinebtn" class="submitbtn">Complete Routine</button>`;
		routineBlock.innerHTML += `<br>`;
		routineBlock.innerHTML += `<br>`;
		routineBlock.innerHTML += `<div id="errorblock" class="errorfield"></div>`;
		let completeRoutineBtn = document.getElementById("completeroutinebtn");
		completeRoutineBtn.addEventListener("click", async function () {
			routine.dateCompleted = parseInt(Math.round(Date.now() / 1000));
			console.log(routine.dateCompleted);
			routine.session = sessionStorage.getItem("session");
			config = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(routine),
			};
			const response = await fetch(`${serverUrl}updateRoutine`, config);
			if (response.status === 200) {
				window.location.assign("dashboard.html");
			} else {
				document.getElementById("errorblock").innerHTML = await response.text();
			}
		});
	} else {
		console.log(await response.text());
	}
}

getRoutineExercises();

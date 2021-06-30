const submitmsg = document.getElementById("submitmsg");
const pageTitle = document.getElementById("pagetitle");

function addRoutine() {
	submitmsg.innerHTML = "Added Routine";
}

function welcomeTitle() {
	const fname = "Wolf";
	const lname = "Ryan";
	pageTitle.innerHTML = `Welcome ${fname} ${lname}`;
}

welcomeTitle();

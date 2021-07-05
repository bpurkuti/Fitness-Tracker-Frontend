async function logOut() {
	window.location.assign("login.html");
	sessionStorage.clear();
}

async function home() {
	window.location.assign("dashboard.html");
}

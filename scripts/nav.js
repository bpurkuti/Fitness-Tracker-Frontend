async function logOut() {
	const config = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ session: sessionStorage.getItem("session") }),
	};
	const response = await fetch(`${serverUrl}logoutAccount`, config);
	sessionStorage.clear();
	window.location.assign("login.html");
}

async function gotoHome() {
	window.location.assign("dashboard.html");
}
const nav = document.getElementById("navbar");

function loadNavBar() {
	nav.innerHTML = `
    <div> 
        <a href = "" id = "navhome" class="here" onclick= "home()">Home</a>  
        <a href = "../login.html" id = "navlogout" onclick= "logout()"  >Logout</a>
    </div>
    `;
}

function logout() {
	//Write code to handle logout here
	window.location.assign("login.html");
}

function home() {
	//Write code to handle logout here
	window.location.assign("dashboard.html");
}

loadNavBar();

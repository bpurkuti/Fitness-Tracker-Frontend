const nav = document.getElementById("navbar");
const adminnav = document.getElementById("adminnavbar");
const signupnav = document.getElementById("signupnavbar");

function loadNavBar() {
	if (nav) {
		nav.innerHTML = `
        <div> 
            <a href = "../dashboard.html" id = "navhome" class="here">Home</a>  
            <a href = "../login.html" id = "navlogout" onclick= "logout()"  >Logout</a>
        </div>
        `;
	}

	if (adminnav) {
		adminnav.innerHTML = `
        <div> 
            <a href = "../login.html" id = "navlogout" onclick= "logout()"  >Logout</a>
        </div>
        `;
	}

	if (signupnav) {
		signupnav.innerHTML = `
        <div> 
            <a href = "../login.html" id = "navhome" class="here">Home</a>  
        </div>
        `;
	}
}

function logout() {
	//Write code to handle logout here
	//Clear credentials and invalidate session

	//Remove this when implementing
	window.location.assign("login.html");
}

loadNavBar();

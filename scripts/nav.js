const nav = document.getElementById("navbar");
const adminNav = document.getElementById("adminnavbar");
const signUpNav = document.getElementById("signupnavbar");

function loadNavBar() {
	if (nav) {
		nav.innerHTML = `
        <div> 
            <a href = "../dashboard.html" id = "navhome" class="here">Home</a>  
            <a href = "../login.html" id = "navlogout" onclick= "logOut()"  >Logout</a>
        </div>
        `;
	}

	if (adminNav) {
		adminNav.innerHTML = `
        <div> 
            <a href = "../login.html" id = "navlogout" onclick= "logOut()"  >Logout</a>
        </div>
        `;
	}

	if (signUpNav) {
		signUpNav.innerHTML = `
        <div> 
            <a href = "../login.html" id = "navhome" class="here">Home</a>  
        </div>
        `;
	}
}

function logOut() {
	window.location.assign("login.html");
	sessionStorage.clear();
}

loadNavBar();

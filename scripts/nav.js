const nav = document.getElementById("navbar");

function loadNavBar() {
	nav.innerHTML = `
    <div> 
        <a href = "" id = "navhome" class="here">Home</a>  
        <a href = "../login.html" id = "navlogout" onclick= "logout()"  >Logout</a>
    </div>
    `;
}

function logout() {
	//Write code to handle logout here
	window.location.assign("login.html");
}

loadNavBar();

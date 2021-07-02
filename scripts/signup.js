window.onload = function(){

	let serverUrl = "http://localhost:7000";

	const username = document.getElementById("username");
	const password = document.getElementById("password");
	const firstName = document.getElementById("firstname");
	const lastName = document.getElementById("lastname");
	const gender = document.getElementById("gender");
	const age = document.getElementById("age");
	const height = document.getElementById("height");
	const weight = document.getElementById("weight");

	const loginBtn = document.getElementById("loginbtn");
	const signupBtn = document.getElementById("signupbtn");
	const loginError = document.getElementById("loginerror");

	signupBtn.addEventListener("click", async function(){
        let jsonObject = {};
        jsonObject.username = String(username.value);
        jsonObject.password = String(password.value);
		jsonObject.firstName = String(firstName.value);
		jsonObject.lastName = String(lastName.value);
		jsonObject.gender = String(gender.value);
		jsonObject.age = Number(age.value);
		jsonObject.height = Number(height.value);
		jsonObject.weight = Number(weight.value);
        let response = await fetch(`${serverUrl}/createAccount`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject)
        })
        if (response.status === 201){
            let jsonReply = await response.json();
			sessionStorage.setItem('session', jsonReply.session);
			window.open(`/dashboard.html`, '_self');
        }
        else{
            let error = await response.text();
            loginError.innerHTML = `${error}`;
        }
    })

	loginBtn.addEventListener("click", function(){
		window.open(`/login.html`, '_self');
    })

	username.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	password.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	firstName.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	lastName.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	gender.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	age.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	height.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
	weight.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			signupBtn.click();
		}
	});
}

window.onload = function(){

	let serverUrl = "http://localhost:7000";

	const username = document.getElementById("username");
	const password = document.getElementById("password");
	const firstName = document.getElementById("firstname");
	const lastName = document.getElementById("lastname");
	const loginBtn = document.getElementById("loginbtn");
	const signupBtn = document.getElementById("signupbtn");
	const loginError = document.getElementById("loginerror");

	signupBtn.addEventListener("click", async function(){
        let jsonObject = {};
        jsonObject.username = String(username.value);
        jsonObject.password = String(password.value);
		jsonObject.firstName = String(firstName.value);
		jsonObject.lastName = String(lastName.value);
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
		window.open(`/signup.html`, '_self');
    })
}

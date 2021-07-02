
window.onload = function(){

	let serverUrl = "http://localhost:7000";

	const username = document.getElementById("username");
	const password = document.getElementById("password");
	const loginBtn = document.getElementById("loginbtn");
	const signupBtn = document.getElementById("signupbtn");
	const loginError = document.getElementById("loginerror");

	loginBtn.addEventListener("click", async function(){
        let jsonObject = {};
        jsonObject.username = String(username.value);
        jsonObject.password = String(password.value);
        let response = await fetch(`${serverUrl}/loginAccount`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject)
        })
        if (response.status === 200){
            let jsonReply = await response.json();
			sessionStorage.setItem('session', jsonReply.session);
			let jsonObject = {};
			jsonObject.session = jsonReply.session;
			response = await fetch(`${serverUrl}/getAccount`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jsonObject)
			})
			jsonReply = await response.json();
			if(jsonReply.admin === true)
            	window.open(`/create_exercise.html`, '_self');
			else
				window.open(`/dashboard.html`, '_self');
        }
        else{
            let error = await response.text();
            loginError.innerHTML = `${error}`;
        }
    })

	signupBtn.addEventListener("click", function(){
		window.open(`/signup.html`, '_self');
    })
}

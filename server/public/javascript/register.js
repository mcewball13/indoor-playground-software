async function registerUser(e)  {
    e.preventDefault();

    const username = $("#username-register").val().trim();
    const email = $("#email-register").val().trim();
    const password = $("#password-register").val().trim();


    if (username && email && password) {
        const response = await fetch("/api/users",{
            method: "POST",
            body: JSON.stringify( {
                username: username,
                email: email,
                password: password,
            }),
            headers: { "Content-Type": "application/json"}
        })
        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
}
$("#register-btn").on("click", registerUser);
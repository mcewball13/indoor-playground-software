async function loginUser(e) {
    e.preventDefault();

    const email = $("#email-login").val().trim();
    const password = $("#password-login").val().trim();


    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}

        });
        if (response.ok) {
            document.location.replace('/exercises')
        } else {
            alert(response.statusText)
        }
    }
}
$("#login-btn").on("click", loginUser);
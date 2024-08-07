const loginSection = document.getElementById("login");
const loginTitle = document.getElementById("login-title");
const loginError = document.createElement("p");
loginError.classList.add("login-error");
loginSection.appendChild(loginError);
loginSection.insertBefore(loginError, loginTitle.nextSibling);

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("mdp");

function connectionLogin() {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        //Récupération des données utilisateurs 
        const userMail = emailInput.value.trim();
        const userPass = passInput.value.trim();

        const userData = {
            email: userMail,
            password: userPass
        };

        //Appel à la fonction fetch
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            //Vérification de la réponse
            if (response.ok) {
                const data = await response.json();
                //Stockage du token dans le localStorage
                const token = data.token
                localStorage.setItem("authToken", token);
                //Redirection vers la page d'accueil
                window.location.href = "index.html";
            } else {
                loginError.innerText = "Email et/ou mot de passe incorrect !"
            }
        } catch (error) {
            console.error('Erreur :', error);
            loginError.innerText = "Erreur de connexion"
        }
    });
};

connectionLogin()
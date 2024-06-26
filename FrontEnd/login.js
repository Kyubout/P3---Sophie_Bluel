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
        console.log(userData);

        //Appel à la fonction fetch
        try {
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            //Vérification de la réponse
            if (response.ok) {
                const token = await response.json();
                console.log("Data de l'utilisateur :", token);
                //Stockage du token dans le localStorage
                localStorage.setItem("token", token);
                //Redirection vers la page d'accueil
                window.location.href = "index.html";
            } else {
                alert("Email ou mot de passe incorrect")
            }

        } catch (error) {
            console.error('Erreur :', error);
            alert("Erreur")
        }
    });
};



// response : userId + token à conserver 
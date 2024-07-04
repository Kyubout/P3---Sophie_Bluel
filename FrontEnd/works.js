//Récupération des éléments depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const reponseC = await fetch("http://localhost:5678/api/categories");
const categories = await reponseC.json();

//Eléments figures/figcaption des travaux
function genererWorks(works) {
    const sectionGallery = document.querySelector(".gallery");
    works.forEach(figure => {
        const worksElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;

        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerText = figure.title;

        worksElement.appendChild(imageElement);
        worksElement.appendChild(descriptionElement);
        sectionGallery.appendChild(worksElement);
    });
};

//Boutons filtres
const sectionFiltres = document.querySelector(".filtres");

function genererButton(catId, catName) {
    const btnFilter = document.createElement("button");
    btnFilter.innerText = catName;
    btnFilter.id = catId;
    sectionFiltres.appendChild(btnFilter);

    //Nommer les boutons en fonction de category.name
    btnFilter.addEventListener("click", function () {
        const id = btnFilter.id;
        let categorieObjets = works;

        if (id != 0) {
            categorieObjets = works.filter(function (work) {
                return work.categoryId == id
            });
        };
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(categorieObjets);
    })
};

//Fonction du mode admin
const loginElement = document.getElementById("login-btn");
const btnEditionMode = document.getElementById("admin-btn");
const btnModifier = document.getElementById("edit-works");
const adminBanner = document.querySelector(".admin-mode")

function afficherModeAdmin() {
    //Affichage des nouveaux éléments 
    adminBanner.style.display = "grid";
    btnEditionMode.style.display = "flex";
    btnModifier.style.display = "inline-block";
    loginElement.innerText = "logout";
    //Listener pour la déconnexion
    loginElement.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });
};

//<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>

// Vérification connection
const token = localStorage.getItem("authToken");
if (token !== null) {
    console.log(token);
    afficherModeAdmin()
} else {
    //Appeler la fonction qui génère les boutons 
    //D'abord le bouton "Tous" (qui n'a pas de catégorie précise)
    genererButton(0, "Tous");
    //Et tous les boutons correspondant à une catégorie
    categories.forEach(category => genererButton(category.id, category.name));
    //Listener pour aller à la page de connexion 
    loginElement.addEventListener("click", () => {
        window.location.href = "login.html";
    });
};

//Premier affichage de la page
genererWorks(works);


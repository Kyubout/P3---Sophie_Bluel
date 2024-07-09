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

//Modifications si mode admin
const loginElement = document.getElementById("login-btn");

    //création icone pen-to-square
const editIcon = document.createElement("i");
editIcon.classList.add("fa-solid", "fa-pen-to-square");
editIcon.setAttribute("aria-hidden", "true");

    //création div bannière du mode édition
const header = document.querySelector("header");
const adminBanner = document.createElement("div");
adminBanner.classList.add("admin-mode");

const btnEditionMode = document.createElement("button");
btnEditionMode.id = "admin-btn"; //TODO: Utile ???  
btnEditionMode.classList.add("edit-btn");

    //création bouton modifier
const divEdit = document.querySelector(".edit");
const btnModifier = document.createElement("button");
btnModifier.id = "edit-works"; //TODO: Utile ???? 
btnModifier.classList.add("edit-btn"); 

function afficherModeAdmin() {
    //Affichage des nouveaux éléments 
    header.insertBefore(adminBanner, header.firstChild);
    adminBanner.appendChild(btnEditionMode);
    btnEditionMode.appendChild(editIcon);
    btnEditionMode.innerHTML += " mode édition"

    divEdit.appendChild(btnModifier);
    btnModifier.appendChild(editIcon);
    btnModifier.innerHTML += " modifier"

    loginElement.innerText = "logout";

    //Listener pour la déconnexion
    loginElement.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });
};

//! Vérification de la connection admin et affichage en fonction
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


//! Création de la modale 

//Icones back, close et trash
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark");

const trashIcon = document.createElement("i");
trashIcon.classList.add("fa-solid", "fa-trash");

const backIcon = document.createElement("i");
backIcon.classList.add("fa-solid", "fa-arrow-left");

//Elements de la modale
const modal = document.createElement("aside");
modal.classList.add("modal");
modal.setAttribute("role", "dialog");
modal.style.display = "none";

const modalWrapper = document.createElement("div");
modalWrapper.classList.add("modal-wrapper");

const editGallery = document.createElement("div");
editGallery.classList.add("gallerie-photo");

const closeButton = document.createElement("button");
closeButton.classList.add("close-btn");
closeButton.appendChild(closeIcon);

const modalTitle = document.createElement("h3");

const displayPhoto = document.createElement("div");
displayPhoto.classList.add("display-photo");

const btnAddPhoto = document.createElement("input");
btnAddPhoto.type = "submit";
btnAddPhoto.id = "btn-ajout";
btnAddPhoto.value = "Ajouter une photo";

function openModal() {
    divEdit.appendChild(modal); 
    modal.style.display = null;
    modal.appendChild(modalWrapper);
    modalWrapper.appendChild(editGallery);
    editGallery.appendChild(closeButton);
    modalTitle.innerText = "Galerie photo"
    editGallery.appendChild(modalTitle);
    editGallery.appendChild(displayPhoto);
    editGallery.appendChild(btnAddPhoto);
}




document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        openModal();
    })
});

closeButton.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "none";
});
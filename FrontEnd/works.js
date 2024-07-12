//Récupération des éléments depuis l'API
const response = await fetch("http://localhost:5678/api/works");
let works = await response.json();

const responseC = await fetch("http://localhost:5678/api/categories");
let categories = await responseC.json();

//Eléments figures/figcaption des travaux
function genererWorks(works) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML="";
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

//Icones back et close 
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark");

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

const addWork = document.createElement("div");
addWork.classList.add("add-work");

const closeButton = document.createElement("button");
closeButton.classList.add("close-btn");
closeButton.appendChild(closeIcon);

const backButton = document.createElement("button");
backButton.classList.add("back-btn");
backButton.appendChild(backIcon);

const modalTitle = document.createElement("h3");

const displayPhoto = document.createElement("div");
displayPhoto.classList.add("display-photo");

const btnAddPhoto = document.createElement("input");
btnAddPhoto.type = "submit";
btnAddPhoto.id = "btn-ajout";
btnAddPhoto.value = "Ajouter une photo";

//Formulaire ajout photo
const uploadForm = document.createElement("form");
uploadForm.id = "upload-form";
uploadForm.setAttribute("method", "post");
uploadForm.setAttribute("enctype", "multipart/form-data");

const uploadContainer = document.createElement("label");
uploadContainer.classList.add("upload-container");
uploadContainer.setAttribute("for", "add-img");
uploadForm.appendChild(uploadContainer);

// const imgPreview = document.createElement("img");
// imgPreview.src = "";
// imgPreview.classList.add(img-imgPreview); 
// uploadContainer.appendChild(imgPreview);

const imageIcon = document.createElement("i");
imageIcon.classList.add("fa-regular", "fa-image");
uploadContainer.appendChild(imageIcon);

const labelAddImg = document.createElement("label");
labelAddImg.id = "label-addimg";
labelAddImg.setAttribute("for", "add-img");
labelAddImg.innerText = "+ Ajouter photo";
uploadContainer.appendChild(labelAddImg);

const inputAddImg = document.createElement("input");
inputAddImg.type = "file";
inputAddImg.id = "add-img";
inputAddImg.name = "add-img";
uploadContainer.appendChild(inputAddImg);

const addLimits = document.createElement("p");
addLimits.innerText = "jpg, png : 4mo max";
uploadContainer.appendChild(addLimits);

const UploadTitleLabel = document.createElement("label");
UploadTitleLabel.setAttribute("for", "title");
UploadTitleLabel.innerText = "Titre";
uploadForm.appendChild(UploadTitleLabel);

const uploadTitle = document.createElement("input");
uploadTitle.type = "text"; 
uploadTitle.id = "title";
uploadTitle.name = "title";
uploadTitle.setAttribute("required", "true");
uploadForm.appendChild(uploadTitle);

const UploadCatLabel = document.createElement("label");
UploadCatLabel.setAttribute("for", "category");
UploadCatLabel.innerText = "Catégorie";
uploadForm.appendChild(UploadCatLabel);

const menuCategory = document.createElement("select");
menuCategory.id = "category";
menuCategory.name = "category";
menuCategory.setAttribute("required", "true")
menuCategory.classList.add("menu-category");
uploadForm.appendChild(menuCategory);

const optionInit = document.createElement("option");
optionInit.value = "";
// optionInit.text = "Sélectionnez une catégorie";
menuCategory.appendChild(optionInit);

menuCategory.addEventListener("click", async() => {
    if (menuCategory.options.length === 1) {
    categories.forEach((category) => {
        const optionCategory = document.createElement("option");
        optionCategory.value = category.id;
        optionCategory.text = category.name;
        menuCategory.appendChild(optionCategory);
        })
    } else {
        const selectedOption = menuCategory.options[menuCategory.selectedIndex];
        if (selectedOption.value !== "") {
            categoryName = selectedOption.text;
            categoryId = selectedOption.value;
            //TODO + changer état du bouton de soumission
        }
    };
});

const greyLine = document.createElement("span");
greyLine.classList.add("grey-line");
uploadForm.appendChild(greyLine);

const btnValider = document.createElement("input");
btnValider.type = "submit";
btnValider.id = "btn-valider";
btnValider.value = "Valider";
uploadForm.appendChild(btnValider);

// Fonction affichage modales 1 et 2
function openModal1() {
    divEdit.appendChild(modal); 
    modal.style.display = null;
    modal.appendChild(modalWrapper);
    modalWrapper.appendChild(editGallery);
    editGallery.appendChild(closeButton);
    editGallery.appendChild(modalTitle);
    modalTitle.innerText = "Galerie photo";
    editGallery.appendChild(displayPhoto);
    editGallery.appendChild(btnAddPhoto);
}

function openModal2() {
    divEdit.appendChild(modal); 
    modal.style.display = null;
    modal.appendChild(modalWrapper);
    modalWrapper.appendChild(addWork);
    addWork.appendChild(closeButton);
    addWork.appendChild(backButton);
    addWork.appendChild(modalTitle);
    modalTitle.innerText = "Ajout photo";
    addWork.appendChild(uploadForm);
}

// Récupération et affichages des travaux
function worksModal() {
    displayPhoto.innerHTML = "";
    works.forEach((work) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        imgContainer.setAttribute("id", work.id)
        const imgModal = document.createElement ("img");
        imgModal.classList.add("img-modal");
        imgModal.src = work.imageUrl;
        imgModal.alt = work.title;
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.addEventListener("click", () => deleteWork(work.id));

        displayPhoto.appendChild(imgContainer);
        imgContainer.appendChild(imgModal);
        imgContainer.appendChild(trashButton);
        trashButton.appendChild(trashIcon);
    })
};

//Fonction suppression 
async function deleteWork(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + token
            }
        })
        if (response.ok) { //code 200
            works = works.filter(item => item.id != id);
            worksModal();
            genererWorks(works);
        } else {
            alert("Suppression non autorisée") //code 401
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert("Erreur de connexion") //code 500
    }
};

// Ouverture modale lors du clic sur les boutons Modifier
document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        modalWrapper.innerHTML="";
        openModal1();
        worksModal();
    })
});

//Fermeture modale 
closeButton.addEventListener("click", () => 
    // uploadForm.reset();
    modal.style.display = "none"
);

//Ouverture modale 2 Ajout photo 
btnAddPhoto.addEventListener("click", function(e) {
    modalWrapper.innerHTML="";
    openModal2();
});

//Retour sur modale 1 via backButton
backButton.addEventListener("click", function(e) {
    modalWrapper.innerHTML="";
    openModal1();
});
//Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const reponseC = await fetch("http://localhost:5678/api/categories");
const categories = await reponseC.json();

//Eléments figures/figcaption des travaux
function genererWorks(works) {
    works.forEach(figure => {
        const sectionGallery = document.querySelector(".gallery");
        const worksElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title;

        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerText = figure.title;

        sectionGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(descriptionElement);
    });
};

//Premier affichage de la page
genererWorks(works);


//Boutons filtres
const sectionFiltres = document.querySelector(".filtres");

const btnAll = document.createElement("button");
sectionFiltres.appendChild(btnAll);
btnAll.innerText = "Tous";
btnAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML="";
    genererWorks(works);
});

const btnObjets = document.createElement("button");
sectionFiltres.appendChild(btnObjets);
btnObjets.innerText = "Objets";
//nommer les boutons en fonction de categorie.name 
btnObjets.addEventListener("click", function() {
    const categorieObjets = works.filter(function(works) {
        return works.categoryId === 1
    })
    console.log(categorieObjets);
    document.querySelector(".gallery").innerHTML="";
    genererWorks(categorieObjets);
});

const btnApparts = document.createElement("button");
sectionFiltres.appendChild(btnApparts);
btnApparts.innerText = "Appartements";
btnApparts.addEventListener("click", function() {
    const categorieApparts = works.filter(function(works) {
        return works.categoryId === 2
    })
    console.log(categorieApparts);
    document.querySelector(".gallery").innerHTML="";
    genererWorks(categorieApparts);
});

const btnHR = document.createElement("button");
sectionFiltres.appendChild(btnHR);
btnHR.innerText = "Hôtels & restaurants";
btnHR.addEventListener("click", function() {
    const categorieHR = works.filter(function(works) {
        return works.categoryId === 3
    })
    console.log(categorieHR);
    document.querySelector(".gallery").innerHTML="";
    genererWorks(categorieHR);
});
//Récupération des works depuis l'API
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

//Premier affichage de la page
genererWorks(works);


//Boutons filtres
const sectionFiltres = document.querySelector(".filtres");

function genererButton(catId, catName) {
    const btnFilter = document.createElement("button");
    btnFilter.innerText = catName;
    btnFilter.id = catId;
    sectionFiltres.appendChild(btnFilter);

    //Nommer les boutons en fonction de category.name
    btnFilter.addEventListener("click", function() {
        const id = btnFilter.id;
        let categorieObjets = works;

        if (id!=0){
            categorieObjets = works.filter(function(work) {
                return work.categoryId == id
            });
        };
        document.querySelector(".gallery").innerHTML="";
        genererWorks(categorieObjets);
    })
}

//Appeler la fonction qui génère les boutons 
//D'abord le bouton "Tous" (qui n'a pas de catégorie précise)
genererButton(0, "Tous");
//Et tous les boutons correspondant à une catégorie
categories.forEach (category => genererButton(category.id, category.name));


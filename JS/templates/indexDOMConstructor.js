//Fetch data and create an instanced objects array
const recipeObjectsArray = recipes.map(recipe => new RecipeObject(recipe));

//Create Sets of ingredients, appliances and utensils from fetched data

const ingredientsSet = new Set(recipeObjectsArray.map((recipeObject) => recipeObject.ingredientsOnly).flat());
const appliancesSet = new Set(recipeObjectsArray.map(recipeObject => recipeObject.applianceOnly));
const utensilsSet = new Set(recipeObjectsArray.map(recipeObject => recipeObject.utensilsOnly).flat());

//Build DOM cards

function buildDOMCard(recipes) {
    //DOM element
    const recipeGrid = document.querySelector(".recipe-grid");
    recipeGrid.innerHTML = "";

    //Add built cards to the DOM or error message if there is none
    if (recipes.length == 0) {
        const p = document.createElement("p");
        p.classList.add("no-result");
        p.innerText = "Aucune recette ne correspond à votre recherche";
        recipeGrid.appendChild(p);
    } else {
        recipes.forEach(recipe => {
            const builtCard = recipe.getDOMCard();
            recipeGrid.appendChild(builtCard);
        });
    }
}

//Fill a targeted filter list with data

function fillFilterList(filterList, type) {
    //DOM element
    const ingredientsFilterList = document.querySelector(".ingredients-dropdown-list");
    const appliancesFilterList = document.querySelector(".appliances-dropdown-list");
    const utensilsFilterList = document.querySelector(".utensils-dropdown-list");

    //Fill targeted list with formatted tags
    const formatFilterTag = (filterTag) => filterTag[0].toUpperCase() + filterTag.slice(1);

    filterList.forEach(filter => {
        const li = document.createElement("li");
        li.classList.add("py-2", "d-flex", "justify-content-center", "align-items-center", "rounded");
        li.innerText = formatFilterTag(filter);
        ////Event listener to add an active filter tag
        li.addEventListener("click", () => createFilterTag(li.innerText, type));

        //AppendChild() on the good filter
        switch (type) {
            case "ingredients":
                ingredientsFilterList.appendChild(li);
                break;
            case "appliances":
                appliancesFilterList.appendChild(li);
                break;
            case "utensils":
                utensilsFilterList.appendChild(li);
                break;
            default:
                throw "Unknown filter type !";
        }
    });
}

//Create an active filter tag element

function createFilterTag(value, type) {
    const div = document.createElement("div");
    div.classList.add("py-3", "px-4", "border-0", "rounded", "mb-3", "me-2", "fw-bolder", "d-flex");

    const p = document.createElement("p");
    p.classList.add("m-0", "fw-bold");
    p.innerText = value;

    const crossButton = document.createElement("span");
    crossButton.classList.add("bi", "bi-x-circle", "ms-1");
    //Event listener to remove an active filter tag
    crossButton.addEventListener("click", () => crossButton.parentNode.remove());

    //DOM element
    const ingredientsFilterTags = document.querySelector(".active-ingredients-filters");
    const appliancesFilterTags = document.querySelector(".active-appliances-filters");
    const utensilsFilterTags = document.querySelector(".active-utensils-filters");

    //AppendChild() to the good tag list
    div.appendChild(p);
    div.appendChild(crossButton);

    switch (type) {
        case "ingredients":
            div.classList.add("ingredient-color");
            ingredientsFilterTags.appendChild(div);
            break;
        case "appliances":
            div.classList.add("appliance-color");
            appliancesFilterTags.appendChild(div);
            break;
        case "utensils":
            div.classList.add("utensil-color");
            utensilsFilterTags.appendChild(div);
            break;
        default:
            throw "Unknown filter type !";
    }
}
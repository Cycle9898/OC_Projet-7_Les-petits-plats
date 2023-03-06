//Build DOM cards

function buildDOMCard(recipes) {
    //DOM element
    const recipeGrid = document.querySelector(".recipe-grid");

    //Add built cards to the DOM
    recipes.forEach(recipe => {
        const builtCard = recipe.getDOMCard();
        recipeGrid.appendChild(builtCard);
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

//Fill a targeted filter list with data

function fillFilterList(filterList, type) {
    //DOM element
    const ingredientsFilterList = document.querySelector(".ingredients-dropdown-list");
    const appliancesFilterList = document.querySelector(".appliances-dropdown-list");
    const utensilsFilterList = document.querySelector(".utensils-dropdown-list");

    //Fill targeted list
    filterList.forEach(filter => {
        const li = document.createElement("li");
        li.innerText = filter;
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

//Event listeners on filter buttons to toggle filter lists visibility

const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => button.addEventListener("click", () => {
    button.style.display = "none";
    button.nextElementSibling.style.display = "block";
    button.nextElementSibling.querySelector("input").focus();
}));

const closeFilterButtons = document.querySelectorAll(".filter-buttons .bi-chevron-up");
closeFilterButtons.forEach(button => button.addEventListener("click", () => {
    button.closest(".dropdown-list-container").style.display = "none";
    button.previousElementSibling.value = "";
    button.closest(".dropdown-list-container").previousElementSibling.style.display = "block";
}));

document.addEventListener("click", (event) => {
    const allDropdowns = document.querySelectorAll(".filter-buttons > .dropdown");
    allDropdowns.forEach(dropdown => {
        if (dropdown.querySelector(".dropdown-list-container").style.display == "block" && (event.target.closest(".filter-buttons > .dropdown") != dropdown)) {
            dropdown.querySelector(".dropdown-list-container").style.display = "none";
            dropdown.querySelector("input").value = "";
            dropdown.querySelector("button").style.display = "block";
        }
    });
});

//Main function

function init() {
    //fetch data, create an instanced objects array and build DOM cards on homepage
    const recipeObjectsArray = recipes.map(recipe => new RecipeObject(recipe));
    buildDOMCard(recipeObjectsArray);

    //Create Sets of formatted ingredients, appliances and utensils from fetched data
    const formatFilterTag = (filterTag) => filterTag[0].toUpperCase() + filterTag.toLowerCase().slice(1);

    const ingredientsSet = new Set(recipes.map((recipe) => recipe.ingredients).flat().map(ingredientObject => formatFilterTag(ingredientObject.ingredient)));
    const appliancesSet = new Set(recipes.map(recipe => formatFilterTag(recipe.appliance)));
    const utensilsSet = new Set(recipes.map(recipe => recipe.ustensils).flat().map(utensil => formatFilterTag(utensil)));

    //Fill filter lists
    fillFilterList(ingredientsSet, "ingredients");
    fillFilterList(appliancesSet, "appliances");
    fillFilterList(utensilsSet, "utensils");
}

init();
//Fetch data and create an instanced objects array

const recipeObjectsArray = recipes.map(recipe => new RecipeObject(recipe));

//Build DOM cards

function buildDOMCard(recipes) {
    //DOM element
    const recipeGrid = document.querySelector(".recipe-grid");
    recipeGrid.innerHTML = "";

    //Add built cards to the DOM or error message if there is none
    if (recipes.length === 0) {
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

//Emptying filter lists

function emptyFilterLists() {
    //DOM elements
    const ingredientsFilterList = document.querySelector(".ingredients-dropdown-list");
    const appliancesFilterList = document.querySelector(".appliances-dropdown-list");
    const utensilsFilterList = document.querySelector(".utensils-dropdown-list");

    //Emptying DOM elements
    ingredientsFilterList.innerHTML = "";
    appliancesFilterList.innerHTML = "";
    utensilsFilterList.innerHTML = "";

}

//Fill a targeted filter list with data

function fillFilterList(filterList, type) {
    //DOM elements
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
        li.addEventListener("click", () => isFilterTagNeeded(li.innerText, type));

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

//Check if a filter tag is already active or need to be added

function isFilterTagNeeded(value, type) {
    const createActiveFilter = () => {
        createFilterTag(value, type);
    };

    switch (type) {
        case "ingredients":
            const activeIngredientsTags = Array.from(document.querySelectorAll(".active-ingredients-filters div p")).map(tag => tag.innerText.toLowerCase());

            if (!activeIngredientsTags.includes(value.toLowerCase())) {
                createActiveFilter();
            }
            break;
        case "appliances":
            const activeApplianceTag = document.querySelector(".active-appliances-filters div p");

            if (!activeApplianceTag) {
                createActiveFilter();
            }
            break;
        case "utensils":
            const activeUtensilsTags = Array.from(document.querySelectorAll(".active-utensils-filters div p")).map(tag => tag.innerText.toLowerCase());

            if (!activeUtensilsTags.includes(value.toLowerCase())) {
                createActiveFilter();
            }
            break;
        default:
            throw "Unknown filter type !";
    }
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
    crossButton.addEventListener("click", () => {
        crossButton.parentNode.remove();
    });

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

//Event listeners on filter buttons to toggle filters lists visibility

//open filter tags list
const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("hidden");
    button.nextElementSibling.classList.toggle("hidden");
    button.nextElementSibling.querySelector("input").focus();
}));

//close filter tags list
const closeFilterButtons = document.querySelectorAll(".filter-buttons .bi-chevron-up");
closeFilterButtons.forEach(button => button.addEventListener("click", () => {
    button.closest(".dropdown-list-container").classList.toggle("hidden");
    button.previousElementSibling.value = "";
    button.closest(".dropdown-list-container").querySelectorAll("ul > li").forEach(li => li.classList.remove("hidden"));
    button.closest(".dropdown-list-container").previousElementSibling.classList.toggle("hidden");
}));

//close filter tags list when clicked outside of it
document.addEventListener("click", (event) => {
    const allDropdowns = document.querySelectorAll(".filter-buttons > .dropdown");
    allDropdowns.forEach(dropdown => {
        if (!dropdown.querySelector(".dropdown-list-container").classList.contains("hidden") && (event.target.closest(".filter-buttons > .dropdown") != dropdown)) {
            dropdown.querySelector(".dropdown-list-container").classList.toggle("hidden");
            dropdown.querySelector("input").value = "";
            dropdown.querySelectorAll("ul > li").forEach(li => li.classList.remove("hidden"));
            dropdown.querySelector("button").classList.toggle("hidden");
        }
    });
});

//Main function to display recipe cards and filters lists

function init(recipeArray) {
    //Build recipe cards on main page from data
    buildDOMCard(recipeArray);

    //Create Sets of ingredients, appliances and utensils from data

    const ingredientsSet = new Set(recipeArray.map((recipeObject) => recipeObject.ingredientsOnly).flat());
    const appliancesSet = new Set(recipeArray.map(recipeObject => recipeObject.applianceOnly));
    const utensilsSet = new Set(recipeArray.map(recipeObject => recipeObject.utensilsOnly).flat());

    //Fill empty filter lists with previous Sets
    emptyFilterLists();

    fillFilterList(ingredientsSet, "ingredients");
    fillFilterList(appliancesSet, "appliances");
    fillFilterList(utensilsSet, "utensils");
}

init(recipeObjectsArray);
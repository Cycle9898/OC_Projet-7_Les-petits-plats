//Format any string into Unicode normalized (Canonical Decomposition form) without spaces string

function formatText(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '');
}

//Apply all active filters on a given recipes array

function applyActiveFilters(recipeArray) {
    const filteredRecipeArray = recipeArray;

    //Check if there are active ingredients filter tags and update the array
    const activeIngredientsTags = Array.from(document.querySelectorAll(".active-ingredients-filters div p")).map(tag => tag.innerText.toLowerCase());

    if (activeIngredientsTags.length > 0) {
        activeIngredientsTags.forEach(tag => {
            const newArray = filteredRecipeArray.filter(recipe => recipe.ingredientsOnly.some(ingredients => ingredients === tag));
            filteredRecipeArray.splice(0, filteredRecipeArray.length, ...newArray);
        });
    }

    //Check if there is an active appliance filter tag and update the array
    const activeApplianceTag = document.querySelector(".active-appliances-filters div p");
    if (activeApplianceTag) {
        const newArray = filteredRecipeArray.filter(recipe => recipe.applianceOnly === activeApplianceTag.innerText.toLowerCase());
        filteredRecipeArray.splice(0, filteredRecipeArray.length, ...newArray);
    }

    //Check if there are active utensils filter tags and update the array
    const activeUtensilsTags = Array.from(document.querySelectorAll(".active-utensils-filters div p")).map(tag => tag.innerText.toLowerCase());

    if (activeUtensilsTags.length > 0) {
        activeUtensilsTags.forEach(tag => {
            const newArray = filteredRecipeArray.filter(recipe => recipe.utensilsOnly.some(utensils => utensils === tag));
            filteredRecipeArray.splice(0, filteredRecipeArray.length, ...newArray);
        });
    }

    return filteredRecipeArray;
}

//Check if the search bar is used and update the interface accordingly

function checkSearchBar(recipeArray) {
    const searchBar = document.querySelector(".search-form input");

    if (searchBar.value.length >= 3) {
        const text = formatText(searchBar.value.toLowerCase());

        const filteredRecipeArray = recipeArray
            .filter(recipeObject => formatText(recipeObject.formattedName).includes(text) ||
                recipeObject.ingredientsOnly.some(ingredient => formatText(ingredient).includes(text)) ||
                formatText(recipeObject.fullDescription).includes(text));

        init(filteredRecipeArray);
    } else {
        init(recipeArray);
    }
}

//Main search function

function globalSearch() {
    //Copy of recipeObjectsArray
    const copyOfRecipeObjectsArray = recipeObjectsArray.map(recipe => recipe);

    //Check if there are active filter tags and apply them
    const activeFiltersOnCopiedArray = applyActiveFilters(copyOfRecipeObjectsArray);

    //Check if the search bar is used and update the interface accordingly
    checkSearchBar(activeFiltersOnCopiedArray);
}

//Event listeners

const searchBar = document.querySelector(".search-form input");
searchBar.addEventListener("input", globalSearch);

//Search in filter lists

function filterSearch(event) {
    const text = formatText(event.target.value).toLowerCase();

    const filterListArray = Array.from(event.target.parentNode.parentNode.querySelectorAll("ul > li"));
    filterListArray.forEach(filterTag => filterTag.classList.add("hidden"));

    const filteredArray = filterListArray.filter(filterTag => formatText(filterTag.innerText).toLowerCase().includes(text));
    filteredArray.forEach(filterTag => filterTag.classList.remove("hidden"));
}
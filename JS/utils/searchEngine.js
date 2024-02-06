// Create alias for init function

const updateDOM = init;

//Format any string into Unicode normalized (Canonical Decomposition form), without spaces, string

function formatText(string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s/g, "");
}

//Apply all active filters on a given recipes array

function applyActiveFilters(recipeArray) {
	//Array that contains test functions
	const conditionsArray = [];

	//Check if there are active ingredients filter tags and update the array with corresponding test functions
	const activeIngredientsTags = Array.from(
		document.querySelectorAll(".active-ingredients-filters div p")
	).map(tag => tag.innerText.toLowerCase());

	if (activeIngredientsTags.length > 0) {
		activeIngredientsTags.forEach(tag => {
			conditionsArray.push(recipe =>
				recipe.ingredientsOnly.some(ingredient => ingredient === tag)
			);
		});
	}

	//Check if there is an active appliance filter tag and update the array with corresponding test function
	const activeApplianceTag = document.querySelector(
		".active-appliances-filters div p"
	);

	if (activeApplianceTag) {
		conditionsArray.push(
			recipe =>
				recipe.applianceOnly ===
				activeApplianceTag.innerText.toLowerCase()
		);
	}

	//Check if there are active utensils filter tags and update the array with corresponding test functions
	const activeUtensilsTags = Array.from(
		document.querySelectorAll(".active-utensils-filters div p")
	).map(tag => tag.innerText.toLowerCase());

	if (activeUtensilsTags.length > 0) {
		activeUtensilsTags.forEach(tag => {
			conditionsArray.push(recipe =>
				recipe.utensilsOnly.some(utensil => utensil === tag)
			);
		});
	}

	//Test all recipes with every test functions and return a filtered recipe array
	return recipeArray.filter(recipe =>
		conditionsArray.every(condition => condition(recipe))
	);
}

//Check if the search bar is used and update the interface accordingly

function checkSearchBar(recipeArray) {
	//DOM element
	const searchBar = document.querySelector(".search-form input");

	if (searchBar.value.length >= 3) {
		//Formatted search term
		const text = formatText(searchBar.value.toLowerCase());

		//Utility functions for search
		const isTextIncludedInSentence = sentence =>
			formatText(sentence).includes(text);
		const isTextInIngredientsArray = ingredientsArray =>
			ingredientsArray.some(ingredient =>
				formatText(ingredient).includes(text)
			);

		//Search
		const filteredRecipeArray = recipeArray.filter(
			recipe =>
				isTextIncludedInSentence(recipe.formattedName) ||
				isTextInIngredientsArray(recipe.ingredientsOnly) ||
				isTextIncludedInSentence(recipe.fullDescription)
		);

		//Update interface
		updateDOM(filteredRecipeArray);
	} else {
		updateDOM(recipeArray);
	}
}

//Main search function

function globalSearch() {
	//From recipeObjectArray, check if there are active filter tags and apply them
	const activeFiltersOnRecipeArray = applyActiveFilters(recipeObjectsArray);

	//Check if the search bar is used and update the interface accordingly
	checkSearchBar(activeFiltersOnRecipeArray);
}

//Event listener on search bar

const searchBar = document.querySelector(".search-form input");
searchBar.addEventListener("input", globalSearch);

//Search in filter lists

function filterSearch(event) {
	//Formatted search term
	const text = formatText(event.target.value).toLowerCase();

	//Hide all filter tags
	const filterListArray = Array.from(
		event.target.parentNode.parentNode.querySelectorAll("ul > li")
	);
	filterListArray.forEach(filterTag => filterTag.classList.add("hidden"));

	//Search and display only found filter tags
	const filteredArray = filterListArray.filter(filterTag =>
		formatText(filterTag.innerText).toLowerCase().includes(text)
	);
	filteredArray.forEach(filterTag => filterTag.classList.remove("hidden"));
}

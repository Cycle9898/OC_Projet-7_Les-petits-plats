class RecipeObject {
	constructor(recipe) {
		this._id = recipe.id;
		this._name = recipe.name;
		this._servings = recipe.servings;
		this._ingredients = recipe.ingredients;
		this._time = recipe.time;
		this._description = recipe.description;
		this._appliance = recipe.appliance;
		this._utensils = recipe.ustensils;
	}

	get recipeName() {
		return this._name;
	}

	get time() {
		return this._time + " min";
	}

	get shortDescription() {
		if (this._description.length > 170) {
			return this._description.slice(0, 169) + "...";
		} else {
			return this._description;
		}
	}

	get formattedName() {
		return this._name.toLowerCase();
	}

	get fullDescription() {
		return this._description.toLowerCase();
	}

	get ingredientsOnly() {
		return this._ingredients.map(ingredients =>
			ingredients.ingredient.toLowerCase()
		);
	}

	get applianceOnly() {
		return this._appliance.toLowerCase();
	}

	get utensilsOnly() {
		return this._utensils.map(utensil => utensil.toLowerCase());
	}

	getIngredientsList() {
		//Create an unordered list of ingredients, quantities and units
		const ingredientsUl = document.createElement("ul");

		this._ingredients.forEach(ingredientDetails => {
			//Test if ingredientDetails has quantity and unit properties
			const quantity = () => {
				if ("quantity" in ingredientDetails) {
					return ": " + ingredientDetails.quantity;
				} else {
					return "";
				}
			};

			const unit = () => {
				if ("unit" in ingredientDetails) {
					return " " + ingredientDetails.unit;
				} else {
					return "";
				}
			};

			const ingredientLi = document.createElement("li");

			const ingredientSpan = document.createElement("span");
			ingredientSpan.classList.add("fw-bolder", "ingredient-name");
			ingredientSpan.innerText = ingredientDetails.ingredient;

			const quantitySpan = document.createElement("span");
			quantitySpan.classList.add("ingredient-quantity");
			quantitySpan.innerText = quantity() + unit();

			ingredientLi.appendChild(ingredientSpan);
			ingredientLi.appendChild(quantitySpan);
			ingredientsUl.appendChild(ingredientLi);
		});
		return ingredientsUl;
	}

	getDOMCard() {
		//Build card
		const article = document.createElement("article");
		article.classList.add("card", "border-0");

		const imgDiv = document.createElement("div");
		imgDiv.classList.add("bg-secondary", "img-container", "rounded-top");

		const cardBody = document.createElement("div");
		cardBody.classList.add(
			"card-body",
			"bg-dark",
			"bg-opacity-10",
			"rounded-bottom"
		);

		const rowDiv = document.createElement("div");
		rowDiv.classList.add("row");

		const titleName = document.createElement("h2");
		titleName.classList.add("card-title", "col-8", "fw-normal");
		titleName.innerText = this.recipeName;

		const titleTime = document.createElement("p");
		titleTime.classList.add(
			"recipe-time",
			"col-4",
			"d-flex",
			"flex-row-reverse",
			"fw-bolder"
		);
		titleTime.innerText = this.time;

		const clockLogo = document.createElement("span");
		clockLogo.classList.add("bi", "bi-clock", "me-2", "fw-bolder");

		const ingredientsUl = this.getIngredientsList();
		ingredientsUl.classList.add("col", "ingredients-list");

		const descriptionP = document.createElement("p");
		descriptionP.classList.add("col", "recipe-description");
		descriptionP.innerText = this.shortDescription;

		//All appendChild()
		titleTime.appendChild(clockLogo);
		rowDiv.appendChild(titleName);
		rowDiv.appendChild(titleTime);
		rowDiv.appendChild(ingredientsUl);
		rowDiv.appendChild(descriptionP);
		cardBody.appendChild(rowDiv);
		article.appendChild(imgDiv);
		article.appendChild(cardBody);

		return article;
	}
}

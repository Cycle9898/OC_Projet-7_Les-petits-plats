//Event listeners on filter buttons to toggle filter lists visibility

const filterButtons = document.querySelectorAll(".filter-buttons button");
filterButtons.forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("hidden");
    button.nextElementSibling.classList.toggle("hidden");
    button.nextElementSibling.querySelector("input").focus();
}));

const closeFilterButtons = document.querySelectorAll(".filter-buttons .bi-chevron-up");
closeFilterButtons.forEach(button => button.addEventListener("click", () => {
    button.closest(".dropdown-list-container").classList.toggle("hidden");
    button.previousElementSibling.value = "";
    button.closest(".dropdown-list-container").previousElementSibling.classList.toggle("hidden");
}));

document.addEventListener("click", (event) => {
    const allDropdowns = document.querySelectorAll(".filter-buttons > .dropdown");
    allDropdowns.forEach(dropdown => {
        if (!dropdown.querySelector(".dropdown-list-container").classList.contains("hidden") && (event.target.closest(".filter-buttons > .dropdown") != dropdown)) {
            dropdown.querySelector(".dropdown-list-container").classList.toggle("hidden");
            dropdown.querySelector("input").value = "";
            dropdown.querySelector("button").classList.toggle("hidden");
        }
    });
});

//Main function

function init() {
    //Build DOM cards with fetched data on main page
    buildDOMCard(recipeObjectsArray);

    //Fill filter lists with fetched data
    fillFilterList(ingredientsSet, "ingredients");
    fillFilterList(appliancesSet, "appliances");
    fillFilterList(utensilsSet, "utensils");
}

init();
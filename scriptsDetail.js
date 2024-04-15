document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('index')) {
        const index = parseInt(urlParams.get('index'));
        if (!isNaN(index)) {
            if (index > 49) {
                window.location.href = '404.html'; // Redirige vers la page 404
            } else {
                displayRecipeWithIndex(index);
            }
        } else {
            console.error('Invalid index parameter');
        }
    } else {
        console.error('Index parameter not found in URL');
    }
});

function displayRecipeWithIndex(index) {
    fetch('https://dummyjson.com/recipes?skip=0&limit=50')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dataRecipes = data.recipes;
            if (index >= 0 && index < dataRecipes.length) {
                const recipe = dataRecipes[index];

                document.getElementById("recipe-image").src = recipe.image;
                document.getElementById("recipe-title").innerText = recipe.name;

                const ingredientsList = document.getElementById("ingredient-list");
                ingredientsList.innerHTML = "";
                recipe.ingredients.forEach(function (ingredient) {
                    const li = document.createElement("li");
                    li.innerText = ingredient;
                    ingredientsList.appendChild(li);
                });

                const instructionsList = document.getElementById("instructions-list");
                instructionsList.innerHTML = "";
                recipe.instructions.forEach(function (instruction, index) {
                    const li = document.createElement("li");
                    li.innerText = instruction;
                    instructionsList.appendChild(li);
                });

                // Affichage des informations supplémentaires
                document.getElementById("prep-time").innerText = recipe.prepTimeMinutes;
                document.getElementById("cook-time").innerText = recipe.cookTimeMinutes;
                document.getElementById("servings").innerText = recipe.servings;
                document.getElementById("difficulty").innerText = recipe.difficulty;
                document.getElementById("cuisine").innerText = recipe.cuisine;
                document.getElementById("calories").innerText = recipe.caloriesPerServing;
                document.getElementById("rating").innerText = recipe.rating;
                document.getElementById("review-count").innerText = recipe.reviewCount;
                document.getElementById("meal-type").innerText = recipe.mealType.join(", ");
            } else {
                console.error('Invalid index');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

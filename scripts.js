document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('search');
    let dataRecipes = []; // Stocker les recettes pour utilisation ultérieure

    fetch('https://dummyjson.com/recipes?skip=0&limit=50')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            dataRecipes = data.recipes; 

            displayRandomRecipes(dataRecipes);
            
            displayRecipes(dataRecipes);

            
            displayCarouselItems(dataRecipes);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    
    inputElement.addEventListener('input', () => {
        
        const searchValue = inputElement.value.toLowerCase();
        console.log(searchValue);

       
        const filteredRecipes = dataRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue));

        
        displayRecipes(filteredRecipes);
        displayCarouselItems(filteredRecipes);
    });
});
function displayRecipes(recipes) {
    const tbody = document.getElementById('basicTableBody');
    tbody.innerHTML = ''; 

    recipes.forEach((recipe, index) => {
        
        const recipeRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const ratingCell = document.createElement('td');
        const prepTimeCell = document.createElement('td');
        const difficultyCell = document.createElement('td');
        const cuisineCell = document.createElement('td');
        const mealTypeCell = document.createElement('td');
        const otherInfoCell = document.createElement('td');

        nameCell.textContent = recipe.name;

        // Calcul de la note moyenne
        const averageRating = calculateAverageRating(recipe);
        ratingCell.textContent = `Note: ${recipe.rating} (Moyenne: ${averageRating})`;

        // Affichage de l'icône de temps de préparation
        const prepTimeIcon = document.createElement('i');
        prepTimeIcon.classList.add(recipe.prepTimeMinutes <= 30 ? 'text-success' : 'text-danger');
        prepTimeIcon.textContent = recipe.prepTimeMinutes <= 30 ? '⏱️' : '⏲️';
        prepTimeCell.appendChild(prepTimeIcon);
        prepTimeCell.appendChild(document.createTextNode(`${recipe.prepTimeMinutes} minutes`));

        // Affichage de la difficulté
        difficultyCell.textContent = recipe.difficulty;
        difficultyCell.classList.add('text-' + (recipe.difficulty.toLowerCase() === 'easy' ? 'success' : (recipe.difficulty.toLowerCase() === 'medium' ? 'warning' : 'danger')));

        // Affichage de la cuisine
        cuisineCell.textContent = recipe.cuisine;

        // Affichage du type de repas
        mealTypeCell.textContent = recipe.mealType.join(', ');

        // Création d'un lien pour les instructions de la recette
        const instructionsLink = document.createElement('a');
        instructionsLink.textContent = 'Voir les instructions';
        instructionsLink.href = `detail.html?index=${index}`; // Construire le lien avec le paramètre index
        
        otherInfoCell.appendChild(instructionsLink);

        recipeRow.appendChild(nameCell);
        recipeRow.appendChild(ratingCell);
        recipeRow.appendChild(prepTimeCell);
        recipeRow.appendChild(difficultyCell);
        recipeRow.appendChild(cuisineCell);
        recipeRow.appendChild(mealTypeCell);
        recipeRow.appendChild(otherInfoCell);

        tbody.appendChild(recipeRow);
    });
}

function calculateAverageRating(recipe) {
    
    if (recipe.reviewCount > 0) {
        return (recipe.rating / recipe.reviewCount).toFixed(2);
    } else {
        return '-';
    }
}


function displayCarouselItems(recipes) {
    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselInner = document.getElementById('carousel-inner');
    carouselIndicators.innerHTML = ''; 
    carouselInner.innerHTML = ''; 

    recipes.forEach((recipe, index) => {
        // Mettre à jour le titre du carousel (s'il s'agit d'un seul titre)
        
        // Créer l'indicateur pour le carousel
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) {
            indicator.classList.add('active');
        }
        carouselIndicators.appendChild(indicator);

       
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) {
            item.classList.add('active');
        }

       
        const imageLink = document.createElement('a');
        imageLink.href = "detail.html?index=" + index;

        
        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.name;

        
        imageLink.appendChild(image);

    
        item.appendChild(imageLink);

        
        const caption = document.createElement('div');
        caption.classList.add('carousel-caption');

       
        const title = document.createElement('h4');
        title.textContent = recipe.name;
        title.style.fontSize = '24px'; 
        title.style.color = 'white'; 

        
        const description = document.createElement('p');
        description.textContent = recipe.instructions;

        
        caption.appendChild(title);
        caption.appendChild(description);

        
        item.appendChild(caption);

        
        carouselInner.appendChild(item);
    });
}


function generateUniqueRandoms(min, max) {
    const uniqueRandoms = [];
    while (uniqueRandoms.length < 4) {
        const randomIndex = Math.floor(Math.random() * (max - min)) + min;
        if (!uniqueRandoms.includes(randomIndex)) {
            uniqueRandoms.push(randomIndex);
        }
    }
    return uniqueRandoms;
}

function displayRandomRecipes(dataRecipes) {
    
    const uniqueRandoms = generateUniqueRandoms(0, dataRecipes.length);

    
    for (let i = 0; i < 4; i++) {
        const randomIndex = uniqueRandoms[i];
        const recipe = dataRecipes[randomIndex];

        document.getElementById("title" + (i + 1)).textContent = recipe.name;
        document.getElementById("image" + (i + 1)).src = recipe.image;
        document.getElementById("lien" + (i + 1)).href = "detail.html?index=" + randomIndex;
    }
}



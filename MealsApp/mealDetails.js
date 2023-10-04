let foodList = [];
let foodToShow = [];
const mealImage = document.querySelector('#meal-image img');
const mealHeader = document.querySelector('#meal-header');
const mealDesc = document.querySelector('#meal-description');


console.log('inside meal details');

function fetchMeals(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data =>{
        foodList = Object.values(data)[0];
        foodToShow = foodList[10];
        console.log('foodList vegan', foodList[10]);
        populateMealDetails(foodToShow)
    })
    .catch(error => {
        console.log('error ', error);
    })

    
}

function populateMealDetails(meal){
    console.log('details of meal to show is ', meal);
    mealImage.setAttribute('src',meal.strCategoryThumb);
    mealHeader.innerHTML = meal.strCategory;
    mealDesc.innerHTML = meal.strCategoryDescription;
}

fetchMeals();
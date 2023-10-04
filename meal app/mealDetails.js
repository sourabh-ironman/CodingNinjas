let foodList = [];
let foodToShow = [];
const mealImage = document.querySelector('#meal-image img');
const mealHeader = document.querySelector('#meal-header');
const mealDesc = document.querySelector('#meal-description');
const mealDataFromHomePage = JSON.parse(sessionStorage.getItem('clickedElementData'));
console.log('mealDataFromHomePage ',mealDataFromHomePage);

console.log('inside meal details');
populateMealDetails(mealDataFromHomePage);

function populateMealDetails(meal){
    console.log('details of meal to show is ', meal[0]);
    mealImage.setAttribute('src',meal[0].strCategoryThumb);
    mealImage.setAttribute('alt',meal[0].strCategory);
    mealHeader.innerHTML = meal[0].strCategory;
    mealDesc.innerHTML = meal[0].strCategoryDescription;
}
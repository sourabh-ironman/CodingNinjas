let foodList = []; //this will store the object returned by the API
let foodListArray = []; //this will store the values of the object returned by API, which is an array of meals.
const inputBox = document.getElementById('input-box');
const resultBox = document.querySelector('.result-box');
let myFavouriteMeals = []; //this will store the list of meals marked as favourite
let myFavouriteListButton = document.querySelector('#my-favourites button');
let myFavouritesList = document.querySelector('#my-favourites-list');

function handleFoodClick(result){
    let filteredFoods = document.querySelectorAll('.foodListItem a');
    console.log('result from handleFoodClick ',result);
    result.forEach(element =>{
        console.log('element is ',element);
    })
    console.log('filteredFoods[0].innerHTML ',filteredFoods[0].innerHTML);
    let clickedElemData;
    filteredFoods.forEach(element => {
        element.addEventListener('click', function(e){
            e.preventDefault();
            console.log('clicked ', e.target.innerText);
            clickedElemData = result.filter(data=>{
                return data.strCategory == e.target.innerText;
            });
            console.log('clickedElemData ',clickedElemData);
            sessionStorage.setItem('clickedElementData',JSON.stringify(clickedElemData));
            window.location.href = './mealDetails.html';
        })
        console.log('element ', element);
    });

}

//This function will get the data from the API
function getData(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response=> response.json())
    .then(data=>{
        // console.log('data from getData is ',data);
        foodList = data;
        foodListArray = Object.values(foodList)[0];
        console.log('foodListArray - ', foodListArray);
        setFavouriteInLocalStorage();
    })
    .catch(error=>console.log('error', error));
}

function setFavouriteInLocalStorage(){
    foodListArray.map(data =>{
        let foodName = data.strCategory;
        // console.log('foodName ',foodName)
        // console.log('localStorage.getItem(foodName) ',localStorage.getItem(foodName));
        if(localStorage.getItem(foodName) == undefined){
            localStorage.setItem(foodName, false); //storing the foodname to false in the localStorage of browser. False means it is not a favourite. True means it is favourite.
        }else if(localStorage.getItem(foodName) == "true"){
            myFavouriteMeals.push(foodName);
        }
    });
}

inputBox.addEventListener('keyup',filterResults);

//the function will filter results based on user's typed letters
function filterResults(){
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = foodListArray.filter(function(data){
            return data.strCategory.toLowerCase().includes(input.toLowerCase());
        });
        // console.log(result);
    }

    if(!result.length){
        resultBox.innerHTML = '';
    }else{
        display(result);
        handleFoodClick(result);
    }
}

//this function will display the results of user's search dynamically
function display(result){
    // const content = result.map(list=>{
    //     // console.log('list.strCategory ', list.strCategory);
    //     // console.log('localStorage.getItem(list.strCategory) ', localStorage.getItem(list.strCategory));
    //     if(localStorage.getItem(list.strCategory) == 'true'){
    //         return `
    //         <li class="foodListItem">
    //             <a href="./mealDetails.html">${list.strCategory} </a>
    //             <i id=${list.strCategory} class="fa-solid fa-star changeColor"></i>           
    //         </li>`;
    //     }
    //     return `
    //     <li class="foodListItem">
    //         <a href="./mealDetails.html">${list.strCategory} </a>
    //         <i id=${list.strCategory} class="fa-solid fa-star"></i>           
    //     </li>`;

    // });
    const content = result.map(list=>{
        // console.log('list.strCategory ', list.strCategory);
        // console.log('localStorage.getItem(list.strCategory) ', localStorage.getItem(list.strCategory));
        if(localStorage.getItem(list.strCategory) == 'true'){
            return `
            <li class="foodListItem">
                <a href="">${list.strCategory} </a>
                <i id=${list.strCategory} class="fa-solid fa-star changeColor"></i>           
            </li>`;
        }
        return `
        <li class="foodListItem">
            <a href="">${list.strCategory} </a>
            <i id=${list.strCategory} class="fa-solid fa-star"></i>           
        </li>`;

    });
    
    resultBox.innerHTML = `
    <ul>
        ${content.join('')}
    </ul>
    `;

    //for handling the click of each option to route them to the food details page


    //for handling the click of favourite star on each filtered option
    let filteredResults = document.querySelectorAll('.result-box ul li i');
    // console.log("filteredResults is...",filteredResults);
    filteredResults.forEach((element) => {
        // console.log('element is ',element);
        // console.log("this is...",this);
        element.addEventListener('click', function(e){
        let item = e.target.id; //this id is the name of the meal stored in the id of the favourite icon
        // console.log('element clicked is e.target.id ', e.target.id);
        if(myFavouriteMeals.includes(item)){
            let index = myFavouriteMeals.indexOf(item);
            myFavouriteMeals.splice(index, 1);
            localStorage.setItem(item, false);
        }else{
            myFavouriteMeals.push(item);
            localStorage.setItem(item, true);
        }
        element.classList.toggle('changeColor');
        // console.log('my favourite meals list --',myFavouriteMeals);
        showMyFavouritesList();
    })});
    showMyFavouritesList();
}

//This function will create list item and populate the meals marked as favourite to show in UI.
function showMyFavouritesList(){
    console.log('myFavouriteMeals.length ', myFavouriteMeals.length);
    if(myFavouriteMeals.length == 0){
        console.log('myFavouriteMeals is 0');
        myFavouritesList.innerHTML = '<p>You do not have any favourites selected</p>'
    }
    else{
        let list = '<ul>';
        myFavouriteMeals.forEach(meal =>{
            list += '<li>'+meal+'</li>';
        });
        list += '</ul>';
    
        myFavouritesList.innerHTML = list;
        // console.log('list is ',list);
    }
    
}

//to show and hide the favourites list
myFavouriteListButton.addEventListener('click', function(e){
    // console.log('e.target is ',e.target);
    showMyFavouritesList();
    myFavouritesList.classList.toggle('block-display');
});

//as soon as this js file loads, getData() method is called..
getData();
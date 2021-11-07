'use strict';

const results = document.querySelector('ul');
const viewResults = document.querySelector('button');

let productArray = [];
let randomNumberArray = []; 
let numberOfRoundsForSelections = 25;
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:last-child');
let currentSelectionRound = 0;

function Product(productName, fileExtension = 'jpg') {
    this.productName = productName;
    this.filePathOfImage = `IMG/${productName}.${fileExtension}`;
    this.timesShown = 0;
    this.timesSelected = 0;
    productArray.push(this);
}

new Product('bag',);
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function randomNumber() {
    return Math.floor(Math.random() * productArray.length); 
}

function renderProducts() {
    for (let i = 0; i < 3; i++) {
        let newNumber = randomNumber();
        while (randomNumberArray.includes(newNumber)) {  
        }
        randomNumberArray.push(newNumber);
    }

    while (randomNumberArray.length < 6) {
        let newSetNumber = randomNumber();
        if (!randomNumberArray.includes(newSetNumber)) {  
        }
    }

    img1.src = productArray[randomNumberArray[0]].filePathOfImage;
    img2.src = productArray[randomNumberArray[1]].filePathOfImage;
    img3.src = productArray[randomNumberArray[2]].filePathOfImage;

    productArray[randomNumberArray[0]].timesShown++;
    productArray[randomNumberArray[1]].timesShown++;
    productArray[randomNumberArray[2]].timesShown++;

    for (let i = 0; i < 3; i++) {
        randomNumberArray.shift();
    }

}

function renderTimesShown() {
    for (let i = 0; i < productArray.length; i++) {
        let li = document.createElement('li');
        li.textContent = `${productArray[i].productName}: ${productArray[i].timesShown} view(s), ${productArray[i].timesSelected} time(s) selected.`;
        results.appendChild(li);
    }
}

function handleClick(event) {

    if (currentSelectionRound < numberOfRoundsForSelections) {
        let itemSelected = event.target;

        for (let i = 0; i < productArray.length; i++) {
            if (itemSelected.src.endsWith(productArray[i].filePathOfImage)) {
                productArray[i].timesSelected++;
            }
        }
        renderProducts();
    }

    currentSelectionRound++;
}

function handleButton(event) {
    numberOfRoundsForSelections++;
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    chartTotalResults();
}

function chartTotalResults() {
    let arrayOfProducts = [];
    let arrayOfTimesShown = [];
    let arrayOfTimesSelected = [];
    for (let i = 0; i < productArray.length; i++) {
        arrayOfProducts.push(productArray[i].productName);
        arrayOfTimesShown.push(productArray[i].timesShown);
        arrayOfTimesSelected.push(productArray[i].timesSelected);
    }

    const data = {
        labels: arrayOfProducts,
        datasets: [
            {
                label: 'Viewed',
                backgroundColor: 'rgb(150, 2, 2)',
                borderColor: 'rgb(150, 2, 2)',
                data: arrayOfTimesShown,
            },
            {
                label: 'Selected',
                backgroundColor: 'rgb(2, 83, 150)',
                borderColor: 'rgb(2, 83, 150)',
                data: arrayOfTimesSelected,
            },
        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };
    let resultsChart = document.getElementById('chartResults');
    const chartResults = new Chart(resultsChart, config);
}
img1.addEventListener('click', handleClick);
img2.addEventListener('click', handleClick);
img3.addEventListener('click', handleClick);

viewResults.addEventListener('click', handleButton);

renderProducts();
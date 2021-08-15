'use strict';

let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let midImg = document.getElementById('midImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');

let prodImages = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
let maxAttempts = 10;
let attempt = 1;
let products = [];

function ProdImage(prodName) {
    this.gName = prodName.split('.')[0];
    this.gImg = `images/${prodName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
}

for (let i = 0; i < prodImages.length; i++) {
    new ProdImage(prodImages[i]);
}

console.log(products);
function randomImage() {
    return Math.floor(Math.random() * products.length);
}

let leftIndex;
let midIndex;
let rightIndex;
function renderImg() {
    leftIndex = randomImage();
    midIndex= randomImage();
    rightIndex = randomImage();
    while (leftIndex === midIndex) {
        leftIndex = randomImage();
        while (midIndex === rightIndex) {
            midIndex = randomImage();
            while (rightIndex === leftIndex) {
                rightIndex = randomImage();
            }
        }
    }
    leftImg.setAttribute('src', products[leftIndex].gImg);
    midImg.setAttribute('src', products[midIndex].gImg);
    rightImg.setAttribute('src', products[rightIndex].gImg);

    products[leftIndex].views++;
    products[midIndex].views++;
    products[rightIndex].views++;
}
renderImg();

leftImg.addEventListener('click', clickHandler);
midImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            products[leftIndex].votes++;
        } else if (clickedImage === 'rightImg') {
            products[rightIndex].votes++
        } else {
            products[midIndex].votes++
        }
        renderImg();
        console.log(products);
        attempt++;
    } else {
        // result
        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${products[i].gName} has ${products[i].votes} votes and  ${products[i].views} views.`;
        }
        leftImg.removeEventListener('click', clickHandler);
        midImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
    }
}

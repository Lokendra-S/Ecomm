//Quantity Inc and Dec

var incButton = document.querySelector('.incButton')
var decButton = document.querySelector('.decButton')
var quantityNumber = document.querySelector('.quantityNumber')
incButton.addEventListener('click',() => {
    if (quantityNumber.value >= 1){
        quantityNumber.value = parseInt(quantityNumber.value) + 1
    }
})
decButton.addEventListener('click',() => {
    if (quantityNumber.value > 1){
        quantityNumber.value = parseInt(quantityNumber.value) - 1
    }
})
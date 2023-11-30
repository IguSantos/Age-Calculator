const input = document.querySelectorAll('input'),
    form = document.querySelector('form'),
    trueSmall = document.querySelectorAll('small'),
    small = document.querySelector('.error'),
    smallMonth = document.querySelector('.error__month'),
    smallYear = document.querySelector('.error__year'),
    label = document.querySelectorAll('label')


const date = new Date();

form.addEventListener("submit", (e) => {
    e.preventDefault()

    trueSmall.forEach(e => e.innerHTML = "")
    label.forEach(e => e.classList.remove('label__error'))
    input.forEach(e => e.classList.remove('field__error'))

    validation()

})

function validation() {

    function handleValidation(index, error) {

        trueSmall[index].innerHTML = error
        input[index].classList.add("field__error")
        label[index].classList.add('label__error')
        return;
    }

    if (!input[0].value) {
        handleValidation(0, 'This field is required')
        return

    } else if (input[0].value > 31 || input[0].value < 1) {
        handleValidation(0, 'Must be a valid day')
        return;

    } else if (input[0].value == 31 && input[1].value == 4) {
        handleValidation(0, 'Must be a valid date')
        return;
    }

    if (!input[1].value) {
        handleValidation(1, 'This field is required')
        return;
    } else if (input[1].value > 12 || input[1].value < 1) {
        handleValidation(1, 'Must be a valid month')
        return;
    }

    if (!input[2].value) {
        handleValidation(2, 'This field is required')
        return;
    }

    else if (date.getFullYear() < input[2].value) {
        handleValidation(2, 'Must be in the past')
        return;


    } else if (input[2].value < 1900) {
        handleValidation(2, 'Must be a valid year')
        return;

    }

    calculate()


}

function calculate() {

    let yearCalc;
    let month = date.getMonth();
    let day = date.getDate();

    if (day == input[0].value && month + 1 == input[1].value) {
        alert('Happy Birthday')
    }

    if (day >= input[0].value && month + 1 >= input[1].value) {
        yearCalc = date.getFullYear() - input[2].value;
        month = (date.getMonth() + 1) - input[1].value;
        day = date.getDate() - input[0].value;

    } else {
        yearCalc = (date.getFullYear() - input[2].value) - 1

    }

    if (input[1].value < date.getMonth()) {
        month = date.getMonth() - input[1].value

    }

    const finalNumbers = [
        day,
        month,
        yearCalc
    ]

    animateNumbers(finalNumbers);


}

function animateNumbers(finalNumbers) {
    
    const resultElements = [
        document.getElementById('displayDay'),
        document.getElementById('displayMonth'),
        document.getElementById('displayYear')
    ];

    function animateNumber(finalNumber, resultElement) {
        let currentNumber = 0;
        const animationDuration = 3000;
        const updateInterval = 50;
        const numSteps = animationDuration / updateInterval;
        const increment = finalNumber / numSteps;
           
        const animation = setInterval(function () {
            currentNumber += increment;
            resultElement.textContent = Math.round(currentNumber);
            
            if (currentNumber >= finalNumber) {
                clearInterval(animation);
            }
        }, updateInterval);
    }

    finalNumbers.forEach((finalNumber, index) => {
        animateNumber(finalNumber, resultElements[index]);
    });

    input[0].value = '';
    input[1].value = '';
    input[2].value = '';

    
}

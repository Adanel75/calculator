const info = document.querySelector(".info")
const calculatorSwitch = document.querySelector(".calculatorSwitch")
const calculatorContainer = document.querySelector(".calculatorContainer")
const calculatorDesription = document.querySelector(".calculatorDesription")
const equalBtn = document.querySelector(".equalBtn")
const calculatorAnswer = document.querySelector(".calculatorAnswer")
const descriptionBlock = document.querySelector(".descriptionBlock")




let equal = () => {
    console.clear()
    const input = document.getElementById('calculatorInput').value
    console.log(input)
    num = 0

    // Разбиваем строку на операнды и операторы
    let tokens = input.match(/(\d+|\+|\-|\*|\/)/g)

    if (!tokens) {
        calculatorAnswer.innerHTML = "Некорректный ввод"
        setTimeout(() => {
            calculatorAnswer.innerHTML = "Ответ:"
        }, 1700)

        console.log("Некорректный ввод")
        return
    }

    

    // Используем стек для хранения операторов и операндов
    let numbers = []
    let operators = []

    tokens.forEach(token => {
        if (!isNaN(token)) {
            numbers.push(Number(token))
        } else {
            while (operators.length && precedence(token) <= precedence(operators[operators.length - 1])) {
                let b = numbers.pop()
                let a = numbers.pop()
                let op = operators.pop()
                numbers.push(applyOperation(a, b, op))
            }
            operators.push(token)
        }
    })

    // Обработка оставшихся операторов
    while (operators.length) {
        let b = numbers.pop()
        let a = numbers.pop()
        let op = operators.pop()
        numbers.push(applyOperation(a, b, op))
    }

    num = numbers[0]   
    console.log(num)
    calculatorAnswer.innerHTML = "Ответ: " + num
}

// Функция для определения приоритета операторов
function precedence(op) {
    if (op === '+' || op === '-') return 1
    if (op === '*' || op === '/') return 2
    return 0
}

// Функция для выполнения арифметических операций
function applyOperation(a, b, op) {
    switch (op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
    }
    return 0
}

equalBtn.addEventListener('click', equal)

let count = 0

let toggle = () => {
    count++

    if (count % 2 == 1) {
        calculatorSwitch.style.width = '100%'
        calculatorContainer.style.width = '50%'
        calculatorDesription.style.opacity = '1'
        // calculatorSwitch.style.paddingLeft = '200px'
        // calculatorSwitch.style.paddingRight = '200px'
    } else if (count % 2 == 0) {
        calculatorSwitch.style.width = '150%'
        calculatorContainer.style.width = '100%'
        calculatorDesription.style.opacity = '0'
        // calculatorSwitch.style.paddingLeft = '0'
        // calculatorSwitch.style.paddingRight = '0'


    }
}


info.addEventListener('click', toggle)
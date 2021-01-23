// String.fromCharCode( number )  ->  character

// let myString = "m"
// myString.charCodeAt( [index] )  ->  ascii decimal



function decode(numbers) {
    let charaters = [];
    for (let i = 0; i < numbers.length; i++) {
        charaters.push(String.fromCharCode(numbers[i]));
    }
    return charaters.join("");
}


function encode(message) {
    let numbers = [];
    for (let i = 0; i < message.length; i++) {
        numbers.push(message.charCodeAt(i));
    }
    return numbers;
}


function decrypt(numbers, offset) {
    let offsetNumbers = [];
    for (let n of numbers) {
        n = Number.parseInt(n);
        if (n != 32) {
            n += offset
        }
        if (n > 122) {
            n -= 26;
        }
        offsetNumbers.push(n);
    }
    let decodedMessage = decode(offsetNumbers);
    console.log(decodedMessage);
}



function encodeUserMessage() {
    let encodedMessage = encode(window.message.value);
    window.numbers.value = encodedMessage;
}

function decodeUserMessage(event) {
    if (event.key == "Enter") {
        let userNumbers = window.numbers.value.split(",");
        let decodedMessage = decode(userNumbers);
        window.message.value = decodedMessage;
    }
}

function handleDecryptButton() {
    for (let i = 0; i < 26; i++) {
        decrypt(window.numbers.value.split(","), i);
    }
}

let message = document.getElementById("message");
message.addEventListener("keyup", encodeUserMessage);

window.numbers.addEventListener("keyup", decodeUserMessage);

let decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener("click", handleDecryptButton);
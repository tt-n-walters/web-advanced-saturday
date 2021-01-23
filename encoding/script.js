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


function decrypt(numbers, cipherWord) {
    let offsetNumbers = [];
    let encodedCipher = encode(cipherWord);
    for (let i = 0; i < numbers.length; i++) {
        let n = numbers[i];
        let cipherN = encodedCipher[i % cipherWord.length];
        n = Number.parseInt(n);
        console.log(i, n)
        let offsetN = n + cipherN;
        console.log(i, offsetN)
        while (offsetN > 126) {
            offsetN -= 94;
            console.log(i, offsetN)
        }
        offsetNumbers.push(offsetN);
    }
    let decodedMessage = decode(offsetNumbers);
    return decodedMessage;
}

function encrypt(message, cipherWord) {
    let encodedMessage = encode(message);
    let encodedCipher = encode(cipherWord);
    let encryptedNumbers = [];
    for (let i = 0; i < message.length; i++) {
        let n = encodedMessage[i];
        let cipherN = encodedCipher[i % cipherWord.length];
        let offsetN = n - cipherN;
        while (offsetN < 32) {
            offsetN += 94;
        }
        encryptedNumbers.push(offsetN);
    }
    return encryptedNumbers;
}


function encodeUserMessage() {
    let encodedMessage = encrypt(window.message.value, cipherKeyInput.value);
    window.numbers.value = decode(encodedMessage);
}

function decodeUserMessage(event) {
    if (event.key == "Enter") {
        let userNumbers = window.numbers.value.split(",");
        let decodedMessage = decode(userNumbers);
        window.message.value = decodedMessage;
    }
}

function handleDecryptButton() {
    let encodedMessage = encode(window.numbers.value);
    let decryptedMessage = decrypt(encodedMessage, cipherKeyInput.value);
    window.message.value = decryptedMessage;
}

let message = document.getElementById("message");
let cipherKeyInput = document.getElementById("cipher_key");
message.addEventListener("keyup", encodeUserMessage);

window.numbers.addEventListener("keyup", decodeUserMessage);

let decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener("click", handleDecryptButton);
// init method calling procedure
window.addEventListener("load", (event) => {
	init();
	generatePassword(12);
});
var sliderValue;
let output;
let strength = 0;
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "/", "|", "{", "}", "[", "]", "~", "<", ">"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseCheckBoxValue = document.getElementById("checkBox1")
const lowerCaseCheckBoxValue = document.getElementById("checkBox2");
const symbolsCheckBoxValue = document.getElementById("checkBox3");
const numbersCheckBoxValue = document.getElementById("checkBox4");
let passwordInputBox = document.getElementById("passwordInputBox");
let strong = document.getElementById("strong");
let medium = document.getElementById("medium");
let weak = document.getElementById("weak");
let answerInputBox = document.getElementById("answerDiv")

function init() {
	// get parent div from id
	// create required elements
	const parent = document.getElementById("container");
	let mainHeading = document.createElement("h1");
	let inputDiv = document.createElement("div");
	let rangeBar = document.createElement("input");
	let checkBoxDiv = document.createElement("div");
	let checkBoxDiv1 = document.getElementById("checkBoxDiv1");
	sliderValue = document.createElement("span");
	let generatepasswordButton = document.createElement("button");
	parent.appendChild(mainHeading).setAttribute("class", "mainHeading");
	parent.appendChild(inputDiv).setAttribute("class", "inputBox");
	inputDiv.appendChild(passwordInputBox);
	inputDiv.appendChild(generatepasswordButton).setAttribute("class", "generatePasswordButton");
	inputDiv.appendChild(checkBoxDiv).setAttribute("class", "checkBoxDiv");
	checkBoxDiv.appendChild(rangeBar).setAttribute("class", "rangeBar");
	checkBoxDiv.appendChild(sliderValue).setAttribute("class", "spanTagValue");
	rangeBar.setAttribute("oninput", "slideValue(this.value)");
	checkBoxDiv.appendChild(checkBoxDiv1);
	// passwordInputBox.innerHTML='<i class="fa-solid fa-copy"></i>';
	rangeBar.type = "range";
	rangeBar.max = "20";
	rangeBar.min = "8";
	rangeBar.value = "0";
	console.log(rangeBar.value);
	generatepasswordButton.innerText = "Generate password →";
	mainHeading.innerText = "PASSWORD GENERATOR";
	generatepasswordButton.setAttribute("onclick", `generatePassword(${rangeBar.value})`)

}
// get rabgebar value
function slideValue(value) {
	sliderValue.innerText = value;
	console.log(value);
	generatePassword(value);
	return value;

}

function generatePassword(value) {
	let output = [];
	let finalPassword = "";
	// check the checkbox value true or false
	let hasUpper = upperCaseCheckBoxValue.checked;
	let hasLower = lowerCaseCheckBoxValue.checked;
	let hasSymbols = symbolsCheckBoxValue.checked;
	let hasnumber = numbersCheckBoxValue.checked;
	if (hasLower) {
		strength++;
		lowerCase = shuffleArray(lowerCase);
		for (let i = 0; i < 26; i++) {
			output.push(lowerCase[i]);
		}
	}
	if (hasUpper) {
		strength++;
		upperCase = shuffleArray(upperCase);
		for (let i = 0; i < 26; i++) {
			output.push(upperCase[i]);
		}
	}
	if (hasSymbols) {
		strength++;
		symbols = shuffleArray(symbols);
		for (let i = 0; i < symbols.length; i++) {
			output.push(symbols[i]);
		}
	}
	if (hasnumber) {
		strength++;
		numbers = shuffleArray(numbers);
		for (let i = 0; i < numbers.length; i++) {
			output.push(numbers[i])
		}
	} else {
		for (let i = 0; i < 21; i++)
			output.push(symbols[i], lowerCase[i], upperCase[i])
	}
	output = shuffleArray(output);
	for (let i = 0; i < value; i++) {
		finalPassword += output[Math.floor(Math.random() * output.length)];

	}
	// the below conditions are check the strength from the password
	if (strength == 4) {
		strong.style.backgroundColor = "#00f0ff";
		medium.style.backgroundColor = "#00f0ff";
		weak.style.backgroundColor = "#00f0ff";
		strength = 0;
	} else if (2 <= strength && strength <= 3) {
		console.log(strength)
		strong.style.backgroundColor = "orange";
		medium.style.backgroundColor = "orange";
		weak.style.backgroundColor = "orange";
		strength = 0;
	} else if (strength < 1) {
		strong.style.backgroundColor = "red";
		medium.style.backgroundColor = "red";
		weak.style.backgroundColor = "red";
		strength = 0;
	}
	// fill the password to inputbox     
	answerInputBox.textContent = finalPassword;
}
//in this method we shuffle array
function shuffleArray(arr) {
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}
// copy the text from the inputBox div
function copy() {
	navigator.clipboard.writeText(answerInputBox.innerText);
}
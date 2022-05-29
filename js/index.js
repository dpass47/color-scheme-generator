const colorForm = document.querySelector(".color-form");
const schemeSelector = document.querySelector(".scheme-selector");
const colorPicker = document.querySelector(".color-input");
const colorFetchBg = document.querySelector(".color-fetch-bg");
const copyField = document.querySelectorAll(".copy-field");

async function fetchData() {
	let userSchemeSelection = schemeSelector.value;
	let userScheme = userSchemeSelection.toLowerCase();
	let userColorHex = colorPicker.value;
	let userColor = userColorHex.replace("#", "");
	let response = await fetch(
		`https://www.thecolorapi.com/scheme?hex=${userColor}&mode=${userScheme}&count=6`
	);
	let color = await response.json();
	for (var i = 0; i < 6; i++) {
		colorFetchBg.innerHTML += `<div class=width-small style="background:${color.colors[i].hex.value}"></div>`;
		copyField[i].value = color.colors[i].hex.value;
		copyText(i);
	}
}

function copyText(x) {
	copyField[x].addEventListener("click", function () {
		navigator.clipboard.writeText(copyField[x].value);
	});
}

function resetData() {
	colorFetchBg.innerHTML = "";
}

colorForm.addEventListener("submit", (e) => {
	e.preventDefault();
	resetData();
	fetchData();
});

document.getElementById('datum').valueAsDate = new Date();


document.getElementById('ime-priimek').addEventListener("keypress", function (evt) {

	if (evt.which < 65 || evt.which > 122)
		evt.preventDefault();

});
document.getElementById('emso').addEventListener("keypress", function (evt) {
	if (evt.which < 48 || evt.which > 57) {
		evt.preventDefault();
	}
});
document.getElementById('postna-st').addEventListener("keypress", function (evt) {
	if (evt.which < 48 || evt.which > 57) {
		evt.preventDefault();
	}
});
document.getElementById('tel-st').addEventListener("keypress", function (evt) {
	if (evt.which < 48 || evt.which > 57) {
		evt.preventDefault();
	}
});
function myFunction(x) {
	var y = window.matchMedia("(max-width: 1500px)");
	if (x.matches) { // If media query matches
		document.getElementById('postna-st').placeholder = 'POŠTNA ŠT.';
		document.getElementById('tel-st').placeholder = 'TEL. ŠTEVILKA';
		document.getElementById('tel-st').style.width = '100%';
		document.getElementById('email').placeholder = 'E-MAIL';
	}
	if (y.matches) {
		document.getElementById('klicna-koda').style.display = 'none';
	}
	else {
		document.getElementById('postna-st').placeholder = 'POŠTNA ŠTEVILKA';
		document.getElementById('tel-st').placeholder = 'TELEFONSKA ŠTEVILKA';
		document.getElementById('tel-st').style.width = '76%';
		document.getElementById('email').placeholder = 'E-MAIL NASLOV';
		document.getElementById('klicna-koda').style.display = 'initial';
	}

}
function phoneSelected() {
	document.getElementById('klicna-koda').style.color = "black";
}

function dateSelected() {
	document.getElementById('datum').style.color = "black";
	document.getElementById('datum').style.backgroundColor = "#dfd";
}

function resetInput() {
	document.getElementById('postna-st').style.backgroundColor = "#ddd";
	document.getElementById('tel-st').style.backgroundColor = "#ddd";
	document.getElementById('emso').style.backgroundColor = "#ddd";
	document.getElementById('email').style.backgroundColor = "#ddd";
	document.getElementById('ime-priimek').style.backgroundColor = "#ddd";
	document.getElementById('naslov').style.backgroundColor = "#ddd";
}

function checkFilled() {
	var check = true;
	var emso = document.getElementById('emso').value;
	var postna = document.getElementById('postna-st').value;
	var tel = document.getElementById('tel-st').value;
	var alert = document.getElementById('alert');
	var mail = document.getElementById('email').value;
	var imePriimek = document.getElementById('ime-priimek').value;
	var naslov = document.getElementById('naslov').value;

	if (mail.indexOf('@') === -1) {
		document.getElementById('email').value = "E-mail ne vsebuje @";
		document.getElementById('email').style.backgroundColor = "#ff6557";
		check = false;
	}

	if (check) {
		alert.innerText = "Pravilno izpolnjeno!";
		alert.style.color = 'green';
		return true;
	}
	else {
		alert.style.color = 'red';
		return false;
	}
}

var x = window.matchMedia("(max-width: 1295px)");

myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes	
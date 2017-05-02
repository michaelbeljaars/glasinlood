
$( document ).ready(function() {

//Variabele opzetten
var content;
var images_sq, images_sq_av;
var images_tr, images_tr_av;
var images_cl, images_cl_av;
var imagesUnused, addedImage, index;
var image, imageCounter, dCounter, lastImage;

function prep() {
	
	//Scan directory 'img_sq' for images (square)
	$.getJSON("./directoryScan.php?dir=img/sq", function(json){
   		images_sq = shuffle(JSON.parse(JSON.stringify(json)));
		images_sq_av = images_sq;		
	});	
	
	//Scan directory 'img_tr' for images (triangle)
	$.getJSON("./directoryScan.php?dir=img/tr", function(json){
   		images_tr = shuffle(json);
		images_tr_av = JSON.parse(JSON.stringify(images_tr));		
	});	
	
	//Scan directory 'img_cl' for images (circle)
	$.getJSON("./directoryScan.php?dir=img/cl", function(json){
   		images_cl = shuffle(json);
		images_cl_av = JSON.parse(JSON.stringify(images_cl));		
	});		
}
	
	// Get all divs with class content
	var content = document.getElementsByClassName("content");
	
	//Functie om een willekeurig getal tussen min en max te krijgen
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
	
//Functie om array willekeurig te sorteren
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
	
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
return array;
}
	
//eerste keer plaatjes in ID "plaatjeN" zetten. 	
function loadimages() {	

	for (i=0; i < content.length + 1; i++) {
		if (content.item(i).getElementsByClassName("sq")) {
			image = content.item(i).getElementsByClassName("plaatjeN");
			image[0].src = images_sq[i];

			//Plaatje uit imagesunUsed halen
			images_sq_av.splice(images_sq[i],1);
		}
		else if (content.item(i).getElementsByClassName("tr")) {
			image = content.item(i).getElementsByClassName("plaatjeN");
			image[0].src = images_sq[i];

			//Plaatje uit imagesunUsed halen
			images_sq_av.splice(images_sq[i],1);			
		}
		else if (content.item(i).getElementsByClassName("cl")) {
			image = content.item(i).getElementsByClassName("plaatjeN");
			image[0].src = images_cl[i];

			//Plaatje uit imagesunUsed halen
			images_cl_av.splice(images_cl[i],1);		
		}
	};
};
	
//Functie crossfade images	
function crossfade() {			
		$(lastImage).show();
		$(lastImage).fadeOut(5000, "linear");
		$(image).fadeIn(5000, "linear");			
};
		
//Functie plaatje veranderen naar een uit de array imagesUnused
function changeImage() {
	
	//Pak een willekeurig nummer tussen 0 en het aantal elementen uit een array (minus 1, altijd beginnen bij 0 ipv 1)			
	randomImg = getRandomInt(0, (imagesUnused.length -1));
	randomDiv = getRandomInt(0, (divid.length-1));
	
	//Kies een random div waar een random plaatje ingezet wordt (plaatjeN) en zet het bestaande plaatje in "plaatjeO) 
		image = document.querySelector("#"+divid[randomDiv]+" #plaatjeN"); 
		lastImage = document.querySelector("#"+divid[randomDiv]+" #plaatjeO");			
		//lastImage.src = 'img/'+ image.src.replace('http://127.0.0.1/img/', '');
		lastImage.src = image.src;
		//verberg het nieuwe plaatje, anders kun je niet infaden.
		$(image).hide();
	//Nieuw plaatje plakken			
	image.src = 'img/'+imagesUnused[randomImg] ;
	//roep Crossfade functie aan
		crossfade();

	//plaatje wat vervangen is weer toevoegen aan imagesUnused		
	lastImage = lastImage.src;			
	
		if (lastImage.indexOf("127.0.0.1")  >= 0) {
			lastImage= lastImage.replace('http://127.0.0.1/img/', '');
		}; 
	imagesUnused.push(lastImage);
	
	addedImage = image.src;	
		if (addedImage.indexOf("127.0.0.1")  >= 0) {
			addedImage = addedImage.replace('http://127.0.0.1/img/', '');
		};
	index = imagesUnused.indexOf(addedImage);
	imagesUnused.splice(index,1);
		
};

	//Voer deze functie uit tot de plaatjes op zijn (x<22)
	loadimages();
	//for(x=1; x<25; x++) window.setTimeout(vullen, 10 * x);
	
});
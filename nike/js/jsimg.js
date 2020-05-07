window.setInterval(draw, 50);
var article=0;


function draw(){
    var colorShirt = "#"+document.getElementById("paletteShirt").value;
    var colorSign = "#"+document.getElementById("paletteSign").value;

    var majica = document.getElementById('majica');
    var dolgaMajica = document.getElementById('dolgaMajica');
    var napis = document.getElementById('text');

    majica.style.fill=colorShirt;
    dolgaMajica.style.fill=colorShirt;
    napis.style.color=colorSign;
 }

function randomize(){
  var majica = document.getElementById('majica');
  var dolgaMajica = document.getElementById('dolgaMajica');
  var napis = document.getElementById('text');

  color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("paletteShirt").value=color.toUpperCase();
    majica.style.fill=color;
    dolgaMajica.style.fill=color;
  color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("paletteSign").value=color.toUpperCase();
    napis.style.color=color;
}

function reset(){
  var majica = document.getElementById('majica');
  var dolgaMajica = document.getElementById('dolgaMajica');
  var napis = document.getElementById('text');

    document.getElementById("paletteShirt").value='000000';
    majica.style.fill='#000000';
    dolgaMajica.style.fill='#000000';
    document.getElementById("paletteSign").value='FFFFFF';
    napis.style.color='#FFFFFF';
}

function kratkaMajica(){
  if(article==0)
    console.log("že izbrano");
  else{
    article=0;
    console.log("kratka majica: "+article);
    document.getElementById('majica').style.visibility="visible";
    document.getElementById('hoodie').style.visibility="hidden";
  }
}

function dolgaMajica(){
  if(article==1)
   console.log("že izbrano");
  else{
    article=1;
    console.log("dolga majica: "+article);
    document.getElementById('majica').style.visibility="hidden";
    document.getElementById('hoodie').style.visibility="visible";
  }
}
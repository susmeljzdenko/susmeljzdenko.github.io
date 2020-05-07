window.setInterval(draw, 50);
var article=0;


function draw(){
    var colorSwoosh = "#"+document.getElementById("paletteSwoosh").value;
    var colorShirt = "#"+document.getElementById("paletteShirt").value;
    var colorSign = "#"+document.getElementById("paletteSign").value;
    var c = document.getElementById("canvas");
	  var ctx = c.getContext("2d");
    ctx.fillStyle=colorSwoosh;
    ctx.fill();

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

  var c = document.getElementById("canvas");
	  var ctx = c.getContext("2d");
    

  var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("paletteSwoosh").value=color.toUpperCase();
    ctx.fillStyle=color;
    ctx.fill();
  color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("paletteShirt").value=color.toUpperCase();
    majica.style.fill=color;
    dolgaMajica.style.fill=color;
  color = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("paletteSign").value=color.toUpperCase();
    napis.style.color=color;
}

function reset(){
  var c = document.getElementById("canvas");
	  var ctx = c.getContext("2d");
  var majica = document.getElementById('majica');
  var dolgaMajica = document.getElementById('dolgaMajica');
  var napis = document.getElementById('text');

    document.getElementById("paletteSwoosh").value='FFFFFF';
    ctx.fillStyle="#FFFFFF";
    ctx.fill();
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

function bezier(){
  var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.strokeStyle="rgba(0,0,0,0)";
            ctx.scale(0.18,0.18);
            
            ctx.fillStyle="white";
            ctx.strokeStyle="white";
            ctx.lineWidth=2;
            
            ctx.moveTo(376,976);
            ctx.bezierCurveTo(180,1052,-123,929,241,530);
            ctx.bezierCurveTo(150,700,257,803,377,785);
            ctx.bezierCurveTo(520,750,1430,506,1430,500);    
            ctx.closePath();        
            ctx.fill();
            ctx.stroke();
            ctx.restore();
}   
  
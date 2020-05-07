            var x = document.getElementById("image");
            var y = document.getElementById("galerija");
            
				function showImg(){
					if (x.style.opacity === "0") {
						y.style.opacity = "0.1";
						x.style.opacity = "1";
						x.style.zIndex="2";
					} else 
						hideImg();
				}
				function hideImg(){
					y.style.opacity = "1.0";
						x.style.opacity = "0";
						x.style.zIndex="-1";
				}

				window.onkeydown = function (event) {
					if (event.keyCode == 27) 
						hideImg();
					}
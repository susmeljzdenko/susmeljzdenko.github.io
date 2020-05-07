
		var rows = 5
		var cols = 5
		var labirint = labyrinthgenerator(rows, cols);

		var tiles = [];
		for(var i = 0; i < rows*cols; i++)
			tiles[i] = 0;
		var playerCell = 0;
		tiles[playerCell] = 1;

		//velikost celic
		var cellSize = 40;

		//shranjevanje spremenljivk za vsako puscico
		window.addEventListener("keydown", keyboardHandler, false);
		var gor = 38;
		var dol = 40;
		var desno = 39;
		var levo = 37;

		var canvas = document.querySelector("canvas");
		var drawingSurface = canvas.getContext("2d");
			canvas.width = rows*cellSize;
			canvas.height = cols*cellSize;

		var sporocilo = document.querySelector("#sporocilo");


		//timer, pri timeleft dolocimo cas
		var timer = document.querySelector("#timer");
		var timeleft = 90;
		var gameRunning = false;

		//render();


function generate(rowcol){
		
		rows = rowcol;
		cols = rowcol;
	
		labirint = labyrinthgenerator(rows, cols);

		tiles = [];
		for(var i = 0; i < rows*cols; i++)
			tiles[i] = 0;
		playerCell = 0;
		tiles[playerCell] = 1;

		//velikost celic
		cellSize = 40;

		canvas.width = rows*cellSize;
		canvas.height = cols*cellSize;

		 timeleft = 90;
		 gameRunning = false;

		render();
		
	}
		function keyboardHandler(event)
		{
			//zazenemo igro ce se klikne katerakoli od puscic
			if(!gameRunning && event.keyCode >= 37 && event.keyCode <= 40)
			{
				timerTick();
				gameRunning = true;
			}
			
			//dobi pozicijo igralca
			var playerRow = Math.floor(playerCell/rows);
			var playerCol = playerCell % cols;

			//switch case za dovoljen premik
			var nextCell = -1;
			switch(event.keyCode)
			{
				case gor:
					if(playerRow > 0)
						nextCell = playerCell - cols;
					break;
				case dol:
					if(playerRow < rows - 1)
						nextCell = playerCell + cols;
					break;
				case levo:
					if(playerCol > 0)
						nextCell = playerCell - 1;
					break;
				case desno:
					if(playerCol < cols - 1)
						nextCell = playerCell + 1;
					break
			}
			
			//premakne igralca
			if(nextCell >= 0 && labirint[playerCell][nextCell])
			{
				playerCell = nextCell;
				tiles[playerCell] = tiles[playerCell] + 1;
				render();
			}
			
			//ce je igralec v spodnjem desnem kotu, se igra konca
			if(playerCell == rows*cols-1)
			{
				window.removeEventListener("keydown", keyboardHandler, false);
				var koraki = 0;
				for(var i = 0; i < rows*cols; i++)
				{
					koraki += tiles[i] > 0;
				}
				sporocilo.innerHTML = "Čestitamo! Labirint ste rešili v " + koraki + " korakih in v "+ (90-timeleft) +" sekundah!";
			}
		}

		//timer + konec igre
		function timerTick()
		{
			if(playerCell != rows*cols-1)
			{
				if(timeleft)
				{		
					window.setTimeout(function(){timerTick();}, 1000);
					timeleft--;
					var msg = "Še " + timeleft + "s preostane!";
			
					timer.innerHTML = msg;
				}
				else
				{
					window.removeEventListener("keydown", keyboardHandler, false);
					sporocilo.innerHTML = "<b>Čas je potekel!</b>";
				}
			}
		}

		//izris igralca
		function render()
		{

			drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
			for(var cell = 0; cell < rows*cols; cell++)
			{
				var cellRow = Math.floor(cell/rows);
				var cellCol = cell % cols;
				if(cell == playerCell)
					drawingSurface.fillStyle = "#3486eb";
				else if(cell == rows*cols-1)
					drawingSurface.fillStyle = "#fa4441";
				else
					drawingSurface.fillStyle = "rgb(239, 239, 239)";
				drawingSurface.fillRect(cellCol*cellSize, cellRow*cellSize, cellSize, cellSize);
			}

			drawingSurface.lineWidth = 2;
			for(var cell = 0; cell < rows*cols; cell++)
			{
				var cellRow = Math.floor(cell/rows);
				var cellCol = cell % cols;
				if(cellRow < rows - 1)
					if(!labirint[cell][cell+cols])
					{
						drawingSurface.beginPath();
						drawingSurface.moveTo(cellCol*cellSize, (cellRow+1)*cellSize);
						drawingSurface.lineTo((cellCol+1)*cellSize, (cellRow+1)*cellSize);
						drawingSurface.stroke();
					}
				if(cellCol < cols - 1)
					if(!labirint[cell][cell+1])
					{
						drawingSurface.beginPath();
						drawingSurface.moveTo((cellCol+1)*cellSize, cellRow*cellSize);
						drawingSurface.lineTo((cellCol+1)*cellSize, (cellRow+1)*cellSize);
						drawingSurface.stroke();
					}
			}
		}
	
//keeps track of who is next
let activePlayer = 'X';
//stores array of moves and used to determine win conditions
let selectedSquares = [];

//places X or O in a square
function placeXorO(squareNumber) {
    //this condition ensures a square has not been selected already 
    //the .some() method is used to check element of selected square array
    //to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the html element id was clicked
        let select = document.getElementById(squareNumber);
        //this condition checks who's turn it is
        if (activePlayer === 'X') {
            //if active player is equal to X the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/x.png")';
            //active player may only be 'X' or 'O' so if not 'X' it must be 'O'
        } else {
            //if player is equal to 'O' the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for any win conditions.
        checkWinConditions();
        //this condition is for changing the active player.
        if (activePlayer === 'X') {
            //if active player is 'X' change it to 'O'.
            activePlayer = 'O';
            //if active player is anything other than 'X'
        } else {
            //change the activePlayer to 'X'
            activePlayer = 'X';        
        }
        //this function plays placement sound.
        audio('./media/place (1).mp3');
        //this condition checks to see if it is computers turn.
        if(activePlayer === 'O') {
            //this function disables clicking for computer choice
            disableClick();
            //this function waits 1 second before computer places image and enables click
            setTimeout(function (){computersTurn(); }, 1000)
        }
        // returning true is needed for computersTurn() function to work.
        return true;
    }
    //this function results in a random square being selected.
    function computersTurn() {
        //this boolean is needed for our while loop.
        let success = false;
        //this variable stores a random number 0-8.
        let pickASquare;
        //this condition allows our while loop to keep trying if square is selected already.
        while (!success){
            //a random number between 0 and 8 is selected.
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluated returns true, the square hasn't been selected yet.
            if (placeXorO(pickASquare)){
                //this line calls the function.
                placeXorO(pickASquare);
                //this changes our boolean and ends the loop.
                success = true;
            }
        }
    }
}

//this function parses the selectedSquares array to search for win conditions
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    // X 0, 1, 2, condition.
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100)}
    // X 3, 4, 5, condition.
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304)}
    // X 6, 7, 8 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508)}
    // X 0, 3, 6 condition.
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558)}
    // X 1, 4, 7 condition.
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558)}
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558)}
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90)}
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520)}
    // O 0, 1, 2 condition.
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100)}
    // O 3, 4, 5 condition.
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304)}
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508)}
    // O 0, 3, 6 condition.
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558)}
    // O 1, 4, 7 condition.
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558)}
    // O 2, 5, 8 condition.
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558)}
    // O 6, 4, 2 condition.
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90)}
    // O 0, 4, 8 condition.
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520)}
    // This condition checks for tie. if none of the above conditions register and 9
    //squares are selected the code executes.
    else if (selectedSquares.length >= 9) {
        //this function plays teh tie game sound.
        audio('./media/tie.mp3');
        //this function sets a .3 second timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 1000);
    }
    //this function checks if an array includes 3 strings. It is used to check for 
    //each Win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        //These 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        // if the 3 variables we pass are all included in our array true is
        //returned and our else if condition executes the drawWinLine function.
        if (a === true && b === true && c === true) {return true}
    }
}

//This function makes our body element temporarily unclickable.
function disableClick() {
    //This makes our body unclickable.
    body.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second.
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//This function takes a string parameter of the path you set earlier for
//placement sound ('./media/place.(1)mp3')
function audio(audioURL) {
    //We create a new audio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    //play method plays our audio sound.
    audio.play();
}

//this function utilizes html canvas to draw win line.
function drawWinLine(coordXl, coordY1, coordX2, coordY2) {
// This line accesses our html canvas element.
    const canvas = document.getElementById('win-lines')
//This line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is.
    let xl = coordXl,
    //this line indicates where the start of a lines y axis is.
    yl = coordY1,
    //this line indicates where the end of a lines x axis is.
    x2 = coordX2,
    //this line indicates where the end of a lines x axis is.
    y2 = coordY2,
    //this variable stores temporary x axis data we update in our animation loop.
    x = xl,
    //this variable stores temporary y axis data we update in our animation loop
    y = yl;

    //this function interacts with the canvas
    function animateLineDrawing() {
        //this  variable creates a loop.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from last loop iteration.
        c.clearRect(0, 0, 608, 608)
        //this method starts a new path.
        c.beginPath();
        //this method moves us to a starting point for oue line.
        c.moveTo(xl, yl)
        //this method indicates the end point in our line.
        c.lineTo(x, y)
        //this method sets the width of our line.
        c.lineWidth = 10;
        //this method sets the color of our line.
        c.strokeStyle = 'rgba (70, 255, 33, .8)';
        //this method draws everything we laid out above.
        c.stroke();
        //this condition checks if we've reached the endpoint.
        if (xl <= x2 && yl <= y2) {
            //this condition adds 10 to the previous end x point.
            if (x < x2) { x += 10;}
            //this condition adds 10 to the previous end y point.
            if (y < y2) { y += 10;}
            //this condition cancels our animation loop
            //if we've reach the end points.
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop); }
        }
        //this condition is similar to the one above.
        //this is necessary for the 6, 4, 2 win condition
        if (xl <= x2 && yl >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    //this function clears our canvas after our win line is drawn.
    function clear() {
        //this line starts our animation loop.
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas.
        c.clearRect(0, 0, 608, 608);
        //this line stops our animation loop.
        cancelAnimationFrame(animationLoop);
    }
    //this line disallows clicking while the win sound is playing.
    disableClick();
    //this line plays the win sounds.
    audio('./media/winGame.mp3');
    //this line calls our main animation loop.
    animateLineDrawing();
    //this line waits 1 second. then, clears canvas, resets game, and allows clicking again.
    setTimeout(function () {clear(); resetGame(); }, 1000);
}

//this function resets the game in the event of a tie or a win
function resetGame() {
    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //this variable gets the html element of i.
        let square = document.getElementById(string(i))
        //this removes our elements backgroundImage.
        square.style.backgroundImage = ''
    }
    //this resets our array so it is empty and we can start over.
    selectSquares = [];
}
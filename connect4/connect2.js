let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");

drawboard();




function dropblock(event){
    console.log("This allows user to drop block on click")
}

function drawboard(){
    graphics.beginPath();
    graphics.roundRect(365,100,530,430,10);
    graphics.fillStyle = '#94d5fdff';
    graphics.fill();
    graphics.strokeStyle = '#2da6f1ff';
    graphics.lineWidth = 5;

    graphics.stroke();
}

function drawblock(){
    console.log("This draws a yellow circle")
}

function drawblock(){
    console.log("This draws a red circle")
}

function checkwin(){
    console.log("Checks to see if there is four in a row")
}


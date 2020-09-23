/* eslint-disable */
var ctx;
var x = 0;
var y = 0;
var noOfDrops = 50;
var fallingDrops = [];

let images = ['2C', '3D', "5D", "6S"]

function draw() {

    let canvas = document.getElementById('bg-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    for (var i=0; i< noOfDrops; i++)
    {
        let w = 50;
        let h = 90;
        ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y, w, h); //The rain drop
        fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
        if (fallingDrops[i].y > canvas.height) {  //Repeat the raindrop when it falls out of view
            fallingDrops[i].y = -25 //Account for the image size
            fallingDrops[i].x = Math.random() * canvas.width;    //Make it appear randomly along the width
        }
    }
}

function getCard(){
    let pic = images[Math.floor(Math.random() * (images.length))];
    return require('./cards/'+pic+'.png')
}

export function setup(){
    let canvas = document.getElementById('bg-canvas');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log("test")
    console.log(canvas.getContext)

    if (canvas.getContext) {

        console.log("test")

        ctx = canvas.getContext('2d');
        setInterval(draw, 30);

        for (var i = 0; i < noOfDrops; i++) {
            var fallingDr = {};
            fallingDr["image"] =  new Image();
            fallingDr.image.src = getCard();
            fallingDr["x"] = Math.random() * canvas.width;
            fallingDr["y"] = Math.random() * -400;
            fallingDr["speed"] = 1.5 + Math.random() * 2.5;
            fallingDrops.push(fallingDr);
        }

    }
}




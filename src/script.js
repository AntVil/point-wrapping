let canvas;
let ctxt;

let algorithm;

window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = function(){
    initAlgorithm();
    randomPoints();

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxt = canvas.getContext("2d");
    canvas.addEventListener("click", function(e){
        let x = e.clientX / canvas.width;
        let y = e.clientY / canvas.height;
        algorithm.addPoint([x, y]);
    });

    update()
    requestAnimationFrame(render);
}

function initAlgorithm(){
    let chosenAlgorithm = document.getElementById("algorithm").value;
    if(chosenAlgorithm == "graham-scan"){
        algorithm = new GrahamScan();
    }else if(chosenAlgorithm == "gift-wrapping"){
        algorithm = new GiftWrapping();
    }else if(chosenAlgorithm == "quickhull"){
        algorithm = new Quickhull();
    }else{

    }
    randomPoints();
}

function randomPoints(){
    let points = [];
    let pointsAmount = parseInt(document.getElementById("points-amount").value);
    for(let i=0;i<pointsAmount;i++){
        let angle = 2 * Math.PI * Math.random();
        let distance = 0.5 * Math.random() * Math.random();
        let x = 0.5 + Math.cos(angle) * distance;
        let y = 0.5 + Math.sin(angle) * distance;
        points.push([x, y]);
    }
    algorithm.setPoints(points);
}

function reset(){
    algorithm.reset();
}

function run(){
    algorithm.setRunning(true);
}

function halt(){
    algorithm.setRunning(false);
}

function update(){
    algorithm.update();

    setTimeout(update, 1000 - parseInt(document.getElementById("speed").value))
}

function render(){
    ctxt.fillStyle = "#111111";
    ctxt.fillRect(0, 0, canvas.width, canvas.height);

    algorithm.render(ctxt, canvas.width, canvas.height);

    requestAnimationFrame(render);
}

class Algorithm{
    constructor(){
        this.points = [];
        this.running = false;
    }

    reset(){

    }
    
    update(){

    }

    render(ctxt, width, height){
        ctxt.fillStyle = "#FFFFFF";
        for(let point of this.points){
            ctxt.beginPath();
            ctxt.arc(width * point[0], height * point[1], 3, 0, 2*Math.PI);
            ctxt.fill();
        }
    }

    setPoints(points){
        this.points = points;
    }

    addPoint(point){
        this.points.push(point);
    }

    setRunning(running){
        this.running = running;
    }
}

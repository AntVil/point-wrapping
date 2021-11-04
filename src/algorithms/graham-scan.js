class GrahamScan extends Algorithm{
    constructor(){
        super();
        this.reset();
    }

    reset(){
        this.stack = [0];
        this.index = 1;
        this.state = "upper";
    }

    update(){
        super.update();
        if(this.running){
            if(this.state == "upper"){
                if(this.stack.length >= 2 && this.pointLeftofLine(this.stack[this.stack.length-2], this.stack[this.stack.length-1], this.index)){
                    this.stack.pop()
                }else{
                    this.stack.push(this.index);
                    if(this.index >= this.points.length - 1){
                        this.index--;
                        this.state = "lower";
                    }else{
                        this.index++;
                    }
                }
            }else if(this.state == "lower"){
                if(this.stack.length >= 2 && this.pointLeftofLine(this.stack[this.stack.length-2], this.stack[this.stack.length-1], this.index)){
                    this.stack.pop()
                }else{
                    this.stack.push(this.index);
                    this.index--;
                    if(this.index < 0){
                        this.state = "done";
                    }
                }
            }
        }
    }

    render(ctxt, width, height){
        super.render(ctxt, width, height);

        if(this.stack.length !== 0){
            ctxt.strokeStyle = "#FF9900";
            ctxt.fillStyle = "#FFFF0044";
            ctxt.beginPath();
            ctxt.moveTo(width * this.points[this.stack[0]][0], height * this.points[this.stack[0]][1]);
            for(let i=1;i<this.stack.length;i++){
                ctxt.lineTo(width * this.points[this.stack[i]][0], height * this.points[this.stack[i]][1]);
            }
            ctxt.stroke();
            ctxt.fill();
        }
    }

    setPoints(points){
        super.setPoints(points.sort(function(a, b){
            return a[0] - b[0];
        }));
        this.reset();
    }

    addPoint(point){
        super.addPoint(point);
        this.points.sort(function(a, b){
            return a[0] - b[0];
        });
        this.reset();
    }

    pointLeftofLine(lineIndex1, lineIndex2, pointIndex){
        return this.points[pointIndex][0] * this.points[lineIndex1][1] + this.points[lineIndex1][0] * this.points[lineIndex2][1] + this.points[lineIndex2][0] * this.points[pointIndex][1] - (this.points[lineIndex1][1] * this.points[lineIndex2][0] + this.points[lineIndex2][1] * this.points[pointIndex][0] + this.points[pointIndex][1] * this.points[lineIndex1][0]) < 0;
    }
}

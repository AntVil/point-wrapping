class Quickhull extends Algorithm{
    constructor(){
        super();
        this.reset();
    }

    reset(){
        this.lines = [[0, this.points.length-1], [this.points.length-1, 0]];
        this.lineSegment = 0;
        this.i = 0;
        this.index = -1;
        this.maxDistance = 0;
    }

    update(){
        let flag = true;
        super.update();
        if(this.running){
            if(this.lineSegment < this.lines.length){
                if(this.i < this.points.length){
                    while(this.i < this.points.length && !this.pointLeftofLine(this.lines[this.lineSegment][0], this.lines[this.lineSegment][1], this.i)){
                        this.i++;
                    }
                    if(this.i < this.points.length){
                        let distance = this.distancePointLine(this.lines[this.lineSegment][0], this.lines[this.lineSegment][1], this.i);
                        if(distance > this.maxDistance){
                            this.index = this.i;
                            this.maxDistance = distance;
                        }
                    }
                    this.i++;
                }else{
                    if(this.index === -1 || this.maxDistance < 1e-6){
                        this.lineSegment++;
                        if(this.lineSegment >= this.lines.length){
                            return;
                        }
                    }else{
                        let line = this.lines.splice(this.lineSegment, 1)[0];
                        this.lines.push([line[0], this.index]);
                        this.lines.push([this.index, line[1]]);
                    }
                    this.index = -1;
                    this.i = 0;
                    this.maxDistance = 0;
                }
                
                while(this.i < this.points.length && !this.pointLeftofLine(this.lines[this.lineSegment][0], this.lines[this.lineSegment][1], this.i)){
                    this.i++;
                }
            }
        }
    }

    render(ctxt, width, height){
        super.render(ctxt, width, height);
        
        if(this.i < this.points.length){
            ctxt.fillStyle = "#FF990099";
            ctxt.beginPath();
            ctxt.arc(width * this.points[this.i][0], height * this.points[this.i][1], 5, 0, 2*Math.PI);
            ctxt.fill();
        }

        if(this.index > 0){
            ctxt.fillStyle = "#FF9900";
            ctxt.beginPath();
            ctxt.arc(width * this.points[this.index][0], height * this.points[this.index][1], 5, 0, 2*Math.PI);
            ctxt.fill();
        }
        
        for(let i=0;i<this.lines.length;i++){
            if(i == this.lineSegment){
                ctxt.strokeStyle = "#0099FF";
            }else{
                ctxt.strokeStyle = "#FF9900";
            }
            ctxt.beginPath();
            ctxt.moveTo(width * this.points[this.lines[i][0]][0], height * this.points[this.lines[i][0]][1]);
            ctxt.lineTo(width * this.points[this.lines[i][1]][0], height * this.points[this.lines[i][1]][1]);
            ctxt.stroke();
        }

        if(this.lineSegment < this.lines.length){
            for(let i=0;i<this.points.length;i++){
                if(this.pointLeftofLine(this.lines[this.lineSegment][0], this.lines[this.lineSegment][1], i)){
                    ctxt.fillStyle = "#0099FF";
                    ctxt.beginPath();
                    ctxt.arc(width * this.points[i][0], height * this.points[i][1], 3, 0, 2*Math.PI);
                    ctxt.fill();
                }
            }
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

    distancePointLine(lineIndex1, lineIndex2, pointIndex){
        let a = (this.points[lineIndex1][1] - this.points[lineIndex2][1]);
        let b = -(this.points[lineIndex1][0] - this.points[lineIndex2][0]);
        let c = -(a * this.points[lineIndex1][0] + b * this.points[lineIndex1][1]);
        return Math.abs(a*this.points[pointIndex][0] + b*this.points[pointIndex][1] + c) / Math.hypot(a, b);
    }
}

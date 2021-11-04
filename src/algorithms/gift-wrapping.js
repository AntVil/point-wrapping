class GiftWrapping extends Algorithm{
    constructor(){
        super();
        this.reset();
    }

    reset(){
        this.line = [0];
        this.index = 0;
        this.i = 0;
        this.bestAngle = -Infinity;
    }

    update(){
        super.update();
        if(this.running){
            if(this.line[0] !== this.line[this.line.length-1] || this.line.length < 2){
                if(this.i<this.points.length){
                    let angle;
                    if(this.line.includes(this.points.length-1)){
                        angle = -Math.atan2(this.points[this.i][0] - this.points[this.line[this.line.length-1]][0], -(this.points[this.i][1] - this.points[this.line[this.line.length-1]][1]));
                    }else{
                        angle = Math.atan2(this.points[this.i][0] - this.points[this.line[this.line.length-1]][0], this.points[this.i][1] - this.points[this.line[this.line.length-1]][1]);
                    }
                    if(this.bestAngle < angle && this.i !== this.line[this.line.length-1]){
                        this.index = this.i;
                        this.bestAngle = angle;
                    }
                    this.i++;
                }else{
                    this.line.push(this.index);
                    this.i = 0;
                    this.bestAngle = -Infinity;
                    this.index = 0;
                }
            }
        }
    }

    render(ctxt, width, height){
        super.render(ctxt, width, height);

        if(this.line.length !== 0){
            ctxt.strokeStyle = "#FF9900";
            ctxt.fillStyle = "#FFFF0044";
            ctxt.beginPath();
            ctxt.moveTo(width * this.points[this.line[0]][0], height * this.points[this.line[0]][1]);
            for(let i=1;i<this.line.length;i++){
                ctxt.lineTo(width * this.points[this.line[i]][0], height * this.points[this.line[i]][1]);
            }
            ctxt.stroke();
            ctxt.fill();
            
            if(this.i < this.points.length){
                ctxt.strokeStyle = "#FF990066";
                
                ctxt.beginPath();
                ctxt.moveTo(width * this.points[this.line[this.line.length-1]][0], height * this.points[this.line[this.line.length-1]][1]);
                ctxt.lineTo(width * this.points[this.i][0], height * this.points[this.i][1]);
                ctxt.stroke();
            }

            ctxt.strokeStyle = "#FF9900AA";
            
            ctxt.beginPath();
            ctxt.moveTo(width * this.points[this.line[this.line.length-1]][0], height * this.points[this.line[this.line.length-1]][1]);
            ctxt.lineTo(width * this.points[this.index][0], height * this.points[this.index][1]);
            ctxt.stroke();
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
}

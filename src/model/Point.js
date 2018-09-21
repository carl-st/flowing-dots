class Point {
    constructor () {
        this.circleFillColor = '#ffffff';
        this.circleStrokeColor = '#000000'; 
        this.size = 5;
        this.distances = [];
        this.neighbours = [];
        this.collection = null;
        this.direction = (Math.random() * 2 % 2 > 1) ? -1 : 1;
        this.x = 0;
        this.y = 0;
        this.dx = Math.random() * 0.5 * this.direction;
        this.dy = Math.random() * 0.5 * this.direction;
    };

    step = (collection, canvas) => {

        this.x = (this.x * 1) + this.dx;
        this.y = (this.y * 1) + this.dy;

        if ((this.x > canvas.width) || (this.x < 0)) this.dx = -this.dx;
        if ((this.y > canvas.height)  || (this.y < 0)) this.dy =  -this.dy;

        this.collection = collection;
    }

    computeNeighbours = () => {
        if (this.collection == null)  {
            return;
        }

        const collection = this.collection;
        this.distances = [];
        collection.forEach((point, index) => {
            if (point.x != this.x && point.y != this.y) {
                const distance =  Math.sqrt(Math.pow((this.x - point.x), 2) + Math.pow((this.y - point.y), 2));
                const distanceForPoint = {
                    index,
                    point,
                    distance
                };
                this.distances.push(distanceForPoint);
            }
        });

        this.distances.sort((a, b) => { 
            let defaultReturn = 0;
            if (a.distance < b.distance) {
                defaultReturn = -1;
            }

            if (a.distance > b.distance) {
                defaultReturn = 1;
            } 

            return defaultReturn;
        });
        
        this.neighbours = this.distances.slice(0, 3);
    }

    render = (context, config) => {
        this.computeNeighbours();
        context.beginPath();  
        this.neighbours.forEach(neighbour => {
            const { point: { x, y }, distance } = neighbour;
            const opacity = Math.max(0, 1 - (distance / 300));
            context.moveTo(this.x, this.y);
            context.lineTo(x, y);
            context.strokeStyle = `rgba(255, 112, 140, ${opacity})`; 
            context.lineWidth = opacity;
        });
        context.closePath();
        context.stroke();  

        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fillStyle = this.circleFillColor;
        context.strokeStyle = this.circleStrokeColor;
        context.lineWidth = 2;
        context.fill();
        context.stroke();
    }

}

export default Point;
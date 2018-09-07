class Point {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.velocity = 0;
        this.distances = [];
        this.neighbours = [];
        this.randomization = 0;
        this.collection = null;
        this.direction = (Math.random() * 2 % 2 > 1) ? -1 : 1;
        this.dx = Math.random() * 1 * (Math.random() * 2 % 2 > 1) ? -1 : 1;
        this.dy = Math.random() * 1 * (Math.random() * 2 % 2 > 1) ? -1 : 1;
    };

    step = (collection, canvas) => {

        this.x = (this.x * 1) + this.dx;
        this.y = (this.y * 1) + this.dy;

        if (this.x > canvas.width) this.dx = -this.dx;
        if (this.x < 0) this.dx =   -this.dx;
        if (this.y > canvas.height) this.dy =  -this.dy;
        if (this.y < 0) this.dy =  -this.dy;
 
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
                const distanceForPoint = {
                    index,
                    point,
                    distance: Math.sqrt( 
                        Math.pow((this.x - point.x), 2) + Math.pow((this.y - point.y), 2)
                    )
                };
                this.distances.push(distanceForPoint);
            }
        });

        // console.log('distances: ', this.distances);

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

    render = context => {
        this.computeNeighbours();

        context.beginPath();  
        this.neighbours.forEach(neighbour => {
            const { point: { x, y }, distance } = neighbour;
            context.moveTo(this.x, this.y);
            context.lineTo(x, y);
            context.strokeStyle = '#ff708c';
            context.lineWidth = 0.20 + 5 / distance;
            
        });
        context.closePath();
        context.stroke();  

        context.beginPath();
        context.arc(this.x, this.y, this.size * this.velocity, 0, 2 * Math.PI, false);
        context.fillStyle = '#262626';
        context.strokeStyle = '#ff708c';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
    }

}

export default Point;
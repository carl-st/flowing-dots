import './../styles/main.scss';
import { globalConstants } from './../constants/';
import Point from './Point';

const canvas = document.getElementById("background-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const pointsNumber = 50;
const points = [];

const animationTimeout = callback => {
    window.setTimeout(callback, 1000 / 23);
};

window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame 
    || window.mozRequestAnimationFrame    
    || animationTimeout(callback);
})();

const render = () => {
    context.save();

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    points.forEach(point => {
        point.render(context);
    });

    context.restore();
};

const animate = () => {

    points.forEach(point => {
        point.step(points, canvas);
    });

    requestAnimFrame(animate);
    render();
};

const init = () => {

    for (let x = 0; x < pointsNumber; x++){
        let newPoint = new Point();
        console.log(canvas.width);
        newPoint.size = (Math.random() * (3 - 0.5) + 0.5).toFixed(2) * 1;
        newPoint.x = (Math.random() * canvas.width).toFixed(0) * 1;
        newPoint.y = (Math.random() * canvas.height).toFixed(0) * 1;
        newPoint.direction = (Math.random() * 360).toFixed(2) * 1;
        newPoint.velocity = (Math.random() * (4 - 0.1) + 0.2).toFixed(2) * 1;
        newPoint.randomization = (Math.random() * (10 - 0) + 0).toFixed(2) * 1;
        console.log(newPoint);
        points.push(newPoint);
    }

    animate();
};

init();

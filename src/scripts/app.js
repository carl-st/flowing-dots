import './../styles/main.scss';
import { Point } from './../model';

const canvas = document.getElementById("background-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const pointsNumber = 25;
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
        newPoint.x = (Math.random() * canvas.width).toFixed(0) * 1;
        newPoint.y = (Math.random() * canvas.height).toFixed(0) * 1;
        points.push(newPoint);
    }

    animate();
};

init();

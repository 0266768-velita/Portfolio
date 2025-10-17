
const COLORS = {
    background: '#f1faee',       
    faceBorder: '#a8dadc',       
    innerShadow: '#457b9d',     
    numbers: '#1d3557',          
    hourHand: '#1d3557',         
    minuteHand: '#457b9d',       
    secondHand: '#e63946',     
    centerDot: '#1d3557'         
};


function initializeClock() {
    var canvas = document.getElementById("canvas");

    if (!canvas) {
        setTimeout(initializeClock, 50);
        return; 
    }

    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2; 
    
    
    ctx.translate(radius, radius);
    radius = radius * 0.90; 
    
    
    drawClock(ctx, radius);
    setInterval(() => drawClock(ctx, radius), 1000);
}


function drawClock(ctx, radius) {
   
    drawFace(ctx, radius); 
    drawMarkers(ctx, radius); 
    drawTime(ctx, radius);
    drawCentralDot(ctx, radius); 
}


function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = COLORS.background;
    ctx.fill();

    var innerGrad = ctx.createRadialGradient(0, 0, radius * 0.7, 0, 0, radius * 1.0);
    innerGrad.addColorStop(0, 'rgba(0,0,0,0)');
    innerGrad.addColorStop(0.9, 'rgba(0,0,0,0.05)');
    innerGrad.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = innerGrad;
    ctx.fill();

    var borderGrad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    borderGrad.addColorStop(0, COLORS.faceBorder);
    borderGrad.addColorStop(0.5, COLORS.background);
    borderGrad.addColorStop(1, COLORS.innerShadow);
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = radius * 0.05; 
    ctx.stroke();
}


function drawMarkers(ctx, radius) {
    ctx.strokeStyle = COLORS.numbers;
    ctx.lineWidth = radius * 0.01; 
    
    
    for (let num = 0; num < 12; num++) {
        let ang = num * Math.PI / 6; 
        ctx.rotate(ang);
        
        ctx.beginPath();
        ctx.moveTo(0, -radius * 0.85); 
        ctx.lineTo(0, -radius * 0.95); 
        ctx.stroke();
        ctx.rotate(-ang); 
    }

   
    ctx.lineWidth = radius * 0.005;
    for (let num = 0; num < 60; num++) {
        if (num % 5 !== 0) { 
            let ang = num * Math.PI / 30; 
            ctx.rotate(ang);
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.90);
            ctx.lineTo(0, -radius * 0.93);
            ctx.stroke();
            ctx.rotate(-ang);
        }
    }
}



function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = hour % 12;
    var hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hourAngle, radius * 0.4, radius * 0.06, COLORS.hourHand);


    var minuteAngle = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minuteAngle, radius * 0.65, radius * 0.04, COLORS.minuteHand);


    var secondAngle = (second * Math.PI / 30);
    drawHand(ctx, secondAngle, radius * 0.75, radius * 0.015, COLORS.secondHand);
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    

    var handGrad = ctx.createLinearGradient(0, 0, 0, -length);
    handGrad.addColorStop(0, 'rgba(0,0,0,0.1)'); 
    handGrad.addColorStop(0.5, color);
    handGrad.addColorStop(1, color);

    ctx.strokeStyle = handGrad;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


function drawCentralDot(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.03, 0, 2 * Math.PI); 
    ctx.fillStyle = COLORS.centerDot;
    ctx.fill();

   
    ctx.strokeStyle = COLORS.background;
    ctx.lineWidth = radius * 0.005;
    ctx.stroke();
}



initializeClock();
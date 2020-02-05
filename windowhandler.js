//as close to oob as i can find online


//globals
var HEIGHT = 800;
var WIDTH = 1200;
var ctx;
var tps = 30;
var tickRate;
var pendulum1;
var pendulum2;
var gravity = 1;
var paused = true;
var data = []
var graph;
//functions
var px;
var py;

//util functions

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function degToRad(angle){
    var x =180;
    return (Math.PI*angle/x);
    
    
}


function start(){
//VARS FROM SLIDERS :()
 
    
    
    
    
    
    
    
    
    
const canvas = document.getElementById('window');
ctx = canvas.getContext('2d');
graph = document.getElementById("graph").getContext("2d");
graph2 = document.getElementById("graph2").getContext("2d");
    
    
   
canvas.style.backgroundColor = "white";
ctx.translate(600,300)
    ctx.scale(1,1)
graph.fillStyle = "white";
graph.strokeStyle = "black";
graph.fillRect(0,0,400,400);
//graph handling
graph.translate(200,200);
graph.beginPath();
graph.moveTo(-10000,0);
graph.lineTo(10000,0);
graph.stroke();
graph.closePath();
graph.beginPath();
graph.moveTo(0,-10000);
graph.lineTo(0,10000);
graph.stroke();
graph.closePath();
graph.fillStyle = "blue"
    
    
graph.scale(75,-75)
//graph2 
graph2.fillStyle = "white";
graph2.strokeStyle = "black";
graph2.fillRect(0,0,400,400);
//graph handling
graph2.translate(200,200);
graph2.beginPath();
graph2.moveTo(-10000,0);
graph2.lineTo(10000,0);
graph2.stroke();
graph2.closePath();
graph2.beginPath();
graph2.moveTo(0,-10000);
graph2.lineTo(0,10000);
graph2.stroke();
graph2.closePath();
graph2.fillStyle = "blue";
graph2.strokeStyle = "blue";    

graph2.scale(75,-750)
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
var tickMs = 1000/tps;
tickRate = 1/tps;

    
//WHERE START CODE GOES    
pendulum1 = new Pendulum(150,20,20);
pendulum1.setPos(0,0)
//pendulum1.accelleration =0.001;


    
pendulum2 = new Pendulum(150,20,20);
pendulum2.x = pendulum1.returnEndPoint()[0];
pendulum2.y = pendulum1.returnEndPoint()[1];
pendulum2.angle = Math.PI/4
   // pendulum2.accelleration =-0.001;
//SLIDER TIME
    
var m1Slider = document.getElementById("m1");
m1Slider.oninput = function() {
  pendulum1.mass = this.value;
} 
var m2Slider = document.getElementById("m2");
m2Slider.oninput = function() {
  pendulum2.mass = this.value;
} 
var a1Slider = document.getElementById("a1");
a1Slider.oninput = function() {
    pendulum1.angle = (this.value*2*Math.PI/100);
    pendulum2.x = pendulum1.returnEndPoint()[0];
    pendulum2.y = pendulum1.returnEndPoint()[1];
} 
var a2Slider = document.getElementById("a2");
a2Slider.oninput = function() {
  pendulum2.angle =(this.value*2*Math.PI/100);;
} 
var l1Slider = document.getElementById("l1");
l1Slider.oninput = function() {
  pendulum1.length = this.value;
   pendulum2.x = pendulum1.returnEndPoint()[0];
pendulum2.y = pendulum1.returnEndPoint()[1];
} 
var l2Slider = document.getElementById("l2");
l2Slider.oninput = function() {
  pendulum2.length = this.value;
} 
  
    
var gSlider = document.getElementById("g");
gSlider.oninput = function() {
  gravity = this.value;
} 
var pause = document.getElementById("pause");
pause.oninput = function(){
    pendulum1.accelleration = 0;
    pendulum1.velocity= 0;
    pendulum2.accelleration = 0;
    pendulum2.velocity= 0;
    paused = this.value;
}
    
    
px = pendulum1.angle;
py = pendulum2.angle;  
pv = pendulum2.velocity;
    graph.strokeStyle = "blue"
setInterval(main,tickMs);
}



//Main
function main(){
    ctx.fillStyle = "white";
    ctx.fillRect(-1000,-1000,2000,2000);
    if( document.getElementById("pause").checked == false){
        var drawLine = true;
  
        pendulum1.accelleration = pendulum1Maths(pendulum1,pendulum2)
       // console.log(pendulum1.accelleration)
        pendulum1.update();
        pendulum2.x = pendulum1.returnEndPoint()[0];
        pendulum2.y = pendulum1.returnEndPoint()[1];
        pendulum2.accelleration = pendulum2Maths(pendulum1,pendulum2);
        //console.log(pendulum2.accelleration);
        pendulum2.update();
        //console.log("P1 x: "+pendulum1.x+" y: "+pendulum1.y);
        //console.log("P2 x: "+pendulum2.x+" y: "+pendulum2.y);
        
        //angle tuning for data collection
        if(pendulum1.angle > Math.PI){
            pendulum1.angle -= 2* Math.PI
            drawLine = false;
            
        }
        if(pendulum1.angle < -Math.PI){
            pendulum1.angle += 2* Math.PI
             drawLine = false;
        }
        if(pendulum2.angle > Math.PI){
            pendulum2.angle -= 2* Math.PI
             drawLine = false;
        }
        if(pendulum2.angle < -Math.PI){
            pendulum2.angle += 2* Math.PI
             drawLine = false;
        }
        console.log(pendulum2.angle)
        data.push([pendulum1.angle,pendulum2.angle])
        graph.fillRect( pendulum1.angle, pendulum2.angle, 0.01, 0.01 );
        graph.lineWidth = 0.01;
        graph2.lineWidth = 0.01;
        if(drawLine){
        graph.beginPath();
        graph.moveTo(px,py);
        graph.lineTo(pendulum1.angle,pendulum2.angle);
        graph.stroke();
        graph.closePath()
        graph2.beginPath();
        graph2.moveTo(py,pv);
        graph2.lineTo(pendulum2.angle,pendulum2.velocity);
        graph2.stroke();
        graph2.closePath() 
            
            
            
        }
        pv = pendulum2.velocity;
        px = pendulum1.angle;
        py = pendulum2.angle;
        }else{
        pendulum2.x = pendulum1.returnEndPoint()[0];
        pendulum2.y = pendulum1.returnEndPoint()[1];
            
            
            

            
        }
            
        
    drawPendulum(pendulum1,"green")
    drawPendulum(pendulum2,"blue")
}

//drawing
function drawPendulum(pendulum,colour){
    ctx.fillStyle = "black"
    //get x and ys of pendulum
    x1 = pendulum.x;
    y1 = pendulum.y;
    
    x2 = pendulum.returnEndPoint()[0];
    y2 = pendulum.returnEndPoint()[1];
    mass = pendulum.mass;
    //draw line or string part
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
    //doing ball at the end
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.moveTo(x2,y2);
    ctx.ellipse(x2,y2,mass,mass,0,0,Math.PI*2,false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}



function pendulum1Maths(p1,p2){
  
    let g = gravity;
    let a1 = p1.angle;
    let a2 = p2.angle;
    let m1 = p1.mass;
    let m2 = p2.mass;
    let r1 = p1.length;
    let r2 = p2.length;
    let a1_v = p1.velocity;
    let a2_v = p2.velocity;
    
    
    
    let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    let num3 = -2 * Math.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    if(den!=0){
    let a1_a = (num1 + num2 + num3 * num4) / den;
    return a1_a;
    }else{
        console.log("p1 issue")
        return 0;
    }
    
}

function pendulum2Maths(p1,p2){
      let g = gravity;
    let a1 = p1.angle;
    let a2 = p2.angle;
    let m1 = p1.mass;
    let m2 = p2.mass;
    let r1 = p1.length;
    let r2 = p2.length;
    let a1_v = p1.velocity;
    let a2_v = p2.velocity;
    
    let num1 = 2 * Math.sin(a1 - a2);
    let num2 = (a1_v * a1_v * r1 * (m1 + m2));
    let num3 = g * (m1 + m2) * Math.cos(a1);
    let num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    let den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    if(den!=0){
    let a2_a = (num1 * (num2 + num3 + num4)) / den;
    return a2_a;
    }else{
        console.log("p2 issue")
        return 0;
    }
    
}






//classes
class Pendulum{
    constructor(length,angle,mass){
        this.length = length;
        this.mass = mass;
        this.angle = angle;
        this.accelleration = 0;
        this.velocity = 0;
        this.x=0;
        this.y = 0;
    }
    setPos(x,y){
        this.x=x;
        this.y=y;
    }
    
    returnEndPoint(){
        //console.log("the angle is "+this.angle,"In radians is ",degToRad(this.angle))
        return [this.x+Math.sin(this.angle)*this.length,this.y+Math.cos(this.angle)*this.length]
        
    }
    update(){
        this.velocity += this.accelleration;
        this.angle += this.velocity;
        

        
        
    }

}











document.addEventListener('DOMContentLoaded', start) //just waits for everything to load first before it does anything c:

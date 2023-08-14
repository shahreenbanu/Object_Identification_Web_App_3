Status = "";
desktop_image = "";
var objects=[];
function preload(){
    desktop_image = loadImage("desktop.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(desktop_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(desktop_image,0,0,640,350);
    stroke("red");
    noFill();
    if(Status != "") {
        for(i = 0; i < objects.length; i++) {
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
            text(objects[i].label,objects[i].x-10 ,objects[i].y-210);
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("objects").innerHTML = "COCOSSD Model detected " + objects.length + " objects";
           
        }
    }
}
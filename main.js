Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image_captured" src="'+data_uri+'">';    });
}

console.log("ml5.version",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/27OZ0bvNt/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function predict(){
    img=document.getElementById('image_captured');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
        document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(4); 
    }
}
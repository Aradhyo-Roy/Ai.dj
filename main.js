song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song=loadSound("music.mp3");
}
score_left_wrist=0;
score_right_wrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);
     fill('#ff0000');
     stroke('#ff0000');
     if (score_right_wrist>0.2) {
         circle(rightWristX,rightWristY,20);
         if (rightWristY>0 && rightWristY<=100) {
             document.getElementById("speed").innerHTML="Speed = 0.5x";
             song.rate(0.5);
         }
         if (rightWristY>100 && rightWristY<=200) {
             document.getElementById("speed").innerHTML="Speed = 1x";
             song.rate(1);
         }
         if (rightWristY>200 && rightWristY<=300) {
             document.getElementById("speed").innerHTML="Speed = 1.5x";
             song.rate(1.5);
         }
         if (rightWristY>300 && rightWristY<=400) {
             document.getElementById("speed").innerHTML="Speed = 2x";
             song.rate(2);
         }
         if (rightWristY>400 && rightWristY<=500) {
             document.getElementById("speed").innerHTML="Speed = 2.5x";
             song.rate(2.5);
         }
     }
     if (score_left_wrist>0.2) {
         circle(leftWristX,lefttWristY,20);
         InNumberleftWristY=Number(leftWristY);
         remove_decimels=floor(InNumberleftWristY);
         volume=remove_decimels/1000;
         document.getElementById("volume").innerHTML="Volume = " + volume;
         song.setVolume(volume);
     }
}
function modelLoaded(){
    console.log("Posenet is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[10].score;
        score_right_wrist=results[0].pose.keypoints[9].score;
        console.log(scoreRightWrist =+"score_right_wrist = "+score_right_wrist+ "score_left_wrist ="+ score_left_wrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY)

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY)
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
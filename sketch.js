var ball;

var mydatabase, ball_position, position;

function setup(){
    createCanvas(500,500);

    mydatabase = firebase.database();


    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ball_position = mydatabase.ref('Ball/Position');
    ball_position.on("value", readPosition, showError) //polling/listening

}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    mydatabase.ref('Ball/Position').set({

        x : ball_position.x + x,
        y : ball_position.y + y


    })
}

function readPosition(data){

    position = data.val();
    console.log(position);

    ball_position.x = position.x;
    ball_position.y = position.y;
}

function showError(){
    console.log("error accessing database");

}
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence(){
    level++;
    $('h1').text("Level "+ level);
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Creating a flash
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);    
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function(){
    if(gamePattern.length === 0)
        nextSequence();
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('sucess');
        if(currentLevel == gamePattern.length - 1){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else{
       var wrong = new Audio('/sounds/wrong.mp3');
       wrong.play();
       $('body').addClass("game-over");

       setTimeout(function(){
        $('body').removeClass("game-over");
       },200);

       $('h1').text("Game Over, Press Any Key to Restart");
       level = 0;
       gamePattern = [];
       userClickedPattern = [];
    }
        
}
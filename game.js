// PREDEFINED ARRAY OF COLOURS.
var buttonColours = ["red", "blue", "green", "yellow"];
// ADDING randomChosenColour TO gamePattern ARRAY.
var gamePattern = [];
// ARRAY OF CHOSEN COLORS ID.
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if(!started)
  {
    $("#level-title").text("Level" + level);

    nextSequence();
    started = true;
  }
});


// CALLING A ANONYMOUS FUNCTION AFTER CLICKING ANY OF THE BUTTONS.
// STORING THE ID OF THE BUTTON CLICKED IN userClickedPattern ARRAY.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () { nextSequence(); }, 1000);
      }
  }
  else
  {
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();

    $("body").addClass("game-over");

    setTimeout(function() { $("body").removeClass("game-over");}, 300);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}


// DEFINING A FUNCTION NAMED NEXTSEQUENCE() TO CHOOSE A RANDOM NUMBER BETWEEN 0-3.
// ADDING A FLASH EFFECT WHEN THE BUTTON IS SELECTED.
// PLAYING SOUND RELATED TOO THE COLOR(RED,BLUE,GREEN,YELLOW) OF THE CHOSEN BUTTON.
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomChosenColour);
}


// FUNCTION FOR PLAYING SOUND WHEN USER CLICKS BUTTON
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// ADDING FLASH EFFECT WHEN THE BUTTON IS PRESSED
// pressed CLASS IS ADDED AND REMOVED AFTER SPECIFIC TIME PERIOD
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() { $("#" + currentColor).removeClass("pressed");}, 200);
}


function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}

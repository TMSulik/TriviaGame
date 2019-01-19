
  var CONTENTS = [
    {
      question: "What is the first element on the periodic table?",
      answers: {
        Hydrogen: true,
        Carbon: false,
        Graphite: false,
        Helium: false
      },
      gif: "https://giphy.com/embed/urp8cVywl1Sk8"
    },
    {
      question: "Which planet has the most moons?",
      answers: {
        Earth: false,
        Uranus: false,
        Jupiter: true,
        Saturn: false
      },
      gif: "https://giphy.com/embed/dbopGHCaI2zsY"
    },
    {
      question: "What is the world's largest active volcano?",
      answers: {
        Dukono: false,
        "Mauna Loa": true,
        "Mount St. Helens": false,
        "Mount Yasur": false
      },
      gif: "https://giphy.com/embed/r5gHt2TCIiHK0"
    },
    {
      question: "Which two elements on the periodic table are liquids at room temperature?",
      answers: {
        "Zinc and Argon": false,
        "Hydrogen and Chlorine": false,
        "Mercury and Bromine": true,
        "Uranium and Sodium": false
      },
      gif: "https://giphy.com/embed/5MvGj0HY3AD4s"
    },
    {
      question: "At what temperature are Celsius and Fahrenheit equal?",
      answers: {
        "-40 degrees": true,
        "40 degrees": false,
        "10 degrees": false,
        "-67 degrees": false
      },
      gif: "https://giphy.com/embed/26FL3uMhARSAvIZZS" 
    },
    {
      question: "What is a group of whales called?",
      answers: {
        "A Congress": false,
        "A Pod": true,
        "A Herd": false,
        "A Flock": false
      },
      gif: "https://giphy.com/embed/QLNsIVQ25kx2g" 
    },
    {
      question: "How many time zones are there in the world?",
      answers: {
        "12": false,
        "5": false,
        "24": true,
        "100": false
      },
      gif: "https://giphy.com/embed/rVz1J8spLtUtO" 
    },
    {
      question: "How long does it take for light from the Sun to reach Earth?",
      answers: {
        "23 minutes 2 seconds": false,
        "8 minutes 20 seconds": true,
        "Less than a minute": false,
        "15 minutes 48 seconds": false
      },
      gif: "https://giphy.com/embed/ctGFLebG1AqK4" 
    },
    {
      question: "How long is an eon in geology?",
      answers: {
        "A thousand years": false,
        "A trillion years": false,
        "A million years": false,
        "A billion years": true
      },
      gif: "https://giphy.com/embed/SdZUZUxAQEmsw" 
    },
    {
      question: "At what wind speed does a tropical storm turn into a hurricane?",
      answers: {
        "152 MPH": false,
        "74 MPH": true,
        "270 MPH": false,
        "35 MPH": false
      },
      gif: "https://giphy.com/embed/HmTLatwLWpTQk" 
    },
    {
      question: "Diamonds are made up almost entirely of what element?",
      answers: {
        "Nitrogen": false,
        "Graphite": false,
        "Mennonite": false,
        "Carbon": true
      },
      gif: "https://giphy.com/embed/RFmjTxTo50pkQ" 
    },
    {
      question: "What is a meteor called when it reaches Earth's surface?",
      answers: {
        "Meteorite": true,
        "Comet": false,
        "Asteroid ": false,
        "Kryptonite": false
      },
      gif: "https://giphy.com/embed/pWhWtKdqwOAco" 
    },
    {
      question: "Who was the last man to walk on the Moon?",
      answers: {
        "Neil Armstrong": false,
        "Buzz Lightyear": false,
        "Yuri Usachov": false,
        "Captain Eugene Cernan": true
      },
      gif: "https://giphy.com/embed/69mUSKBujnpgmxcqlg" 
    }   
  ]
  
  const timeLeft = " ~ Next question in 8 seconds ~";

  var SCORE = {
    correct: 0,
    wrong: 0,
    "timed out": 0
  }

  var interval;
  var quizItem = selectAQuestionAtRandom(); 
  var rounds = 0;
  var counter = 8;
  var gameState = " ~ Next question in ";
  var feedback = "Good job! 👍";
  
  const maximumRounds = 5;
  const instructions = "<p>This game presents " + maximumRounds +  " multiple-choice questions.</p><p>You have 8 seconds to answer each question.<p>Press start button to begin!</p>";
  
  function resetVariables() {
    SCORE = {
      correct: 0,
      wrong: 0,
      "timed out": 0
    }
    rounds = 0;
    gameState = " ~ Next question in ";
  }

  function selectAQuestionAtRandom() {
    return CONTENTS[Math.floor(Math.random()*CONTENTS.length)];
  }

  function randomizeQuizItems() {
    // Declare an empty array
    var questions = [];
    // Start with a random item in the CONTENTS array
    var q = selectAQuestionAtRandom()
    // Iterate through the length of the CONTENTS array
    for(var i = 0; i < CONTENTS.length; i++) {
      // Reject repeat items
      while(questions.includes(q)) {
        q = selectAQuestionAtRandom();
      }
      // Generate the new, random array of items
      questions.push(q);
    }
    // Replace the CONTENTS array with the randomly ordered version.
    CONTENTS = questions;
  }

  function renderButtons() {
    $("#question").text(quizItem.question);
    var relevant = quizItem.answers;
    var answers = Object.keys(relevant);
    for(var i = 0; i < answers.length; i++) {
      var btn = $("<button>");
      btn.addClass("answer");
      btn.attr("correct", relevant[answers[i]]);
      btn.text(answers[i]);
      formatButton(btn);
      $("#buttons-view").append(btn);
    }
  }

  function formatButton(btn) {
    $(btn).css({ 
      width: "80%", 
      "padding-top": "10px", 
      "padding-bottom": "10px", 
      "margin-bottom": "10px",
      "font-weight": "900"
    });
  }

  function startGame() {
    randomizeQuizItems();
    advanceToNextQuestion();
  }

  function advanceToNextQuestion() {
    rounds++;
    if(rounds <= maximumRounds) { 
      startRound();
    } else {
      endGame();
    }
  }

  function displayOutcome() {
    return "<p>Correct responses: " + SCORE["correct"] + "</p><p>Wrong guesses: " + SCORE["wrong"] + "<p>Timed out: " + SCORE["timed out"] + "<p>Press start button to play again!</p>";
  }

  function endGame() {
    var outcome = displayOutcome();
    $("#timer-header").text("Final score");
    $("#timer").hide();
    $("#question-header").hide();
    $("#instructions").empty();
    $("#instructions").show();
    $("#instructions").append(outcome);
    var btn = $("<button>");
    btn.text("START NEW GAME"); 
    formatButton(btn);
    $(btn).css({
      width: "90%"
    });
    // Reset global variables at their starting point for a new game
    resetVariables();
    $("#instructions").append(btn);
    $(btn).click(function() {
      startGame();
    });
    $("#quiz-items").hide();
    $("#answer-header").text("Correct answer");
    $("#answer-header").hide();
    $("#gif-image").hide();
  }

  function startRound() {
    $("#instructions").hide();
    $("#timer-header").text("Countdown");
    $("#timer").show();
    $("#question-header").show();
    $("#question-header").text("Question #" + rounds);    
    $("#quiz-items").show();
    $("#buttons-view").empty();
    $("#answer-header").hide();
    $("#gif-image").hide();
    // Select next item from the randomized CONTENTS array
    quizItem = CONTENTS[rounds];
    renderButtons();   
    countdownDuringQuestion();
  }

  // Multiple-choice answers are object keys with values of true or false.
  // This function gives the keys based on their truth value.
  function getKeyByValue(obj, value) {
    return Object.keys(obj).find(function(key) {
      return obj[key] === value;
    });
  }

  function countdownDuringQuestion() {
    counter = 8;
    interval = setInterval(function() {
      counter--;
      $("#timer").empty();
      $("#timer").text(counter + " seconds to answer");
      if (counter == 0) {
        feedback = "Timed out ⏰"
        $("#timer").text(feedback + timeLeft);
        clearInterval(interval);
        evaluateResponse();
        SCORE["timed out"]++;
      }
    }, 1000);
  }

  function evaluateResponse() {
    clearInterval(interval);
    var correctAnswer = getKeyByValue(quizItem.answers, true);
    var responseValue = String($(this).attr("correct")); 
    if(responseValue === "true") {
      SCORE["correct"]++;
      feedback = "Good job! 👍"
      $("#timer").text(feedback + timeLeft);
    }
    if(responseValue === "false") {
      SCORE["wrong"]++;
      feedback = "Wrong guess 😩"
      $("#timer").text(feedback + timeLeft);
    }
    if(rounds === maximumRounds) {
      $("#timer").text(feedback + " ~ Game ends in 8 seconds ~");
      gameState = " ~ Game ends in ";
    }
    countdownBetweenQuestions();
    // Display a gif related to the correct answer
    var animation = quizItem.gif;
    $("#buttons-view").empty();
    $("#answer-header").show();
    $("#gif-image").text(correctAnswer);
    $("#gif-image").append('<iframe src="' + animation + '"https://giphy.com/embed/dbopGHCaI2zsY" class="giphy-embed"></iframe>');
    $("#gif-image").show();
  }

  function countdownBetweenQuestions() {
    counter = 8;
    interval = setInterval(function() {
      counter--;
      $("#timer").text(feedback + gameState + counter + " seconds ~");
      if (counter == 0) {
        $("#timer").text("8 seconds to answer");
        clearInterval(interval);
        advanceToNextQuestion();
      }
    }, 1000);
  }

  $(document).on("click", ".answer", evaluateResponse);
  
  $(document).ready(function(){
    $("#timer-header").text("Instructions");
    $("#timer").hide();
    $("#instructions").append(instructions);
    var btn = $("<button>");
    btn.text("START GAME"); 
    formatButton(btn);
    $(btn).css({
      width: "90%"
    });
    $("#instructions").append(btn);
    $(btn).click(function() {
      startGame();
    });
    $("#quiz-items").hide();
    $("#answer-header").text("Correct answer");
    $("#answer-header").hide();
    $("#gif-image").hide();
    $("#game-name").text("Science Trivia");
    $("#footer-text").text("Science Trivia Game © T.M. Sulik Promotions, LLC, 2019");
  });
(function() {
  var questions = [{
    question: "Which of the following words would you use to describe our product?",
    choices: ["Buggy", "Fine, but there are some issues", "Great", "Life-saving"],
  }, {
    question: "How well does our product meet your needs?",
    choices: ["Badly", "Fine", "Well", "Very Well"],
  }, {
    question: "How would you rate the value for money of our product?",
    choices: ["Bad", "Average", "Good"],
  }, {
    question: "How responsive have we been to your questions or concerns about our product?",
    choices: ["Very Responsive", "Usually Responsive", "Not Responsive"],
  }, {
    question: "How does our product quality compare to our competitors?",
    choices: ["Better", "The Same", "Worse"],
  }];
  
  var questionCounter = 0;
  var selections = [];
  var survey = $('#survey');
  
  displayNextQuestion();
  
  // Event Handler when user clicks "Next" button.
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    if(survey.is(':animated')) {        
      return false;
    }
    saveChoice();
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection to proceed.');
    } else {
      questionCounter++;
      displayNextQuestion();
    }
  });
  
  // Event Handler when user clicks "Prev" button.
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(survey.is(':animated')) {
      return false;
    }
    saveChoice();
    questionCounter--;
    displayNextQuestion();
  });
  
  // Event Handler when user clicks "Refresh" button.
  $('#refresh').on('click', function (e) {
    e.preventDefault();
    
    if(survey.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNextQuestion();
    $('#refresh').hide();
  });
  
  // Button animation on hover.
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates each new Question object to be appended to view.
  function createQuestionElement(index) {
    var questionElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    questionElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    questionElement.append(question);
    
    var radioButtons = displayChoices(index);
    questionElement.append(radioButtons);
    
    return questionElement;
  }
  
  // Displays the available answers as radio inputs.
  function displayChoices(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Saves user selection for each question to the data array. Can be used to create an optional results screen.
  function saveChoice() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Updates the display to show the appropriate question.
  function displayNextQuestion() {
    survey.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        survey.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          $('#refresh').hide();
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var messageElem = finalMessage();
        survey.append(messageElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#refresh').show();
      }
    });
  }
  
  // Final message after survey is completed.
  function finalMessage() {
    var message = $('<p>',{id: 'question'}); 
    message.append('Thank you for your participation!');

    // User answers are stored in the selections array. This can be used to update some DB that stores overall survey results.
    console.log(selections);

    return message;
  }
})();
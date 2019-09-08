$(document).ready(function() {
  //event listener for flashcard flip
  $('.flashcard').on('click', function() {
    $('.flashcard').toggleClass('flipped');
  });
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var flashcardId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?flashcard_id=") !== -1) {
        flashcardId = url.split("=")[1];
      getFlashcardData(flashcardId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var answerInput = $("#answer");
    var questionInput = $("#question");
    var flashcardForm = $("#flashcard");
    var flashcardSubjectSelect = $("#subject");
    // Giving the postCategorySelect a default value
    flashcardSubjectSelect.val("English");
    // Adding an event listener for when the form is submitted
    $(flashcardForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!questionInput.val().trim() || !answerInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newFlashcard = {
        question: questionInput.val().trim(),
        answer: answerInput.val().trim(),
        subject: flashcardSubjectSelect.val()
      };
  
      console.log(newFlashcard);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newFlashcard.id = flashcardId;
        updateFlashcard(newFlashcard);
      }
      else {
        submitFlashcard(newFlashcard);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitFlashcard(Flashcard) {
      $.post("/api/flashcards/", Flashcard, function() {
        window.location.href = "/index";
      });
    }
  
    // Gets post data for a post if we're editing
    function getFlashcardData(id) {
      $.get("/api/flashcards/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          questionInput.val(data.question);
          answerInput.val(data.answer);
          flashcardSubjectSelect.val(data.subject);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updateFlashcard(flashcard) {
      $.ajax({
        method: "PUT",
        url: "/api/flashcards",
        data: flashcard
      })
        .then(function() {
          window.location.href = "/flashcard";
        });
    }
  });
$(document).ready(function() {
    // flashcard container holds cards
    var flashcardContainer = $(".card-container");
    var flashcardSubjectSelect = $("#subject");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleFlashcardDelete);
    $(document).on("click", "button.edit", handleFlashcardEdit);
   // $(document).on("click", "button.flip", FlashcardFlip);
    flashcardSubjectSelect.on("change", handleSubjectChange);
    var flashcards;
  
    // This function grabs posts from the database and updates the view
    function getFlashcards(subject) {
      var subjectString = subject || "";
      if (subjectString) {
        subjectString = "/subject/" + subjectString;
      }
      $.get("/api/flashcards" + subjectString, function(data) {
        console.log("Flashcards", data);
        flashcards = data;
        if (!flashcards || !flashcards.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deleteFlashcard(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/flashcards/" + id
      })
        .then(function() {
          getFlashcards(flashcardSubjectSelect.val());
        });
    }
  
    // Getting the initial list of Flashcards
    getFlashcards();
    // InitializeRows handles appending all of our constructed post HTML inside
    // flashcardContainer
    function initializeRows() {
      flashcardContainer.empty();
      var flashcardsToAdd = [];
      for (var i = 0; i < flashcards.length; i++) {
        flashcardsToAdd.push(createNewRow(flashcards[i]));
      }
      flashcardContainer.append(flashcardsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(flashcard) {
      var newFlashcardCard = $("<div>");
      newFlashcardCard.addClass("flashcard");
      var newFlashcardCardHeading = $("<div>");
      newFlashcardCardHeading.addClass("front");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
      var flipBtn = $("<button>")
      flipBtn.addClass("flip btn btn-default");
      flipBtn.text("FLIP CARD");
      var newFlashcardTitle = $("<h2>");
   //   var newFlashcardDate = $("<small>");
      var newFlashcardSubject= $("<h5>");
      newFlashcardSubject.text(flashcard.subject);
      newFlashcardSubject.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newFlashcardCardBody = $("<div>");
      newFlashcardCardBody.addClass("back");
      var newFlashcardBody = $("<p>");
      newFlashcardTitle.text(flashcard.question + " ");
      newFlashcardBody.text(flashcard.answer);
     // var formattedDate = new Date(flashcard.createdAt);
     // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //  newFlashcardDate.text(formattedDate);
     // newFlashcardTitle.append(newFlashcardDate);
      newFlashcardCardHeading.append(deleteBtn);
      newFlashcardCardHeading.append(editBtn);
      newFlashcardCardHeading.append(flipBtn);
      newFlashcardCardHeading.append(newFlashcardTitle);
      newFlashcardCardHeading.append(newFlashcardSubject);
      newFlashcardCardBody.append(newFlashcardBody);
      newFlashcardCard.append(newFlashcardCardHeading);
      newFlashcardCard.append(newFlashcardCardBody);
      newFlashcardCard.data("flashcard", flashcard);
      return newFlashcardCard;
    }

    //This function flips the card.
  //  $('.flipBTN').on('click', function() {
    //   $('.flipBTN').toggleClass('flipped');
    // });
    // function FlashcardFlip (){
    //   var currentFlashcard = $(this)
    //   $('.flashcard').on('click', function() {
    //     $('.flashcard').toggleClass('flipped');
    //   });

    // }
  
    // This function figures out which post we want to delete and then calls
    // deletePost
    function handleFlashcardDelete() {
      var currentFlashcard = $(this)
        .parent()
        .parent()
        .data("flashcard");
      deleteFlashcard(currentFlashcard.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handleFlashcardEdit() {
      var currentFlashcard = $(this)
        .parent()
        .parent()
        .data("flashcard");
      window.location.href = "/flashcard?flashcard_id=" + currentFlashcard.id;
    }
  
    // This function displays a message when there are no Flashcards
    function displayEmpty() {
      flashcardContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No flashcards yet for this subject, navigate <a href='/flashcard'>here</a> in order to create a new flashcard.");
      flashcardContainer.append(messageH2);
    }
  
    // This function handles reloading new Flashcards when the category changes
    function handleSubjectChange() {
      var newFlashcardSubject = $(this).val();
      getFlashcards(newFlashcardSubject);
    }
  
  });
  
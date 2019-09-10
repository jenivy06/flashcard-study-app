$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var blogId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?blog_id=") !== -1) {
        blogId = url.split("=")[1];
      getBlogData(blogId);
    }
  
    // Getting jQuery references to the post body, title, form, category, and location
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var blogForm = $("#blog");
    var blogCategorySelect = $("#category");
    // Giving the blogCategorySelect a default value
    blogCategorySelect.val("Point of Interest");
    var locationSelect = $("#location")
    // Giving the locationSelect a default value
    locationSelect.val("USA");
    // Adding an event listener for when the form is submitted
    $(blogForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!titleInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newBlog = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        category: blogCategorySelect.val(),
        location: locationSelect.val()
      };
  
      console.log(newBlog);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newBlog.id = blogId;
        updateBlog(newBlog);
      }
      else {
        submitBlog(newBlog);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitBlog(Blog) {
      $.post("/api/blogs/", Blog, function() {
        window.location.href = "/bloglist";
      });
    }
  
    // Gets post data for a post if we're editing
    function getBlogData(id) {
      $.get("/api/blogs/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          blogCategorySelect.val(data.category);
          locationSelect.val(data.location);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the bloglist page when done
    function updateBlog(blog) {
      $.ajax({
        method: "PUT",
        url: "/api/blogs",
        data: blog
      })
        .then(function() {
          window.location.href = "/bloglist";
        });
    }
    
  });
$(document).ready(function() {

 
  // blog container holds blogs
  var blogContainer = $(".blog-container");
  var blogCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleBlogDelete);
  $(document).on("click", "button.edit", handleBlogEdit);

  blogCategorySelect.on("change", handleCategoryChange);
  var blogs;

  // This function grabs posts from the database and updates the view
  function getBlogs(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/blogs" + categoryString, function(data) {
      console.log("Blogs", data);
      blogs = data;
      if (!blogs || !blogs.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteBlog(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/blogs/" + id
    })
      .then(function() {
        getBlogs(blogCategorySelect.val());
      });
  }

  // Getting the initial list of blogs
  getBlogs();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var blogsToAdd = [];
    for (var i = 0; i < blogs.length; i++) {
      blogsToAdd.push(createNewRow(blogs[i]));
    }
    blogContainer.append(blogsToAdd);
  }

  // This function constructs a blog's HTML
  function createNewRow(blog) {
    
    var newBlog = $("<div>");
    newBlog.addClass("card");
    var newBlogHeading = $("<div>");
    newBlogHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newBlogTitle = $("<h2>");
    var newBlogDate = $("<small>");
    
    var newBlogCategoryText = $("<h5>")
    newBlogCategoryText.text("Category: ")
    newBlogCategoryText.css({
      "color": "purple",
      "float": "right"
    })
    var newBlogCategory = $("<p>");
    newBlogCategory.text(blog.category);
    newBlogCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "20px",
      "margin-left": "500px"
    });
    var newBlogLocation = $("<p>");
    newBlogLocation.text(blog.location);
    newBlogLocation.css({
      float: "left",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newBodyInputArea = $("<div>");
    newBodyInputArea.addClass("card-body");
    var newBlogBody = $("<p>");
    newBlogTitle.text(blog.title + " ");
    newBlogBody.text(blog.body);
    var formattedDate = new Date(blog.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newBlogDate.text(formattedDate);
    newBlogTitle.append(newBlogDate);
    newBlogHeading.append(deleteBtn);
    newBlogHeading.append(editBtn);
    newBlogHeading.append(newBlogTitle);
    newBlogHeading.append(newBlogCategoryText);
    newBlogHeading.append(newBlogCategory);
    newBlogHeading.append(newBlogLocation);
    newBlogBody.append(newBlogBody);
    newBlog.append(newBlogHeading);
    newBlog.append(newBlogBody);
    newBlog.data("blog", blog);
    return newBlog;
  }


  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleBlogDelete() {
    var currentBlog = $(this)
      .parent()
      .parent()
      .data("blog");
    deleteBlog(currentBlog.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleBlogEdit() {
    var currentBlog = $(this)
      .parent()
      .parent()
      .data("blog");
    window.location.href = "/blogform?blog_id=" + currentBlog.id;
  }

  // This function displays a message when there are no blogs
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No blogs yet for this category or location! Navigate <a href='/blogform'>here</a> in order to create a new blog.");
    blogContainer.append(messageH2);
  }

  // This function handles reloading new blogs when the category changes
  function handleCategoryChange() {
    var newBlogCategory = $(this).val();
    getBlogs(newBlogCategory);
  }

});
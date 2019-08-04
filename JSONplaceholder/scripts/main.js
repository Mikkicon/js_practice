"use sctrict";

//GET	/posts
//GET	/posts/1
//GET	/posts/1/comments
//GET	/comments?postId=1
//GET	/posts?userId=1
//POST	/posts
//PUT	/posts/1
//PATCH	/posts/1
//DELETE /posts/1

function sendAJAXCall(path, callback) {
  var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://jsonplaceholder.typicode.com/" + path;
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.response));
    }
  };
  xhr.send();
}

// LOADERS

function loadAllPosts() {
  var container = document.getElementById("container");
  container.innerHTML = "";
  sendAJAXCall("posts", response => mainPageGen(response));
}
function loadPostsByUser(userId) {
  var container = document.getElementById("container");
  container.innerHTML = "";
  sendAJAXCall("posts?userId=" + userId, response => {
    mainPageGen(response);
  });
}
function loadPost(id) {
  var elementOutline = {
    id: ["b", "Post id: "],
    userId: ["label", "User: "],
    title: ["h3", "Title: "],
    body: ["p", ""]
  };
  var container = document.getElementById("container");
  container.innerHTML = "";
  sendAJAXCall("posts/" + id, response => {
    container.appendChild(buildPostElement(response, elementOutline, true));
  });
}

function loadCommentsForPost(postId, event) {
  sendAJAXCall("comments?postId=" + postId, response =>
    generateCommentsNodes(response)
  );
}

// GENERATORS

function mainPageGen(response) {
  var elementOutline = {
    id: ["b", "Post id: "],
    userId: ["button", "Posts by user: "],
    title: ["h3", "Title: "],
    body: ["p", ""]
  };
  response.map(post => {
    var currentPost = buildPostElement(post, elementOutline);
    container.appendChild(currentPost);
  });
}

function generateCommentsNodes(response) {
  var elementOutline = {
    postId: ["b", ""],
    id: ["b", "User id: "],
    name: ["h3", "Name: "],
    email: ["label", "E-mail: "],
    body: ["p", ""]
  };
  response.map(comment => {
    var currentComment = buildCommentElement(comment, elementOutline);
    container.appendChild(currentComment);
  });
}

// BUILDERS

function buildPostElement(post, elementOutline, postById = false) {
  let currentPost = document.createElement("div");
  let contents = {};

  for (const key in post) {
    contents[key] = document.createElement(elementOutline[key][0]);
    contents[key].innerText = elementOutline[key][1] + post[key];
  }

  contents["comments"] = document.createElement("button");
  if (postById) {
    contents["comments"].innerText = "Load all comments";
    contents["comments"].addEventListener("click", function handler(e) {
      e.target.removeEventListener(e.type, handler);
      return loadCommentsForPost(post.id);
    });
  } else {
    contents["userId"].addEventListener("click", () =>
      loadPostsByUser(post.id)
    );
    contents["comments"].innerText = "Go to comments";
    contents["comments"].addEventListener("click", () => loadPost(post.id));
  }

  for (const key in contents) {
    currentPost.appendChild(contents[key]);
  }
  return currentPost;
}

function buildCommentElement(comment, outline) {
  let currentComment = document.createElement("div");
  let contents = {};

  for (const key in comment) {
    contents[key] = document.createElement(outline[key][0]);
    contents[key].innerText = outline[key][1] + comment[key];
  }
  for (const key in contents) {
    currentComment.appendChild(contents[key]);
  }

  return currentComment;
}

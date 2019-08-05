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

function sendAJAXCall(path, callback, method = "GET", body = {}) {
  var xhr = new XMLHttpRequest();
  url = "https://jsonplaceholder.typicode.com/" + path;
  xhr.open(method, url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && ~~(xhr.status / 100) === 2) {
      callback(JSON.parse(xhr.response));
    }
  };
  xhr.send(method === "GET" ? null : body);
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

function generateNewPost() {
  var container = document.getElementById("container");
  var fstChild = container.firstChild;
  var elementOutline = {
    id: ["b", container.childElementCount + 1],
    userId: ["input", "User Id: "],
    title: ["input", "Title: "],
    body: ["input", "Body: "],
    button: ["button", "Post"]
  };
  var post = buildNewPost(elementOutline);
  container.insertBefore(post, fstChild);
}

function sendPost() {
  var contents = {};
  return function(key, value) {
    if (key === "submit") {
      contents["id"] = value;
      sendAJAXCall(
        "posts/",
        () => {
          loadAllPosts();
        },
        "POST",
        JSON.stringify(contents)
      );
    }
    contents[key] = value;
  };
}

// BUILDERS

function buildPostElement(post, elementOutline, postById = false) {
  let currentPost = document.createElement("div");
  let contents = {};

  currentPost.appendChild(document.createElement("br"));
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
    contents["delete"] = document.createElement("button");
    contents["userId"].addEventListener("click", () =>
      loadPostsByUser(post.userId)
    );
    contents["comments"].innerText = "Go to comments";
    contents["delete"].innerText = "Delete Post";
    contents["comments"].addEventListener("click", () => loadPost(post.id));
    contents["delete"].addEventListener("click", () =>
      sendAJAXCall("posts/" + post.id, () =>
        alert("Post " + post.id + " has been deleted.")
      )
    );
  }

  for (const key in contents) {
    currentPost.appendChild(contents[key]);
  }

  currentPost.appendChild(document.createElement("hr"));
  return currentPost;
}

function buildCommentElement(comment, outline) {
  let currentComment = document.createElement("div");
  let contents = {};

  for (const key in comment) {
    contents[key] = document.createElement(outline[key][0]);
    contents[key].innerText = outline[key][1] + comment[key];
    currentComment.appendChild(contents[key]);
  }

  return currentComment;
}

function buildNewPost(elementOutline) {
  let newPost = document.createElement("div");
  let contents = {};
  let gen = sendPost();
  for (const key in elementOutline) {
    contents[key] = document.createElement(elementOutline[key][0]);
    if (key === "id") {
      contents[key].innerText = "Post id: " + elementOutline[key][1];
    } else if (key === "button") {
      contents[key].innerText = elementOutline[key][1];
      contents[key].addEventListener("click", function handler(e) {
        e.target.removeEventListener(e.type, handler);
        return gen("submit", parseInt(elementOutline["id"][1]));
      });
    } else {
      contents[key].placeholder = elementOutline[key][1];
      contents[key].addEventListener("change", e => gen(key, e.target.value));
    }
    newPost.appendChild(contents[key]);
    newPost.appendChild(document.createElement("br"));
  }
  return newPost;
}

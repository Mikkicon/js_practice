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

var correspondingTags = {
  id: "b",
  userId: "label",
  title: "h3",
  body: "p",
  comments: "button"
};
async function loadPosts() {
  console.log(location.href);
  var container = document.getElementById("container");
  container.innerHTML = "";
  var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://jsonplaceholder.typicode.com/posts/";
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.response);
      generatePostsNodes(response);
    }
  };
  xhr.send();
}

function generatePostsNodes(response) {
  response.map(post => {
    var currentPost = generatePostNode(post, correspondingTags);
    container.appendChild(currentPost);
  });
}

function loadPost(id) {
  var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://jsonplaceholder.typicode.com/posts/" + id;
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.response);
      var container = document.getElementById("container");
      container.innerHTML = "";
      container.appendChild(
        generatePostNode(response, correspondingTags, {
          innerText: "Load all comments",
          function: loadCommentsForPost(id)
        })
      );
    }
  };
  xhr.send();
}

function loadCommentsForPost(postId) {
  var localCT = Object.assign({}, correspondingTags);
  delete localCT.userId;
  delete localCT.title;
  delete localCT.comments;
  localCT.name = null;
  localCT.email = null;
  var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments";
  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.response);
      var container = document.getElementById("container");
      container.appendChild(generateCommentsNodes(response, localCT));
    }
  };
  xhr.send();
}

function generatePostNode(post, correspondingTags, commentsProperties = {}) {
  let currentPost = document.createElement("div");
  let contents = {};
  for (const key in correspondingTags) {
    contents[key] = document.createElement(correspondingTags[key]);
  }
  contents["userId"].innerText = "User: " + post.userId;
  contents["id"].innerText = "Post: " + post.id;
  contents["title"].innerText = post.title;
  contents["body"].innerText = post.body;
  contents["comments"].innerText =
    commentsProperties.innerText || "Go to comments";
  contents["comments"].addEventListener(
    "click",
    () => commentsProperties.function || loadPost(post.id)
  );
  for (const key in contents) {
    currentPost.appendChild(contents[key]);
  }
  return currentPost;
}

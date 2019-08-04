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

function loadPosts() {
  var container = document.getElementById("container");
  container.innerHTML = "";
  sendAJAXCall("posts", response => generatePostsNodes(response));
}

function loadPost(id) {
  var container = document.getElementById("container");
  sendAJAXCall("posts/" + id, response => {
    container.innerHTML = "";
    container.appendChild(generateNode(response, correspondingTags));
  });
}

function loadCommentsForPost(postId) {
  var container = document.getElementById("container");
  sendAJAXCall("posts/" + postId + "/comments", response =>
    container.appendChild(generateCommentsNodes(response))
  );
}

function generatePostsNodes(response) {
  var outline = {
    id: ["b", "Post: "],
    userId: ["label", "User: "],
    title: ["h3", ""],
    body: ["p", ""],
    comments: [
      "button",
      "Go to comments",
      {
        property: "comments",
        dataId: "id",
        event: "click",
        function: id => loadPost(id)
      }
    ]
  };
  response.map(post => {
    var currentPost = generateNode(post, outline);
    container.appendChild(currentPost);
  });
}

function generateNode(data, outline, evtListeners = {}) {
  let currentPost = document.createElement("div");
  let contents = {};
  for (const key in outline) {
    if (outline.hasOwnProperty(key) && data.hasOwnProperty(key)) {
      contents[key] = document.createElement(outline[key][0]);
      contents[key].innerText = outline[key][1] + data[key];
    }
  }
  if (evtListeners.length) {
    contents[evtListeners.property].addEventListener(
      evtListeners.event,
      evtListeners.function(data[evtListeners.dataId])
    );
  }

  for (const key in contents) {
    currentPost.appendChild(contents[key]);
  }
  return currentPost;
}

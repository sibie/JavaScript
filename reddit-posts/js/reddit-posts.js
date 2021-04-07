const postTypeDropdown = document.querySelector(".post-type");
const postContainer = document.querySelector(".post-container");

const retrievePosts = (postType) => {
  const proxy = "https://api.allorigins.win/raw?url="; // Proxy URL for CORS.

  fetch(`${proxy}https://www.reddit.com/r/worldnewsheadlines/${postType}.json`)
    .then(function(res) { return res.json(); }) // Retrieving  the reddit posts in JSON format.
    
    .then(function(res) {
      let currentPost, postsToHTML = ``;
      const postsArray = res.data.children; // Storing the posts into an array to generate the required HTML.

      // Container title added here.
      postTypeCaps = postType.charAt(0).toUpperCase() + postType.slice(1);
      postsToHTML = `<h2>${postTypeCaps} Posts from r/WorldNewsHeadlines</h2>`;

      for (let i = 0; i < postsArray.length; i++) {
        currentPost = postsArray[i].data; // Converting each post into HTML iteratively.
        postsToHTML += `
          <a class="post" href="https://www.reddit.com/${currentPost.permalink}">
            <div class="title"> ${currentPost.title} </div>
            <div class="content"> 
              ${currentPost.selftext} 
              </br>
              <span>${currentPost.url}</span>
            </div><br>
            <div class="author"> Posted by ${currentPost.author} </div>
          </a><br><br>`;
      }
      // Adding HTML to posts container.
      postContainer.insertAdjacentHTML('afterbegin', postsToHTML);
    })
    .catch(function(e) {
      console.log(e);
    });
};

// Event Listener to update the page if post type selection is changed.
postTypeDropdown.addEventListener("change", () => {
  let index = postTypeDropdown.selectedIndex;
  let value = postTypeDropdown.options[index].value;
  retrievePosts(value);
});

retrievePosts("hot"); // Hot posts retrieved by default.
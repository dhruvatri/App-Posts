let postArray: any;
let posts: any = [];
let postId: number = 0;

function setItems() {
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('postId', postId.toString());
}

function getItems() {
  posts = JSON.parse(localStorage.getItem('posts') || '[]');
  postId = parseInt(localStorage.getItem('postId') || '0');
}

function displayPost() {
  const postElement = document.createElement('div');
  postElement.className = 'post';
  const uniqueIdentity: string = "post" + postId;
  postElement.innerHTML = `
    <h1 class="post-title">${posts[postId].title}</h1>
    <button id=${uniqueIdentity} class="close">X</button>
    <p class="post-body">${posts[postId].body.replace(/\n/g, '<br>')}</p>`;

  document.querySelector("#postArea")?.appendChild(postElement);

  // Open modal when the close button is clicked
  const closeButton = document.getElementById(uniqueIdentity);
  closeButton?.addEventListener('click', () => {
    SurePage(postElement);
  });
}

function SurePage(postElement: HTMLElement) {
    const modal = document.getElementById("myModal") as HTMLElement;
    const yesButton = document.getElementById("yesButton") as HTMLElement;

    // Display the modal using 'flex' to match CSS
    if (modal) modal.style.display = "flex";

    // Remove previous onclick event to prevent multiple event listeners
    if (yesButton) {
        yesButton.onclick = null; // Remove any previous event listener
        yesButton.onclick = function () {
            deletePost(postElement);
        };
    }
}


function initializeModal() {
  const modal = document.getElementById("myModal") as HTMLElement;
  const span = document.getElementsByClassName("closeBtn")[0] as HTMLElement;
  const noButton = document.getElementById("noButton") as HTMLElement;

  // When the user clicks on <span> (x) or "No" button, close the modal
  const closeModal = function () {
    if (modal) modal.style.display = "none";
  };

  if (span) {
    span.onclick = closeModal;
  }

  if (noButton) {
    noButton.onclick = closeModal;
  }

  // When the user clicks outside the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      if (modal) modal.style.display = "none";
    }
  };
}

function deletePost(postElement: HTMLElement) {
  const postIndex = Array.from(document.querySelectorAll('.post')).indexOf(postElement);

  if (postIndex !== -1) {
    // Remove the post from the `posts` array
    posts.splice(postIndex, 1);

    // Update localStorage
    setItems();

    // Remove the post element from the DOM
    document.querySelector("#postArea")?.removeChild(postElement);

    // Close the modal
    const modal = document.getElementById("myModal");
    if (modal) modal.style.display = "none";
  }
  const modal = document.getElementById("myModal");
    if (modal) modal.style.display = "none";
}

async function fetchPosts(): Promise<void> {
  if (postId === 0) {
    postArray = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts = await postArray.json();
    setItems();
  }

  if (postId < posts.length) {
    displayPost();
    postId++;
    setItems();
  } else {
    alert("No more posts to display");
  }
}

window.onload = function () {
  initializeModal(); // Set up modal event listeners
  getItems();
  const tempId: number = postId;
  postId = 0;
  for (let i = 0; i < tempId; i++) {
    displayPost();
    postId++;
  }
};

document.querySelector("#addButton")?.addEventListener('click', fetchPosts);

document.querySelector("#refreshButton")?.addEventListener('click', function () {
  const postArea = document.querySelector("#postArea");
  if (postArea) {
    postArea.innerHTML = ""; // Clear the inner HTML only if postArea exists
  }

  posts = [];
  postId = 0;
  localStorage.clear();
  location.reload();
});

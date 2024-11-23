const postsData = [
  {
    title: "Protests in the City Center",
    description:
      "A large protest occurred today in the city center, drawing attention to crucial issues.",
    author: {
      name: "Jane Doe",
      profilePic: "./assets/img/daniel.jpg",
    },
    category: "Rioting",
    timestamp: "November 23rd  2024",
  },
  {
    title: "Major Traffic Accident",
    description:
      "A multi-vehicle collision disrupted traffic on the main highway this morning.",
    author: {
      name: "John Smith",
      profilePic: "./assets/img/daniel.jpg",
    },
    category: "Accident",
    timestamp: "November 22nd  2024",
  },
  {
    title: "Street Fight Reported",
    description:
      "Authorities intervened after a heated altercation escalated into a street fight.",
    author: {
      name: "Emma Brown",
      profilePic: "./assets/img/daniel.jpg",
    },
    category: "Fighting",
    timestamp: "November 21st  2024",
  },
];

const postsContainer = document.getElementById("posts");
const postForm = document.getElementById("postForm");
const filterCategory = document.getElementById("filterCategory");

// Function to render posts
function renderPosts(posts) {
  postsContainer.innerHTML = ""; // Clear existing posts

  posts.forEach((post) => {
    const postCard = `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-2 text-center p-3">
            <img 
              src="${post.author.profilePic}" 
              alt="${post.author.name}'s Profile" 
              class="rounded-circle img-thumbnail"
              style="width: 80px; height: 80px;">
            <p class="small mt-2">${post.author.name}</p>
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.description}</p>
              <p class="text-muted small">Posted on: <span>${post.timestamp}</span></p>
              <p class="text-muted small">Category: <span>${post.category}</span></p>
            </div>
          </div>
        </div>
      </div>
    `;
    postsContainer.innerHTML += postCard;
  });

  // Handle empty state
  if (posts.length === 0) {
    postsContainer.innerHTML = `<p class="text-muted text-center">No posts available.</p>`;
  }
}

// Handle form submission
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(postForm);
  const newPost = {
    title: formData.get("title"),
    description: formData.get("content"),
    author: {
      name: "New User", // Replace with logged-in user name if available
      profilePic: "./assets/img/daniel.jpg",
    },
    category: formData.get("category"),
    timestamp: new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  postsData.unshift(newPost); // Add new post to the beginning
  renderPosts(postsData); // Re-render posts

  postForm.reset(); // Clear form
  const modal = bootstrap.Modal.getInstance(document.getElementById("myModal"));
  modal.hide(); // Hide modal after submission
});

// Handle category filtering
filterCategory.addEventListener("change", () => {
  const selectedCategory = filterCategory.value;

  if (selectedCategory === "All") {
    renderPosts(postsData); // Show all posts
  } else {
    const filteredPosts = postsData.filter(
      (post) => post.category === selectedCategory
    );
    renderPosts(filteredPosts); // Show filtered posts
  }
});

// Initial render of posts
renderPosts(postsData);

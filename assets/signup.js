const form = document.getElementById("signup-form");
const login = document.getElementById("signup");
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
const img = document.getElementById("img_eye");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (
    img.src.match(
      "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png"
    )
  ) {
    img.src =
      "https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png";
  } else {
    img.src =
      "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const data = new URLSearchParams(formData);

  try {
    const res = await fetch("/signup-process", {
      method: "POST",
      headers: { "content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await res.json();
  } catch (error) {
    console.log("Error: ", error);
  }
});

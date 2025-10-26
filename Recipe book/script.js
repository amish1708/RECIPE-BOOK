// =============================================
// Get all necessary DOM elements
// =============================================
const recipeForm = document.getElementById("recipeForm");
const recipesList = document.getElementById("recipesList");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalName = document.getElementById("modalName");
const modalImage = document.getElementById("modalImage");
const modalIngredients = document.getElementById("modalIngredients");
const modalSteps = document.getElementById("modalSteps");
const searchInput = document.getElementById("searchInput");

// =============================================
// Default recipes with static images
// =============================================
const defaultRecipes = [
  {
    name: "Classic Spaghetti",
    ingredients: ["Spaghetti", "Tomato Sauce", "Garlic", "Olive Oil", "Basil"],
    steps: "Boil pasta, cook sauce, mix together and serve hot.",
    image: "images/Classic Spaghetti.jpg",
  },
  {
    name: "Fresh Salad Bowl",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Carrots", "Vinaigrette"],
    steps: "Chop veggies, toss with dressing, enjoy fresh.",
    image: "images/Fresh Salad Bowl.jpg",
  },
  {
    name: "Homemade Pancakes",
    ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Butter"],
    steps: "Mix batter, pour on pan, flip and serve with syrup.",
    image: "images/Homemade Pancakes.jpg",
  },
  // Add more default recipes as you had...
];

// =============================================
// Load recipes from localStorage or use defaults
// =============================================
let recipes = [];
try {
  recipes = JSON.parse(localStorage.getItem("recipes")) || [];
} catch (err) {
  recipes = [];
}

if (!recipes || recipes.length === 0) {
  recipes = [...defaultRecipes];
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// =============================================
// Helper: resize and convert image to Base64
// =============================================
function resizeAndConvertImage(
  file,
  maxWidth = 300,
  maxHeight = 300,
  callback
) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // compressed JPEG
      callback(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// =============================================
// Save recipes (text + Base64 images) to localStorage
// =============================================
function saveRecipes() {
  try {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("Local storage full! Cannot save more recipes.");
    } else {
      throw e;
    }
  }
}

// =============================================
// Display recipes on page
// =============================================
function displayRecipes(list = recipes) {
  recipesList.innerHTML = "";

  list.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const img = document.createElement("img");
    img.src = recipe.image || ""; // Base64 uploaded or default URL

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    const h3 = document.createElement("h3");
    h3.textContent = recipe.name;

    const btn = document.createElement("button");
    btn.textContent = "View Details";
    btn.addEventListener("click", () => showModal(index));

    contentDiv.appendChild(h3);
    contentDiv.appendChild(btn);

    card.appendChild(img);
    card.appendChild(contentDiv);

    recipesList.appendChild(card);
  });
}

// =============================================
// Show modal with recipe details
// =============================================
function showModal(index) {
  const recipe = recipes[index];
  modalName.textContent = recipe.name;
  modalImage.src = recipe.image || "";
  modalIngredients.textContent = recipe.ingredients.join(", ");
  modalSteps.textContent = recipe.steps;
  modal.style.display = "block";
}

// Close modal
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// =============================================
// Add new recipe
// =============================================
recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const imageInput = document.getElementById("image");
  const imageFile = imageInput.files[0];

  if (!name || !ingredients || !steps || !imageFile) {
    alert("Please fill in all fields and select an image.");
    return;
  }

  // Resize and convert image, then save recipe
  resizeAndConvertImage(imageFile, 300, 300, function (base64Image) {
    const newRecipe = {
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      steps,
      image: base64Image,
    };

    recipes.push(newRecipe);
    saveRecipes();
    displayRecipes();
    recipeForm.reset();
  });
});

// =============================================
// Search recipes by name or ingredient
// =============================================
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.join(" ").toLowerCase().includes(query)
  );
  displayRecipes(filtered);
});

// =============================================
// Contact form dummy submit
// =============================================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been received.");
  this.reset();
});

// =============================================
// Initial render
// =============================================
displayRecipes();

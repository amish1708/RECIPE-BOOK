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
//  Default recipes data (fallback)
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
  {
    name: "Veggie Stir Fry",
    ingredients: ["Broccoli", "Bell Peppers", "Carrots", "Soy Sauce", "Garlic"],
    steps: "Stir fry veggies in a wok with soy sauce and garlic.",
    image: "images/Veggie Stir Fry.jpg",
  },
  {
    name: "Mushroom Risotto",
    ingredients: [
      "Arborio Rice",
      "Mushrooms",
      "Onion",
      "Vegetable Broth",
      "Parmesan",
    ],
    steps:
      "Cook rice slowly with broth, add sautéed mushrooms, top with cheese.",
    image: "images/Mushroom Risotto.jpg",
  },
  {
    name: "Caprese Sandwich",
    ingredients: ["Bread", "Tomatoes", "Mozzarella", "Basil", "Balsamic Glaze"],
    steps: "Layer tomatoes, mozzarella, basil; drizzle with balsamic glaze.",
    image: "images/Caprese Sandwich.jpg",
  },
  {
    name: "Veggie Pizza",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Bell Peppers",
      "Onions",
      "Mozzarella",
    ],
    steps: "Top dough with sauce, veggies, cheese; bake until golden.",
    image: "images/Veggie Pizza.jpg",
  },
  {
    name: "Greek Salad",
    ingredients: ["Cucumber", "Tomatoes", "Feta Cheese", "Olives", "Olive Oil"],
    steps: "Combine chopped veggies, olives, feta; drizzle with olive oil.",
    image: "images/Greek Salad.jpg",
  },
  {
    name: "Vegetable Soup",
    ingredients: ["Carrots", "Potatoes", "Celery", "Tomatoes", "Herbs"],
    steps: "Simmer all veggies in broth with herbs until tender.",
    image: "images/Vegetable Soup.jpg",
  },
  {
    name: "Stuffed Bell Peppers",
    ingredients: ["Bell Peppers", "Rice", "Tomatoes", "Onions", "Cheese"],
    steps: "Stuff peppers with cooked rice mixture, bake with cheese topping.",
    image: "images/Stuffed Bell Peppers.jpg",
  },
  {
    name: "Chickpea Salad",
    ingredients: [
      "Chickpeas",
      "Cucumber",
      "Tomatoes",
      "Red Onion",
      "Lemon Juice",
    ],
    steps: "Mix chickpeas with chopped veggies, dress with lemon juice.",
    image: "images/Chickpea Salad.jpg",
  },
  {
    name: "Paneer Tikka",
    ingredients: ["Paneer", "Bell Peppers", "Yogurt", "Spices", "Onion"],
    steps: "Marinate paneer and veggies in spiced yogurt, grill until charred.",
    image: "images/Paneer Tikka.jpg",
  },
  {
    name: "Aloo Paratha",
    ingredients: ["Whole Wheat Flour", "Potatoes", "Spices", "Butter"],
    steps: "Stuff dough with spiced mashed potatoes, roll and cook on a pan.",
    image: "images/Aloo Paratha.jpg",
  },
  {
    name: "Vegetable Biryani",
    ingredients: [
      "Basmati Rice",
      "Mixed Vegetables",
      "Spices",
      "Yogurt",
      "Onion",
    ],
    steps: "Layer cooked veggies and rice with spices, steam until aromatic.",
    image: "images/Vegetable Biryani.jpg",
  },
  {
    name: "Dhokla",
    ingredients: [
      "Gram Flour",
      "Yogurt",
      "Spices",
      "Mustard Seeds",
      "Coriander",
    ],
    steps:
      "Steam spiced batter, temper with mustard seeds, garnish with coriander.",
    image: "images/Dhokla.jpg",
  },
  {
    name: "Veg Sandwich",
    ingredients: ["Bread", "Cucumber", "Tomatoes", "Onion", "Green Chutney"],
    steps: "Layer sliced veggies and chutney between bread slices.",
    image: "images/Veg Sandwich.jpg",
  },
  {
    name: "Hummus Wrap",
    ingredients: ["Tortilla", "Hummus", "Lettuce", "Cucumber", "Carrots"],
    steps: "Spread hummus on wrap, fill with veggies, roll tightly.",
    image: "images/Hummus Wrap.jpg",
  },
  {
    name: "Veggie Burger",
    ingredients: ["Burger Bun", "Veggie Patty", "Lettuce", "Tomato", "Cheese"],
    steps: "Grill patty, assemble burger with toppings.",
    image: "images/Veggie Burger.jpg",
  },
  {
    name: "Matar Paneer",
    ingredients: ["Paneer", "Green Peas", "Tomatoes", "Onion", "Spices"],
    steps: "Cook paneer and peas in spiced tomato-onion gravy.",
    image: "images/Matar Paneer.jpg",
  },
  {
    name: "Veg Fried Rice",
    ingredients: ["Rice", "Mixed Vegetables", "Soy Sauce", "Ginger", "Garlic"],
    steps: "Stir-fry cooked rice with veggies, ginger, garlic, and soy sauce.",
    image: "images/Veg Fried Rice.jpg",
  },
];

// =============================================
// Load recipes from localStorage or use default
// =============================================
let recipes = [];
try {
  recipes = JSON.parse(localStorage.getItem("recipes")) || [];
} catch (err) {
  recipes = [];
}

// If localStorage is empty, use defaults and save
if (!recipes || recipes.length === 0) {
  recipes = [...defaultRecipes];
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// =============================================
//  Helper to save recipes to localStorage
// =============================================
function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// =============================================
//  Handle form submission for new recipes
// =============================================
recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const imageInput = document.getElementById("image");
  const imageFile = imageInput.files[0];

  // Validate all fields
  if (!name || !ingredients || !steps || !imageFile) {
    alert("Please fill in all fields and select an image.");
    return;
  }

  // Read uploaded image as Base64
  const reader = new FileReader();
  reader.onload = function () {
    const imageURL = reader.result;

    // Build new recipe object
    const newRecipe = {
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      steps,
      image: imageURL,
    };

    // Add to recipes list and save
    recipes.push(newRecipe);
    saveRecipes();
    displayRecipes();
    recipeForm.reset();
  };
  reader.readAsDataURL(imageFile);
});

// =============================================
// Render all recipes on the page
// =============================================
function displayRecipes(list = recipes) {
  recipesList.innerHTML = ""; // Clear list first

  list.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="content">
        <h3>${recipe.name}</h3>
        <button data-index="${index}" class="details-btn">View Details</button>
      </div>
    `;
    recipesList.appendChild(card);
  });

  // Attach click listeners for detail buttons
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      showModal(index);
    });
  });
}

// =============================================
// Show modal with full recipe details
// =============================================
function showModal(index) {
  const recipe = recipes[index];
  modalName.textContent = recipe.name;
  modalImage.src = recipe.image;
  modalIngredients.textContent = recipe.ingredients.join(", ");
  modalSteps.textContent = recipe.steps;
  modal.style.display = "block";
}

// Close modal on close button or outside click
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// =============================================
// Search filter for recipes by name/ingredient
// =============================================
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  recipesList.innerHTML = "";

  recipes
    .filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.join(", ").toLowerCase().includes(query)
    )
    .forEach((recipe) => {
      const indexInFullArray = recipes.indexOf(recipe);

      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" />
        <div class="content">
          <h3>${recipe.name}</h3>
          <button onclick="showModal(${indexInFullArray})">View Details</button>
        </div>
      `;

      recipesList.appendChild(card);
    });
});

// =============================================
// Contact form dummy submit (footer)
// =============================================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been received.");
  this.reset();
});

// =============================================
// Initial render on page load
// =============================================
displayRecipes();

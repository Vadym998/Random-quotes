/* script.js */

// --- Массив цитат (можно расширять) ---
const quotes = [
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  {
    text: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair",
  },
];

// --- DOM элементы ---
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");

// --- Избранные цитаты ---
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// --- Текущая цитата ---
let currentQuote = getRandomQuote();

// --- Случайная цитата ---
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// --- Обновление карточки ---
function updateQuote(quote) {
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `${quote.author}`;
  currentQuote = quote; // сохраняем текущую цитату
}

// --- Начальная цитата ---
// updateQuote(currentQuote);

// --- Кнопка New Quote ---
newQuoteBtn.addEventListener("click", () => {
  const quote = getRandomQuote();
  updateQuote(quote);
});

// --- Добавление в избранное ---
favoriteBtn.addEventListener("click", () => {
  // Проверка на дубликаты
  const exists = favorites.some(
    (fav) =>
      fav.text === currentQuote.text && fav.author === currentQuote.author,
  );
  if (!exists) {
    favorites.push(currentQuote); // добавляем любую цитату, пока она не повторяется
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites(); // обновляем список
  }
});

// --- Отрисовка избранного ---
function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((fav, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `"${fav.text}" — ${fav.author}`;

    // Кнопка удалить
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "btn btn-sm btn-outline-danger ms-2";
    delBtn.addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });

    li.appendChild(delBtn);
    favoritesList.appendChild(li);
  });
}

renderFavorites();

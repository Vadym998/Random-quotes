async function fetchQuote() {
  const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();

  quoteText.textContent = data.content;
  quoteAuthor.textContent = data.author;
}

// DOM ell
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");

let currentQuote = { text: "", author: "" };
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Card update
function updateQuote(quote) {
  quoteText.textContent = `"${quote.text}"`;
  // console.log("Updating author:", quote.author);
  const span = document.getElementById("quoteAuthor");
  span.textContent = `${quote.author}`;
  currentQuote = quote;
}

async function getRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    const quote = { text: data.content, author: data.author };
    updateQuote(quote); // update the card here!
  } catch (error) {
    console.error("Fetch error:", error);
    quoteText.textContent = "Failed to load citation 😢";
    quoteAuthor.textContent = "";
  }
}

newQuoteBtn.addEventListener("click", getRandomQuote);

favoriteBtn.addEventListener("click", () => {
  if (!favorites.some((fav) => fav.text === currentQuote.text)) {
    favorites.push(currentQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
});

function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((fav, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `"${fav.text}" — ${fav.author}`;

    // Delete button
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
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-checkbox");
  const label = document.getElementById("theme-label");

  // Проверяем сохранённую тему в localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    toggle.checked = true;
    label.textContent = "Switch to Light";
  } else {
    label.textContent = "Switch to Dark";
  }

  // Переключение темы
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggle.checked);

    // Обновляем надпись
    label.textContent = toggle.checked ? "Switch to Light" : "Switch to Dark";

    // Сохраняем выбор в localStorage
    localStorage.setItem("theme", toggle.checked ? "dark" : "light");
  });
});
// Ждём, пока DOM полностью загрузится
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-checkbox");
  const label = document.getElementById("theme-label");

  // Устанавливаем правильный текст при загрузке
  label.textContent = toggle.checked ? "Switch to Light" : "Switch to Dark";

  // Слушаем изменения ползунка
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggle.checked);
    label.textContent = toggle.checked ? "Switch to Light" : "Switch to Dark";
  });
});
renderFavorites();

getRandomQuote();

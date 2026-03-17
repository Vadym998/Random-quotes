import initTheme from "./theme.js";
import { getrandomQuote } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

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
    const span = document.getElementById("quoteAuthor");
    span.textContent = `${quote.author}`;
    currentQuote = quote;
  }

  async function loadQuote() {
    try {
      console.log("Loading quote...");
      const quote = await getrandomQuote();
      console.log("Quote loaded:", quote);
      updateQuote(quote); // update the card here!
    } catch (error) {
      console.error("Fetch error:", error);
      quoteText.textContent = "Failed to load citation 😢";
      quoteAuthor.textContent = "";
    }
  }

  newQuoteBtn.addEventListener("click", loadQuote);

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

  renderFavorites();

  loadQuote();
});

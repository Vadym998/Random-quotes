export default function initTheme() {
  const toggle = document.getElementById("theme-checkbox");
  const label = document.getElementById("theme-label");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    toggle.checked = true;
    label.textContent = "Switch to Light";
  } else {
    label.textContent = "Switch to Dark";
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggle.checked);

    label.textContent = toggle.checked ? "Switch to Light" : "Switch to Dark";

    localStorage.setItem("theme", toggle.checked ? "dark" : "light");
  });
}

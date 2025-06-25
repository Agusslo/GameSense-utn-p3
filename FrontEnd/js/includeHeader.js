fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
    initThemeSwitcher();
  });

function initThemeSwitcher() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  const setTheme = (theme) => {
    document.body.classList.toggle("theme-light", theme === "light");
    localStorage.setItem("theme", theme);
    themeIcon.src = theme === "dark" ? "./img/moon.svg" : "./img/sun.svg";
  };

  toggleBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
}

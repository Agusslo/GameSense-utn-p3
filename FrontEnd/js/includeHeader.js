fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
    configModal();
  });

function configModal() {
  const configBtn = document.getElementById("btn-config");
  const modal = document.getElementById("configModal");
  const closeBtn = document.querySelector(".close-config");

  if (configBtn && modal && closeBtn) {
    configBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  const select = document.getElementById("themeSelect");
  if (select) {
    const savedTheme = localStorage.getItem("theme") || "auto";
    select.value = savedTheme;
    applyTheme(savedTheme);

    select.addEventListener("change", () => {
      const selected = select.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });
  }
}

function applyTheme(theme) {
  document.body.classList.remove("theme-light");
  if (theme === "light") {
    document.body.classList.add("theme-light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"; 
  applyTheme(savedTheme);
});


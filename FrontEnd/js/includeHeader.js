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
  }

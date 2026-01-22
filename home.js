(() => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const cartCountEl = document.getElementById("cartCount");
  const addCartBtns = document.querySelectorAll(".js-add-cart");

  //Modo oscuro
  function setTheme(isDark) {
    html.classList.toggle("theme-dark", isDark);
    themeIcon.textContent = isDark ? "dark_mode" : "light_mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Inicializar tema
  const saved = localStorage.getItem("theme");
  if (saved === "light") setTheme(false);
  else setTheme(true); // default dark

  themeToggle?.addEventListener("click", () => {
    const isDark = html.classList.contains("theme-dark");
    setTheme(!isDark);
  });

  // Carrito de compras
  function getCount() {
    return Number(cartCountEl?.textContent || 0);
  }
  function setCount(n) {
    if (cartCountEl) cartCountEl.textContent = String(n);
  }

    addCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
      setCount(getCount() + 1);
    });
  });
})();

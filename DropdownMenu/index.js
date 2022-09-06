const dropdowns = document.querySelectorAll(".dropdown");

// Loop through all dropdown elements
dropdowns.forEach((x) => {
  const select = x.querySelector(".select");
  const caret = x.querySelector(".caret");
  const menu = x.querySelector(".menu");
  const options = x.querySelectorAll(".menu li");
  const selected = x.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((x) => {
    x.addEventListener("click", () => {
      selected.innerText = x.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((x) => {
        x.classList.remove("active");
      });
      x.classList.add("active");
    });
  });
});

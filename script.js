const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

  });

});
